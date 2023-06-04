"use client";
import React from "react";
import style from "./page.module.css";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import axios from "axios";

export default function Register() {
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className={style.main}>
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
