"use client"
import React from 'react'
import style from "./page.module.css"






export default function Payment() {
    //if user doesnt have the token, redirect them to the sign in page
  return (
    <div className={style.main}>
        <h1>Payment</h1>
    </div>
  )
}
