import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors } from "../../redux/actions/roomActions";
import Head from "next/head";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

import { Carousel } from "react-bootstrap";
import RoomFeatures from "../RoomFeatures";

const RoomDetails = () => {
  
    const dispatch = useDispatch()
    const {room, error} = useSelector(state => state.roomDetails)
    const [checkInDate, setCheckInDate] = useState(new Date())
    const [checkOutDate, setCheckOutDate] = useState(new Date())
    // console.log(rooms)
    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch(clearErrors())
      }
    }, [])
    const onChange = (values, dateString) => {
      const [checkInDate, checkOutDate] = dateString;
      setCheckInDate(checkInDate)
      setCheckOutDate(checkOutDate)
      console.log(checkInDate)
      console.log(new Date(checkInDate).toISOString())


      
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
              <div className="rating-inner" style={{width: `${(room.ratings / 5) * 100}%`}}>
              
              </div>
              <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
            </div>
        </div>
        <Carousel hover="pause">
            {room.images && room.images.map(image => (
                <Carousel.Item key={image.public_id}>
                    <div style={{width: "100%", height: "440px"}}  >
                        <img src={image.url} alt={room.name} style={{width: "100%", height: "100%", objectFit: "cover"}} />
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
              />
              <button className="btn btn-block py-3 booking-btn">Pay</button>
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
