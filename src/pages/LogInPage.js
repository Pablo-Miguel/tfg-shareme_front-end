import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/auth-store/auth-actions";
import { authActions } from "../store/auth-store/auth-slice";

const LogInPage = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    return () => {
      dispatch(authActions.setError(null));
    };
  }, [dispatch]);

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(
      login(
        emailInputRef.current.value,
        passwordInputRef.current.value
      )
    );
  };

  return (
    <>
      <h1>Log In</h1>
      <form>
        <label htmlFor="email">Email </label>
        <input type="email" name="email" id="email" ref={emailInputRef} />
        <br />
        <br />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordInputRef}
        />
        <br />
        <br />
        {error && (
          <div>
            <p>{error.message}</p>
          </div>
        )}
        <button onClick={loginHandler} type="submit">
          Log In
        </button>

        <p>
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </form>
    </>
  );
};

export default LogInPage;
