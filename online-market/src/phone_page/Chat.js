import React, { Component } from 'react'
import { Button, Comment, Form, Header, Reveal} from 'semantic-ui-react'
import { connect } from 'react-redux';
import {getComents, postComent} from '../Actions/comentAction'
import PropTypes from "prop-types";
import moment from "moment"
import CommentModule from './CommentModule';

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
        let i = 5;      //  count of comments should be equal i

        if (this.props.messageList == null || this.props.messageList > 0) {
            return <h2>Loanding ...</h2>
        } else {
            chatRender = this.props.messageList.slice().reverse()
            .filter(check => (i > 0 ? i-- : false))
            .map(com => (
                <Comment key={com.id}>
                    <CommentModule comment={com} username = {this.props.user.username}/>  
                </Comment>
            ))
        }

        return(
           <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                <Form style={{marginBottom:60}} reply>
                   <Form.TextArea name = "message" onChange = {this.onChange} placeholder="Write your coment"/>
                   <Button onClick= {this.onSubmit} content="Add Coment" labelPosition='left' icon='edit' primary/>
                </Form>     
                {chatRender}
            </Comment.Group>
        );
    }
}

//  send to props all comments
//  adn get user which is logged
const mapStateToProps = state => ({
    messageList: state.commentReducer.coments,
    user : state.userReducer.user
})
   
//  getComents() -> get List with all coments from back-end
//  postComent() -> post comment to the back-end
export default connect(mapStateToProps, {getComents, postComent})(Chat);