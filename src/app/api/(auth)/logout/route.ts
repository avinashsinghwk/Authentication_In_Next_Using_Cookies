import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const response = NextResponse.json({
        success: true
    }, {status: 200})
    response.cookies.delete('nextAuthCookie')
    return response;
}