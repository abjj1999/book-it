import Link from "next/link";
import React from "react";

const Header = () => {
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
          <Link href='/login' className="btn btn-danger px-4 text-white login-header-btn float-right">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
