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

export default function Login() {
  const [token, setToken] = useState("");
  //checking if user has a token

  

  const login = async (e) => {
    axios({
      method: "post",
      url: "http://localhost:4000/api/user/login",
      data: {
        email,
        password
      },
    })
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const { token } = response.data;
    setToken(token);
  }


  return (
    <div className={style.main}>
      <h1 className={style.registerTitle}>Login</h1>
      <Container className={style.registerContainer}>
        <Form>
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

          <Button className={style.buttonRegister} type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
