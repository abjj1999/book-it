import React from "react";
import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/bookingAction";


const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, error } = useSelector((state) => state.bookings);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);
  const columns = [
    {
      title: "booking ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
    },
    {
      title: "Days Of Stay",
      dataIndex: "daysOfStay",
      key: "daysOfStay",
    },
    {
      title: "Amount Paid",
      dataIndex: "amountPaid",
      key: "amountPaid",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];
  const createInvoiced = async (booking) => {
    
  }
  const data = [];
  // console.log(bookings)
  bookings &&
    bookings.forEach((booking) => {
      data.push({
        key: booking._id,
        room: booking.room.name,

        checkIn: booking.checkInDate,
        checkOut: booking.checkOutDate,
        daysOfStay: booking.daysOfStay,
        amountPaid: `$${booking.amountPaid}`,
        actions: (
          <>
            <Link href={`/bookings/${booking._id}`}>
              <button className="btn btn-primary">
                <i className="fa fa-eye"></i>
              </button>
            </Link>

            <button className="btn btn-success" 
            onClick={() => createInvoiced(booking)}
            >
              <i className="fa fa-download"></i>
            </button>
          </>
        ),
      });
    });

  return (
    <div className="container container-fluid">
      <h1 className="my-5">My Bookings</h1>
      <Table className="px-3" columns={columns} dataSource={data} />
    </div>
  );
};

export default MyBookings;
