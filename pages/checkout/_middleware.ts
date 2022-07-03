import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  try {
    const { Authentication: token = "" } = req.cookies;

    const res = await fetch("http://192.168.0.17:5000/auth/checkheader", {
      headers: new Headers({ Authorization: `Bearer ${token}` }),
    });

    if (res.status !== 200) {
      throw new Error("Unauthorized");
    }

    return NextResponse.next();
  } catch (err) {
    const page = req.page.name;
    return NextResponse.redirect(`http://192.168.0.17:3000/login?p=${page}`);
  }
}
