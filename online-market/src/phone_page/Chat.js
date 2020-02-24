import React, { Component } from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';
import {getComents, postComent} from '../Actions/comentAction'
import PropTypes from "prop-types";
import moment from "moment"

class Chat extends Component {

    state = {
        message: ""
    }

    componentDidMount() {
        console.log("Chat is mounted")
        this.props.getComents(this.props.phoneId)
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.postComent(this.state.message, this.props.user.username, this.props.phoneId, moment())
    }

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        let chatRender;
        if (this.props.messageList.length > 0) {
            chatRender = this.props.messageList.reverse().map(com => (
                <Comment key={com.id}>
                    <Comment.Content>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                        <Comment.Author as="a">{com.username}</Comment.Author>
                        <Comment.Metadata>
                            <div>{dataCounter(com.date)}</div>
                        </Comment.Metadata>
                        <Comment.Text>{com.message}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>     
            ))

        }
        
        return(
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {chatRender}
                <Form reply>
                   <Form.TextArea name="message" onChange = {this.onChange} placeholder="Write your coment"/>
                   <Button onClick= {this.onSubmit} content="Add Coment" labelPosition='left' icon='edit' primary/>
                </Form>     
                
            </Comment.Group>
        );
    }
}

function dataCounter(date) {
    if (date == null) {
        switch(date) {
            
        }
    } else {
        return "default"
    }
}

const mapStateToProps = state => ({
    messageList: state.commentReducer.coments,
    user : state.userReducer.user
})

export default connect(mapStateToProps, {getComents, postComent})(Chat);