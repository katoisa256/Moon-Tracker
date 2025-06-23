import React, { useEffect, useState, useCallback } from 'react';
import { Cloud, Sun, Moon } from 'lucide-react';
import { isNightTime, getSkyGradient, getSunMoonPosition } from '../utils/timeUtils';

interface SkyBackgroundProps {
  timeString: string;
}

interface CloudPosition {
  left: number;  // Changed from string to number for easier calculations
  top: number;   // Changed from string to number
  speed: number;
  direction: number; // 1 for right, -1 for left
}

const SkyBackground: React.FC<SkyBackgroundProps> = ({ timeString }) => {
  const [cloudPositions, setCloudPositions] = useState<CloudPosition[]>(() => {
    const numClouds = Math.floor(Math.random() * 3) + 2; // 2-4 clouds
    return Array(numClouds).fill(null).map(() => ({
      left: Math.random() * 100,  // Position as number
      top: Math.random() * 40 + 20, // Position as number
      speed: (Math.random() * 0.05) + 0.02,
      direction: -1 // Start moving left
    }));
  });

  const updateCloudPositions = useCallback(() => {
    setCloudPositions(prevPositions => 
      prevPositions.map(cloud => {
        let newLeft = cloud.left + (cloud.speed * cloud.direction);
        let newDirection = cloud.direction;

        // Bounce at edges
        if (newLeft <= -20) {
          newLeft = -20;
          newDirection = 1;  // Change direction to right
        } else if (newLeft >= 120) {
          newLeft = 120;
          newDirection = -1; // Change direction to left
        }

        return {
          ...cloud,
          left: newLeft,
          direction: newDirection
        };
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCloudPositions, 16); // 60fps for smooth animation
    return () => clearInterval(interval);
  }, [updateCloudPositions]);

  return (
    <div className={`relative w-full aspect-square ${getSkyGradient(timeString)} overflow-hidden`}>
      {cloudPositions.map((cloud, i) => (
        <div
          key={i}
          className="absolute transition-all duration-[3000ms] ease-linear opacity-50"
          style={{
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
          }}
        >
          <Cloud className="w-16 h-16 text-white fill-white" />
        </div>
      ))}
      <div 
        className="absolute transform -translate-x-1/2"
        style={{
          left: '50%',
          top: getSunMoonPosition(timeString),
        }}
      >
        {isNightTime(timeString) ? (
          <Moon className="w-12 h-12 text-white fill-white" />
        ) : (
          <Sun className="w-12 h-12 text-yellow-300 fill-yellow-300" />
        )}
      </div>
    </div>
  );
};

export default SkyBackground;