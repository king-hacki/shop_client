import React, {Component} from 'react'

import {connect} from 'react-redux'

import PropTypes from 'prop-types'

import {getAllUsers} from '../Actions/userActions'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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
        )
    }
}

const mapStateToProps = state => ({
    users: state.userReducer.users
})

export default connect(mapStateToProps,{getAllUsers})(DatabaseUsers)