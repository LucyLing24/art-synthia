import React, { useState } from 'react';
import OpenAI  from "openai";
const handleChatGPT = async (prompt,temperature) => {


    const apiKey = localStorage.getItem("api_key");
    const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser:true,
    });

    const response = await openai.chat.completions.create(
        {
            messages: [{role: 'system', content: 'You are a game character design assistant.'}, {
                role: 'user',
                content: prompt
            }],
            temperature: temperature,
            model: "gpt-3.5-turbo-0613"
        }
    );

    return response?.choices?.[0]?.message?.content

};

export default handleChatGPT;

