"use client";

import {useState} from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import Stats from "@/app/components/Stats";

interface Shortened {
    original: string;
    short: string;
    expiry: string;
}

export default function Home() {
    const [urls, setUrls] = useState<Shortened[]>([]);

    const handleShorten = async (inputs: any[]) => {
        try {
            const res = await fetch("/api/shorturls", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            setUrls(data);
        } catch (err) {
            console.error("Shorten failed", err);
        }
    };


    return (
        <div className="p-10">
            <main>
                <h1 className="pb-6">URL Shortener</h1>
                <UrlForm onShorten={handleShorten} />
                <UrlList urls={urls} />
                {urls.map((url) => (
                    <div key={url.short}>
                        <p>{url.original} → {url.short}</p>
                        <Stats shortcode={url.short} />
                    </div>
                ))}
            </main>
        </div>
    );
}

