"use client";
import React, { useState } from 'react'
import styles from '@/styles/RightSection.module.css'
import chatgptlogo from '@/assets/chatgptlogo.png'
import chatgptlogo2 from '@/assets/chatgptlogo2.png'
import nouserlogo from '@/assets/nouserlogo.png'
import Image from 'next/image'
import { HashLoader } from 'react-spinners';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API
const BOT_NAME = process.env.NEXT_PUBLIC_BOT_NAME || 'chatbot';
const DEV_NAME = process.env.NEXT_PUBLIC_DEVELOPER || 'PHOENIX';

const RightSection = () => {
    const trainingPrompt = [
        
            {
                "role": "user",
                "parts": [{
                    "text": "Special Dialogue 1 : if any prompt mentions 'Ronen' word : 'Introducing Ronen, the visionary owner of Phoenix and the driving force behind its development. As the main developer of this bot, Ronen's expertise and creativity shine through, shaping it into a powerful tool that delivers exceptional experiences. With a deep passion for technology and a commitment to excellence, Ronen is dedicated to pushing the boundaries of what this bot can achieve.' "
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
            },
            {
                "role": "user",
                "parts": [{
                    "text": "Special Dialogue 2 : if any prompt mentions 'Phoenix' word : 'Phoenix isn't just an organization; it's a dynamic force, driven by Ronen's vision and expertise. With a commitment to innovation and a focus on making a lasting impact, Phoenix is redefining possibilities in the tech world.' "
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
            }
    ];
    const [message, setMessage] = useState('');
    const [isSent, setIsSent] = useState(true);
    const [allMessages, setAllMessages] = useState<any[]>([]);

    const sendMessage = async () => {
        let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=` + API_KEY
        let messagesToSend = [
            ...trainingPrompt,
            ...allMessages,
            {
                "role": "user",
                "parts": [{
                    "text": `you are ${BOT_NAME} act and reply like ${BOT_NAME}: ${message}`  // Prepend the dynamic name to the message
                }]
            }
        ];

        setIsSent(false);
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contents": messagesToSend
            })
        });

        let resjson = await res.json();
        setIsSent(true);

        let responseMessage = resjson.candidates[0].content.parts[0].text;

        let newAllMessages = [
            ...allMessages,
            {
                "role": "user",
                "parts": [{
                    "text": message
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": responseMessage
                }]
            }
        ];

        setAllMessages(newAllMessages);
        setMessage('');
    };

    return (

        <div className={styles.rightSection}>
            {/* <Image src={schoolbg} alt="" className={styles.schoolbg} /> */}
            <div className={styles.rightin}>
                <div className={styles.chatgptversion}>
                    <p className={styles.text1}>{BOT_NAME}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>

                </div>


                {
                    allMessages.length > 0 ?
                        <div className={styles.messages}>
                            {allMessages.map((msg, index) => (
                                <div key={index} className={styles.message}>
                                    <Image src={msg.role === 'user' ? nouserlogo : chatgptlogo2} width={50} height={50} alt="" />
                                    <div className={styles.details}>
                                        <h2>{msg.role === 'user' ? 'You' : `${BOT_NAME}`}</h2>
                                        <p>{msg.parts[0].text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div className={styles.nochat}>
                            <div className={styles.s1}>
                                {/* <Image src={chatgptlogo} alt="chatgpt" height={70} width={70} /> */}
                                <h1>How can I help you {DEV_NAME}?</h1>
                            </div>
                        </div>
                }

                <div className={styles.bottomsection}>
                    <div className={styles.messagebar}>
                        <input type='text' placeholder= 'Message Bot...'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />

                        {
                            isSent ?
                                <svg
                                    onClick={sendMessage}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg>
                                :
                                <HashLoader color="#36d7b7" size={30} />
                        }

                    </div>
                    <p>{BOT_NAME} Deployed by {DEV_NAME} | ©PHOENIX 2024</p>
                </div>
            </div>
        </div>
    )
}

export default RightSection 