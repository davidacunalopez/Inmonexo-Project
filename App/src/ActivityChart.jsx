import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ActivityChart = () => {
  const data = {
    labels: ['Noviembre 2023', 'Diciembre 2023', 'Enero 2024', 'Febrero 2024', 'Marzo 2024', 'Abril 2024'],
    datasets: [
      {
        label: 'Propiedades en Venta',
        data: [10, 12, 8, 15, 10, 13], 
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1
      },
      {
        label: 'Propiedades en Alquiler',
        data: [5, 7, 6, 9, 5, 8], 
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h2>Actividad reciente</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ActivityChart;
