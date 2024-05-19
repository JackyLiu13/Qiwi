import React from 'react';

interface ProgressBarProps {
    progress: number;
    goal: string;
    goalNum: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, goal, goalNum }) => {
    const percentage = progress > goalNum ? 100 : progress / goalNum * 100;

    return (
        <div>
            <div className="font-bold mb-2">{goal}</div>
            <div className="w-full bg-gray-300 rounded-full h-4 mb-4 relative">
                <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center font-bold">
                    {progress}/{goalNum}
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;