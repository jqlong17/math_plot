import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';
import { FunctionType } from '../types';
import { calculateFunction } from '../utils/mathFunctions';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface FunctionPlotterProps {
  functionType: FunctionType;
  a: number;
  b: number;
}

const FunctionPlotter: React.FC<FunctionPlotterProps> = ({ functionType, a, b }) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<any>(null);
  const [chartOptions, setChartOptions] = useState<any>(null);

  useEffect(() => {
    const xValues = Array.from({ length: 201 }, (_, i) => i / 10 - 10);
    const yValues = xValues.map(x => calculateFunction(functionType, x, a, b));

    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    const absMaxY = Math.max(Math.abs(minY), Math.abs(maxY));
    const yRange = 2 * absMaxY;
    const yAxisMargin = Math.max(yRange * 0.1, 1); // Add 10% margin or at least 1 unit
    const yLimit = Math.max(absMaxY + yAxisMargin, 10);

    const yTickSpacing = calculateTickSpacing(-yLimit, yLimit);

    setChartData({
      labels: xValues,
      datasets: [
        {
          label: t(`functions.${functionType}`),
          data: yValues.map((y, index) => ({ x: xValues[index], y })),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear' as const,
          position: 'center' as const,
          title: {
            display: true,
            text: 'x',
          },
          ticks: {
            stepSize: 1,
          },
          min: -10,
          max: 10,
        },
        y: {
          type: 'linear' as const,
          position: 'center' as const,
          title: {
            display: true,
            text: 'y',
          },
          min: -yLimit,
          max: yLimit,
          ticks: {
            stepSize: yTickSpacing,
          },
        },
      },
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: t('functionEquation', { equation: `y = ${t(`functions.${functionType}`)}` }),
        },
      },
    });
  }, [functionType, a, b, t]);

  return (
    <div className="h-[600px]">
      {chartData && chartOptions && <Line data={chartData} options={chartOptions} />}
    </div>
  );
};

const calculateTickSpacing = (min: number, max: number) => {
  const range = max - min;
  const targetTicks = 10; // Aim for about 10 ticks on the y-axis
  let tickSpacing = Math.pow(10, Math.floor(Math.log10(range / targetTicks)));
  
  if (range / tickSpacing < targetTicks / 2) {
    tickSpacing /= 2;
  } else if (range / tickSpacing > targetTicks) {
    tickSpacing *= 2;
  }
  
  return tickSpacing;
};

export default FunctionPlotter;