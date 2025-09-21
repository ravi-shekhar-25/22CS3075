"use client";
import { useEffect, useState } from "react";

interface StatsProps {
    shortcode: string;
}

export default function Stats({ shortcode }: StatsProps) {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/stats/${shortcode}`)
            .then((res) => res.json())
            .then(setStats);
    }, [shortcode]);

    if (!stats) return <div>Loading...</div>;

    return (
        <div>
            <h2>Stats for {shortcode}</h2>
            <p>Clicks: {stats.clicks}</p>
        </div>
    );
}
