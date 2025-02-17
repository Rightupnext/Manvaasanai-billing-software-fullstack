import React from "react";
import ReactApexChart from "react-apexcharts";

function Chart({ paymentHistory }) {
  let paymentDates = paymentHistory.map((record) => 
    new Date(record.datePaid).toLocaleDateString()
  );

  let paymentReceived = paymentHistory.map((record) => 
    Math.round(record.amountPaid * 10) / 10 // Ensures one decimal place rounding
  );

  const series = [
    {
      name: "Payment Received",
      data: paymentReceived,
    },
  ];

  const options = {
    chart: {
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: paymentDates, // Properly mapped dates for X-axis
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
        width: "90%",
        margin: "10px auto",
        padding: "10px",
      }}
    >
      <br />
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </div>
  );
}

export default Chart;
