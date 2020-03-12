import React,{Component} from 'react'

import {Segment, Divider, Checkbox, Input, Button} from 'semantic-ui-react'

import {getFilters, filterByBrands} from '../../Actions/filterActions'
import {getItemsPaging} from '../../Actions/productActions'

import {connect} from 'react-redux'

import styled from 'styled-components'

import {toast} from 'react-toastify'


const StyledInput = styled(Input)`
    width: 90px;
    height:10px !important;
`

const StyledSegment = styled(Segment)`
    margin-top:30px !important;
`

class Filter extends Component {

    state = {
        price: 100000,
        filtersBrand: [],
        selectedFilters: 0,
        filtered: false
    }

    handleChangeInputPrice = e => {
        this.setState({
          [e.targent.name] : e.target.value
        })
      }

    handleChangePrice = (e,{name,value}) => {
        this.setState(prevState => ({
          [name]:value,
          selectedFilters: prevState.selectedFilters + 1
        }))
      }

    reset = () =>{
        this.setState({
            filtered: false
        })
        window.location.reload(false)
    }

    handleChangeCheckbox = (event,filter) => {
        if(filter.checked){
          this.setState(prevState => ({
            filtersBrand: [...prevState.filtersBrand, filter.name],
            selectedFilters: prevState.selectedFilters + 1
          }))
        }else{
          const filtersBrand = this.state.filtersBrand.filter(item => item != filter.name);
          this.setState(prevState => ({
            filtersBrand : filtersBrand,
            selectedFilters: prevState.selectedFilters - 1
          }))
        }
    }

    filter = () =>{
        this.setState({
          filtered: true
        })
        if(this.state.selectedFilters == 0){
          toast.error("Sorry you don't choose filter, please try again", {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        }else{
          this.props.filterByBrands(this.state.filtersBrand, this.state.price)
        }
      }

    render(){
        if(this.props.items.length == 0 && this.state.filtered){
            toast.error("Sorry we didn't find mobile phone by your characteristic, try again with other filters", {
              position: toast.POSITION.BOTTOM_RIGHT
            })
            this.props.getItemsPaging(1)
          }
        return(
            <StyledSegment>
                <h2>Filter</h2>
                <Divider/>
                <h4>Brand</h4>
                {this.props.filters.brands.map(product => (
                    <div><Checkbox name={product} onChange={(event, data) => this.handleChangeCheckbox(product, data)}/> {product} </div>
                ))}
                <Divider />
                <h4>Price</h4>
                Choose your max price:<StyledInput name="price" value={this.state.price} onChange={this.handleChangePrice} />
                <br/>
                <br/>
                <Input
                    min={100}
                    max={100000}
                    name='price'
                    onChange={this.handleChangePrice}
                    step={100}
                    type='range'
                    value={this.state.price}             
                />
                <br/>
                <br/>
                <Button positive onClick={this.filter}>Apply filter</Button>
                <Button negative onClick={this.reset}>Reset filters</Button>
            </StyledSegment>
        )
    }
}

const mapStateToProps = state => ({
    filters: state.filterReducer.filters
})

export default connect(mapStateToProps,{getFilters, filterByBrands, getItemsPaging})(Filter)