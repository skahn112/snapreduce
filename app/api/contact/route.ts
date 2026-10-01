import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/data/site-config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, category, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    // If Web3Forms access key is configured, send directly to email
    if (accessKey) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[SnapReduce Inquiry - ${category}] from ${name}`,
          from_name: name,
          email: email,
          to_email: SITE_CONFIG.contactEmail,
          category: category,
          message: message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        return NextResponse.json({
          success: true,
          method: "direct",
          message: "Inquiry sent successfully to our support desk!",
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            error: data.message || "Failed to deliver email through service.",
          },
          { status: 502 }
        );
      }
    }

    // If no external email API key is set yet, log inquiry and indicate email client fallback
    console.log("Contact form submission received:", {
      name,
      email,
      category,
      message,
      targetEmail: SITE_CONFIG.contactEmail,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      method: "logged",
      message: `Inquiry recorded. (Add WEB3FORMS_ACCESS_KEY to .env.local for automatic instant email delivery to ${SITE_CONFIG.contactEmail}).`,
    });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error while sending message." },
      { status: 500 }
    );
  }
}
