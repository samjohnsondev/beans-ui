import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import moment from 'moment';

const Bean = (bean) => {
    const formattedDate = moment(bean.props.displayDate).format('DD/MM/YYYY');
   
    return (
   <Col className='bean'>
        <Card className='bean-card' style={{ width: '15rem' }}>
        <Card.Img variant="top" className='bean-image' src={bean.props.imagePath} />
        <Card.Body>
            <Card.Title>{bean.props.name}</Card.Title>
            <Card.Text>
                Colour: {bean.props.colour}<br />
                Price per 100g: £{bean.props.price}<br />
                Display Date: {formattedDate}<br />
                Odour: {bean.props.odor}
            </Card.Text>
        </Card.Body>
        </Card>
    </Col>
   )
};

export default Bean;