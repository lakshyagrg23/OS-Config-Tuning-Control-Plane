import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecentEvents = () => {
  const [events, setEvents] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL ?? '';

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        const data = await res.json();
        setEvents(Array.isArray(data) ? data.slice(-5).reverse() : []);
      } catch (error) {
        setEvents([]);
      }
    }

    loadEvents();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Events</h3>
      {events.length > 0 ? (
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
              <div className="text-sm font-medium text-gray-800">{event.nodeId}</div>
              <div className="text-sm text-gray-600">
                {event.process || event.param || event.decisionAction || 'Event received'}
              </div>
              <div className="text-xs text-gray-400">
                {event.timestamp ? new Date(event.timestamp).toLocaleString() : 'Unknown time'}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-gray-600">
          No recent events available yet. Create events via the{' '}
          <Link to="/events" className="text-blue-600">
            Events
          </Link>{' '}
          page.
        </div>
      )}
    </div>
  );
};

export default RecentEvents;