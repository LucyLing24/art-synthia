import React, { useState } from 'react';
import {Configuration, OpenAIApi} from "openai";

const handleDALLE2 = async (prompt) => {

    const configuration = new Configuration({
        apiKey: localStorage.getItem("api_key"),
    });
    const openai = new OpenAIApi(configuration)

    const res = await openai.createImage({
        prompt: prompt,
        n: 5,
        size: "500x500",
    });

    return res;
};

export default handleDALLE2;

