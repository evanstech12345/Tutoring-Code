import React from 'react'
import styles from "./page.module.css"
import Link from "next/link"

export default function about() {
  return (
    <div className={styles.main}>
        <h1 className={styles.whycodetitle}>Why Code?</h1>
        <p className={styles.whycodeparagraph}>Introducing coding to children can be incredibly beneficial for their development and future success. Firstly, coding nurtures problem-solving skills and critical thinking abilities, teaching children to approach challenges with a logical mindset and break them down into manageable steps. It enhances their ability to analyze, troubleshoot, and find innovative solutions. Secondly, coding fosters creativity and unleashes imagination as children learn to create their own digital projects, such as websites, games, or animations. It allows them to express their ideas in a unique and interactive way, empowering them to become creators rather than just consumers of technology. </p>
    </div>
  )
}