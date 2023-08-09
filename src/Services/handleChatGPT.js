import React, { useState } from 'react';
import {Configuration, OpenAIApi} from "openai";
const handleChatGPT = async (prompt,temperature) => {

    const apiKey = localStorage.getItem("api_key");
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion(
        {
            messages: [{role: 'system', content: 'You are a character design assistant.'}, {
                role: 'user',
                content: prompt
            }],
            temperature: temperature,
            model: "gpt-3.5-turbo-0613"
        }
    );

    return response.data.choices[0].message.content;

};

export default handleChatGPT;

