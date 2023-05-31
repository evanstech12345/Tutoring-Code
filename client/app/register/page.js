"use client"
import React from 'react'
import style from "./page.module.css"
import Container from'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios"

export default function Register() {

  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const register = () => {
    axios({
      method: 'post',
      url: 'http://localhost:5000/register',
            data: {
              email: registerEmail,
              password: registerPassword,
    }})
  }

  return (
    <div className={style.main}>
        <h1 className={style.registerTitle}>Register</h1>
        <Container className={style.registerContainer}>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" name="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" >
        <Form.Control type="password" placeholder="Password" name="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
      </FloatingLabel>
      <Button className={style.buttonRegister} type="submit" onClick={register}>Submit</Button>
    </Container>
    </div>
  )
}
