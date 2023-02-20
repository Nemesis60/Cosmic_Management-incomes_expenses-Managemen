import { NextResponse } from "next/server";
import { decode } from "jsonwebtoken";

export function middleware (req) {
    const token = localStorage.getItem('accessToken')


    if (req.nextUrl.pathname.includes('/dashboard')) {
        
        return NextResponse.redirect(new URL('/', req.url))
        
    }

    return NextResponse.next();
}