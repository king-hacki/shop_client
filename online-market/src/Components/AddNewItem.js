import React, {Component} from 'react'

import {connect} from 'react-redux';

import {createItem} from '../Actions/productActions'

import PropTypes from 'prop-types'

class AddNewItem extends Component {
    
    state = {
        mobileIdentifier : "",
        brand : "",
        model : "",
        graduationYear : "",
        price : ""
    }

    static propTypes = {
        createItem : PropTypes.func.isRequired,
    }

    onChange = e => this.setState({
        [e.target.name] : e.target.value
    })

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state.graduationYear);
        this.props.createItem(
            this.state.mobileIdentifier,
            this.state.brand,
            this.state.model,
            this.state.graduationYear,
            this.state.price
        )
    }
    
    render(){
        const {mobileIdentifier, brand, model, graduationYear, price} = this.state;
        return(
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Create new Item</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>mobileIdentifier</label>
                        <input
                            type="mobileIdentifier"
                            className="form-control"
                            name="mobileIdentifier"
                            onChange={this.onChange}
                            value={mobileIdentifier}
                        />
                    </div>
                    <div className="form-group">
                        <label>brand</label>
                        <input
                            type="brand"
                            className="form-control"
                            name="brand"
                            onChange={this.onChange}
                            value={brand}
                        />
                    </div>
                    <div className="form-group">
                        <label>model</label>
                        <input
                            type="model"
                            className="form-control"
                            name="model"
                            onChange={this.onChange}
                            value={model}
                        />
                    </div>
                    <div className="form-group">
                        <label>graduationYear</label>
                        <input
                            type="graduationYear"
                            className="form-control"
                            name="graduationYear"
                            onChange={this.onChange}
                            value={graduationYear}
                        />
                    </div>
                    <div className="form-group">
                        <label>price</label>
                        <input
                            type="price"
                            className="form-control"
                            name="price"
                            onChange={this.onChange}
                            value={price}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userReducer
})

export default connect(mapStateToProps,{createItem})(AddNewItem)