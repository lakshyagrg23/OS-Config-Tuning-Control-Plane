import React, { useState } from 'react';

const Nodes = () => {
  const API_BASE = import.meta.env.VITE_API_URL ?? '';
  const [registered, setRegistered] = useState([]);
  const [form, setForm] = useState({ hostname: '', ipAddress: '', agentVersion: '' });
  const [heartbeat, setHeartbeat] = useState({ nodeId: '', status: 'healthy' });

  function registerNode(e) {
    e.preventDefault();
    fetch(`${API_BASE}/api/nodes/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((res) => {
        setRegistered((s) => [...s, { ...form, id: res.nodeId }]);
        setForm({ hostname: '', ipAddress: '', agentVersion: '' });
      })
      .catch(() => {});
  }

  function sendHeartbeat(e) {
    e.preventDefault();
    fetch(`${API_BASE}/api/nodes/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(heartbeat),
    })
      .then((r) => r.json())
      .then(() => {
        setHeartbeat({ nodeId: '', status: 'healthy' });
      })
      .catch(() => {});
  }

  return (
    <main className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Nodes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium mb-2">Register Node</h3>
          <form onSubmit={registerNode} className="space-y-2">
            <input className="w-full p-2 border rounded" placeholder="hostname" value={form.hostname} onChange={(e) => setForm({ ...form, hostname: e.target.value })} />
            <input className="w-full p-2 border rounded" placeholder="ipAddress" value={form.ipAddress} onChange={(e) => setForm({ ...form, ipAddress: e.target.value })} />
            <input className="w-full p-2 border rounded" placeholder="agentVersion" value={form.agentVersion} onChange={(e) => setForm({ ...form, agentVersion: e.target.value })} />
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Register</button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium mb-2">Send Heartbeat</h3>
          <form onSubmit={sendHeartbeat} className="space-y-2">
            <input className="w-full p-2 border rounded" placeholder="nodeId" value={heartbeat.nodeId} onChange={(e) => setHeartbeat({ ...heartbeat, nodeId: e.target.value })} />
            <select className="w-full p-2 border rounded" value={heartbeat.status} onChange={(e) => setHeartbeat({ ...heartbeat, status: e.target.value })}>
              <option value="healthy">healthy</option>
              <option value="unhealthy">unhealthy</option>
            </select>
            <button className="px-4 py-2 bg-green-600 text-white rounded">Send</button>
          </form>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-2">Recently Registered (session)</h3>
        <ul>
          {registered.map((n) => (
            <li key={n.id} className="py-1 border-b">
              {n.hostname} — {n.ipAddress} — {n.agentVersion}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Nodes;
