import React, { Component } from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';
import {getComents, postComent} from '../Actions/productActions'
import PropTypes from "prop-types";

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
         this.props.postComent(this.state.message, this.props.user.username, this.props.phoneId)
    }

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {

        let chatRender;
        let newMessage;
        if (this.props.messageList.length > 0) {

            chatRender = this.props.messageList.map(com => (
                <Comment key={com.id}>
                    <Comment.Content>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                        <Comment.Author as="a">{com.username}</Comment.Author>
                        <Comment.Metadata>
                            {
                                //TODO Data functionality
                            }
                            <div>Data</div>
                        </Comment.Metadata>
                        <Comment.Text>{com.message}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>     
            ))

            if (this.props.isMessageAdd) {
                newMessage = (
                    <Comment >
                        <Comment.Content>
                            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                            <Comment.Author as="a">{this.props.user.username}</Comment.Author>
                            <Comment.Metadata>
                                {
                                    //TODO Data functionality
                                }
                                <div>Data</div>
                            </Comment.Metadata>
                            <Comment.Text>{this.props.addedMessage}</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>  
                )   
            }
        }
        
        return(
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {chatRender}
                {newMessage}
                <Form reply>
                   <Form.TextArea name="message" onChange = {this.onChange} placeholder="Write your coment"/>
                   <Button onClick= {this.onSubmit} content="Add Coment" labelPosition='left' icon='edit' primary/>
                </Form>     
            </Comment.Group>
        );
    }
}

const mapStateToProps = state => ({
    messageList: state.commentReducer.comments,
    addedMessage: state.commentReducer.addedComent,
    isMessageAdd: state.commentReducer.isAdded,
    user : state.userReducer.user
})

export default connect(mapStateToProps, {getComents, postComent})(Chat);