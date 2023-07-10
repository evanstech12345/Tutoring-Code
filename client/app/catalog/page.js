"use client";

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./page.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import axios from "axios"
import Cookies from "js-cookie";
import ReactDOM from 'react-dom'

export default function  Catalog() {






    let token = Cookies.get("accessToken");
    
    const refreshToken = Cookies.get("refreshToken");
    if(!token) {
      token = refreshToken;
      console.log("Refresh token is now set to token")
    }
   

  const checkout = (e) => {
  //getting the product names from their elements
  //!using virtual DOM elements
  //!need to fix the circular error





  //get the element id of the element that is clicked 
    // const scratchFun = JSON.stringify(document.getElementById('scratch').innerText)
    // const pythonPro = JSON.stringify(document.getElementById('python').innerText)
    // const javascriptPro = JSON.stringify(document.getElementById('javascript').innerText)
    // const webDevNinja = JSON.stringify(document.getElementById('webdev').innerText)

    const elementClicked = e.currentTarget.id


    


    axios({
      method: "post",
      url: "http://localhost:4000/api/payment/create-checkout-session",
      data: {
        elementClicked,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": `Bearer ${token}`,
      }
    })
    .then((response) => {
      const data = response.data;
      console.log("response data from checkout: " + data)//!json.stringify is failing circuler
      if (data) {
        const sessionUrl = data;
        console.log("Session URL:", sessionUrl);
        window.open(sessionUrl);
        console.log("Window opened");
      } else {
        console.log("Invalid response data:", data);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  }


  const subscriptionCheckout = e => {
      //getting the product names from their elements
  //!using virtual DOM elements
  //!need to fix the circular error





  //get the element id of the element that is clicked 
    // const scratchFun = JSON.stringify(document.getElementById('scratch').innerText)
    // const pythonPro = JSON.stringify(document.getElementById('python').innerText)
    // const javascriptPro = JSON.stringify(document.getElementById('javascript').innerText)
    // const webDevNinja = JSON.stringify(document.getElementById('webdev').innerText)

    const elementClicked = e.currentTarget.id


    


    axios({
      method: "post",
      url: "http://localhost:4000/api/subscription/create-checkout-session",
      data: {
        elementClicked,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": `Bearer ${token}`,
      }
    })
    .then((response) => {
      const data = response.data;
      console.log("response data from subscriptionCheckout: " + data)//!json.stringify is failing circuler
      if (data) {
        const sessionUrl = data;
        console.log("Session URL:", sessionUrl);
        window.open(sessionUrl);
        console.log("Window opened");
      } else {
        console.log("Invalid response data-subscription:", data);
      }
    })
    .catch((error) => {
      console.log("subscription-Error:", error);
    });
  }


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
                <Card.Title name="scratchFun" id="scratch" className={styles.cardtitle}>
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
                {/* <form action="/create-checkout-session" method="POST"> */}
                <Button id="scratchFun" className={styles.cardbtn} type="submit" variant="primary" onClick={checkout}>
                  $50 / hour
                </Button>
                {/* </form> */}
              </Card.Body>
            </Card>
          </Col>

          {/*python*/}
          <Col sm>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.cardtitle} id="python" name="pythonPro">Python Pro</Card.Title>
                <hr></hr>
                <Card.Text className={styles.cardtext}>
                  Hands on programming while learning the basics of the most
                  popular programming language. Python is known for its
                  versatility and ease of learning.
                </Card.Text>
                <Card.Subtitle className={styles.cardsub}>
                  Ages: 10+
                </Card.Subtitle>
                <Button id="pythonPro" className={styles.cardbtn} variant="primary" onClick={checkout}>
                $50 / hour
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/*javascript*/}
          <Col sm>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.cardtitle} id="javascript" name="JavascriptPro">
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
                <Button id="javascriptPro" className={styles.cardbtn} variant="primary" onClick={checkout}>
                $50 / hour

                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/*webdev*/}
          <Col sm>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.cardtitle} id="webdev" name="WebDevNinja">
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
                <Button  id="webdevNinja" className={styles.cardbtn} variant="primary" onClick={checkout}>
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
                <Button id="scratchFun" className={styles.cardbtn} variant="primary" onClick={subscriptionCheckout}>
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
                <Button id="pythonPro" className={styles.cardbtn} variant="primary" onClick={subscriptionCheckout}>
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
                <Button id="javascriptPro" className={styles.cardbtn} variant="primary" onClick={subscriptionCheckout}>
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
                <Button id="webdevNinja" className={styles.cardbtn} variant="primary" onClick={subscriptionCheckout}>
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
