import React, { useState } from 'react';
import OpenAI from 'openai';

const handleChatGPTChat = async (prompt,temperature,data) => {

    const apiKey = localStorage.getItem("api_key");
    const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser:true,
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: [{role: 'system', content: `Please reply to me in the tone of this person:${data}, just act like a friend of me`},{role: 'user', content: prompt}],
        model: 'gpt-3.5-turbo',
        temperature:temperature
    });

    return chatCompletion?.choices?.[0]?.message?.content

};

export default handleChatGPTChat;

