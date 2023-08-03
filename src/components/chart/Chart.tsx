import React from 'react';
import { Line } from 'react-chartjs-2';

interface ChartProps {
  data: {
    status: string;
    data: {
      history: {
        price: string;
        timestamp: number;
      }[];
    };
  };
}

export const options = {
  responsive: true,
  elements: {
    point: {
      radius: 1,
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div>
      {/* @ts-ignore */}
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
