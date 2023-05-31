"use client";

import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import Badge from 'react-bootstrap/Badge';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./page.module.css";
import Button from "react-bootstrap/Button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className={styles.main}>
      <Nav defaultActiveKey="/home" className={styles.nav}>
        <Nav.Link className={styles.navitem} href="/dashboard">Dashboard</Nav.Link>
        <Badge bg="primary" pill></Badge>
        <Nav.Link className={styles.navitem} href="/register" eventKey="link-1">Register</Nav.Link>
        <Nav.Link className={styles.navitem} eventKey="link-2">Courses</Nav.Link>
      </Nav>



      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tutor</th>
            <th>Course</th>
            <th>Price</th>
            <th>Date</th>


          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>


          </tr>
          <tr>
            <td>2</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>


          </tr>
          <tr>
            <td>3</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>


          </tr>
        </tbody>
      </Table>
    </div>
  );
}
