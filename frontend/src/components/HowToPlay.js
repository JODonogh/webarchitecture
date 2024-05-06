import React from "react";

//importing react bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//importing images
import Warhammer from './images/Warhammer.jpg'
import WFRP from './images/WFRP.jpeg'

function HowToPlay(){
    return(
        <Container>
        <div>
            <h1 align="center" ><b>How to Play</b></h1>
            <p>Roleplaying Games are a great way to connect with people, providing moments of unmitigated joy and companionship while escaping the pressures of daily life.
We take this fun seriously and aim to create inclusive and engaging entertainment for all.</p>
        <Row>
        <Col>
<img src={Warhammer} width="500" height="300" alt="Cover from Warhammer Corebook "/>
</Col>
            <Col>
        <h2>About RPGs</h2>
We’ve gathered together our most pertinent practical information to help you get the most out of our RPGs and your games. We have broken this information down into:

RPG Basics
A Players Guide
How to be a Gamemaster

We will update and add to these pages to create an ever-improving catalogue of information and advice to help you get the most from your games. We would love to hear your feedback or suggestions on Facebook, Twitter, or Instagram.
</Col>
</Row>
<br />
<Row>
<Col>
<img src={WFRP} width="500" height="300" alt="WFRP internal from Starter set"/>
</Col>
<Col>
<h2>Getting Started</h2>
        Are you completely new to Role Playing Games (RPGs)? Our RPG Basics section is the perfect starting point. It breaks down what a roleplaying game is and how to get started. It also contains information about characters, using dice, and using rulebooks to play a roleplaying game.

 </Col>
</Row> 
<br />      
<Row>
    <Col><h2>Enhance your skills</h2>
        Have you played a roleplaying game and are keen to enhance your skills? Check out our Player’s Guide for some advice on how to get more from your games. 

Players and Gamemasters both have influence on the unfolding story and how much fun everyone has at the table. Playing and Gamemastering are both fun, but are also skills you can improve at, making your games even better.      
</Col>
</Row>       
<br />
<Row>
    <Col> 
    <h2>Become a Gamemaster</h2>
        <p>
        Being a Gamemaster is a uniquely rewarding experience that we think everyone should try. Some see it as a daunting challenge, but it’s a lot easier than most people think. However, if you’ve ever been a Gamemaster before, you know that there are always ways to improve. Do you want to sit behind the screen, know all the secrets of the story, and play as an entire world? Or do you want to find a few tips and tricks to bolster your Gamemastering skills? Either way, our How to be a Gamemaster section is a great place to start. 
        </p></Col>
</Row>

        </div>
        </Container>
    )
}

export default HowToPlay;