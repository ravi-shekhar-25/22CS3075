import { NextResponse } from "next/server";

let urls: any[] = [];

export async function POST(req: Request) {
    const body = await req.json();
    const inputs = Array.isArray(body) ? body : [body];

    const results = inputs.map((i: any) => {
        const validity = i.validity || 30;
        const shortcode = i.shortcode || Math.random().toString(36).substring(2, 8);
        const createdAt = new Date().toISOString();
        const expiry = new Date(Date.now() + validity * 60000).toISOString();

        const entry = {
            original: i.url,
            short: `http://localhost:3000/${shortcode}`,
            shortcode,
            createdAt,
            expiry,
            clicks: [],
        };

        urls.push(entry);
        return entry;
    });

    return NextResponse.json(results);
}

export function getUrls() {
    return urls;
}
