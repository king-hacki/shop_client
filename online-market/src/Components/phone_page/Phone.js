import React, { Component } from 'react'
import { connect } from 'react-redux';

import {getPhone} from '../../Actions/productActions'
import {Image, Container, Header, Grid, Segment, Dimmer, Loader} from 'semantic-ui-react'

import styled from 'styled-components'

import Chat from './Chat';

const StyledGridColumn = styled(Grid.Column)`
    margin-top:60px !important;
`

const StyledH1 = styled(Header)`
    margin-bottom:2px !important;
`
const StyledH6 = styled(Header)`
    margin-top: 0px !important; 
    margin-bottom: 5px !important;
`

class Phone extends Component {

    state = {
        item: null
    }

    componentDidMount(){
        this.props.getPhone(this.props.match.params.id)
    }


    render() {
        let ren;
        if(this.props.phone == null){
            return (
                <Segment>
                <Dimmer active inverted>
                  <Loader inverted content='Loading' />
                </Dimmer>
          
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
              </Segment>
                )
        }
            ren = (
                <Container>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column >
                                <Image src={this.props.phone.image} wrapped ui={true} />
                            </Grid.Column>
                            <StyledGridColumn> 
                                <StyledH1 as="h1"> Model {this.props.phone.model} Brand {this.props.phone.brand}</StyledH1>                                       
                                <Header as="h6" size="tiny"> Rate </Header>
                                <Header as="h4"> Price : {this.props.phone.price}</Header>
                                <Header as="h4"> Year of graduation : {this.props.phone.graduationYear}</Header>
                            </StyledGridColumn>
                        </Grid.Row>
                    </Grid>
                    <Segment>
                        <Header as='h3'> Comments </Header> 
                        <Chat phoneId = {this.props.phone.mobileIdentifier}/>
                    </Segment>
                </Container>
            )

        return(
            <div>
                {ren}
            </div>
        );
    }


}

const mapStateToProps = state => ({
     phone : state.productReducer.item
})

export default connect(mapStateToProps, {getPhone})(Phone);