"use client";//if you have bootstrap you need this 

import React from 'react'
import styles from "./page.module.css"
import Link from "next/link"
import Image from "react-bootstrap/Image";


export default function about() {
  return (
    <div className={styles.main}>
        <h1 className={styles.abouttitle}>Learning to code is hard!</h1>
      
      <div className={styles.kid1Container}>
        <Image className={styles.kid1} src="/kidcoding1.jpg" alt="logo" />
        <h1 className={styles.h1kid1}>Coding at a young age is very challenging and often times discouraging. Anyone can do it, know matter the age!</h1>
      </div>

      <div className={styles.kid2Container}>
      <Image className={styles.kid2} src="/kidscoding2.jpg" alt="logo" />
      <h1 className={styles.h1kid2}>Our tutors bring expertise when it comes to programming and nurturing young minds. Their extensive experience isnt just limited to technical proficiency; it extends to the art of effective teaching and mentorship</h1>
      </div>

      <div className={styles.kid3Container}>
      <Image className={styles.kid3} src="/kidscoding3.jpg" alt="logo" />
      <h1 className={styles.h1kid3}>We will work 1 on 1 with your kid online to help them build problem solving skills, coding skills, and most importantly find coding fun and enjoyable </h1>
      </div>
    </div>
  )
}
