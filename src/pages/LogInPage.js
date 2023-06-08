import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import { Link as JoyLink } from "@mui/joy";

import { login } from "../store/auth-store/auth-actions";
import { authActions } from "../store/auth-store/auth-slice";
import LogInSignUpWrapper from "../components/LogInSignUpWrapper/LogInSignUpWrapper";
import Alert from "../components/Alert/Alert";

const LogInPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(authActions.setError(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (error && error.message !== '') {
      setOpen(true);
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setOpen(false);
  };

  const loginHandler = (data) => {
    dispatch(
      login(
        data.email,
        data.password
      )
    );
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      email: formElements.email.value,
      password: formElements.password.value
    };
    loginHandler(data);
  };

  return (
    <>
      <LogInSignUpWrapper title='Welcome back' subtitle='Let&apos;s get started! Please enter your details.'>
        <form
          onSubmit={onSubmitHandler}
        >
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter your email" type="email" name="email" />
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input placeholder="•••••••" type="password" name="password" />
          </FormControl>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link to="/">
              <JoyLink fontSize="sm" fontWeight="lg">
                Forgot password?
              </JoyLink>
            </Link>
            <Link to="/signup">
              <JoyLink fontSize="sm" fontWeight="lg">
                Don't have an account yet?
              </JoyLink>
            </Link>
          </Box>
          <Button type="submit" fullWidth>
            Sign in
          </Button>
        </form>
      </LogInSignUpWrapper>
      {open && error && (
        <Alert severity="error" open={open} handleClose={handleClose} message={error.message} />
      )}
    </>
  );
};

export default LogInPage;
