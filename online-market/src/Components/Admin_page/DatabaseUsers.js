import React, {Component} from 'react'

import {connect} from 'react-redux'

import PropTypes from 'prop-types'

import {getAllUsers} from '../../Actions/userActions'

import {Table, Container, Segment, Dimmer, Loader} from 'semantic-ui-react'

import styled from 'styled-components'

const StyledContainer = styled(Container)`
    margin-top:40px;
    height: 355px !important;
    overflow-y:scroll;
`

class DatabaseUsers extends Component {

    state = {
        users: []
    }

    static propTypes = {
        users : PropTypes.array.isRequired,
        getAllUsers: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getAllUsers();
    }

    render(){
        console.log(this.props.users)
        return(
           <StyledContainer>
               <Table columns={4} padded centered>
                   <Table.Header>
                       <Table.Row>
                           <Table.HeaderCell>Username</Table.HeaderCell>
                           <Table.HeaderCell>First Name</Table.HeaderCell>
                           <Table.HeaderCell>Last Name</Table.HeaderCell>
                           <Table.HeaderCell>E-mail</Table.HeaderCell>
                       </Table.Row>
                   </Table.Header>
                   <Table.Body>
                       {this.props.users.map(person => (
                           <Table.Row>
                                <Table.Cell>{person.username}</Table.Cell>
                                <Table.Cell>{person.firstName}</Table.Cell>
                                <Table.Cell>{person.lastName}</Table.Cell>
                                <Table.Cell>{person.email}</Table.Cell>
                           </Table.Row>
                       ))}
                   </Table.Body>
               </Table>
           </StyledContainer>
        )
    }
}

const mapStateToProps = state => ({
    users: state.userReducer.users
})

export default connect(mapStateToProps,{getAllUsers})(DatabaseUsers)