import { NextResponse } from "next/server";
import { getUrls } from "../api/shorturls/route";

export async function GET(req: Request, { params }: { params: { shortcode: string } }) {
    const urls = getUrls();
    const found = urls.find((u) => u.shortcode === params.shortcode);

    if (!found) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    found.clicks.push({
        timestamp: new Date().toISOString(),
        source: req.headers.get("referer") || "direct",
    });

    return NextResponse.redirect(found.original);
}
