"use client";
import React from "react";
import style from "./page.module.css";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { redirect } from "next/navigation";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Cookies from 'js-cookie'

export default function Login() {
  const [show, setShow] = useState(false);
  const login = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");
      //urls
      const loginUrl = "http://localhost:4000/api/user/login";
      // const customerUrl = "http://localhost:4000/api/stripe/customer";

      const response = await axios({
        method: "post",
        url: loginUrl,
        data: {
          email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',

        },
        withCredentials: true, //sending cookies with request
      });

      console.log(response); // To debug what the response is.

      if (response?.data) {
        setShow(true);
      } else {
        // Maybe some additional error handling to gracefully handle missing `data`.
        console.log("Set Show Failed to Show")
      }
      setShow(true);

      
    } catch (error) {
      console.log("Error getting data from login" + error);
    }
  };

  return (
    <div className={style.main}>
      <Alert show={show} variant="success">
        <h1>You are Logged In!</h1>
      </Alert>
      <h1 className={style.registerTitle}>Login</h1>
      <Container className={style.registerContainer}>
        <Form onSubmit={login}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
            />
          </FloatingLabel>
          <h3 className={style.dontHaveAccount}>
            <Link href="/register">Dont have an Account?</Link>
          </h3>
          <Button className={style.buttonRegister} type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}












// if (response.data.accessToken && response.data.refreshToken) {
      //   console.log("First Refresh Token: " + response.data.refreshToken);
        
      //   Cookies.set("accessToken", response.data.accessToken, {
      //     domain: "localhost",
      //   });
      //   Cookies.set("refreshToken", response.data.refreshToken, {
      //     domain: "localhost",
      //   });
      //   console.log(
      //     "Access token: " + response.data.accessToken + " refreshToken: " + response.data.refreshToken
      //   )
      // } else {
      //   console.error("Token not found in response");
      // }