import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import HomeButton from './Home';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Bean from './Bean';

class AccountPage extends Component {

    state = {
        userBeans: [],
        name: '',
        colour: '',
        odour: '',
        imagePath: '',
        displayDate: '',
        price: '',
        inValid: false,
        showModal: false,
        buttonDisabled: false,
        noOdour: '',
        noName: '',
        noDate: '',
        noColour: '',
        noPrice: '',
        noImg: '',
        formErrors: false
    }
    
    handleClose = () => { 
        this.setState({
            showModal: false
        });
    }

    handleChange = (event) => {
        const { name, value } = event.target;

       this.setState({
           [name]: value
       });
    }

    uploadImage = async (event) => {
        this.setState({ buttonDisabled: true})

        const file = event.target.files;
        // Setup the form data 
        const data = new FormData()
        data.append('file', file[0]);
        data.append('upload_preset', 'beanoftheday')


        // Upload the image to the api
        const post = await fetch('https://api.cloudinary.com/v1_1/ddr4j0mds/image/upload', {
            method: 'POST',
            body: data,
          });

        const image = await post.json();

        this.setState({
            imagePath: image.secure_url,
            buttonDisabled: false
        })
    }

    componentDidMount(){
        const token = window.localStorage.getItem('token');

        if(!token) {
            this.setState({
                inValid: true
            })
        }

        axios.get('https://api.samjohnson-dev.com/getbeans', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(res => {
            this.setState({
                userBeans: [...res.data.posts]
            })
        }).catch(err => {
            window.localStorage.removeItem('token');

            this.setState({
                inValid: true
            })
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const token = window.localStorage.getItem('token');

        const dataToSend = {
            name: this.state.name,
            colour: this.state.colour,
            odor: this.state.odour,
            imagePath: this.state.imagePath,
            displayDate: this.state.displayDate,
            price: this.state.price
        }

        
        axios.post('https://api.samjohnson-dev.com/addbean', dataToSend, { headers: {Authorization: 'Bearer ' + token}})
        .then(res => {
        }).catch(err => {
            const response = err.response.data;

            this.setState({
                noName: response.errors.name ? response.errors.name : '',
                noDate: response.errors.date ? response.errors.date : '',
                noColour: response.errors.colour ? response.errors.colour : '',
                noPrice: response.errors.price ? response.errors.price : '',
                noImg: response.errors.image ? response.errors.image : '',
                noOdour: response.errors.odor ? response.errors.odor: '',
                formErrors: true,
                showModal: true
            });

            return false;
        })

        this.setState({
            showModal: false
        })

         //Force upate the component
         this.componentDidMount();

    }

    handleLogout = () => {
        //Remove the token from local storage
        window.localStorage.removeItem('token');

        this.setState({
            inValid: true
        })
    }
    render(){
        if(this.state.inValid) {
            return <Redirect to='/login'/>
        }
        
        const posts = this.state.userBeans.map((post) =>
            <Bean key={post._id} props={post} />
        );

        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add a new bean!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className='bean-form' onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter name" 
                                    name="name" 
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    />
                            <Form.Text className="text-danger">
                                {this.state.noName}
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicColour">
                                <Form.Label>Colour</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter colour" 
                                    name="colour" 
                                    onChange={this.handleChange}
                                    value={this.state.colour}
                                    />
                            <Form.Text className="text-danger">
                                {this.state.noColour}
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicOdour">
                                <Form.Label>Odor</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter odour" 
                                    name="odour" 
                                    onChange={this.handleChange}
                                    value={this.state.odour}
                                    />
                            <Form.Text className="text-danger">
                                {this.state.noOdour}
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPrice">
                                <Form.Label>Price per 100g</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter price" 
                                    name="price" 
                                    onChange={this.handleChange}
                                    value={this.state.price}
                                    />
                            <Form.Text className="text-danger">
                                {this.state.noPrice} 
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicDisplayDate">
                                <Form.Label>Date To Display</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="displayDate" 
                                    onChange={this.handleChange}
                                    />
                            <Form.Text className="text-danger">
                                {this.state.noDate}
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicImage">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    multiple accept="image/*"
                                    name="file" 
                                    placeholder="Upload an Image" 
                                    onChange={this.uploadImage}
                                    />
                            <Form.Text className="text-danger">
                                {this.state.noImg}
                            </Form.Text>
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="outline-primary" type="submit" disabled={this.state.buttonDisabled}>
                                    Add Bean
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
                
                <div className='bean-container'>
                    <Container>
                        <HomeButton />
                        <Row className='bean-header'>
                            <Col>
                                <Button variant="secondary" active onClick={() => this.setState({showModal: true})}>Add Bean</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" active onClick={this.handleLogout}>Logout</Button>
                            </Col>
                        </Row>
                        <Row>
                            {this.state.userBeans.length > 0 ? posts : <h2 className='message'>Your beans will display here...</h2>}
                        </Row>
                    </Container>   
                </div>
            </div>
        )   
    }
}

export default AccountPage;