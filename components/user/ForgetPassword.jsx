import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import { clearErrors, forgotPassword } from "../../redux/actions/userActions";
import BtnLoader from "../layout/BtnLoader";


const ForgetPassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const { error, loading, message } = useSelector(state => state.forgotPassword);
    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(message) {
            toast.success(message);
            
        }
    }, [dispatch, error, message]);
    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            email
        }
        dispatch(forgotPassword(userData));
    }
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
        onSubmit={submitHandler}
        className="shadow-lg">
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <label htmlfor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            {loading ? <BtnLoader /> : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
