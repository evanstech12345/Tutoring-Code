"use client" //!put this on the top of your app for bootstrap to work
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react'
import styles from "./page.module.css"
import Button from "react-bootstrap/Button"
import Link from "next/link"



export default function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.title_home}>Empower Young Minds to Code Their Future!</h1>
      <h2 className={styles.subheading_title}>Get ahead of tech with our amazing tutors.</h2>
      <Button className={styles.getquotehomebtn} size="lg">Get A Quote</Button>
    </div>

  )
}
