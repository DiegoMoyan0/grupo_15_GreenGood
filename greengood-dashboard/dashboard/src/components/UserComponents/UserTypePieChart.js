import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function UserTypePieChart() {

  
  const [UserTypeData, setChartData] = useState([])

  useEffect(() => {



    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/type-count')
        const data = await response.json();
        
        if (data.meta.success) {
         // const totalCount = data.total_users;
          const UserTypeData = Object.entries(data.counts).map(([type, count]) => ({
            name: type,
            y: count,
          }));
          setChartData(UserTypeData);
        }

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };




    console.log(UserTypeData)

    fetchData();
  }, []);

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



    colors: ['#240D54', '#132E0D'],
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
