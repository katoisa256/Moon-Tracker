import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { TIMEZONE_SUGGESTIONS } from '../data/timezones';
import { TimeZoneCity } from '../types/timezone';
import AlternativeSuggestions from './AlternativeSuggestions';

interface TimeZoneSearchProps {
  onAddLocation: (location: string) => void;
}

const TimeZoneSearch: React.FC<TimeZoneSearchProps> = ({ onAddLocation }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<TimeZoneCity[]>(TIMEZONE_SUGGESTIONS);
  const [alternativeSuggestions, setAlternativeSuggestions] = useState<TimeZoneCity[]>([]);

  useEffect(() => {
    if (search) {
      const searchLower = search.toLowerCase();
      const exactMatches = TIMEZONE_SUGGESTIONS.filter(item =>
        item.city.toLowerCase().includes(searchLower) ||
        item.timezone.toLowerCase().includes(searchLower) ||
        item.country.toLowerCase().includes(searchLower)
      );

      if (exactMatches.length === 0) {
        const firstLetter = searchLower[0];
        const alternatives = TIMEZONE_SUGGESTIONS
          .filter(item => 
            item.city.toLowerCase().startsWith(firstLetter) || 
            item.country.toLowerCase().startsWith(firstLetter)
          )
          .slice(0, 5);
        setAlternativeSuggestions(alternatives);
      } else {
        setAlternativeSuggestions([]);
      }

      setSuggestions(exactMatches);
    } else {
      setSuggestions(TIMEZONE_SUGGESTIONS);
      setAlternativeSuggestions([]);
    }
  }, [search]);

  const handleSelect = (value: string) => {
    onAddLocation(value);
    setSearch('');
    setOpen(false);
  };

  return (
    <div className="flex gap-2 max-w-md mx-auto mb-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            placeholder="Search for a city, country, or timezone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="font-mono"
          />
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>
                <div className="py-6 text-center">
                  <p className="text-sm text-gray-500">No exact matches found.</p>
                  <AlternativeSuggestions
                    suggestions={alternativeSuggestions}
                    onSelect={handleSelect}
                  />
                </div>
              </CommandEmpty>
              <CommandGroup>
                {suggestions.map((item) => (
                  <CommandItem
                    key={`${item.city}-${item.country}`}
                    onSelect={() => handleSelect(item.city)}
                    className="flex justify-between"
                  >
                    <span>{item.city}, {item.country}</span>
                    <span className="text-gray-500 text-sm">
                      {new Date().toLocaleTimeString('en-US', { timeZone: item.timezone, hour12: false })}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button type="submit" variant="outline" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TimeZoneSearch;