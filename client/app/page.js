import React from 'react'
import styles from "./page.module.css"
import Link from "next/link"

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.title_home}>Home</h1>
      <Link href="/about">Go to About Page</Link>
    </div>

  )
}
