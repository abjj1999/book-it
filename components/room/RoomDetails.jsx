import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors } from "../../redux/actions/roomActions";
import Head from "next/head";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import moment from "moment/moment";
import { checkBooking, getBookedDates } from "../../redux/actions/bookingAction";
import { CHECK_BOOKING_RESET } from "../../redux/contants/bookingConstent";
import { getStripe } from "../../utils/getStripe";
import { Carousel } from "react-bootstrap";
import RoomFeatures from "../RoomFeatures";

import axios from 'axios'

const RoomDetails = () => {

  const dispatch = useDispatch()
  const router = useRouter();
  const { room, error } = useSelector(state => state.roomDetails)
  const { available, loading: bookingLoading } = useSelector(state => state.checkBooking)
  const { user } = useSelector(state => state.loadedUser)
  const { dates } = useSelector(state => state.bookedDates)
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date())
  const [daysOfStay, setDaysOfStay] = useState()
  const [paymentLoading, setPaymentLoading] = useState(false);
  const {id} = router.query

  const excludedDates = []
  dates && dates.forEach(date => {
    excludedDates.push(new Date(date))
  })
  // console.log(rooms)
  useEffect(() => {
    dispatch(getBookedDates(id))
    if (error) {
      toast.error(error)
      dispatch(clearErrors())

    }

    return () => {
      dispatch({ type: CHECK_BOOKING_RESET })
    }
  }, [id])
  const onChange = (values) => {
    
    if (values) {
      const checkInDate = values[0].$d
      const checkOutDate = values[1].$d
      console.log(checkInDate)
      console.log(checkOutDate)
      setCheckInDate(checkInDate)
      setCheckOutDate(checkOutDate)
      // console.log(new Date(checkInDate).toISOString())

      //calculate days of stay
      // const d = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 8640000) + 1)
      const days = Math.floor((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))
      setDaysOfStay(days)
      
      dispatch(checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString()))
      
      console.log(available) 
      
      
    }



  }

  const bookRoom = async (id, pricePerNight) => {
    setPaymentLoading(true);

    const amount = pricePerNight * daysOfStay;

    try {
      
      const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`


      const { data } = await axios.get(link, {params: {amount}})

      const stripe = await getStripe();

      // Redirect to Stripe Checkout
      stripe.redirectToCheckout({ sessionId: data.id });
      setPaymentLoading(false);
    } catch (error) {
      setPaymentLoading(false);
      console.log(error);
      toast.error(error.message)
    }
  }


  const newBookingHandler = async () => {

    const bookingData = {
      room: router.query.id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: 'STRIPE_PAYMENT_ID',
        status: 'STRIPE_PAYMENT_STATUS'
      }
    }

    try {

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const { data } = await axios.post('/api/bookings', bookingData,
        config)

        console.log(data);

    } catch (error) {

      console.log(error.response);
    }
  }
  return (
    <>
      <Head>
        <title>{room.name} - BookIT</title>
      </Head>
      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>
        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div className="rating-inner" style={{ width: `${(room.ratings / 5) * 100}%` }}>

            </div>
            <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
          </div>
        </div>
        <Carousel hover="pause">
          {room.images && room.images.map(image => (
            <Carousel.Item key={image.public_id}>
              <div style={{ width: "100%", height: "440px" }}  >
                <img src={image.url} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>
              {room.description}
            </p>
            <RoomFeatures room={room} />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${room.pricePerNight}</b> / night


              </p>
              <hr />
              <div className="mt-5 mb-3">
                Pick Check In Date and Check Out Date
              </div>
              <RangePicker
                onChange={onChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                format="DD/MM/YYYY"
                disabledDate={
                  (date) => {
                    return excludedDates.some(excludedDate => date.isSame(excludedDate, 'day'))
                  }
                } 
              />
              {available === true && (
                <div className="alert alert-success mt-3 font-weight-bold">
                  Room is available. Book Now.
                </div>
              )}
              {available === false && (
                <div className="alert alert-danger mt-3 font-weight-bold">
                  Room is not available. Try different dates.
                </div>
              )}

              {available && !user && (
                <div className="alert alert-danger mt-5">
                  Login to book a room
                </div>
              )}
              {available && user && (
                <button 
              
                className="btn btn-block py-3 booking-btn" 
                onClick={() => bookRoom(room._id, room.pricePerNight)}
                disabled= {bookingLoading || paymentLoading ? true : false}
                >Pay - ${daysOfStay * room.pricePerNight }</button>
              )}

              
            </div>
          </div>
        </div>
        <div className="reviews w-75">
          <h3>Reviews:</h3>
          <hr />
          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner" />
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>
            <hr />
          </div>
          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner" />
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
