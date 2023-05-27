"use client" //!put this on the top of your app for bootstrap to work
import "bootstrap/dist/css/bootstrap.min.css";
// import dynamic from 'next/dynamic';
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import styles from "./page.module.css";
import Link from "next/link";
import { Container } from "react-bootstrap";



// const DynamicNav = dynamic(() => import("react-bootstrap/Nav"), {
//   ssr: false, // Disable server-side rendering for this component
// });

export default function Layout({

  children, // will be a page or nested layout
}) {
  return (
    <section className={styles.main}>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        className={styles.nav}
      >
        <div className={styles.logodiv}>
        <Link href="/"><Image className={styles.logo} src="/Logo.png" alt="logo" /></Link>
        </div>
        <Nav.Item>
          <Nav.Link href="/about" className={styles.navtext}>About</Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link href="/catalog" eventKey="link-1" className={styles.navtext}>Catalog</Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link href="/whycode" eventKey="link-2" className={styles.navtext}>Why Code?</Nav.Link>
        </Nav.Item>
      </Nav>

      {children}
    </section>
  );
}
