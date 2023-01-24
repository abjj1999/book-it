import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/userActions";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.loadedUser);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const logoutHandler = () => {
    signOut();
    

  }

  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <Link href="/" >
            
            <img src="/images/bookit_logo.png" alt="BookIT" style={{cursor: 'pointer'}} />
            </Link>
          </div>
        </div>
        <div className="col-3 mt-3 mt-md-0 text-center">
          {user ? (
            <div className="ml-4 dropdown d-line">
              <a className="btn dropdown-toggle mr-4" 
                id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img src= {user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle" />
                </figure>
                <span>{user && user.name}</span>
              </a>
              <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                <Link  href="/bookings/me" className="dropdown-item">
                  <span className="dropdown-iten">
                    My Bookings
                  </span>
                </Link>
                <Link  href="/me/update" className="dropdown-item">
                  <span className="dropdown-iten">
                    Profile
                  </span>
                </Link>
                <Link  href="/" className="dropdown-item">
                  <span onClick={logoutHandler} className="dropdown-iten text-danger">
                    Logout
                  </span>
                </Link>
              </div>
            </div>
          ): !loading && (
            <Link href='/login' className="btn btn-danger px-4 text-white login-header-btn float-right">
            Login
          </Link>
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Header;
