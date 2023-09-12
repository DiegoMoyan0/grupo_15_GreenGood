import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Create component
function UserRegionalPurchases() {
  // Define state variables and state-updating functions
  const [chartData, setChartData] = useState([]);
  const [chartCountries, setChartCountries] = useState([]);
  const [chartCountrySum, setChartCountrySum] = useState([]);
  // Define useEffect hook to manipulate data being fetched from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countrySumResponse = await fetch('http://localhost:3001/api/user/country-sum')
        const countrySumData = await countrySumResponse.json();

        if (countrySumData.meta.success) {
          const chartData = Object.keys(countrySumData.countrySum).map(country => ({
            country: country,
            sum: countrySumData.countrySum[country]
          }));
          // Create separate arrays from the fetched data
          const chartCountries = chartData.map(object => object.country)
          const chartCountrySum = chartData.map(object => object.sum)
          //Update state variables values
          setChartData(chartData)
          setChartCountries(chartCountries)
          setChartCountrySum(chartCountrySum)
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
      type: 'bar'
    },
    title: {
      text: 'Compras - Usuarios Suramérica',
      align: 'center'
    },
    xAxis: {
      categories: chartCountries,
      title: {
        text: null
      },
      gridLineWidth: 1,
      lineWidth: 0
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Compras ($ARS)',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      },
      gridLineWidth: 0
    },
    tooltip: {
      valueSuffix: '$'
    },
    plotOptions: {
      bar: {
        borderRadius: '0%',
        dataLabels: {
          enabled: true
        },
        color: '#ACF05F',
        groupPadding: 0.1
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -10,
      y: 40,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true
    },
    credits: {
      enabled: true
    },
    series: [{
      name: 'Año 2023',
      data: chartCountrySum
    }]
  }

  return (
    <div className="container border border-secondary p-0">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={options}
      />
    </div>
  );
}

export default UserRegionalPurchases;
