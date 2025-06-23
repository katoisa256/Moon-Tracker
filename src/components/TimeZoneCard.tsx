import React from 'react';
import SkyBackground from './SkyBackground';
import TimeDisplay from './TimeDisplay';
import { 
  getTimeInZone, 
  getDateInZone, 
  getDayProgress 
} from '../utils/timeUtils';

interface TimeZoneCardProps {
  location: string;
  timeZone: string;
  currentTime: Date;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const TimeZoneCard: React.FC<TimeZoneCardProps> = ({ 
  location, 
  timeZone,
  currentTime,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}) => {
  const timeString = getTimeInZone(currentTime, timeZone);
  const dateString = getDateInZone(currentTime, timeZone);
  const progress = getDayProgress(timeString);

  return (
    <div className="w-full max-w-xs bg-white">
      <SkyBackground timeString={timeString} />
      <TimeDisplay
        timeString={timeString}
        dateString={dateString}
        location={location}
        dayProgress={progress}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        isFirst={isFirst}
        isLast={isLast}
      />
    </div>
  );
};

export default TimeZoneCard;