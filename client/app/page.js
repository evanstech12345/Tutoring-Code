"use client" //!put this on the top of your app for bootstrap to work
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react'
import styles from "./page.module.css"
import Button from "react-bootstrap/Button"
import Link from "next/link"
import Image from "react-bootstrap/Image";




export default function Home() {
  


  return (
    <div className={styles.main}>
      <Image className={styles.logo} src="/Logo.png" alt="logo" />
      <div className={styles.leftText}>
      <h1 className={styles.title_home}>Empowering Young Minds to <br />Code Their Future!</h1>
      <h2 className={styles.subheading_title}>Get ahead in tech with our amazing tutors.</h2>
      <Link href="/catalog"><Button className={styles.getquotehomebtn} size="lg">Find a Course</Button></Link>
      </div>
    </div>

  )
}
