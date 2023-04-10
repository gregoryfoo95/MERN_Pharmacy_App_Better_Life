import React, { useRef, useEffect } from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register the required plugins and elements
Chart.register(BarController, BarElement, LinearScale, CategoryScale);

function BarChart({ data, options }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: data,
        options: options,
      });

      return () => {
        // Call the `destroy` method on the chart instance when the component unmounts
        chartInstance.destroy();
      };
    }
  }, [data, options]);

  return <canvas ref={chartRef}></canvas>;
}

export default BarChart;


