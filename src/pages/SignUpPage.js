import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { Link as JoyLink } from "@mui/joy";

import { signUp } from "../store/auth-store/auth-actions";
import { authActions } from "../store/auth-store/auth-slice";
import LogInSignUpWrapper from "../components/LogInSignUpWrapper/LogInSignUpWrapper";
import { Grid } from "@mui/material";
import Alert from "../components/Alert/Alert";

const SignUpPage = () => {
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

  const signupHandler = (data) => {
    dispatch(
      signUp(
        data.firstName,
        data.lastName,
        data.nickName,
        data.email,
        data.password
      )
    );
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      firstName: formElements.firstName.value,
      lastName: formElements.lastName.value,
      nickName: formElements.nickName.value,
      email: formElements.email.value,
      password: formElements.password.value
    };
    signupHandler(data);
  };

  return (
    <>
      <LogInSignUpWrapper title='Welcome to ShareMe' subtitle='Let&apos;s get started! Please enter your details.'>
        <form
          onSubmit={onSubmitHandler}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl required>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="Enter your first name" type="text" name="firstName" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl required>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Enter your last name" type="text" name="lastName" />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl required>
            <FormLabel>NickName</FormLabel>
            <Input placeholder="Enter your NickName" type="text" name="nickName" />
          </FormControl>
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
            <span />
            <Link to="/">
              <JoyLink fontSize="sm" fontWeight="lg">
                Back to Login
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

export default SignUpPage;
