import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  try {
    const { Authentication: token = "" } = req.cookies;

    const res = await fetch(`${process.env.API_URL}/auth/checkheader`, {
      headers: new Headers({ Authorization: `Bearer ${token}` }),
    });

    const response = await fetch(`${process.env.API_URL}/stores/is-open`, {
      headers: new Headers({ Authorization: `Bearer ${token}` }),
    });

    const { isOpen } = await response.json();

    if (!isOpen) {
      return NextResponse.redirect(`${process.env.URL}/`);
    }

    if (res.status !== 200) {
      throw new Error("Unauthorized");
    }

    return NextResponse.next();
  } catch (err) {
    if (err === "schedule") {
      return NextResponse.redirect(`${process.env.URL}/`);
    }
    const page = req.page.name;
    return NextResponse.redirect(`${process.env.URL}/login?p=${page}`);
  }
}
