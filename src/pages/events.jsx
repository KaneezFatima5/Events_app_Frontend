// src/pages/Events.jsx - Clean and fast!
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { eventsAPI } from '../api/events';

export default function Events() {
  const [filters, setFilters] = useState({});
  
  const { data: events, isLoading } = useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventsAPI.getEvents(filters)
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Campus Events</h1>
      
      {/* Filter bar */}
      <FilterBar onChange={setFilters} />
      
      {/* Events grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          events?.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
}