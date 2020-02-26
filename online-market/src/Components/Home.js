import React from 'react'
import { connect } from 'react-redux';
import {getItems} from '../Actions/productActions'
import {addItem, getShoppingCart} from '../Actions/cartActions'
import {getPhone} from '../Actions/productActions'
import PropTypes from "prop-types";
import logo from '../iphone-11-(bl)-350x350.jpg'

import {Card, Icon, Image} from 'semantic-ui-react'

import {Link} from 'react-router-dom'

export class Home extends React.Component {
    
    state = {
        items : []
    }

    static propTypes = {
        getItems : PropTypes.func.isRequired,
        addItem :PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.getItems();  
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ items: nextProps.items });
    }

    onSubmit = mobileIdentifier => {
        this.props.addItem(mobileIdentifier)
    }

    sendData = mobileIdentifier => {
      this.props.getPhone(mobileIdentifier)
    }

    render() {
       const productItems = this.state.items.map(product => (
      <Card key = {product.mobileIdentifier}>
        <Image src={logo} wrapped ui={false} onClick={() => this.sendData(product.mobileIdentifier) } as={Link} to={`/home/${product.mobileIdentifier}`} />
        <Card.Content>
          <Card.Header>{product.brand}</Card.Header>
          <Card.Meta>{product.model}</Card.Meta>
          <Card.Description> {product.graduationYear} </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {<a onClick={() => this.onSubmit(product.mobileIdentifier)}>
          <Icon name='cart' />
          </a>}
          Price: {product.price}
        </Card.Content>
      </Card>
    ));
        
    return (
            <div>
              <Card.Group itemsPerRow={6} centered style={{marginTop:20}}>
                {productItems}
              </Card.Group>
            </div>
        )
    }

}



const mapStateToProps = state => ({
    user: state.userReducer,
    items: state.productReducer.items,
});

export default connect(
    mapStateToProps,
    {getItems, addItem, getShoppingCart, getPhone}
)(Home);