import React, { useEffect } from "react";
import Pagination from "react-js-pagination";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import RoomItem from "./room/RoomItem";
import { clearErrors } from "../redux/actions/roomActions";
import { useRouter } from "next/router";

const Home = () => {
  const dispatch = useDispatch();
  const { rooms, error, resPerPage, roomsCount, filteredRoomsCount } = useSelector((state) => state.allRooms);
  // console.log(rooms)
  const router = useRouter();
  let {page = 1} = router.query;
  page = Number(page);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, []);
  const handlePagination = (pageNumber) => {
    router.push(`/?page=${pageNumber}`);
  }
  return (
<>
    <section id="rooms" className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>
      <a href="#" className="ml-2 back-to-search">
        {" "}
        <i className="fa fa-arrow-left" /> Back to Search
      </a>
      <div className="row">
        {rooms && rooms.length === 0 ? (
          <div
            className="alert alert-danger mt-5 w-100 text-center"
            role="alert"
          >
            No Rooms Found.
          </div>
        ) : (
          rooms && rooms.map((room) => <RoomItem key={room._id} room={room} />)
        )}
      </div>
    </section>
    {resPerPage <= roomsCount && (
      <div className="d-flex justify-content-center mt-3">

    <Pagination 
      activePage={page}
      itemsCountPerPage={resPerPage}
      totalItemsCount={roomsCount}
      onChange={handlePagination}
      nextPageText={"Next"}
      prevPageText={"Prev"}
      firstPageText={"First"}
      lastPageText={"Last"}
      itemClass="page-item"
      linkClass="page-link"
      
      />
      </div>
    )}
    </>
  );
};

export default Home;
