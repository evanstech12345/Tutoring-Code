"use client"; //!put this on the top of your app for bootstrap to work
import "bootstrap/dist/css/bootstrap.min.css";
// import dynamic from 'next/dynamic';
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

import NavDropdown from "react-bootstrap/NavDropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";

import styles from "./page.module.css";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Layout({ children }) {

  return (
    <html>
    <body className={styles.main}>
      {/* Include shared UI here e.g. a header or sidebar */}

      <Nav
        activeKey="/home"
        className={styles.nav}
      >
        <div className={styles.logodiv}>
          <Link href="/">
            <Image className={styles.logo} src="/Logo.png" alt="logo" />
          </Link>
        </div>
        <Nav.Item>
          <Nav.Link href="/about" className={styles.navtext}>
            About
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/catalog"
            eventKey="link-1"
            className={styles.navtext}
          >
            Catalog
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/whycode"
            eventKey="link-2"
            className={styles.navtext}
          >
            Why Code?
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/dashboard"
            eventKey="link-2"
            className={styles.navtext}
          >
            Dashboard
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {children}

    </body>
    </html>

  );
}
