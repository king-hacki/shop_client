import React,{Component} from 'react'

import {connect} from 'react-redux'

import {Card, Image, Icon, Button} from 'semantic-ui-react'

import {addItem} from '../../Actions/cartActions'
import {deleteItemFromDB} from '../../Actions/productActions'

import {Link} from 'react-router-dom'

import styled from 'styled-components'

const StyledCardGroup = styled(Card.Group)`
    margin-top:20px !important;
`


class Cards extends Component {


    onSubmit = mobileIdentifier => {
        this.props.addItem(mobileIdentifier)
    }

    deleteItem = mobileIdentifier => {
        this.props.deleteItemFromDB(mobileIdentifier)
    }

    render(){
        return(
            <StyledCardGroup itemsPerRow={6} centered>
                {this.props.items.map(product => (
                    <Card key = {product.mobileIdentifier}>
                    <Image src={product.image} wrapped ui={false}  as={Link} to={`/home/${product.mobileIdentifier}`} />
                    <Card.Content>
                        <Card.Header>{product.brand}</Card.Header>
                        <Card.Meta>{product.model}</Card.Meta>
                        <Card.Description> {product.graduationYear} </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        {<a onClick={() => this.onSubmit(product.mobileIdentifier)}>
                        <Icon name='cart' />
                        </a>}
                        Price: {product.price}$
                        {this.props.user.role === "ROLE_USER" ?
                            <Button onClick={this.onSubmit} positive floated="right" size="mini" >BUY</Button> :
                            <Button onClick={() => this.deleteItem(product.mobileIdentifier)} negative floated="right" size="mini">Delete</Button> 
                        }
                    </Card.Content>
                    </Card>
                ))
            }
            </StyledCardGroup>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userReducer
})

export default connect(mapStateToProps, {addItem, deleteItemFromDB})(Cards);
