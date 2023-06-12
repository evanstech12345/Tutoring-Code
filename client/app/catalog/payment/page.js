"use client"
import React, { useState, useEffect}  from 'react'
import style from "./page.module.css"
import axios from "axios"

export default function Payment() {

    return (
      <div className={style.main}>
        <form action="/create-checkout-session" method="POST">
      <button type="submit">Checkout</button>
        </form>
      </div>
  )
}
