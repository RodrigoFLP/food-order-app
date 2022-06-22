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

    if (res.status !== 200) {
      throw new Error("Algún error");
    }

    return NextResponse.next();
  } catch (err) {
    const page = req.page.name;
    return NextResponse.redirect(`http://192.168.0.17:3000`);
  }
}
