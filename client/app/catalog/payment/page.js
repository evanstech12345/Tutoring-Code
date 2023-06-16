"use client"
import React, { useState, useEffect}  from 'react'
import style from "./page.module.css"
import axios from "axios"
import Cookies from "js-cookie"
import Button from "react-bootstrap/Button"

export default function Payment() {
  const token = Cookies.get('token');

  const handleCheckout = async () => {
  
    console.log("token for payment frotend " + token)
  
    const stripeURL = 'http://localhost:4000/api/payment/create-payment-intent';
    try {
      const response = await axios.post({
        stripeURL,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': token,
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Handle the response from the server
    } catch (error) {
      console.log('Error creating checkout session:', error);
    }
  };

  return (
    <div className={style.main}>
      <Button onClick={handleCheckout}>Test</Button>
    </div>
  );
}
