"use client";
import React from "react";
import style from "./page.module.css";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { redirect } from 'next/navigation';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';


export default function Login() {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState("");
  //checking if user has a token

  

  const login = async (e) => {
    e.preventDefault();

  
    try{
      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/api/user/login",
        data: {
          email,
          password
        },
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token // Set the Content-Type header
        },
      }

    ).then((res) => setShow(true))

    console.log(response.data.token)

  if (response.data && response.data.token) {
        const { token } = response.data;
        setToken(token);
        console.log("Login succesful. email: " + email+ "token: " + token)
        // Perform further actions with the token, such as storing it in localStorage or redirecting to a new page
      } else {
        // Handle the case when the token is not present in the response
        console.error("Token not found in response");
      }

    } catch (error) {
      console.log(error);
    }

  }


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
          <h3 className={style.dontHaveAccount}><Link  href="/register">Dont have an Account?</Link></h3>
          <Button className={style.buttonRegister} type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
