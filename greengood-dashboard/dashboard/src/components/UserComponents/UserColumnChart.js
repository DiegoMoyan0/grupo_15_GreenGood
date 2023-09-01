import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Create component
function UserColumnChart() {
  // Define state variables and state-updating functions
  const [chartData, setChartData] = useState([]);
  const [chartMonths, setChartMonths] = useState([]);
  const [chartUsers, setChartUsers] = useState([]);
  // Define useEffect hook to manipulate data being fetched from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const registrationResponse = await fetch('http://localhost:3001/api/user/monthly-registrations')
        const registrationData = await registrationResponse.json();

        if (registrationData.meta.success) {
          const chartData = registrationData.registrationsByMonth.map(item => {
            return (
              ({
                month: item.month,
                users: item.count
              })
            )
          })
          // Create separate arrays from the fetched data
          const chartMonths = chartData.map(object => object.month)
          const chartUsers = chartData.map(object => object.users)
          //Update state variables values
          setChartData(chartData)
          setChartMonths(chartMonths)
          setChartUsers(chartUsers)
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  // Set up chart options
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Usuarios GreenGood',
    },
    colors: ['#220B52'],
    xAxis: {
      categories: chartMonths
    },
    yAxis: {
      title: {
        text: 'Número de registrados',
      },
    },
    series: [
      {
        name: 'Nuevos usuarios',
        data: chartUsers,
      },
    ],
  };

  return (
    <div className="container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default UserColumnChart;
