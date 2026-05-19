import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL ?? '';

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        const events = await res.json();

        // group by month for the last 7 months
        const now = new Date();
        const months = [];
        const counts = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          months.push(d.toLocaleString(undefined, { month: 'short' }));
          counts.push(0);
        }

        events.forEach((ev) => {
          const ts = new Date(ev.timestamp);
          const idx = months.findIndex((m, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - (6 - i), 1);
            return d.getFullYear() === ts.getFullYear() && d.getMonth() === ts.getMonth();
          });
          if (idx >= 0) counts[idx]++;
        });

        setLabels(months);
        setValues(counts);
      } catch (e) {
        // fallback to empty
        setLabels([]);
        setValues([]);
      }
    }
    load();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Events',
        data: values,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Events Over Time' },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;