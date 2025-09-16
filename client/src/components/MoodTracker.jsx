import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';

// A component for users to track their daily mood
const MoodTracker = ({ onMoodSelect }) => {
    const [selectedMood, setSelectedMood] = useState(null);
    
    const moods = [
        { name: 'Very Happy', value: 5, icon: '😁' },
        { name: 'Happy', value: 4, icon: '🙂' },
        { name: 'Neutral', value: 3, icon: '😐' },
        { name: 'Sad', value: 2, icon: '🙁' },
        { name: 'Very Sad', value: 1, icon: '😢' }
    ];
    
    const handleMoodChange = (mood) => {
        setSelectedMood(mood);
        if (onMoodSelect) {
            onMoodSelect(mood);
        }
    };
    
    return (
        <Card title="How are you feeling today?" className="mb-4 shadow-3 border-round">
            <div className="flex flex-column">
                <div className="flex justify-content-between mb-4">
                    {moods.map((mood) => (
                        <div key={mood.value} className="flex flex-column align-items-center">
                            <span className="text-3xl mb-2">{mood.icon}</span>
                            <RadioButton 
                                inputId={`mood-${mood.value}`}
                                name="mood" 
                                value={mood} 
                                onChange={() => handleMoodChange(mood)} 
                                checked={selectedMood?.value === mood.value} 
                            />
                            <label htmlFor={`mood-${mood.value}`} className="text-sm mt-1">
                                {mood.name}
                            </label>
                        </div>
                    ))}
                </div>
                
                <Button 
                    label="Save Mood" 
                    className="align-self-center"
                    disabled={!selectedMood}
                    style={{ background: selectedMood ? '#7B66FF' : undefined }}
                />
                
                <p className="text-center text-600 mt-3">
                    Tracking your mood helps you understand your emotional patterns.
                </p>
            </div>
        </Card>
    );
};

export default MoodTracker;
