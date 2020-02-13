import React from 'react'
import { connect } from 'react-redux';
import {getItems} from '../Actions/productActions'
import PropTypes from "prop-types";
import logo from '../iphone-11-(bl)-350x350.jpg'



export class Home extends React.Component {
    
    state = {
        items : []
    }

    static propTypes = {
        getItems : PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.getItems();  
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ items: nextProps.items });
    }


    render() {
        const productItems = this.state.items.map(product => (
            <div className="col-sm-4" key={product.id}>
                <div className="thumbnail text-center">
                        <img src={logo} />
                        <p>{product.model}</p> 
                        <p>{product.brand}</p>                        
                    <b>{product.price}</b> <br/>
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        ));

        return (
            <div className="container">
                <div className="row">
                    {productItems}
                </div>
            </div>
        )
    }

}



const mapStateToProps = state => ({
    user: state.userReducer,
    items: state.productReducer.items
});

export default connect(
    mapStateToProps,
    {getItems}
)(Home);