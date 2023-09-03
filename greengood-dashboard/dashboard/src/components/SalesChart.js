import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


function SalesChart() {

  const [chartData, setChartData] = useState([]);
  const [chartMonths, setChartMonths] = useState([]);
  const [chartTotals, setChartTotals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await fetch('http://localhost:3001/api/product/stats/sales-amounts-per-month')
        const salesAmountData = await salesResponse.json();

        if (salesAmountData.meta.success) {
          const chartData = salesAmountData.salesAmountsPerMonth.map(item => {
            return (
              ({
                month: item.month,
                total: item.count
              })
            );
          });
          // To order by increasing month
          console.log(chartData); 
          chartData.reverse();
          // Create separate arrays from the fetched data
          const chartMonths = chartData.map(object => object.month);
          const chartTotals = chartData.map(object => object.total);

          setChartData(chartData)
          setChartMonths(chartMonths)
          setChartTotals(chartTotals)
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const roundedTotals = chartTotals.map((value) => Math.round(value));
  const formattedTotals = roundedTotals.map((value) => `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);
  
  // Set up chart options
  const options = {
    chart: {
      type: 'column',
      color: 'white',
      backgroundColor: '#10142f' ,
      borderColor: 'grey',     
      borderWidth: 1,
      borderRadius: '10px',
      plotShadow: '0px 0px 20px grey',          
    },
    title: {
      text: 'Total de ventas por Mes',
      style: {
        color: '#FFFFFF',
        fontSize: '30px',
        marginBottom: "30px"
      },
    },
    xAxis: {
      categories: chartMonths,
      labels: {
        style: {
          color: '#FFFFFF', // Cambia el color de las etiquetas del eje x a blanco
        },
      },
    },
    yAxis: {
      title: {
        text: '$ ARS',
        style: {
          color: '#FFFFFF', // Cambia el color del título del eje y a blanco
        },
      },
      labels: {
        style: {
          color: '#FFFFFF', // Cambia el color de las etiquetas del eje y a blanco
        },
      },
    },
    plotOptions: {
      column: {
        borderColor: '#240d54',
        borderWidth: 2,
        colorByPoint: true,
        dataLabels: {
          enabled: true, 
          color: '#FFFFFF', // Color de las etiquetas de datos
          formatter: function () {
            // Utiliza el valor formateado en las etiquetas de datos
            return formattedTotals[this.point.index];
          }
        },
      },
    },
    colorAxis: {
      min: 0,
      max: Math.max(...roundedTotals),
      minColor: '#00FF00',
      maxColor: '#FF0000',
      stops: [
        [0, '#FFFFFF'], 
        [0.5, '#671fdc'], 
        [1, '#240d54']
      ],
      labels: {
        style: {
          color: '#FFFFFF',
        },
      },
    },
    series: [
      {
        name: 'Sales Amounts',
        data: roundedTotals,
      },
    ],
  };

  return (
    <div>  
      <div style={{boxShadow: "0 0 10px #651fd8", height: "fit-content", borderRadius: "10px", marginTop: '50px'}}>
        <HighchartsReact highcharts={Highcharts} options={options}/>
      </div>
    </div>
  );
}

export default SalesChart;


