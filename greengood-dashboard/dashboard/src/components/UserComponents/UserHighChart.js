import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function UserHighChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/monthly-registrations')
        const data = await response.json();
        
        if (data.meta.success) {
          const chartData = data.registrationsByMonth.map(item => item.count);
          setChartData(chartData)
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Usuarios GreenGood',
    },
    xAxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    },
    yAxis: {
      title: {
        text: 'Número de registrados',
      },
    },
    series: [
      {
        name: 'Nuevos usuarios',
        data: chartData,
      },
    ],
  };

  return (
    <div className="container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default UserHighChart;
