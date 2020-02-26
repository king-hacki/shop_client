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
        if (this.state.message != "") {
            this.props.postComent(this.state.message, this.props.user.username, this.props.phoneId, moment())
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onEdit = id => {
        console.log(id)
    }

    render() {
        let chatRender;
        let i = 5;      //  count of comments should be equal i

        if(this.props.messageList == null){
            return <h2>Loading...</h2>
        }
        if (this.props.messageList.length > 0) {
            chatRender = this.props.messageList.slice().reverse()
                .filter(check => (i > 0 ? i-- : false))
                .map(com => ( 
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
                                <Comment.Action onClick={() => this.onEdit(com.id)}> 
                                {
                                    this.props.user.username != undefined ? 
                                        this.props.user.username == com.username ?
                                            "Edit" : ""
                                        : ""
                                } </Comment.Action>
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
                <Form style={{marginBottom:60}} reply>
                   <Form.TextArea name="message" onChange = {this.onChange} placeholder="Write your coment"/>
                   <Button onClick= {this.onSubmit} content="Add Comment" labelPosition='left' icon='edit' primary/>
                </Form>     
                {chatRender}
            </Comment.Group>
        );
    }
}

const dataCounter =  date => {
    if (!(date == null)) {
        switch(true) {

            case moment().diff(date, 'minutes') <= 1:
                return "a few second ago"

            case moment().diff(date, 'minutes') > 1 &&  moment().diff(date, 'hours') < 1:
               return moment().diff(date, 'minutes') + " minutes ago"

            case moment().diff(date, 'hours') > 1 &&  moment().diff(date, 'days') < 1:
                return moment().diff(date, 'hours') + " hours ago"

            case moment().diff(date, 'days') > 1 &&  moment().diff(date, 'months') < 1:
                return moment().diff(date, 'days') + " days ago"

            case moment().diff(date, 'months') > 1 &&  moment().diff(date, 'years') < 1:
                return moment().diff(date, 'months') + " months ago"

            default :
                return moment().diff(date, 'years') + " years ago"
            
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