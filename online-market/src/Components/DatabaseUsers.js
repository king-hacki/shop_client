import React, {Component} from 'react'

import {connect} from 'react-redux'

import PropTypes from 'prop-types'

import {getAllUsers} from '../Actions/userActions'

import {Table, Container, Segment, Dimmer, Loader} from 'semantic-ui-react'

import styled from 'styled-components'

const StyledContainer = styled(Container)`
    margin-top:20px;
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

/*
 <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.users.map(person=>(
                            <TableRow key={person.id}>
                            <TableCell component="th" score="row">{person.username}</TableCell>
                            <TableCell align="right" component="th" score="row">{person.firstName}</TableCell>
                            <TableCell align="right" component="th" score="row">{person.lastName}</TableCell>
                            <TableCell align="right" component="th" score="row">{person.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            */