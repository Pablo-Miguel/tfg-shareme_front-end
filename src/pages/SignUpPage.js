import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/auth-store/auth-actions";
import { authActions } from "../store/auth-store/auth-slice";

const SignUpPage = () => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nickNameInputRef = useRef();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    return () => {
      dispatch(authActions.setError(null));
    };
  }, [dispatch]);

  const signupHandler = (event) => {
    event.preventDefault();

    dispatch(
      signUp(
        firstNameInputRef.current.value,
        lastNameInputRef.current.value,
        nickNameInputRef.current.value,
        emailInputRef.current.value,
        passwordInputRef.current.value
      )
    );
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="firstName">First Name </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          ref={firstNameInputRef}
        />
        <br />
        <br />
        <label htmlFor="lastName">Last Name </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          ref={lastNameInputRef}
        />
        <br />
        <br />
        <label htmlFor="nickName">NickName </label>
        <input
          type="text"
          name="nickName"
          id="nickName"
          ref={nickNameInputRef}
        />
        <br />
        <br />
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
        <button onClick={signupHandler} type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUpPage;
