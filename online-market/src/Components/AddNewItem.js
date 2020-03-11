import React, {Component} from 'react'

import {connect} from 'react-redux';

import {createItem} from '../Actions/productActions'

import PropTypes from 'prop-types'
import { Container, Form, Segment, Grid } from 'semantic-ui-react';

import styled from 'styled-components'
import { toast } from 'react-toastify';

const StyledSegment = styled(Segment)`
    margin-top: 40px !important;
`

class AddNewItem extends Component {
    
    state = {
        mobileIdentifier : "",
        brand : "",
        model : "",
        graduationYear : "",
        image: null,
        price : ""
    }

    static propTypes = {
        createItem : PropTypes.func.isRequired,
    }

    onChange = e => this.setState({
        [e.target.name] : e.target.value
    })

    handleChangePhoto = e => {

        let reader = new FileReader();

        if(e.target.files[0].type != "image/png" && e.target.files[0].type != "image/jpeg"){
            toast.error("You selected not 'png' or 'jpeg' format, try again", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }else{
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                this.setState({
                    image: reader.result
                })
            }
        }
    }

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state.graduationYear);
        console.log(this.state);

        this.props.createItem(
            this.state.mobileIdentifier,
            this.state.brand,
            this.state.model,
            this.state.graduationYear,
            this.state.price,
            this.state.image
        )
    }
    
    render(){
        return(
            <Grid>
                <Grid.Column width={4}/>
                <Grid.Column width={8}>
                <StyledSegment>
                <Form>
                    <Form.Input
                                label="Mobile Identifier" 
                                name="mobileIdentifier"
                                onChange={this.onChange}
                                placeholder="Enter mobile identifier"
                                />
                    <Form.Input
                                label="Brand" 
                                name="brand"
                                onChange={this.onChange}
                                placeholder="Enter brand of phone"
                                />
                    <Form.Input
                                label="Model" 
                                name="model"
                                onChange={this.onChange}
                                placeholder="Enter model of phone"
                                />                                
                    <Form.Input
                                label="Graduation Year" 
                                name="graduationYear"
                                onChange={this.onChange}
                                placeholder="Enter graduation year of phone"
                                />
                    <Form.Input
                                label="Price" 
                                name="price"
                                onChange={this.onChange}
                                placeholder="Enter price of phone"
                                />                            
                    <Form.Input
                                label="Image"
                                name="image"
                                onChange={this.handleChangePhoto}
                                accept="image/png"
                                type="file"
                                />               
                    <Form.Button
                                color="teal"
                                onClick={this.onSubmit}
                                >Save Phone</Form.Button>     
                </Form>
                </StyledSegment>
                </Grid.Column>
                <Grid.Column width={4} />  
            </Grid> 
        )
    }
}

const mapStateToProps = state => ({
    user: state.userReducer
})

export default connect(mapStateToProps,{createItem})(AddNewItem)
