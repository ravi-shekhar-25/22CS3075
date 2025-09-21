import { NextResponse } from "next/server";
import { getUrls } from "../../shorturls/route";

export async function GET(req: Request, { params }: { params: { shortcode: string } }) {
    const urls = getUrls();
    const found = urls.find((u) => u.shortcode === params.shortcode);

    if (!found) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const stats = {
        short: found.short,
        original: found.original,
        createdAt: found.createdAt,
        expiry: found.expiry,
        totalClicks: found.clicks.length,
        clicks: found.clicks,
    };

    return NextResponse.json(stats);
}
