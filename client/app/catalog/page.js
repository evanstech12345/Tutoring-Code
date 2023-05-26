import React from 'react'
import styles from "./page.module.css"
import Link from "next/link"

export default function about() {
  return (
    <div className={styles.main}>
        <h1 className='about-title'>Catalog</h1>
        <Link href='/'>Go back to Home</Link>
    </div>
  )
}