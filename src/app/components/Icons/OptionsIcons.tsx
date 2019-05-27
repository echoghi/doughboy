import React from 'react';

export default function OptionsIcon({ height = 24, width = 24 }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${24} ${24}`}
            fill="#3d575d"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </svg>
    );
}
