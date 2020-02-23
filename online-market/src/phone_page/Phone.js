import React, { Component } from 'react'
import {Link, Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import {getPhone} from '../Actions/productActions'
import PropTypes from "prop-types";
import logo from '../iphone-11-(bl)-350x350.jpg'
import {Card, Icon, Image, Container, Header, Item, Grid, Comment} from 'semantic-ui-react'
import Chat from './Chat';

class Phone extends Component {

    componentDidMount() {
        this.props.getPhone(this.props.match.params.id)
    }

    render() {
        // console.log("render loaded")
        let ren;
        if (!(this.props.phone.mobileIdentifier == undefined)) {
            // console.log(this.props.phone)
            ren = (
                <Grid style={{marginLeft:50}}>
                    <Grid.Row>
                        <Header as="h3"> Brand {this.props.phone.brand}</Header>    
                    </Grid.Row>
                    <Grid.Row>
                        <Header as="h3"> Price {this.props.phone.price}</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Chat phoneId = {this.props.phone.mobileIdentifier}/>
                    </Grid.Row>
                </Grid>
            )
        } 

        return(
            <div>
                {ren}
            </div>
        );
    }


}

const mapToStateProps = state => ({
     phone : state.productReducer.item
    })

export default connect(mapToStateProps, {getPhone})(Phone);