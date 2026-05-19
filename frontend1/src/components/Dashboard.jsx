import React, { useEffect, useState } from 'react';
import Card from './Card';
import Chart from './Chart';
import RecentEvents from './RecentEvents';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalNodes: 0,
    activeNodes: 0,
    inactiveNodes: 0,
    latestPolicyVersion: 'none',
  });
  const API_BASE = import.meta.env.VITE_API_URL ?? '';

  useEffect(() => {
    async function loadSummary() {
      try {
        const [nodesRes, policyRes] = await Promise.all([
          fetch(`${API_BASE}/api/nodes`),
          fetch(`${API_BASE}/api/policies`),
        ]);

        const nodes = await nodesRes.json();
        let latestPolicyVersion = 'none';

        if (policyRes.ok) {
          const policyData = await policyRes.json();
          if (policyData?.version) {
            latestPolicyVersion = policyData.version;
          }
        }

        const totalNodes = Array.isArray(nodes) ? nodes.length : 0;
        const activeNodes = Array.isArray(nodes)
          ? nodes.filter((node) => node.status === 'healthy' || node.status === 'active').length
          : 0;

        setSummary({
          totalNodes,
          activeNodes,
          inactiveNodes: Math.max(totalNodes - activeNodes, 0),
          latestPolicyVersion,
        });
      } catch (error) {
        setSummary({
          totalNodes: 0,
          activeNodes: 0,
          inactiveNodes: 0,
          latestPolicyVersion: 'none',
        });
      }
    }

    loadSummary();
  }, []);

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card
          title={
            <span>
              Total Nodes <br />
              <Link to="/nodes" className="text-xs text-blue-600">manage</Link>
            </span>
          }
          value={summary.totalNodes}
        />
        <Card title="Active Nodes" value={summary.activeNodes} />
        <Card title="Inactive Nodes" value={summary.inactiveNodes} />
        <Card title="Latest Policy" value={summary.latestPolicyVersion} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Chart />
        </div>
        <div>
          <RecentEvents />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;