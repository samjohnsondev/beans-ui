import React, { Component } from 'react';
import axios from 'axios';
import HomeButton from './Home';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

class Index extends Component {
    state = {
        bean: {},
        error: '',
        showModal: false,
        test: {}
    };

    componentDidMount(){
        axios.get('https://api.samjohnson-dev.com/beanoftheday')
        .then(res => {
            
            if(res.data.post) {
                this.setState({
                    bean: res.data.post
                });
            } else {
                this.setState({
                    error: res.data.error
                })
            }
            

        }).catch(err => {

        })
    }

    closeAndShowModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    
    render(){
        const formattedDate = moment(this.state.bean.displayDate).format('DD/MM/YYYY');

        return(
            <div className='home-container'>
                <Modal
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    show={this.state.showModal}
                    centered
                    onHide={this.closeAndShowModal}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Bean of the day
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Name: {this.state.bean.name}</h4>
                        <h4>Colour: {this.state.bean.colour}</h4>
                        <h4>Odour: {this.state.bean.odor}</h4>
                        <h4>Price per 100g: £{this.state.bean.price}</h4>
                        <h4>Display date: {formattedDate}</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        
                    </Modal.Footer>
            </Modal>
                <Container>
                    <HomeButton />
                    <Row>
                        {this.state.bean.name ? <Col className='bean-col'>
                        <Card className='bean-card'>
                            <Card.Body className='bean-otd'>
                                <Card.Title>{this.state.bean.name}</Card.Title>
                                <Card.Subtitle className="mb-1 text-muted">Here is the bean of the day! click on the image to see more about it.</Card.Subtitle>
                                <Image onClick={this.closeAndShowModal} rounded className='beanotd-image' src={this.state.bean.imagePath} alt={this.state.bean.name} />
                            </Card.Body>
                        </Card>
                        </Col> :
                            <h1 className='nobean'>Whoops no beans come back tomorrow...</h1>
                         };
                        
                    </Row>
                    <Row>
                        <h4 className='advert'>Want to advertise your beans? <Link to='/login'>Click here</Link></h4>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Index;