import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Create component
function UserTypePieChart() {
  // Define state variables and state-updating functions
  const [UserTypeData, setChartData] = useState([])
  // Define useEffect hook to manipulate data being fetched from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/type-count')
        const data = await response.json();
        
        if (data.meta.success) {
          const UserTypeData = Object.entries(data.counts).map(([type, count]) => ({
            name: type,
            y: count,
          }));

          //Update state variable value
          setChartData(UserTypeData);
        }

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };

    fetchData();
  }, []);


  // Set up chart options
  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Distribución Usuarios GreenGood',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
      },
    },
    colors: ['#93D746', '#220B52'],
    series: [
      {
        name: 'Cantidad',
        data: UserTypeData,
      },
    ],
  };

  return (
    <div className="container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default UserTypePieChart;
