"use client";

import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
// import { logEvent } from "./Logger";

interface UrlInput {
    url: string;
    validity?: number;
    shortcode?: string;
}

export default function UrlForm({ onShorten }: { onShorten: (urls: UrlInput[]) => void }) {
    const [inputs, setInputs] = useState<UrlInput[]>([{ url: "" }]);

    const addInput = () => {
        if (inputs.length < 5) {
            setInputs([...inputs, { url: "" }]);
        }
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newInputs = [...inputs];
        (newInputs[index] as any)[field] = value;
        setInputs(newInputs);
    };

    const handleSubmit = () => {
        const payload = inputs.map((input) => ({
            url: input.url,
            validity: input.validity ? Number(input.validity) : 30,
            shortcode: input.shortcode || undefined,
        }));

        onShorten(payload);

    };

    return (
        <Box>
            {inputs.map((input, index) => (
                <Box key={index} display="flex" gap={2} mb={2}>
                    <TextField
                        label="Original URL"
                        fullWidth
                        value={input.url}
                        onChange={(e) => handleChange(index, "url", e.target.value)}
                    />
                    <TextField
                        label="Validity (minutes)"
                        type="number"
                        onChange={(e) => handleChange(index, "validity", e.target.value)}
                    />
                    <TextField
                        label="Custom Shortcode"
                        onChange={(e) => handleChange(index, "shortcode", e.target.value)}
                    />
                </Box>
            ))}
            <Button variant="outlined" onClick={addInput} disabled={inputs.length >= 5}>
                Add URL
            </Button>
            <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>
                Shorten
            </Button>
        </Box>
    );
}
