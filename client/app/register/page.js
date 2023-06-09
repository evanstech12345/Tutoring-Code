"use client";
//  import "bootstrap/dist/css/bootstrap.min.css";

import style from "./page.module.css";

import React from "react";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import axios from "axios";
import { redirect } from 'next/navigation'
import Alert from 'react-bootstrap/Alert';


export default function Register() {
  const [show, setShow] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const register = (e) => {

    e.preventDefault(); //prevents the default behavior of submitting the form



    axios({
      method: "post",
      url: "http://localhost:4000/api/user/register",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
        
      },
      data: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
      }), // Convert the data to JSON format
    })
      .then((res) => setShow(true))
      .catch((err) => console.log(err));
  }

  return (
    <div className={style.main}>
      <Alert show={show} variant="success">
        <h1>You are Signed in! Please Login</h1>
      </Alert>
      <h1 className={style.registerTitle}>Register</h1>
      <Container className={style.registerContainer}>
        <Form onSubmit={register}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"

              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"

              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </FloatingLabel>
          <h3 className={style.loginLink}><Link href="/login">Already have an account?</Link></h3>
         <Button className={style.buttonRegister} type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}