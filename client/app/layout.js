"use client" //!put this on the top of your app for bootstrap to work
import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';
import Image from "react-bootstrap/Image";
import styles from "./page.module.css";
import Link from "next/link";



// const DynamicNav = dynamic(() => import("react-bootstrap/Nav"), {
//   ssr: false, // Disable server-side rendering for this component
// });

export default function Layout({

  children, // will be a page or nested layout
}) {
  return (
    <section className={styles.main}>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar className={styles.nav}>
      <Container>
        <Navbar.Brand href="#home"><Image src="Logo.png" className={styles.logo} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about" className={styles.navtext}>About</Nav.Link>
            <Nav.Link href="#link" className={styles.navtext}>Catalog</Nav.Link>
            <Nav.Link href="#link" className={styles.navtext}>Why Code?</Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      {children}
    </section>
  );
}
