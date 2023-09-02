import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function ProductPieChart({props}) {

  const [ProductsStatsData, setChartData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/product/stats`);
        const data = await response.json();

        let ProductsStatsData = {};
        
        if (data.meta.success) {
          ProductsStatsData["type"] = Object.entries(data.typeCounts).map(([type, count]) => ({
            name: type,
            y: count,
          }));
          ProductsStatsData["category"] = Object.entries(data.categoryCounts).map(([category, count]) => ({
            name: category,
            y: count,
          }));
          ProductsStatsData["subcategory"] = Object.entries(data.subcategoryCounts).map(([subcategory, count]) => ({
            name: subcategory,
            y: count,
          }));
          ProductsStatsData["manufacturer"] = Object.entries(data.manufacturerCounts).map(([manufacturer, count]) => ({
            name: manufacturer,
            y: count,
          }));

          //Update state variable value
          setChartData(ProductsStatsData);
        }

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };

    fetchData();
  }, []);


  // Set up chart options
  const typeOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Tipos ',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
      },
    },
    colors: ['#93D746', '#FF5733', '#339CFF', '#FFC733 ', '#33FF7D ', '#FF33B0 ', '#8A33FF ', '#FFA333', '#33FFB6 ' ],
    series: [
      {
        name: 'Cantidad',
        data: ProductsStatsData["type"],
      },
    ],
  };

  const categoryOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Categorías ',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
      },
    },
    colors: ['#93D746', '#FF5733' ],
    series: [
      {
        name: 'Cantidad',
        data: ProductsStatsData["category"],
      },
    ],
  };

  const subcategoryOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Subcategorías',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
      },
    },
    colors: ['#93D746', '#FF5733', '#339CFF', '#FFC733 ' ],
    series: [
      {
        name: 'Cantidad',
        data: ProductsStatsData["subcategory"],
      },
    ],
  };

  const manufacturerOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Manufacturers',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
      },
    },
    colors: ['#93D746', '#FF5733', '#339CFF', '#FFC733 ', '#33FF7D ', '#FF33B0 ', '#8A33FF ', '#FFA333', '#33FFB6 ' ],
    series: [
      {
        name: 'Cantidad',
        data: ProductsStatsData["manufacturer"],
      },
    ],
  };

  return (
    <>
        <div className="container d-md-flex ">
            <div className="container col-md-3 w-100 " style={{ minWidth: '400px' }} >
            <HighchartsReact highcharts={Highcharts} options={typeOptions} />
            </div>
            <div className="container col-md-3  " style={{ minWidth: '400px' }}>
            <HighchartsReact highcharts={Highcharts} options={categoryOptions} />
            </div>
            <div className="container col-md-3" style={{ minWidth: '400px' }}>
            <HighchartsReact highcharts={Highcharts} options={subcategoryOptions} />
            </div>
            <div className="container col-md-3 " style={{ minWidth: '400px' }}>
            <HighchartsReact highcharts={Highcharts} options={manufacturerOptions} />
            </div>
        </div>
    </>
  );
}

export default ProductPieChart;