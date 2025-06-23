export const getTimeInZone = (currentTime: Date, timeZone: string) => {
  return currentTime.toLocaleTimeString('en-US', { 
    timeZone, 
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false 
  });
};

export const getDateInZone = (currentTime: Date, timeZone: string) => {
  return currentTime.toLocaleDateString('en-US', { 
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const getDayProgress = (timeString: string) => {
  const hours = parseInt(timeString.split(':')[0]);
  const minutes = parseInt(timeString.split(':')[1]);
  return ((hours * 60 + minutes) / (24 * 60)) * 100;
};

export const isNightTime = (timeString: string) => {
  const hours = parseInt(timeString.split(':')[0]);
  return hours < 6 || hours >= 18;
};

export const getSkyGradient = (timeString: string) => {
  const hours = parseInt(timeString.split(':')[0]);
  const minutes = parseInt(timeString.split(':')[1]);
  const time = hours + minutes / 60;

  if (time < 6) return 'bg-gradient-to-r from-[#1a237e] to-[#4a148c]'; // Night
  if (time < 8) return 'bg-gradient-to-r from-[#F97316] to-[#FEF7CD]'; // Sunrise
  if (time < 16) return 'bg-gradient-to-r from-[#4FC3F7] to-[#81C784]'; // Day
  if (time < 18) return 'bg-gradient-to-r from-[#FEF7CD] to-[#F97316]'; // Sunset
  return 'bg-gradient-to-r from-[#1a237e] to-[#4a148c]'; // Night
};

export const getProgressBarColor = (timeString: string) => {
  const hours = parseInt(timeString.split(':')[0]);
  const minutes = parseInt(timeString.split(':')[1]);
  const time = hours + minutes / 60;

  if (time < 6) return 'bg-[#4a148c]';
  if (time < 8) return 'bg-[#F97316]';
  if (time < 16) return 'bg-[#81C784]';
  if (time < 18) return 'bg-[#F97316]';
  return 'bg-[#4a148c]';
};

export const getSunMoonPosition = (timeString: string) => {
  const hours = parseInt(timeString.split(':')[0]);
  const minutes = parseInt(timeString.split(':')[1]);
  const totalMinutes = hours * 60 + minutes;
  const percentage = (totalMinutes / (24 * 60)) * 100;
  return `${Math.min(Math.max(percentage, 10), 90)}%`;
};