import { useState, useEffect } from 'react';
import TimeZoneSearch from '../components/TimeZoneSearch';
import TimeZoneCard from '../components/TimeZoneCard';
import { TIMEZONE_SUGGESTIONS } from '../data/timezones';

interface Location {
  name: string;
  timeZone: string;
}

const Index = () => {
  const [locations, setLocations] = useState<Location[]>([
    { name: 'New York', timeZone: 'America/New_York' },
    { name: 'London', timeZone: 'Europe/London' },
    { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
    { name: 'New Zealand', timeZone: 'Pacific/Auckland' }
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddLocation = (location: string) => {
    const cityData = TIMEZONE_SUGGESTIONS.find(item => item.city === location);
    if (cityData) {
      setLocations([...locations, { 
        name: location, 
        timeZone: cityData.timezone 
      }]);
    }
  };

  const handleDeleteLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newLocations = [...locations];
      [newLocations[index - 1], newLocations[index]] = [newLocations[index], newLocations[index - 1]];
      setLocations(newLocations);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < locations.length - 1) {
      const newLocations = [...locations];
      [newLocations[index], newLocations[index + 1]] = [newLocations[index + 1], newLocations[index]];
      setLocations(newLocations);
    }
  };

  return (
    <div className="min-h-screen p-8 pt-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-medium text-center mb-1">WORLD TIME WINDOWS</h1>
        <p className="text-sm text-gray-600 text-center mb-8">made by <a href="https://kato-isa-omoding.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">@katoisa256</a></p>
        
        <TimeZoneSearch onAddLocation={handleAddLocation} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <TimeZoneCard
              key={`${location.name}-${index}`}
              location={location.name}
              timeZone={location.timeZone}
              currentTime={currentTime}
              onDelete={() => handleDeleteLocation(index)}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
              isFirst={index === 0}
              isLast={index === locations.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;