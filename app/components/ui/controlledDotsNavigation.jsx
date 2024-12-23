"use client"
import React from 'react';

const ControlledDotsNavigation = ({ currentIndex, totalImages, onDotClick }) => {
    return (
        <div className="flex justify-center space-x-2">
            {Array.from({ length: totalImages }).map((_, index) => (
                <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'} hover:animate-pulse `}
                    onClick={() => onDotClick(index)}
                />
            ))}
        </div>
    );
};

export default ControlledDotsNavigation;