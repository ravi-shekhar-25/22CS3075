"use client";

import { useEffect, useState } from "react";

export default function StatsPage({ params }: { params: { shortcode: string } }) {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/stats/${params.shortcode}`)
            .then((res) => res.json())
            .then(setStats);
    }, [params.shortcode]);

    if (!stats) return <p>Loading stats...</p>;

    return (
        <main>
            <h1>Stats for {stats.short}</h1>
            <p><b>Original URL:</b> {stats.original}</p>
            <p><b>Created:</b> {stats.createdAt}</p>
            <p><b>Expires:</b> {stats.expiry}</p>
            <p><b>Total Clicks:</b> {stats.totalClicks}</p>

            <h2>Click Details</h2>
            <ul>
                {stats.clicks.map((c: any, idx: number) => (
                    <li key={idx}>
                        {c.timestamp} — from <i>{c.source}</i>
                    </li>
                ))}
            </ul>
        </main>
    );
}
