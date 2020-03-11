import React, {Component} from 'react'

import {connect} from 'react-redux'

import {getShoppingCart, deleteItem, applyOrder} from '../Actions/cartActions'

import PropTypes from 'prop-types'

import {Image, Container, Segment, Dimmer, Loader} from 'semantic-ui-react'
import {Button, Table,Step, StepContent} from 'semantic-ui-react'



class ShoppingCart extends Component {

    state = {
        totalPrice : 0
    }

    static propTypes = {
        shoppingCart : PropTypes.object.isRequired,
        getShoppingCart : PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        totalPrice: PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.getShoppingCart();
    }

    componentWillUpdate(){
        if(this.props.shoppingCart == null){
            return (
                <Segment>
                <Dimmer active inverted>
                  <Loader inverted content='Loading' />
                </Dimmer>
          
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
              </Segment>
                )
        }
        this.props.shoppingCart.mobilePhoneList.map(item=>{
            this.state.totalPrice += item.price
        })
    }

    onSubmit = itemIdentifier => {
        this.state.totalPrice = 0
        this.props.deleteItem(itemIdentifier)
    }

    render(){
        
        if(this.props.shoppingCart == null){
            return (
                <Segment>
                <Dimmer active inverted>
                  <Loader inverted content='Loading' />
                </Dimmer>
          
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
              </Segment>
                )
        }
        return(
            <Container style={{marginTop:20}} padded centered>
            <Table columns={5} singleLine>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Identifier</Table.HeaderCell>
                <Table.HeaderCell>Brand</Table.HeaderCell>
                <Table.HeaderCell>Model</Table.HeaderCell>
                <Table.HeaderCell>Graduation Year</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            {this.props.shoppingCart.mobilePhoneList.map(item=>(
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{item.mobileIdentifier}</Table.Cell>
                        <Table.Cell>{item.brand}</Table.Cell>
                        <Table.Cell>{item.model}</Table.Cell>
                        <Table.Cell>{item.graduationYear}</Table.Cell>
                        <Table.Cell>{item.price}</Table.Cell>
                        <Table.Cell><Button negative onClick={() => this.onSubmit(item.mobileIdentifier)}>Delete</Button></Table.Cell>
                    </Table.Row>
                </Table.Body>
            ))}
            </Table>
            <Step.Group>
                <Step>
                    <StepContent>
                        <Step.Title>Total Price: </Step.Title>
                    </StepContent>
                </Step>
                <Step>
                    <StepContent>
                        <Step.Title>{this.props.totalPrice}</Step.Title>
                    </StepContent>
                </Step>
                <Step>
                    <StepContent>
                        <Button positive onClick={this.props.applyOrder}>Apply</Button>
                    </StepContent>
                </Step>
            </Step.Group>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    shoppingCart: state.cartReducer.shoppingCart,
    totalPrice : state.cartReducer.totalPrice
})

export default connect(mapStateToProps, {getShoppingCart, deleteItem, applyOrder})(ShoppingCart)