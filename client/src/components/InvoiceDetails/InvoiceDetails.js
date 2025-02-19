import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
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
import BorderColorIcon from "@material-ui/icons/BorderColor";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Spinner from "../Spinner/Spinner";
import ProgressButton from "react-progress-button";
import axios from "axios";
import Modal from "../Payments/Modal";
import PaymentHistory from "./PaymentHistory";
import Logo from '../../images/manvaasanai.png'
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

  const createAndDownloadPdf = async () => {
    setDownloadStatus("loading");
  
    // Ensure the images are fully loaded before capturing
    const loadImages = async () => {
      const images = document.querySelectorAll("#invoice-content img");
      const promises = Array.from(images).map((img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else img.onload = resolve;
        })
      );
      return Promise.all(promises);
    };
  
    await loadImages(); // Wait for all images to load
  
    // Capture the element
    const element = document.getElementById("invoice-content");
  
    // Set PDF options
    const options = {
      margin: [7, 0, 3, 0],
      filename: "invoice.pdf",
      html2canvas: {
        dpi: 300,
        letterRendering: true,
        scale: 2,
        useCORS: true, // Ensures images from external sources are included
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compressPdf: true,
      },
    };
  
    // Convert HTML to PDF
    html2pdf()
      .from(element)
      .set(options)
      .save("invoice.pdf")
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
      <div
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden border border-purple-100"
        id="invoice-content"
      >
        <div className="px-8 py-6 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
              crossOrigin="anonymous" alt="Invoice Logo" 
                src={getImageURL(company.logo) }
               
                className="h-[120px] w-[180px] rounded-lg object-contain ring-2 ring-green-200"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-purple-900">
                  {invoice?.businessDetails?.data?.data?.businessName}
                </h1>
                <p className="text-sm text-purple-600">
                  Premium Sweets & Mixtures
                </p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold text-purple-900">
                {Number(total - totalAmountReceived) <= 0 ? "Receipt" : type} #{" "}
                {invoiceData?.invoiceNumber}
              </h2>
              <h2
                className={`text-xl font-semibold 
  ${
    totalAmountReceived >= total
      ? "text-green-600"
      : totalAmountReceived > 0
      ? "text-blue-600"
      : "text-red-600"
  }`}
              >
                Status:{" "}
                {totalAmountReceived >= total
                  ? "Paid"
                  : totalAmountReceived > 0
                  ? "Partial"
                  : "Unpaid"}
              </h2>

              <p className="text-sm text-purple-600">
                Date: {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-purple-600">
                Due Date:{" "}
                {selectedDate
                  ? moment(selectedDate).format("MMM Do YYYY")
                  : "27th Sep 2021"}
              </p>
              <p className="text-sm text-purple-600">
                Amount: {currency}{" "}
                {toCommas(Math.round(total * 10) / 10).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-6 border-b border-purple-200">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-lg font-semibold mb-2 text-purple-900">From</h3>
            <p className="text-purple-700">
             {invoice?.businessDetails?.data?.data?.businessName}
              <br />
              {invoice?.businessDetails?.data?.data?.email}
              <br />
            +91  {invoice?.businessDetails?.data?.data?.phoneNumber}
              <br />
               {invoice?.businessDetails?.data?.data?.contactAddress}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-lg font-semibold mb-2 text-purple-900">To</h3>
            <p className="text-purple-700">
              {client ? client.name : "no name"}
              <br />
              {client?.email}
              <br />
              {client?.phone}
              <br />
              {client?.address}
            </p>
          </div>
        </div>

        <div className="px-8 py-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700">
                    Item
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700">
                    kilo
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-purple-700">
                    Grams
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-purple-700">
                    Price
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-purple-700">
                    Disc(%)
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-purple-700">
                    Amount (without GST)
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-purple-700">
                    CGST
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-purple-700">
                    SGST
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-purple-700">
                    Total Amount (including GST)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {invoiceData?.items?.map((itemField, index) => {
                  const unitPrice = Number(itemField.unitPrice) || 0; // Price per kg
                  const quantity = Number(itemField.quantity) || 0; // Quantity in kg
                  const grams = Number(itemField.grams) || 0; // Extra grams
                  const discount = Number(itemField.discount) || 0; // Discount percentage

                  // Convert grams to kg and calculate total amount
                  const totalKg = (quantity * 1000 + grams) / 1000;
                  const totalAmount = totalKg * unitPrice;

                  // Calculate discount and final amount
                  const discountAmount = (totalAmount * discount) / 100;
                  const finalAmount = Math.max(totalAmount - discountAmount, 0); // Ensure non-negative result

                  return (
                    <tr
                      key={index}
                      className="hover:bg-purple-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-purple-900 text-justify">
                        {itemField.itemName}
                      </td>
                      <td className="px-4 py-3 text-sm text-purple-600">
                        {itemField.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-purple-900">
                        {itemField.grams}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-purple-900">
                        {itemField.unitPrice}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-purple-900">
                        {itemField.discount}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-purple-900">
                        {finalAmount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-purple-900">
                        {(() => {
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
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-purple-900">
                        {(() => {
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
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-purple-900">
                        {(() => {
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-8 border-t border-purple-200 pt-8">
            <div className="flex justify-end">
              <div className="w-64 bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
                <div className="flex justify-between py-2">
                  <span className="text-purple-700">Subtotal:</span>
                  <span className="font-medium text-purple-900">
                    ₹{(Math.round(subTotal * 10) / 10).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-purple-700">
                    Delivery Charge {rates}% :
                  </span>
                  <span className="font-medium text-purple-900">
                    ₹{(Math.round(vat * 10) / 10).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-purple-700">Total:</span>
                  <span className="font-medium text-purple-900">
                    {currency}{" "}
                    {toCommas(Math.round(total * 10) / 10).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-purple-700">Paid:</span>
                  <span className="font-medium text-purple-900">
                    {currency}{" "}
                    {toCommas(
                      Math.round(totalAmountReceived * 10) / 10
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between py-2 text-lg font-bold">
                  <span className="text-purple-900">Balance:</span>
                  <span className="text-purple-900">
                    ₹ {currency}{" "}
                    {toCommas(
                      Math.round((total - totalAmountReceived) * 10) / 10
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-900">
                Notes
              </h4>
              <p className="text-sm text-purple-700">{invoiceData.notes}</p>
            </div>
            <div className="text-right">
              <div className="mt-8 pt-8 border-t border-purple-200">
                <p className="text-sm text-purple-700">Authorized Signatory</p>
              </div>
            </div>
          </div>
          <div className="flex items-center max-md:flex-col gap-6 bg-gradient-to-tr from-blue-700 to-purple-400 text-white px-6 py-3.5 rounded font-[sans-serif] mt-6">
            <p className="text-base flex-1 max-md:text-center">
              Design and developed by Right Up Next Innovations
            </p>
            <div>
              <a href="https://rightupnextinnovations.com/" target="blank">
              <img
                src="data:image/png;base64,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"
                className="bg-white text-blue-500 py-2.5 px-5 rounded w-[140px]"
              />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
