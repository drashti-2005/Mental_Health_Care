import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

// A component to display positive thoughts or affirmations
const ThoughtCard = ({ thought, author, onShare, onSave }) => {
    return (
        <Card className="mb-3 shadow rounded">
            <div className="flex flex-col items-center">
                <i className="pi pi-lightbulb text-4xl text-primary mb-3" style={{ color: '#7B66FF' }}></i>
                <p className="text-lg font-medium leading-relaxed text-center mb-3">
                    "{thought}"
                </p>
                {author && (
                    <p className="text-gray-500 italic mb-3">
                        - {author}
                    </p>
                )}
                <div className="flex justify-between w-full">
                    <Button 
                        icon="pi pi-share-alt" 
                        label="Share" 
                        className="p-button-outlined p-button-rounded"
                        onClick={onShare}
                    />
                    <Button 
                        icon="pi pi-heart" 
                        label="Save" 
                        className="p-button-outlined p-button-rounded"
                        style={{ color: '#FF5C8D', borderColor: '#FF5C8D' }}
                        onClick={onSave}
                    />
                </div>
            </div>
        </Card>
    );
};

export default ThoughtCard;
