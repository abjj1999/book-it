import React from 'react'
import Image from 'next/image'

const RoomItem = ({room}) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
    <div className="card p-2">
      <img 
      height={170}
        width={260}
       className="card-img-top mx-auto" src={room.images[0].url} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          <a >Charming Studio &lt; 10 Miles to Wells' Beaches!</a>
        </h5>
        <div className="ratings mt-auto mb-3">
          <p className="card-text"><b>$12</b> / night</p>
          <div className="rating-outer">
            <div className="rating-inner" />
          </div>
          <span id="no_of_reviews">(5 Reviews)</span>
        </div>
        <button className="btn btn-block view-btn">
          <a href="#">View Details</a>
        </button>
      </div>
    </div>
  </div>
  )
}

export default RoomItem
