import React, { useState, useEffect } from "react";
import styles from "./Invoice.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { toCommas } from "../../utils/utils";
import Logo from "./manvaasanai.png";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { Container, Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { initialState } from "../../initialState";
import currencies from "../../currencies.json";
import {
  createInvoice,
  getInvoice,
  updateInvoice,
} from "../../actions/invoiceActions";
import { getClientsByUser } from "../../actions/clientActions";
import AddClient from "./AddClient";
import InvoiceType from "./InvoiceType";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../actions/productAction";
import { GetCategory } from "../../actions/categoryAction";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(12),
    marginTop: "34px",
  },
  table: {
    minWidth: 650,
  },

  headerContainer: {
    // display: 'flex'
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(1),
  },
}));

const Invoice = () => {
  const location = useLocation();
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [rates, setRates] = useState("");
  const [vat, setVat] = useState(0);
  const [currency, setCurrency] = useState(currencies[0].value);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    today.getTime() + 7 * 24 * 60 * 60 * 1000
  );
  const [client, setClient] = useState(null);
  const [type, setType] = useState("Invoice");
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const clients = useSelector((state) => state.clients.clients);
  const { invoice } = useSelector((state) => state.invoices);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const products = useSelector((state) => state.products.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const categories = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetCategory());
  }, [dispatch]);
  useEffect(() => {
    getTotalCount();
    // eslint-disable-next-line
  }, [location]);

  const getTotalCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/invoices/count?searchQuery=${user?.result?._id}`
      );
      //   console.log(response.data);
      //Get total count of invoice from the server and increment by one to serialized numbering of invoice
      setInvoiceData({
        ...invoiceData,
        invoiceNumber: (Number(response.data) + 1).toString().padStart(3, "0"),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getInvoice(id));
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    dispatch(
      getClientsByUser({ search: user?.result._id || user?.result?.googleId })
    );
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (invoice) {
      //Automatically set the default invoice values as the ones in the invoice to be updated
      setInvoiceData(invoice);
      setRates(invoice.rates);
      setClient(invoice.client);
      setType(invoice.type);
      setStatus(invoice.status);
      setSelectedDate(invoice.dueDate);
    }
  }, [invoice]);

  useEffect(() => {
    if (type === "Receipt") {
      setStatus("Paid");
    } else {
      setStatus("Unpaid");
    }
  }, [type]);

  const defaultProps = {
    options: currencies,
    getOptionLabel: (option) => option.label,
  };

  const clientsProps = {
    options: clients,
    getOptionLabel: (option) => option.name,
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRates = (e) => {
    setRates(e.target.value);
    setInvoiceData((prevState) => ({ ...prevState, tax: e.target.value }));
  };

  // console.log(invoiceData)
  // Change handler for dynamically added input field
  const handleProductSelect = (index, productName) => {
    const selected = products.find(
      (product) => product.productName === productName
    );

    if (selected) {
      console.log("Selected Product:", selected);
      console.log("Category Name:", selected.category?.categoryName);
      console.log(
        "CGST:",
        selected.category?.CGST,
        "SGST:",
        selected.category?.SGST
      );

      setInvoiceData((prev) => {
        const updatedItems = prev.items.map((item, i) =>
          i === index
            ? {
                ...item,
                itemName: selected.productName,
                unitPrice: selected.unitPrice,
                CGST: selected.category?.CGST ?? "0", // Extract CGST correctly
                SGST: selected.category?.SGST ?? "0", // Extract SGST correctly
                categoryName: selected.category?.categoryName || "",
              }
            : item
        );

        return { ...prev, items: updatedItems };
      });
    }
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const values = [...invoiceData.items];

    // Check if the name is 'quantity' or 'grams', and ensure they're parsed as numbers
    if (name === "quantity" || name === "grams") {
      values[index][name] = parseFloat(value); // Ensure it’s a number
    } else {
      values[index][name] = value;
    }

    setInvoiceData({ ...invoiceData, items: values });
  };

  useEffect(() => {
    //Get the subtotal
    const subTotal = () => {
      var arr = document.getElementsByName("amount");
      var subtotal = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].value) {
          subtotal += +arr[i].value;
        }
        // document.getElementById("subtotal").value = subtotal;
        setSubTotal(subtotal);
      }
    };

    subTotal();
  }, [invoiceData]);

  useEffect(() => {
    const total = () => {
      //Tax rate is calculated as (input / 100 ) * subtotal + subtotal
      const overallSum = (rates / 100) * subTotal + subTotal;
      //VAT is calculated as tax rates /100 * subtotal
      setVat((rates / 100) * subTotal);
      setTotal(overallSum);
    };
    total();
  }, [invoiceData, rates, subTotal]);

  const handleAddField = (e) => {
    e.preventDefault();
    setInvoiceData((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        {
          itemName: "",
          unitPrice: "",
          quantity: "",
          discount: "",
          amount: "",
          CGST: "",
          SGST: "",
        }, // Ensure new row is empty
      ],
    }));
  };

  const handleRemoveField = (index) => {
    const values = invoiceData.items;
    values.splice(index, 1);
    setInvoiceData((prevState) => ({ ...prevState, values }));
    // console.log(values)
  };

  // console.log(invoiceData)

  const handleSubmit = async (e) => {
    const roundedSubTotal = Math.round(subTotal * 100) / 100;
    const roundedTotal = Math.round(total * 100) / 100;
    const roundedVat = Math.round(vat * 100) / 100;

    // Prepare the data with rounded values
    const invoiceDataWithRoundedValues = {
      ...invoiceData,
      subTotal: roundedSubTotal,
      total: roundedTotal,
      vat: roundedVat,
      rates: rates,
      currency: currency,
      dueDate: selectedDate,
      client,
      type: type,
      status: status,
    };

    if (invoice) {
      dispatch(updateInvoice(invoice._id, invoiceDataWithRoundedValues));
      history.push(`/invoice/${invoice._id}`);
    } else {
      dispatch(
        createInvoice(
          {
            ...invoiceDataWithRoundedValues,
            invoiceNumber: `${
              invoiceData.invoiceNumber < 100
                ? Number(invoiceData.invoiceNumber).toString().padStart(3, "0")
                : Number(invoiceData.invoiceNumber)
            }`,
            paymentRecords: [],
            creator: [user?.result?._id || user?.result?.googleId],
          },
          history
        )
      );
    }

    // setInvoiceData(initialState)
  };

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const CustomPaper = (props) => {
    return <Paper elevation={3} {...props} />;
  };

  if (!user) {
    history.push("/login");
  }
  const logoId = localStorage.getItem("logo");
  const getImageURL = (id) => {
    return `http://localhost:5000/profiles/image/${id}`;
  };

  return (
    <div className={styles.invoiceLayout}>
      <form onSubmit={handleSubmit} className="mu-form">
        <AddClient setOpen={setOpen} open={open} />
        <Container className={classes.headerContainer}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <img
                alt="Logo"
                src={Logo}
                className="w-[125px] mt-[10px] h-[125px]"
              />
            </Grid>
            <Grid item>
              <InvoiceType type={type} setType={setType} />
              Invoice #:
              <div
                style={{
                  marginTop: "15px",
                  width: "100px",
                  padding: "8px",
                  display: "inline-block",
                  backgroundColor: "#f4f4f4",
                  outline: "0px solid transparent",
                }}
                contenteditable="true"
                onInput={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    invoiceNumber: e.currentTarget.textContent,
                  })
                }
              >
                <span
                  style={{ width: "40px", color: "black", padding: "15px" }}
                  contenteditable="false"
                >
                  {" "}
                  {invoiceData.invoiceNumber}
                </span>
                <br />
              </div>
            </Grid>
          </Grid>
        </Container>
        <Divider />
        <Container>
          <Grid
            container
            justifyContent="space-between"
            style={{ marginTop: "40px" }}
          >
            <Grid item style={{ width: "50%" }}>
              <Container>
                <Typography
                  variant="overline"
                  style={{ color: "gray", paddingRight: "3px" }}
                  gutterBottom
                >
                  Bill to
                </Typography>

                {client && (
                  <>
                    <Typography
                      style={{ marginTop: "10px" }}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {client.name}
                    </Typography>
                    <Typography style={{ marginTop: "8px" }} variant="body2">
                      {client.email}
                    </Typography>
                    <Typography style={{ marginTop: "8px" }} variant="body2">
                      {client.phone}
                    </Typography>
                    <Typography style={{ marginTop: "8px" }} variant="body2">
                      {client.address}
                    </Typography>
                    <Button
                      color="primary"
                      size="small"
                      style={{ textTransform: "none", marginTop: "8px" }}
                      onClick={() => setClient(null)}
                    >
                      Change Customer
                    </Button>
                  </>
                )}
                <div
                  style={client ? { display: "none" } : { display: "block" }}
                >
                  <Autocomplete
                    {...clientsProps}
                    PaperComponent={CustomPaper}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // required={invoice}
                        label="Select Customer"
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                    value={clients?.name}
                    onChange={(event, value) => setClient(value)}
                  />
                </div>
                {!client && (
                  <>
                    <Grid item style={{ paddingBottom: "10px" }}>
                      <Chip
                        avatar={<Avatar>+</Avatar>}
                        label="New Customer"
                        onClick={() => setOpen(true)}
                        variant="outlined"
                      />
                    </Grid>
                  </>
                )}
              </Container>
            </Grid>

            <Grid item style={{ marginRight: 20, textAlign: "right" }}>
              <Typography
                variant="overline"
                style={{ color: "gray" }}
                gutterBottom
              >
                Status
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: type === "Receipt" ? "green" : "red" }}
              >
                {type === "Receipt" ? "Paid" : "Unpaid"}
              </Typography>
              <Typography
                variant="overline"
                style={{ color: "gray" }}
                gutterBottom
              >
                Date
              </Typography>
              <Typography variant="body2" gutterBottom>
                {moment().format("MMM Do YYYY")}
              </Typography>
              <Typography
                variant="overline"
                style={{ color: "gray" }}
                gutterBottom
              >
                Due Date
              </Typography>
              <Typography variant="body2" gutterBottom>
                {selectedDate
                  ? moment(selectedDate).format("MMM Do YYYY")
                  : "27th Sep 2021"}
              </Typography>
              <Typography variant="overline" gutterBottom>
                Amount
              </Typography>
              <Typography variant="h6" gutterBottom>
                {currency}{" "}
                {toCommas(Math.round(total * 10) / 10).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <div>
          <TableContainer component={Paper} className="tb-container">
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Kg</TableCell>
                  <TableCell>Grams</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Disc(%)</TableCell>
                  <TableCell>Amount (without GST)</TableCell>
                  <TableCell>CGST (2.5% for sweets, 6% for mixture)</TableCell>
                  <TableCell>SGST (2.5% for sweets, 6% for mixture)</TableCell>
                  <TableCell>Total Amount (including GST)</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceData.items.map((itemField, index) => (
                  <TableRow key={index}>
                    <TableCell scope="row" style={{ width: "40%" }}>
                      <select
                        key={index}
                        name="productName"
                        value={itemField.itemName || ""}
                        onChange={(e) =>
                          handleProductSelect(index, e.target.value)
                        }
                        className="px-2 py-2 w-1/2 border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option key={product._id} value={product.productName}>
                            {product.productName}
                          </option>
                        ))}
                      </select>

                      {/* Item Name Input */}
                      <InputBase
                        style={{ width: "50%" }}
                        outline="none"
                        sx={{ flex: 1 }}
                        type="text"
                        name="itemName"
                        onChange={(e) => handleChange(index, e)}
                        value={invoiceData.items[index]?.itemName || ""}
                        placeholder="Item name or description"
                      />
                    </TableCell>

                    <TableCell align="right">
                      {" "}
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="quantity"
                        onChange={(e) => handleChange(index, e)}
                        value={itemField.quantity}
                        placeholder="0"
                      />{" "}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="grams"
                        onChange={(e) => handleChange(index, e)}
                        value={itemField.grams}
                        placeholder="0"
                      />{" "}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="unitPrice"
                        onChange={(e) => handleChange(index, e)}
                        value={itemField.unitPrice}
                        placeholder="0"
                      />{" "}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="discount"
                        onChange={(e) => handleChange(index, e)}
                        value={itemField.discount}
                        placeholder="0 %"
                      />{" "}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="unitPrice"
                        disabled
                        value={(() => {
                          const unitPrice = Number(itemField.unitPrice) || 0; // Price per kg
                          const quantity = Number(itemField.quantity) || 0; // Quantity in kg
                          const grams = Number(itemField.grams) || 0; // Extra grams
                          const discount = Number(itemField.discount) || 0; // Ensure discount defaults to 0

                          // Convert grams to kg correctly
                          const totalKg = (quantity * 1000 + grams) / 1000;

                          // Calculate total amount
                          const totalAmount = totalKg * unitPrice;

                          // Calculate discount amount
                          const discountAmount = (totalAmount * discount) / 100;

                          // Ensure the result is non-negative
                          const finalAmount = Math.max(
                            totalAmount - discountAmount,
                            0
                          );

                          // Return the formatted value
                          return finalAmount.toFixed(2);
                        })()}
                        placeholder="0"
                      />{" "}
                    </TableCell>
                    <TableCell align="right">
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="CGST"
                        onChange={(e) => handleChange(index, e)}
                        value={(() => {
                          const unitPrice = Number(itemField.unitPrice) || 0; // Price per kg
                          const quantity = Number(itemField.quantity) || 0; // Quantity in kg
                          const grams = Number(itemField.grams) || 0; // Extra grams

                          // Convert grams to kg correctly
                          const totalKg = (quantity * 1000 + grams) / 1000;

                          // Calculate total amount (without discount)
                          const finalAmount = totalKg * unitPrice;

                          // Get CGST percentage from invoiceData
                          const cgstRate =
                            Number(invoiceData.items[index]?.CGST) || 0;

                          // Calculate CGST amount
                          const cgst = (finalAmount * cgstRate) / 100;

                          // Return the formatted value
                          return cgst.toFixed(2);
                        })()}
                        placeholder="0 %"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="SGST"
                        onChange={(e) => handleChange(index, e)}
                        value={(() => {
                          const unitPrice = Number(itemField.unitPrice) || 0; // Price per kg
                          const quantity = Number(itemField.quantity) || 0; // Quantity in kg
                          const grams = Number(itemField.grams) || 0; // Extra grams

                          // Convert grams to kg correctly
                          const totalKg = (quantity * 1000 + grams) / 1000;

                          // Calculate total amount (without discount)
                          const finalAmount = totalKg * unitPrice;

                          // Get SGST percentage from invoiceData
                          const sgstRate =
                            Number(invoiceData.items[index]?.SGST) || 0;

                          // Calculate SGST amount
                          const sgst = (finalAmount * sgstRate) / 100;

                          // Return the formatted value
                          return sgst.toFixed(2);
                        })()}
                        placeholder="0 %"
                      />
                    </TableCell>

                    <TableCell align="right">
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="number"
                        name="amount"
                        onChange={(e) => handleChange(index, e)}
                        value={(() => {
                          const unitPrice = Number(itemField.unitPrice) || 0; // Unit price per kg
                          const quantity = Number(itemField.quantity) || 0; // Quantity in kg
                          const grams = Number(itemField.grams) || 0; // Extra grams
                          const discount = Number(itemField.discount) || 0; // Discount percentage
                          const cgstRate = Number(itemField.CGST) || 0; // CGST rate
                          const sgstRate = Number(itemField.SGST) || 0; // SGST rate

                          // Validate inputs to ensure numbers are correct
                          if (
                            isNaN(unitPrice) ||
                            unitPrice <= 0 ||
                            isNaN(quantity) ||
                            quantity < 0 ||
                            isNaN(grams) ||
                            grams < 0 ||
                            isNaN(discount) ||
                            discount < 0 ||
                            discount > 100 ||
                            isNaN(cgstRate) ||
                            cgstRate < 0 ||
                            isNaN(sgstRate) ||
                            sgstRate < 0
                          ) {
                            return "0.00"; // Return 0 if values are invalid
                          }

                          // Convert grams to kg correctly
                          const totalKg = (quantity * 1000 + grams) / 1000; // Convert grams to kg properly

                          // Calculate total amount
                          const totalAmount = unitPrice * totalKg; // Correct kg-based multiplication

                          // Apply discount
                          const discountedAmount =
                            totalAmount * (1 - discount / 100);

                          // Calculate CGST and SGST
                          const cgstAmount =
                            (discountedAmount * cgstRate) / 100;
                          const sgstAmount =
                            (discountedAmount * sgstRate) / 100;

                          // Calculate final total amount after adding CGST and SGST
                          const finalAmount =
                            discountedAmount + cgstAmount + sgstAmount;

                          // Return the final amount, fixed to 2 decimal places
                          return finalAmount.toFixed(2);
                        })()}
                        disabled
                      />
                    </TableCell>

                    <TableCell align="right">
                      <IconButton onClick={() => handleRemoveField(index)}>
                        <DeleteOutlineRoundedIcon
                          style={{ width: "20px", height: "20px" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={styles.addButton}>
            <button onClick={handleAddField}>+</button>
          </div>
        </div>

        <div className={styles.invoiceSummary}>
          <div className={styles.summary}>Invoice Summary</div>
          <div className={styles.summaryItem}>
            <p>Sub total:</p>
            <h4>{(Math.round(subTotal * 10) / 10).toLocaleString()}</h4>
          </div>
          <div className={styles.summaryItem}>
            <p>Delivery Charges(%):</p>
            <h4>{(Math.round(vat * 10) / 10).toLocaleString()}</h4>
          </div>
          <div className={styles.summaryItem}>
            <p>Total</p>
            <h4 style={{ color: "black", fontSize: "18px", lineHeight: "8px" }}>
              {currency}{" "}
              {toCommas(Math.round(total * 10) / 10).toLocaleString()}
            </h4>
          </div>
        </div>

        <div className={styles.toolBar}>
          <Container>
            <Grid container>
              <Grid item style={{ marginTop: "16px", marginRight: 10 }}>
                <TextField
                  type="text"
                  step="any"
                  name="rates"
                  id="rates"
                  value={rates}
                  onChange={handleRates}
                  placeholder="e.g 10"
                  label="Delivery Charge(%)"
                />
              </Grid>
              <Grid item style={{ marginRight: 10 }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Due date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item style={{ width: 270, marginRight: 10 }}>
                <Autocomplete
                  {...defaultProps}
                  id="debug"
                  debug
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select currency"
                      margin="normal"
                    />
                  )}
                  value={currency.value || currencies[0]}
                  defaultValue={"INR"}
                  onChange={(event, value) => setCurrency(value.value)}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
        <div className={styles.note}>
          <h4>Note/Payment Info</h4>
          <textarea
            style={{ border: "solid 1px #d6d6d6", padding: "10px" }}
            placeholder="Provide additional details or terms of service"
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, notes: e.target.value })
            }
            value={invoiceData.notes}
          />
        </div>

        {/* <button className={styles.submitButton} type="submit">Save and continue</button> */}
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            style={{ justifyContentContent: "center" }}
            type="submit"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save and Continue
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default Invoice;
