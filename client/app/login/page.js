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
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  let [token, setToken] = useState("");


  

  const login = async (e) => {
    e.preventDefault();

  
    try{
      //urls 
      const loginUrl = "http://localhost:4000/api/user/login";
      const customerUrl = "http://localhost:4000/api/stripe/customer";
      // console.log(response.data.token);
      let response = await axios({
        method: "post",
        url: loginUrl,
        data: {
          email: loginEmail,
          password: loginPassword
        },
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token, // Set the Content-Type header
        },
      }

    ).then((response) => setShow(true))
    // .then(data => response)
    .catch((error) => console.log("Error with Login Response" + error))


  if (response.data && response.data.token) {
        let token = response.data;
        setToken(token);
        console.log("Login succesful. email: " + email+ "token: " + token)
        const response2 = await axios({
          url: customerUrl,
          data: {
            email: loginEmail,
          },
          headers: {
            "x-access-token": token,
          }
        });
        if (response2) {
          console.log("Customer Data Success")
        } else {
          console.log("Customer Data Failure")
        }

        axios.all([response, response2], axios.spread((response, response2) => {
          console.log("RESPONSE 1: " + response.data)
          console.log("RESPONSE 2:" + response2.data)
        }))
        .catch((error) => {
          console.error("ERROR: " + error)
        });

        // Perform further actions with the token, such as storing it in localStorage or redirecting to a new page

      } else {
        // Handle the case when the token is not present in the response
        console.error("Token not found in response");
      }
    } catch (error) {
      console.log("Error getting data from login" + error);
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
              
              onChange={(e) => setLoginEmail(e.target.value)}
              
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setLoginPassword(e.target.value)}
              
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