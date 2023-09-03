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
  
  // Set up chart options
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Total de ventas por Mes',
    },
    colors: ['#220B52', '#220B58', '#220B22', '#220B72'],
    xAxis: {
      categories: chartMonths
    },
    yAxis: {
      title: {
        text: '$ ARS',
      },
    },
    series: [
      {
        name: 'Sales Amounts',
        data: chartTotals,
      },
    ],
  };

  return (
    <div className="container border border-secondary p-0">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default SalesChart;


