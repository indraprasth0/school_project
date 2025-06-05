import { NextRequest, NextResponse } from "next/server";

export function cors(req: NextRequest, res: NextResponse) {
    res.headers.set("Access-Control-Allow-Origin", "*"); // सर्व डोमेनना परवानगी
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
}
