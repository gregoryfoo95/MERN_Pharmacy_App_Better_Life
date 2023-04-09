import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const medicineNames = [...new Set(data.map(item => item.medicine.name))];
  const locations = [...new Set(data.map(item => item.location.storeName))];
  const getMedicineColor = () => {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 1 + 1)})`

    return color
  };

  const datasets = medicineNames.map(medicineName => {
    const medicineData = data.filter(item => item.medicine.name === medicineName);
    const quantities = medicineData.map(item => item.quantity);
    const backgroundColor = getMedicineColor(); // Helper function to get color based on medicine name
    return {
      label: medicineName,
      data: quantities,
      backgroundColor,
      borderColor: backgroundColor,
      borderWidth: 1,
    };
  });

  const chartData = {
    labels: locations,
    datasets,
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          title: {
            display: true,
            text: 'Quantity'
          },
          ticks: {
            beginAtZero: true
          }
        }
      ],
      xAxes: [
        {
          title: {
            display: true,
            text: 'Location'
          },
        }
      ]
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontSize: 12,
      },
    },
  };

  return (
    <div style={{ height: '800px', width: '800px', padding: '20px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
