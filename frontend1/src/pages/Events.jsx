import React, { useState } from 'react';

const Events = () => {
  const API_BASE = import.meta.env.VITE_API_URL ?? '';
  const [form, setForm] = useState({ nodeId: '', param: '', process: '', decisionAction: '', finalAction: '', timestamp: new Date().toISOString() });
  const [responses, setResponses] = useState([]);

  function submitEvent(e) {
    e.preventDefault();
    fetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((res) => {
        setResponses((s) => [res, ...s]);
        setForm({ nodeId: '', param: '', process: '', decisionAction: '', finalAction: '', timestamp: new Date().toISOString() });
      })
      .catch(() => {});
  }

  return (
    <main className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Events</h2>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="font-medium mb-2">Create Event</h3>
        <form onSubmit={submitEvent} className="space-y-2">
          <input className="w-full p-2 border rounded" placeholder="nodeId" value={form.nodeId} onChange={(e) => setForm({ ...form, nodeId: e.target.value })} />
          <input className="w-full p-2 border rounded" placeholder="param" value={form.param} onChange={(e) => setForm({ ...form, param: e.target.value })} />
          <input className="w-full p-2 border rounded" placeholder="process" value={form.process} onChange={(e) => setForm({ ...form, process: e.target.value })} />
          <div className="grid grid-cols-2 gap-2">
            <input className="p-2 border rounded" placeholder="decisionAction" value={form.decisionAction} onChange={(e) => setForm({ ...form, decisionAction: e.target.value })} />
            <input className="p-2 border rounded" placeholder="finalAction" value={form.finalAction} onChange={(e) => setForm({ ...form, finalAction: e.target.value })} />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Send Event</button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-2">Recent (session)</h3>
        <ul>
          {responses.map((r, idx) => (
            <li key={idx} className="py-2 border-b">
              <div className="text-sm"><strong>{r.nodeId}</strong> — {r.param || r.process}</div>
              <div className="text-xs text-gray-500">{new Date(r.timestamp).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Events;
