import React, {Component} from 'react'

import {connect} from 'react-redux'

import {Icon, Image, Segment, Dimmer, Loader, Pagination, Container, Grid} from 'semantic-ui-react'

import {getItemsPaging} from '../../Actions/productActions'

import Cards from '../Common/Cards'

import styled from 'styled-components'

const StyledPagination = styled(Pagination)`
  marginTop:40px !important;
  height:20px !important;
`

class HomeAdmin extends Component{

    state = {
        items: []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ items: nextProps.items});
    }

    componentDidMount(){
        console.log("Hello")
        this.props.getItemsPaging();
    }

    handlePaginationChange = (e,{activePage}) => {
        if(this.props.filtered){
          this.props.filterByBrands(this.props.filterBrands, this.props.price, activePage)
        }else{
          this.props.getItemsPaging(activePage)
        }
    }

    render() {
        if(this.state.items == null){
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
                  <Grid.Column width={16}>
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
    items: state.productReducer.pageItems,
    totalPages:state.productReducer.totalPages
})

export default connect(mapStateToProps, {getItemsPaging})(HomeAdmin)