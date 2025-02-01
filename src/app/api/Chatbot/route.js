import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'https://api.groq.com/openai/v1/chat/completions'; // Replace with the correct Llama API URL
const API_KEY = process.env.CHATBOT_API_KEY;

const upload = multer({ dest: 'uploads/' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    return new Promise((resolve, reject) => {
        upload.single('file')(req, {}, async (err) => {
            if (err) {
                return resolve(NextResponse.json({ error: 'File upload error' }, { status: 500 }));
            }

            try {
                const formData = await req.formData();
                let message = formData.get('message');
                const file = formData.get('file');

                if (file) {
                    const fileBuffer = await file.arrayBuffer();
                    const fileContent = Buffer.from(fileBuffer).toString('utf8');
                    const jsonData = JSON.parse(fileContent);

                    const { distance_value, distance_unit, weight_value, weight_unit, transport_method, carbon_kg } = jsonData.data.attributes;
                    message = `Based on the provided data: Distance - ${distance_value} ${distance_unit}, Weight - ${weight_value} ${weight_unit}, Transport Method - ${transport_method}, Carbon Emissions - ${carbon_kg} kg. Please provide personalized suggestions to reduce carbon emissions.`;
                }

                if (!message) {
                    return resolve(NextResponse.json({ error: 'Message or file is required' }, { status: 400 }));
                }

                const response = await axios.post(API_URL, {
                    model: "llama-3.3-70b-versatile",
                    messages: [{ role: "user", content: message }]
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    }
                });

                const botMessage = response.data.choices[0].message.content;
                resolve(NextResponse.json({ reply: botMessage }));
            } catch (error) {
                console.error('Chatbot API Error:', error.response?.data || error.message);
                resolve(NextResponse.json({ error: 'Failed to connect to chatbot API' }, { status: 500 }));
            }
        });
    });
}