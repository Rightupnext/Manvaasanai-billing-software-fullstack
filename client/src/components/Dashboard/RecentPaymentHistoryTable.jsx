import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useDispatch } from "react-redux";
ModuleRegistry.registerModules([AllCommunityModule]);

function RecentPaymentHistoryTable({ paymentHistory }) {
  const dispatch = useDispatch();
  const [columnDefs, setColumnDefs] = useState([]);
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    // Get ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (num) => {
      if (num > 3 && num < 21) return "th"; // 11th, 12th, 13th
      switch (num % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
  };
  useEffect(() => {
    if (paymentHistory.length > 0) {
      const columnMappings = {
        paidBy: "Paid By",
        datePaid: "Date of Paided",
        amountPaid: "Amount Paided",
        paymentMethod: "Payment Method",
        note: "Note",
      };

      const dynamicColumns = Object.keys(paymentHistory[0] || {}).map(
        (key) => ({
          headerName: columnMappings[key] || key, // Use formatted header names
          field: key,
          sortable: true,
          filter: true,
          floatingFilter: true,
          flex: key === "note" ? 2 : 1,
          editable: true,
          valueFormatter: (params) => {
            if (key === "datePaid" && params.value) {
              return new Date(params.value).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }); // Format as "February 5, 2025"
            }
            

            return params.value ? String(params.value) : "";
          },
          cellRenderer:
            key === "paidBy"
              ? PaidByRenderer
              : key === "amountPaid"
              ? AmountPaidRenderer
              : key === "note"
              ? NoteRenderer
              : undefined,
          hide: key === "_id" || key === "__v",
        })
      );

      setColumnDefs(dynamicColumns);
    }
  }, [paymentHistory]);

  // Custom renderer for "Paid By" column
  const PaidByRenderer = (params) => {
    return (
      <div className="flex items-center space-x-[22px] ">
        <p>{params.value}</p>
        <div className="w-10 h-10 text-xl text-white bg-blue-600 flex items-center justify-center cursor-pointer rounded-full font-[sans-serif]">
          {params.value ? params.value.charAt(0).toUpperCase() : "?"}
        </div>
      </div>
    );
  };
  const NoteRenderer = (params) => {
    return (
      <p>
        {params.value ? (
          params.value
        ) : (
          <stron className=" text-2xl font-bold text-center text-red-500">
            -
          </stron>
        )}
      </p> // Correct JSX return
    );
  };

  // Custom renderer for "Amount Paid" column
  const AmountPaidRenderer = (params) => {
    return (
      <div className="flex items-center space-x-2 text-green-500">
       <p>{(Math.round(parseFloat(params.value) * 10) / 10).toLocaleString()}</p>

        <svg
          className="h-6 w-6 text-green-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="18" y1="11" x2="12" y2="5" />
          <line x1="6" y1="11" x2="12" y2="5" />
        </svg>
      </div>
    );
  };

  const defaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",

      floatingFilter: true,
      resizable: true,
      width: 256,
      cellStyle: { textAlign: "center" }, 
    }),
    []
  );
  return (
    <div className="h-[500px] w-full px-[83px]">
      <AgGridReact
        rowData={paymentHistory}
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
  );
}

export default RecentPaymentHistoryTable;
