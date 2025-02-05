import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Clients.module.css";
// import moment from 'moment'
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Container from "@material-ui/core/Container";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { Button } from "@material-ui/core";
import { useSnackbar } from "react-simple-snackbar";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { deleteClient } from "../../actions/clientActions";
// import clients from '../../clients.json'
ModuleRegistry.registerModules([AllCommunityModule]);
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },

  tablecell: {
    fontSize: "16px",
  },
}));

const Clients = ({ setOpen, setCurrentId, clients }) => {
  const [columnDefs, setColumnDefs] = useState([]);
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(clients.length);
  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar();

  const dispatch = useDispatch();
  const rows = clients;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (selectedInvoice) => {
    setOpen((prevState) => !prevState);
    setCurrentId(selectedInvoice);
  };

  const tableStyle = {
    width: 160,
    fontSize: 14,
    cursor: "pointer",
    borderBottom: "none",
    padding: "8px",
    textAlign: "center",
  };
  const headerStyle = { borderBottom: "none", textAlign: "center" };
  const UserId = (params) => {
    return <p>{params.node?.rowIndex + 1}</p>; // Use node.rowIndex instead
  };

  useEffect(() => {
    if (clients?.length) {
      const dynamicColumns = Object.keys(clients[0]).map((key) => ({
        headerName: key,
        field: key,
        sortable: true,
        filter: true,
        floatingFilter: true,
        editable: true,
      

        valueGetter: (params) => String(params.data[key]),
        hide:
          key === "_id" ||
          key === "__v" ||
          key === "userId" ||
          key === "createdAt",
      }));

      // Add an auto-incrementing index column
      dynamicColumns.unshift({
        headerName: "Row",
        field: "id",
        cellRenderer: UserId, // Correct usage
        sortable: false,
      });

      // Add Delete column
      dynamicColumns.push({
        headerName: "Edit",
        field: "edit",
        cellRenderer: (params) => (
          <button
            onClick={() => handleEdit(params.data._id)}
            className="text-purple-600 hover:text-purple-800 text-sm bg-white hover:bg-gray-100 border border-purple-400 rounded-lg font-medium px-4 py-1 inline-flex space-x-1 items-center"
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
            <span className="hidden md:inline-block">Edit</span>
          </button>
        ),
      });
      dynamicColumns.push({
        headerName: "Delete",
        field: "delete",
        cellRenderer: (params) => (
          <button
            onClick={() =>
              dispatch(deleteClient(params.data._id, openSnackbar))
            }
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
  }, [clients]);

  const defaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
      
    }),
    []
  );
  
  return (
    <div >
      <h1 className="text-gray-700 text-center text-4xl py-2">Customer's</h1>
      <div className="h-[500px] w-full ml-[40px] px-[73px] ">
        <AgGridReact
          rowData={clients}
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
    </div>
  );
};

export default Clients;
