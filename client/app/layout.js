import styles from './page.module.css'
import Link from 'next/link'

export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
      <section className={styles.main}>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav>Nav</nav>
   
        {children}
      </section>
    );
  }