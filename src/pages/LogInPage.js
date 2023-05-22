import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/auth-store/auth-actions";
import { authActions } from "../store/auth-store/auth-slice";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { Link as JoyLink } from "@mui/joy";
import LogInSignUpWrapper from "../components/LogInSignUpWrapper/LogInSignUpWrapper";

const LogInPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    return () => {
      dispatch(authActions.setError(null));
    };
  }, [dispatch]);

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
          {error && (
            <Typography level="body2" color="error.main">
              {error.message}
            </Typography>
          )}
        </form>
      </LogInSignUpWrapper>
    </>
  );
};

export default LogInPage;
