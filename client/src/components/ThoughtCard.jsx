import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

// A component to display positive thoughts or affirmations
const ThoughtCard = ({ thought, author, onShare, onSave }) => {
    return (
        <Card className="mb-3 shadow-3 border-round">
            <div className="flex flex-column align-items-center">
                <i className="pi pi-lightbulb text-4xl text-primary mb-3" style={{ color: '#7B66FF' }}></i>
                <p className="text-lg font-medium line-height-3 text-center mb-3">
                    "{thought}"
                </p>
                {author && (
                    <p className="text-500 italic mb-3">
                        - {author}
                    </p>
                )}
                <div className="flex justify-content-between w-full">
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
