import React from 'react'
import styles from "./page.module.css"
import Link from "next/link"

export default function about() {
  return (
    <div className={styles.main}>
        <h1 className={styles.abouttitle}>About Coder</h1>
        <p className={styles.aboutparagraph}>Coder is an innovative online platform that connects tutors with children who are eager to explore the world of programming. At Coder, our mission is to introduce children to cutting-edge technologies and empower them to develop their programming skills as a hobby that can lead to a successful career in the future.
</p>
    </div>
  )
}
