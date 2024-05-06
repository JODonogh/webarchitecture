import React from "react";

//bootstrap elements imported
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

//Images from image folder
import Ennie from './images/Ennie.jpg';
import Medal from './images/Medal.jpg';
import Dom from './images/Dom.jpg';

const About = () =>{
    return(// rendering out bootstrap containers, grid rows & columns for organisation
        <Container>
            <Row>
            <Col>            
                <h1 align="center">
                <b>About Us</b>
                </h1>
            </Col>
             </Row>
            <Row>
                <Col><h2>Our Story</h2>
            
            <p>
            Dom (C7 Founder, CEO and game designer) is a passionate gamer. He loves all forms of games, but tabletop RPGs are his true love. He joined forces with others who shared his passion and started creating games in 2006. Now with an ever growing team of designers, writers, artists, and gamers, he is thrilled to be making the social, creative, and clever roleplaying games he loves — and you do too.

    Cubicle 7 is the multi award winning team behind Warhammer Age of Sigmar: Soulbound, Warhammer 40,000 Wrath and Glory revised edition, Warhammer Fantasy Roleplay Fourth Edition, Doctor Who: The Roleplaying Game Second Edition, The One Ring™ Roleplaying Game first edition, Adventures in Middle-earth™, The Lone Wolf Adventure Game™ and Victoriana™. And much much more to come.

We are constantly creating new games and have a team dedicated to bringing exciting, social, creative and fun products to life.

Our games are played in every corner of the world and have been translated into seven different languages. Devoted gamers in over 80 countries order our games every year and delivering that many books and games keeps our very friendly Fulfilment and Customer Service team very busy! Our print, retail distribution, and shipping partners are vital to our success, and we are dedicated to supporting local game stores to bring our favourite hobby to a new generation of gamers. 
            </p></Col>
            <Col><img src={Dom} width="500" height="500" alt="CEO & Our games"/></Col>
          
            <br />
                
            </Row>
            <Row>
                <Col><img src={Ennie} width="400" height="200" alt="Books on Shelf"/></Col>
                <Col><h2>Accreditations</h2>
                <b>We are proud members of:</b>
                <ul>
                    <li>The Ethical Toy Program -<a href="https://www.ethicaltoyprogram.org/en/">https://www.ethicaltoyprogram.org/en/</a> </li>
                    <li>IMIRT: The Irish Game Makers Association<a href="https://www.imirt.ie/">https://www.imirt.ie/</a></li>
                    <li>Bits and Mortar (bits-and-mortar.com)</li>
                    <li>GAMA - the Game Manufacturers Association </li>
                </ul>
                </Col>
            </Row>
            <br />
            <Row>
                <Col><h2>Follow Us</h2>
                <p>
                We love to show off the art in our games and the artistry of developing award winning RPGS.

Keep up with all our news and new releases. </p></Col>
                <Col><img src={Medal} width="300" height="300" alt="Ennie award"/></Col>
            </Row>         
            </Container>
    );
};

export default About;