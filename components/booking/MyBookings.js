import React from "react";
import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/bookingAction";
import easyinvoice from "easyinvoice";

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
    const data = {
        // Customize enables you to provide your own templates
        // Please review the documentation for instructions and examples
        "documentTitle": "Booking invoice", //Defaults to INVOICE
        // "currency": "USD",
        // "taxNotation": "vat", //or gst
        
        // Your company name
        "company": "BookIT",
        "images": {
            // The logo on top of your invoice
            "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
            // The invoice background
            "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
        },
        // Your own data
        "sender": {
            "company": "BookIT",
            "address": "Sample Street 123",
            "zip": "1234 AB",
            "city": "Sampletown",
            "country": "Samplecountry"

        },
        // Your recipient
        "client": {
            "company": `${booking.user.name}`,
            "address": `${booking.user.email}`,
            "zip": "",
            "city": ``,
            "country": "Clientcountry"
            // "custom1": "custom value 1",
            // "custom2": "custom value 2",
            // "custom3": "custom value 3"
        },
        "information": {
            // Invoice number
            "number": "2021.0001",
            // Invoice data
            "date": "12-12-2021",
            // Invoice due date
            "due-date": "31-12-2021"
        },
        // The products you would like to see on your invoice
        // Total values are being calculated automatically
        "products": [
            {
                "quantity": 2,
                "description": "Product 1",
                "tax-rate": 6,
                "price": 33.87
            },
            {
                "quantity": 4.1,
                "description": "Product 2",
                "tax-rate": 6,
                "price": 12.34
            },
            {
                "quantity": 4.5678,
                "description": "Product 3",
                "tax-rate": 21,
                "price": 6324.453456
            }
        ],
        // The message you would like to display on the bottom of your invoice
        "bottom-notice": "This is auto generated invoice from BookIT",
        // Settings to customize your invoice
        "settings": {
            "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
            // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
            "tax-notation": "gst", // Defaults to 'vat'
            "margin-top": 25, // Defaults to '25'
            "margin-right": 25, // Defaults to '25'
            "margin-left": 25, // Defaults to '25'
            "margin-bottom": 25, // Defaults to '25'
            // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
            // "height": "1000px", // allowed units: mm, cm, in, px
            // "width": "500px", // allowed units: mm, cm, in, px
            // "orientation": "landscape", // portrait or landscape, defaults to portrait
        },
        // Translate your invoice to your preferred language
        "translate": {
            // "invoice": "FACTUUR",  // Default to 'INVOICE'
            // "number": "Nummer", // Defaults to 'Number'
            // "date": "Datum", // Default to 'Date'
            // "due-date": "Verloopdatum", // Defaults to 'Due Date'
            // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
            // "products": "Producten", // Defaults to 'Products'
            // "quantity": "Aantal", // Default to 'Quantity'
            // "price": "Prijs", // Defaults to 'Price'
            // "product-total": "Totaal", // Defaults to 'Total'
            // "total": "Totaal" // Defaults to 'Total'
        },
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
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
