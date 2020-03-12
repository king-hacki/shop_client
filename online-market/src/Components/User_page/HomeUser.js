import React from 'react'
import { connect } from 'react-redux';

import {getItemsPaging, getAllItems} from '../../Actions/productActions'
import {addItem, getShoppingCart} from '../../Actions/cartActions'
import {getFilters, filterByBrands} from '../../Actions/filterActions'

import PropTypes from "prop-types";

import Filter from './Filter'
import Cards from '../Common/Cards'

import {Icon, Image, Segment, Dimmer, Loader, Pagination, Container, Grid} from 'semantic-ui-react'

import styled from 'styled-components'

const StyledPagination = styled(Pagination)`
  margin-top:40px !important; 
  height:20px !important;
`

export class HomeUser extends React.Component {
    
    state = {
        items : []
    }

    static propTypes = {
        getAllItems : PropTypes.func.isRequired,
        addItem :PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.getItemsPaging();
        this.props.getFilters();
    }

    componentWillReceiveProps(nextProps) {  
        this.setState({ items: nextProps.items });
    }

    handlePaginationChange = (e,{activePage}) => {
        if(this.props.filtered){
          this.props.filterByBrands(this.props.filterBrands, this.props.price, activePage)
        }else{
          this.props.getItemsPaging(activePage)
        }
    }
    
    render() {
      if(this.state.items == null || this.props.filters == null){
        return (
          <Segment>
          <Dimmer active inverted>
            <Loader inverted content='Loading' />
          </Dimmer>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
          )
        }     
    return (
            <Container fluid>
              <Grid>
                <Grid.Column width={4}>
                  <Filter items={this.state.items} updateData={this.updateData}/>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Cards items={this.state.items}/>
                </Grid.Column>
                <Grid.Column width={this.props.totalPages > 5 ? 4 : 5} />
                <Grid.Column width={10}>
                <StyledPagination
                          defaultActivePage={1}
                          onPageChange={this.handlePaginationChange}
                          ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                          firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                          lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                          prevItem={{ content: <Icon name='angle left' />, icon: true }}
                          nextItem={{ content: <Icon name='angle right' />, icon: true }}
                          totalPages={this.props.totalPages}
                />
                </Grid.Column>
                <Grid.Column width={2} />
                </Grid>
            </Container>
        )
    }

}


const mapStateToProps = state => ({
    user: state.userReducer,
    items: state.productReducer.pageItems,
    allItems: state.productReducer.items,
    totalPages: state.productReducer.totalPages,
    filters: state.filterReducer.filters,
    filtered: state.filterReducer.filtered,
    filterBrands: state.filterReducer.filterBrands,
    price: state.filterReducer.price
});

export default connect(
    mapStateToProps,
    {getItemsPaging, addItem, getShoppingCart, getAllItems,getFilters, filterByBrands}
)(HomeUser);