import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function SalesChart() {
  const options = {
    chart: {
      type: "spline"
    },
    title: {
      text: "My chart"
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6]
      }
    ]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SalesChart;