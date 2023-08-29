import React, { useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function UserHighChart() {
  const options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Usuarios',
    },
    xAxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    },
    yAxis: {
      title: {
        text: 'Número de registrados'
      },
    },
    series: [
      {
        name: 'Usarios',
        data: [],
      },
    ],
  };

  return (
    <div className="container">
      <h5>GUser Chart</h5>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default UserHighChart;
