"use client";

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./page.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

export default function Catalog() {


  return (
    <div className={styles.main}>
      <Tabs>
        <TabList className={styles.tabList}>
          <Tab>One Time</Tab>
          <Tab>Subscription</Tab>
        </TabList>
      {/*One Time*/}
      <h1 className={styles.titlecatalog}>Catalog</h1>
      <TabPanel>
      <Container className={styles.cardcontainer} fluid="md">
        <Row>
          {/*scratch*/}
          <Col sm>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.cardtitle}>
                  Scratch Fun
                </Card.Title>
                <hr></hr>
                <Card.Text className={styles.cardtext}>
                  Learn a fun way to get into programming. This will give your
                  child a great understanding of the basics of programming while
                  still being easy and fun
                </Card.Text>
                <Card.Subtitle className={styles.cardsub}>
                  Ages: 8-10
                </Card.Subtitle>
                <form action="/api/payment/create-checkout-session" method="POST">
                <Button className={styles.cardbtn} type="submit" variant="primary">
                  $50 / hour
                </Button>
                </form>
              </Card.Body>
            </Card>
          </Col>

          {/*python*/}
          <Col sm>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.cardtitle}>Python Pro</Card.Title>
                <hr></hr>
                <Card.Text className={styles.cardtext}>
                  Hands on programming while learning the basics of the most
                  popular programming language. Python is known for its
                  versatility and ease of learning.
                </Card.Text>
                <Card.Subtitle className={styles.cardsub}>
                  Ages: 10+
                </Card.Subtitle>
                <Button className={styles.cardbtn} variant="primary">
                $50 / hour
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/*javascript*/}
          <Col sm>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.cardtitle}>
                  Javascript Pro
                </Card.Title>
                <hr></hr>
                <Card.Text className={styles.cardtext}>
                  Step up your game with a industry-leading programming
                  language. With its widespread popularity, JavaScript dominates
                  the web development landscape.
                </Card.Text>
                <Card.Subtitle className={styles.cardsub}>
                  Ages: 10+
                </Card.Subtitle>
                <Button className={styles.cardbtn} variant="primary">
                $50 / hour

                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/*webdev*/}
          <Col sm>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.cardtitle}>
                  Web Dev Ninja
                </Card.Title>
                <hr></hr>
                <Card.Text className={styles.cardtext}>
                  Become a master of HTML, JavaScript, and CSS. With these three
                  essential languages, you can create captivating digital
                  websites
                </Card.Text>
                <Card.Subtitle className={styles.cardsub}>
                  Ages: 12+
                </Card.Subtitle>
                <Button className={styles.cardbtn} variant="primary">
                $50 / hour
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </TabPanel>






    {/*Subscription*/}

      <TabPanel>
      <Container className={styles.cardcontainer} fluid="md">
        <Row>
          {/*scratch*/}
          <Col sm>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.cardtitle}>
                  Scratch Fun
                </Card.Title>
                <hr></hr>
                <Card.Text className={styles.cardtext}>
                  Learn a fun way to get into programming. This will give your
                  child a great understanding of the basics of programming while
                  still being easy and fun
                </Card.Text>
                <Card.Subtitle className={styles.cardsub}>
                  Ages: 8-10
                </Card.Subtitle>
                <Button className={styles.cardbtn} variant="primary">
                $30 / week

                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/*python*/}
          <Col sm>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.cardtitle}>Python Pro</Card.Title>
                <hr></hr>
                <Card.Text className={styles.cardtext}>
                  Hands on programming while learning the basics of the most
                  popular programming language. Python is known for its
                  versatility and ease of learning.
                </Card.Text>
                <Card.Subtitle className={styles.cardsub}>
                  Ages: 10+
                </Card.Subtitle>
                <Button className={styles.cardbtn} variant="primary">
                $30 / week

                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/*javascript*/}
          <Col sm>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.cardtitle}>
                  Javascript Pro
                </Card.Title>
                <hr></hr>
                <Card.Text className={styles.cardtext}>
                  Step up your game with a industry-leading programming
                  language. With its widespread popularity, JavaScript dominates
                  the web development landscape.
                </Card.Text>
                <Card.Subtitle className={styles.cardsub}>
                  Ages: 10+
                </Card.Subtitle>
                <Button className={styles.cardbtn} variant="primary">
                  $30 / week
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/*webdev*/}
          <Col sm>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.cardtitle}>
                  Web Dev Ninja
                </Card.Title>
                <hr></hr>
                <Card.Text className={styles.cardtext}>
                  Become a master of HTML, JavaScript, and CSS. With these three
                  essential languages, you can create captivating digital
                  websites
                </Card.Text>
                <Card.Subtitle className={styles.cardsub}>
                  Ages: 12+
                </Card.Subtitle>
                <Button className={styles.cardbtn} variant="primary">
                $30 / week

                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </TabPanel>
      </Tabs>

    </div>
  );
}
