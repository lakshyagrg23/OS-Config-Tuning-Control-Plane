import React, { useEffect, useState } from 'react';

const Policies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_URL ?? '';
    fetch(`${API_BASE}/api/policies`)
      .then((r) => r.json())
      .then((res) => {
        if (res && res.version) setPolicies([res]);
        else setPolicies([]);
      })
      .catch(() => setPolicies([]));
  }, []);

  return (
    <main className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Policies</h2>
      <div className="bg-white rounded-lg shadow p-4">
        <ul>
          {policies.map((p, idx) => (
            <li key={idx} className="border-b py-2">
              <div className="text-sm font-medium">Version: {p.version}</div>
              <pre className="text-xs mt-2 max-h-40 overflow-auto bg-gray-50 p-2 rounded">{JSON.stringify(p.policy, null, 2)}</pre>
            </li>
          ))}
          {policies.length === 0 && <li className="text-sm text-gray-500">No policy available</li>}
        </ul>
      </div>
    </main>
  );
};

export default Policies;
