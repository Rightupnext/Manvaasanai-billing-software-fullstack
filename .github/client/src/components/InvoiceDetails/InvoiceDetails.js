import React, { useState, useEffect } from "react";
// import "../../../node_modules/react-progress-button/react-progress-button.css"
import { useSnackbar } from "react-simple-snackbar";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "../../initialState";
import { getInvoice } from "../../actions/invoiceActions";
import { toCommas } from "../../utils/utils";
import styles from "./InvoiceDetails.module.css";
import moment from "moment";
import { useHistory } from "react-router-dom";
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
import Divider from "@material-ui/core/Divider";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Spinner from "../Spinner/Spinner";

import ProgressButton from "react-progress-button";
import axios from "axios";
import { saveAs } from "file-saver";
import Modal from "../Payments/Modal";
import PaymentHistory from "./PaymentHistory";

const InvoiceDetails = () => {
  const location = useLocation();
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [rates, setRates] = useState(0);
  const [vat, setVat] = useState(0);
  const [currency, setCurrency] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [client, setClient] = useState([]);
  const [type, setType] = React.useState("");
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState({});
  const { id } = useParams();
  const { invoice } = useSelector((state) => state.invoices);
  const dispatch = useDispatch();
  const history = useHistory();
  const [sendStatus, setSendStatus] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(null);
  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const user = JSON.parse(localStorage.getItem("profile"));

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    table: {
      minWidth: 650,
    },

    headerContainer: {
      // display: 'flex'
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(1),
      backgroundColor: "#f2f2f2",
      borderRadius: "10px 10px 0px 0px",
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [id, dispatch, location]);

  useEffect(() => {
    if (invoice) {
      //Automatically set the default invoice values as the ones in the invoice to be updated
      setInvoiceData(invoice);
      setRates(invoice.rates);
      setClient(invoice.client);
      setType(invoice.type);
      setStatus(invoice.status);
      setSelectedDate(invoice.dueDate);
      setVat(invoice.vat);
      setCurrency(invoice.currency);
      setSubTotal(invoice.subTotal);
      setTotal(invoice.total);
      setCompany(invoice?.businessDetails?.data?.data);
    }
  }, [invoice]);

  //Get the total amount paid
  let totalAmountReceived = 0;
  for (var i = 0; i < invoice?.paymentRecords?.length; i++) {
    totalAmountReceived += Number(invoice?.paymentRecords[i]?.amountPaid);
  }

  const editInvoice = (id) => {
    history.push(`/edit/invoice/${id}`);
  };

  const createAndDownloadPdf = () => {
    setDownloadStatus("loading");
    axios
      .post(`${process.env.REACT_APP_API}/create-pdf`, {
        name: invoice?.client?.name || "",
        address: invoice?.client?.address || "",
        phone: invoice?.client?.phone || "",
        email: invoice?.client?.email || "",
        dueDate: invoice.dueDate,
        date: invoice.createdAt,
        id: invoice.invoiceNumber,
        notes: invoice.notes,
        subTotal: toCommas(
          (Math.round(invoice.subTotal * 10) / 10).toLocaleString()
        ),
        total: toCommas(Math.round(invoice.total * 10) / 10).toLocaleString(),
        type: invoice.type,
        vat: invoice.vat,
        items: invoice.items,
        status: invoice.status,
        totalAmountReceived: toCommas(totalAmountReceived),
        balanceDue: toCommas(
          Math.round((total - totalAmountReceived) * 10) / 10
        ).toLocaleString(),
        company: company,
      })
      .then(() =>
        axios.get(`${process.env.REACT_APP_API}/fetch-pdf`, {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "invoice.pdf");
      })
      .then(() => setDownloadStatus("success"));
  };

  //SEND PDF INVOICE VIA EMAIL
  const sendPdf = (e) => {
    e.preventDefault();
    setSendStatus("loading");
    axios
      .post(`${process.env.REACT_APP_API}/send-pdf`, {
        name: invoice.client.name,
        address: invoice.client.address,
        phone: invoice.client.phone,
        email: invoice.client.email,
        dueDate: invoice.dueDate,
        date: invoice.createdAt,
        id: invoice.invoiceNumber,
        notes: invoice.notes,
        subTotal: toCommas(invoice.subTotal),
        total: toCommas(invoice.total),
        type: invoice.type,
        vat: invoice.vat,
        items: invoice.items,
        status: invoice.status,
        totalAmountReceived: toCommas(totalAmountReceived),
        balanceDue: toCommas(total - totalAmountReceived),
        link: `${process.env.REACT_APP_URL}/invoice/${invoice._id}`,
        company: company,
      })
      // .then(() => console.log("invoice sent successfully"))
      .then(() => setSendStatus("success"))
      .catch((error) => {
        console.log(error);
        setSendStatus("error");
      });
  };

  const iconSize = {
    height: "18px",
    width: "18px",
    marginRight: "10px",
    color: "gray",
  };
  const [open, setOpen] = useState(false);

  function checkStatus() {
    return totalAmountReceived >= total
      ? "green"
      : status === "Partial"
      ? "#1976d2"
      : status === "Paid"
      ? "green"
      : status === "Unpaid"
      ? "red"
      : "red";
  }

  if (!invoice) {
    return <Spinner />;
  }
  const getImageURL = (id) => {
    return `${process.env.REACT_APP_API}/profiles/image/${id}`;
  };

  return (
    <div className={styles.PageLayout}>
      {invoice?.creator?.includes(
        user?.result?._id || user?.result?.googleId
      ) && (
        <div className={styles.buttons}>
          <ProgressButton
            onClick={sendPdf}
            state={sendStatus}
            onSuccess={() => openSnackbar("Invoice sent successfully")}
          >
            Send to Customer
          </ProgressButton>

          <ProgressButton onClick={createAndDownloadPdf} state={downloadStatus}>
            Download PDF
          </ProgressButton>

          <button
            className={styles.btn}
            onClick={() => editInvoice(invoiceData._id)}
          >
            <BorderColorIcon style={iconSize} />
            Edit Invoice
          </button>

          <button
            // disabled={status === 'Paid' ? true : false}
            className={styles.btn}
            onClick={() => setOpen((prev) => !prev)}
          >
            <MonetizationOnIcon style={iconSize} />
            Record Payment
          </button>
        </div>
      )}

      {invoice?.paymentRecords.length !== 0 && (
        <PaymentHistory paymentRecords={invoiceData?.paymentRecords} />
      )}

      <Modal open={open} setOpen={setOpen} invoice={invoice} />
      <div className={styles.invoiceLayout}>
        <Container className={classes.headerContainer}>
          <Grid
            container
            justifyContent="space-between"
            style={{ padding: "30px 0px" }}
          >
            {!invoice?.creator?.includes(
              user?.result._id || user?.result?.googleId
            ) ? (
              <Grid item></Grid>
            ) : (
              <Grid
                item
                onClick={() => history.push("/settings")}
                style={{ cursor: "pointer" }}
              >
                {company?.logo ? (
                  <img
                    src={getImageURL(company.logo)}
                    alt="Logo"
                    className={styles.logo}
                  />
                ) : (
                  <h2>{company?.name}</h2>
                )}
              </Grid>
            )}
            <Grid item style={{ marginRight: 40, textAlign: "right" }}>
              <Typography
                style={{
                  lineSpacing: 1,
                  fontSize: 45,
                  fontWeight: 700,
                  color: "gray",
                }}
              >
                {Number(total - totalAmountReceived) <= 0 ? "Receipt" : type}
              </Typography>
              <Typography variant="overline" style={{ color: "gray" }}>
                No:{" "}
              </Typography>
              <Typography variant="body2">
                {invoiceData?.invoiceNumber}
              </Typography>
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
            <Grid item>
              {invoice?.creator?.includes(user?.result._id) && (
                <Container style={{ marginBottom: "20px" }}>
                  <Typography
                    variant="overline"
                    style={{ color: "gray" }}
                    gutterBottom
                  >
                    From
                  </Typography>
                  <Typography variant="subtitle2">
                    {invoice?.businessDetails?.data?.data?.businessName}
                  </Typography>
                  <Typography variant="body2">
                    {invoice?.businessDetails?.data?.data?.email}
                  </Typography>
                  <Typography variant="body2">
                    {invoice?.businessDetails?.data?.data?.phoneNumber}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {invoice?.businessDetails?.data?.data?.address}
                  </Typography>
                </Container>
              )}
              <Container>
                <Typography
                  variant="overline"
                  style={{ color: "gray", paddingRight: "3px" }}
                  gutterBottom
                >
                  Bill to
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {client ? client.name : "no name"}
                </Typography>
                <Typography variant="body2">{client?.email}</Typography>
                <Typography variant="body2">{client?.phone}</Typography>
                <Typography variant="body2">{client?.address}</Typography>
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
                style={{ color: checkStatus() }}
              >
                {totalAmountReceived >= total ? "Paid" : status}
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

        <form>
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Kg</TableCell>
                    <TableCell>Grams</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Disc(%)</TableCell>
                    <TableCell>Amount (without GST)</TableCell>
                    <TableCell>CGST (5% for sweets, 12% for mixture)</TableCell>
                    <TableCell>SGST (5% for sweets, 12% for mixture)</TableCell>
                    <TableCell>Total Amount (including GST)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceData?.items?.map((itemField, index) => (
                    <TableRow key={index}>
                      <TableCell scope="row" style={{ width: "40%" }}>
                        {" "}
                        <InputBase
                          style={{ width: "100%" }}
                          outline="none"
                          sx={{ ml: 1, flex: 1 }}
                          type="text"
                          name="itemName"
                          value={itemField.itemName}
                          placeholder="Item name or description"
                          readOnly
                        />{" "}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          type="number"
                          name="quantity"
                          value={itemField?.quantity}
                          placeholder="0"
                          readOnly
                        />{" "}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          type="number"
                          name="grams"
                          value={itemField?.grams}
                          placeholder="0"
                          readOnly
                        />{" "}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          type="number"
                          name="unitPrice"
                          value={itemField?.unitPrice}
                          placeholder="0"
                          readOnly
                        />{" "}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          type="number"
                          name="discount"
                          value={itemField?.discount ||0}
                          readOnly
                        />{" "}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          type="number"
                          name="discount"
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
                            const discountAmount =
                              (totalAmount * discount) / 100;

                            // Ensure the result is non-negative
                            const finalAmount = Math.max(
                              totalAmount - discountAmount,
                              0
                            );

                            // Return the formatted value
                            return finalAmount.toFixed(2);
                          })()}
                          readOnly
                        />{" "}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          type="number"
                          name="CGST"
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
                          readOnly
                        />{" "}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          type="number"
                          name="sgst"
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
                          readOnly
                        />{" "}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          type="number"
                          name="amount"
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
                          readOnly
                        />{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={styles.addButton}></div>
          </div>

          <div className={styles.invoiceSummary}>
            <div className={styles.summary}>Invoice Summary</div>
            <div className={styles.summaryItem}>
              <p>Subtotal:</p>
              <h4>{(Math.round(subTotal * 10) / 10).toLocaleString()}</h4>
            </div>
            {/* <div className={styles.summaryItem}>
                        <p>{`VAT(${rates}%):`}</p>
                        <h4>{(Math.round(vat*10)/10).toLocaleString()}</h4>
                    </div> */}
            <div className={styles.summaryItem}>
              <p>Total</p>
              <h4>
                {currency}{" "}
                {toCommas(Math.round(total * 10) / 10).toLocaleString()}
              </h4>
            </div>
            <div className={styles.summaryItem}>
              <p>Paid</p>
              <h4>
                {currency}{" "}
                {toCommas(
                  Math.round(totalAmountReceived * 10) / 10
                ).toLocaleString()}
              </h4>
            </div>

            <div className={styles.summaryItem}>
              <p>Balance</p>
              <h4
                style={{ color: "black", fontSize: "18px", lineHeight: "8px" }}
              >
                {currency}{" "}
                {toCommas(
                  Math.round((total - totalAmountReceived) * 10) / 10
                ).toLocaleString()}
              </h4>
            </div>
          </div>

          <div className={styles.note}>
            <h4 style={{ marginLeft: "-10px" }}>Note/Payment Info</h4>
            <p style={{ fontSize: "14px" }}>{invoiceData.notes}</p>
          </div>

          {/* <button className={styles.submitButton} type="submit">Save and continue</button> */}
        </form>
      </div>
    </div>
  );
};

export default InvoiceDetails;
