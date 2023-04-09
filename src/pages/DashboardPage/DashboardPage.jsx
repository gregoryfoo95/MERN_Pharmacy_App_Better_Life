import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BarChart from '../../components/BarChart';

function OrderDetails({ order }) {
  if (!order) {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order.id}</p>
      <p>Order Total: ${order.total}</p>
      <p>Items:</p>
      {order.items.map((item, idx) => (
        <CartProduct key={idx} id={item.id} quantity={item.quantity} />
      ))}
    </div>
  );
}

function DashboardPage() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = localStorage.getItem('order');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
      localStorage.removeItem('order');
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  const dummyData = [
    { itemName: "Panadol", sales: 12, price: 11 },
    { itemName: "Vicks", sales: 19, price: 7 },
    { itemName: "Tiger Balm", sales: 3, price: 9 },
  ];

  const salesChartData = {
    labels: dummyData.map((item) => item.itemName),
    datasets: [
      {
        label: "Sales",
        data: dummyData.map((item) => item.sales),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const salesChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const priceChartData = {
    labels: dummyData.map((item) => item.itemName),
    datasets: [
      {
        label: "Price",
        data: dummyData.map((item) => item.price * item.sales),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const priceChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ display: 'flex' }}>
    <div style={{ display: 'inline-block', width: '50%', height: '400px' }}>
        <h2>Sales</h2>
        <BarChart data={salesChartData} options={salesChartOptions} />
    </div>
    <div style={{ display: 'inline-block', width: '50%', height: '400px' }}>
        <h2>Revenue</h2>
        <BarChart data={priceChartData} options={priceChartOptions} />
    </div>
    </div>
  );
}

export default DashboardPage;




