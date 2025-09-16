import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';

// A component to display inspirational mental health quotes
const QuoteDisplay = () => {
    const [quote, setQuote] = useState({
        text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
        author: "Noam Shpancer"
    });
    
    // Predefined list of mental health quotes
    const quotes = [
        {
            text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
            author: "Noam Shpancer"
        },
        {
            text: "You don't have to control your thoughts. You just have to stop letting them control you.",
            author: "Dan Millman"
        },
        {
            text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
            author: "Unknown"
        },
        {
            text: "Recovery is not one and done. It is a lifelong journey that takes place one day, one step at a time.",
            author: "Unknown"
        },
        {
            text: "Self-care is how you take your power back.",
            author: "Lalah Delia"
        }
    ];
    
    // Function to get a random quote
    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    };
    
    // Change quote every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setQuote(getRandomQuote());
        }, 30000);
        
        return () => clearInterval(interval);
    }, []);
    
    return (
        <Card className="shadow-3 border-round mb-4" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            <div className="flex flex-column align-items-center p-3">
                <i className="pi pi-quote-right text-4xl mb-3" style={{ color: '#7B66FF' }}></i>
                <p className="text-xl font-italic line-height-3 text-center mb-3" style={{ color: '#333' }}>
                    {quote.text}
                </p>
                <p className="text-600">
                    — {quote.author}
                </p>
            </div>
        </Card>
    );
};

export default QuoteDisplay;
