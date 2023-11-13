import React, { useState } from 'react';
import OpenAI  from "openai";

const handleDALLE2 = async (prompt) => {

    const apiKey = localStorage.getItem("api_key");
    const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser:true,
    });

    const res = await openai.images.generate({
        prompt: prompt,
        n: 5,
        size: "512x512",
    });

    return res?.data;
};

export default handleDALLE2;

