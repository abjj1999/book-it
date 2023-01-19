import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import { clearErrors, resetPassword } from "../../redux/actions/userActions";
import BtnLoader from "../layout/BtnLoader";

const NewPassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { error, loading, success } = useSelector(state => state.forgotPassword);
    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(success) {
            router.push('/login');
        }

    }, [dispatch, error, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        const passwords = {
            password, confirmPassword
        }

        dispatch(resetPassword(passwords, router.query.token));
        
    }
  return (
    <div className="row wrapper">
  <div className="col-10 col-lg-5">
    <form
    onSubmit={submitHandler}
    className="shadow-lg">
      <h1 className="mb-3">New Password</h1>
      <div className="form-group">
        <label htmlfor="password_field">Password</label>
        <input type="password" id="password_field" className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlfor="confirm_password_field">Confirm Password</label>
        <input type="password" id="confirm_password_field" className="form-control"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button id="new_password_button" type="submit" className="btn btn-block py-3"
      disabled={loading ? true : false}
      >
        {loading ? <BtnLoader /> : "Set Password"}
      </button>
    </form>
  </div>
</div>

  )
}

export default NewPassword
