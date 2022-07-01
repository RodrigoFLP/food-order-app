import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import techposApi from "../../api/techposApi";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  try {
    const res = await fetch("http://192.168.0.17:5000/confirm-email/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: req.url.split("token=")[1],
      }),
    });
    console.log(res.status);

    if (res.status == 409) {
      throw new Error("done");
    }

    if (res.status !== 201) {
      throw new Error("invalid");
    }

    return NextResponse.next();
  } catch (err: any) {
    console.log(err);
    // const page = req.page.name;
    return NextResponse.redirect(
      `http://192.168.0.17:3000/confirm-email-error?message=${err.message}`
    );
  }
}
