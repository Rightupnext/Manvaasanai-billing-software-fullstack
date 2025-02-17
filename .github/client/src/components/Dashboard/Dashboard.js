
import React, { useEffect } from "react";
import { toCommas } from "../../utils/utils";
import styles from "./Dashboard.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInvoicesByUser } from "../../actions/invoiceActions";
import Empty from "../svgIcons/Empty";
import Chart from "./Chart";
// import Donut from './Donut'
import moment from "moment";
import { Check, Pie, Bag, Card, Clock, Frown } from "./Icons";
import Spinner from "../Spinner/Spinner";
import RecentPaymentHistoryTable from "./RecentPaymentHistoryTable";

import { FaDollarSign, FaClock, FaCalculator, FaFileInvoice, FaCheckCircle, FaPercentage, FaExclamationTriangle, FaHourglassEnd } from "react-icons/fa";

const Dashboard = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { invoices, isLoading } = useSelector((state) => state?.invoices);
  // const unpaid = invoices?.filter((invoice) => (invoice.status === 'Unpaid') || (invoice.status === 'Partial'))
  const overDue = invoices?.filter(
    (invoice) => invoice.dueDate <= new Date().toISOString()
  );

  let paymentHistory = [];
  for (let i = 0; i < invoices.length; i++) {
    let history = [];
    if (invoices[i].paymentRecords !== undefined) {
      history = [...paymentHistory, invoices[i].paymentRecords];
      paymentHistory = [].concat.apply([], history);
    }
  }

  //sort payment history by date
  const sortHistoryByDate = paymentHistory.sort(function (a, b) {
    var c = new Date(a.datePaid);
    var d = new Date(b.datePaid);
    return d - c;
  });

  let totalPaid = 0;
  for (let i = 0; i < invoices.length; i++) {
    if (invoices[i].totalAmountReceived !== undefined) {
      totalPaid += invoices[i].totalAmountReceived;
    }
  }

  let totalAmount = 0;
  for (let i = 0; i < invoices.length; i++) {
    totalAmount += invoices[i].total;
  }

  useEffect(() => {
    dispatch(
      getInvoicesByUser({ search: user?.result._id || user?.result?.googleId })
    );
    // eslint-disable-next-line
  }, [location, dispatch]);

  const unpaidInvoice = invoices?.filter(
    (invoice) => invoice.status === "Unpaid"
  );
  const paid = invoices?.filter((invoice) => invoice.status === "Paid");
  const partial = invoices?.filter((invoice) => invoice.status === "Partial");

  if (!user) {
    history.push("/login");
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        {/* <Spinner /> */}
        <Empty />
        <p style={{ padding: "40px", color: "gray" }}>
          Nothing to display. Click the plus icon to start creating
        </p>
      </div>
    );
  }
  const cards = [
    {
      title: "Payment Received",
      value: `$${toCommas(Math.round(totalPaid * 10) / 10)}`,
      icon: FaDollarSign,
      bgColor: "bg-chart-1",
      textColor: "text-white"
    },
    {
      title: "Pending Amount",
      value: `${toCommas(Math.round((totalAmount - totalPaid) * 10) / 10).toLocaleString()}`,
      icon: FaClock,
      bgColor: "bg-chart-2",
      textColor: "text-white"
    },
    {
      title: "Total Amount",
      value: `${toCommas(Math.round(totalAmount * 10) / 10).toLocaleString()}`,
      icon: FaCalculator,
      bgColor: "bg-chart-3",
      textColor: "text-white"
    },
    {
      title: "Total Invoices",
      value: `${invoices.length}`,
      icon: FaFileInvoice,
      bgColor: "bg-chart-4",
       textColor: "text-white"
    },
    {
      title: "Paid Invoices",
      value: `${paid.length}`,
      icon: FaCheckCircle,
      bgColor: "bg-chart-5",
      textColor: "text-white"
    },
    {
      title: "Partially Paid",
      value: `${partial.length}`,
      icon: FaPercentage,
      bgColor: "bg-chart-6",
       textColor: "text-white"
    },
    {
      title: "Unpaid Invoices",
      value:`${unpaidInvoice.length}`,
      icon: FaExclamationTriangle,
      bgColor: "bg-destructive/20",
     textColor: "text-white"
    },
    {
      title: "Overdue Invoices",
      value: `${overDue.length}`,
      icon: FaHourglassEnd,
      bgColor: "bg-chart-7",
     textColor: "text-white"
    }
  ];

  const Card = React.memo (({ title, value, icon: Icon, bgColor, textColor }) => (
    <div
      className={`p-6 rounded-lg ${bgColor} transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between">
        <div className={`text-2xl ${textColor}`}>
          <Icon />
        </div>
      </div>
      <div className="mt-4">
        <h3 className={`text-sm font-semibold ${textColor}`}>{title}</h3>
        <p className={`text-2xl font-bold mt-1 ${textColor}`}>{value}</p>
      </div>
    </div>
  ));

  return (
    <>
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-heading font-heading text-foreground mb-8 font-bold text-xl">Financial Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
      {paymentHistory.length !== 0 && (
        <section>
          <Chart paymentHistory={paymentHistory} />
        </section>
      )}
   
    <section>
        <h1 style={{ textAlign: "center", padding: "30px" }}>
          {paymentHistory.length
            ? "Recent Payments"
            : "No payment received yet"}
        </h1>

        <RecentPaymentHistoryTable paymentHistory={paymentHistory} />
      </section>
      </div>
    </>
  );
};

export default Dashboard;