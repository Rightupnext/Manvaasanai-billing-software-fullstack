import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import ReactApexChart from "react-apexcharts"; // Import the React ApexChart component
import { getProducts, deleteProduct } from "../../actions/productAction"; // Adjust based on your file structure
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);
const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};
function ProductChart() {
  const dispatch = useDispatch();
  const [columnDefs, setColumnDefs] = useState([]);
  const products = useSelector((state) => state.products.products);
  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then(() => {
      dispatch(getProducts());
    });
  };
  useEffect(() => {
    if (products.length > 0) {
      const dynamicColumns = Object.keys(products[0] || {}).map((key) => ({
        headerName: key,
        field: key,
        sortable: true,
        filter: true,
        floatingFilter: true,
        editable: true,
        valueGetter: (params) => String(params.data[key]),
        hide: key === "_id" || key === "__v",
      }));

      // Add Delete column
      dynamicColumns.push({
        headerName: "Actions",
        field: "delete",
        cellRenderer: (params) => (
          <button
            onClick={() => handleDelete(params.data._id)}
            className="text-red-600 hover:text-red-800 text-sm bg-white hover:bg-gray-100 border border-red-400 rounded-lg font-medium px-4 py-1 inline-flex space-x-1 items-center"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
            <span className="hidden md:inline-block">Delete</span>
          </button>
        ),
      });

      setColumnDefs(dynamicColumns);
    }
  }, [products]);
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
        },
      },
      xaxis: {
        type: "category",
        categories: [],
        labels: {
          formatter: function (value) {
            const [productName, weight] = value.split(" - ");
            return `${productName} (${weight})`;
          },
          style: {
            fontFamily: "'Arial', sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#FF5733",
          },
          padding: 10,
          margin: 15,
        },
      },
      legend: {
        position: "right",
        offsetY: 40,
        labels: {
          style: {
            fontFamily: "'Arial', sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#FF5733",
          },
        },
      },
      tooltip: {
        theme: "light",
        style: {
          fontFamily: "'Arial', sans-serif",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#FF5733",
        },
      },
      fill: {
        opacity: 1,
      },
    },
  });

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Extract product names and data (Kilo and grams)
      const productNames = products.map((product) => {
        const kilo = product.Kilo || 0;
        const grams = product.grams || 0;
        const totalKg = kilo + grams / 1000; // Convert grams to kg and add
        const kg = Math.floor(totalKg);
        const gramsValue = Math.round((totalKg - kg) * 1000); // Convert decimal part to grams

        return `${
          product.productName || "Unknown Product"
        } - ${kg} kg ${gramsValue} grams`;
      });

      const kiloData = products.map((product) => product.Kilo || 0);
      const gramsData = products.map((product) => product.grams || 0);

      setState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Kilo",
            data: kiloData,
          },
          {
            name: "Grams",
            data: gramsData,
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: productNames,
          },
        },
      }));
    }
  }, [products]);
  const defaultColDef = useMemo(
      () => ({
        filter: "agTextColumnFilter",
  
        floatingFilter: true,
        resizable: true,
        width: 338,
        cellStyle: { textAlign: "center" }, 
      }),
      []
    );
  return (
    <>
      <div className="h-full">
        <div className="h-[500px] w-full ml-[40px] px-[73px] ">
          <AgGridReact
            rowData={products}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
                 rowSelection="multiple"
            pagination={true}
            paginationPageSize={100}
            paginationPageSizeSelector={[100, 150, 200]}
            enableRangeSelection={true}
            enableClipboard={true}
            suppressClipboardPaste={false}
          />
        </div>
        <div id="productChart"  className="h-[500px] w-full ml-[40px] px-[73px] ">
          <h2>Product Data Chart</h2>
          {state.series.length > 0 ? (
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="bar"
              height={550}
            />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductChart;
