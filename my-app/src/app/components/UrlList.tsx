"use client";

import { Box, Typography, Paper } from "@mui/material";

interface Url {
    original: string;
    short: string;
    expiry: string;
}

export default function UrlList({ urls }: { urls: Url[] }) {
    return (
        <Box mt={4}>
            {urls.map((url, idx) => (
                <Paper key={idx} sx={{ p: 2, mb: 2 }}>
                    <a href={url.original}><Typography><b>Original Url:</b> {url.original}</Typography></a>
                    <a href={url.short}><Typography className="hover:underline"><b>Shortened Url:</b> {url.short}</Typography></a>
                    <Typography><b>Expires:</b> {url.expiry}</Typography>
                </Paper>
            ))}
        </Box>
    );
}
