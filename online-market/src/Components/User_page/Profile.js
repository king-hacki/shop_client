import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {savePhoto, changeAccount} from '../../Actions/userActions'

import {Image, Container, Grid, Form, Segment, Header, Button, Card, Divider} from 'semantic-ui-react'

import emptyLogo from '../../Images/square-image.png'

import ProfileConfirmPhoto from './ProfileConfirmPhoto'

import styled from 'styled-components'

const StyledGrid = styled(Grid)`
    margin-top: 20px !important;
`

class Profile extends Component {
    
    state = {
        image: `data:image/png;base64,${this.props.user.image}`,
        username: "",
        email: "",
        password: "",
        newPassword: ""
    }

    static propTypes = {
        user : PropTypes.object.isRequired
    }


    onChangeData = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = () => {
        this.props.changeAccount(this.state.username, this.state.email, this.state.password, this.state.newPassword)
    }

    changePhoto = () => {
        this.props.savePhoto(null);
    }

    render(){
        return(
            <Container>
            <StyledGrid columns={2} stackable>
                <Grid.Column width={1} />
                <Grid.Column width={7}>
                    <Segment>
                        <Header as="h1">Profile</Header>
                        <Image centered src={this.props.user.image === "" ? emptyLogo : this.state.image} size="medium" circular />
                        {this.props.user.image === "" ? <ProfileConfirmPhoto/> : null}
                        <Divider/>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{this.props.user.firstName} {this.props.user.lastName} ({this.props.user.username})</Card.Header>
                                <Card.Meta>{this.props.user.email}</Card.Meta>
                            </Card.Content>
                        </Card>
                    </Segment>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Segment>
                        <Header as="h3">Settings</Header>
                            <Grid.Column width={5}>
                                <Form size='mini'>
                                    <Header as="h5">General data</Header>
                                    <Form.Input name="username" onChange={this.onChangeData} placeholder="Enter username for change in account" />
                                    <Form.Input name="email" onChange={this.onChangeData} placeholder="Enter email for change in account" />
                                    <Divider />
                                    <Header as="h5">Password</Header>
                                    <Form.Input name="password" type="password" onChange={this.onChangeData} placeholder="Enter your password for changing on new" />
                                    <Form.Input name="newPassword" type="password" onChange={this.onChangeData} placeholder="Enter new password" />
                                    <Divider/>
                                    <Button positive onClick={this.onSubmit}>Save changes</Button>
                                </Form>
                            </Grid.Column>
                        </Segment>
                    </Grid.Column>
            </StyledGrid>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user 
});

export default connect(mapStateToProps, {savePhoto, changeAccount})(Profile)