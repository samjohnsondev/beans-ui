import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Image from 'react-bootstrap/Image';
import logo from '../img/beans.png';
import { Link } from 'react-router-dom';

const HomeButton = () => (
    <Row>
        <Col>
            <Link className='linkhome' to='/'>
                <h1 className='home'>Beans of the day
                <Image src={logo} />
                </h1>
            </Link>
        </Col>
    </Row>
)

export default HomeButton;