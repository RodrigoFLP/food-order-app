import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import techposApi from "../../api/techposApi";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  try {
    const res = await fetch(`${process.env.API_URL}/confirm-email/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: req.url.split("token=")[1],
      }),
    });

    if (res.status == 409) {
      throw new Error("done");
    }

    if (res.status !== 201) {
      throw new Error("invalid");
    }

    return NextResponse.next();
  } catch (err: any) {
    // const page = req.page.name;
    return NextResponse.redirect(
      `${process.env.URL}/confirm-email-error?message=${err.message}`
    );
  }
}
