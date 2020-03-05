import React, { Component } from 'react'
import { Button, Comment, Form, Header, Reveal, Icon, Grid, Image, GridRow, GridColumn} from 'semantic-ui-react'
import moment from "moment"
import { connect } from 'react-redux';
import { postReply } from "../Actions/repliesAction"
import Replies from './Replies';

class CommentModule extends Component {
    state = {
        editMessage: "",
        defaultMessage: "",
        isHiden: false,
        replyIsShow: false,
        replyMessage: ""
    }

    

    componentWillMount() {
        this.setState({editMessage: this.props.comment.message, defaultMessage: this.props.comment.message})
    }

    onEditChange = () => {
        if (this.state.isHiden) {
            this.setState({isHiden: false})
            this.props.updateComent(this.state.editMessage, this.props.username, this.props.comment.id, moment())
        } else {
            this.setState({isHiden: true})
            this.setState({editMessage: this.state.editMessage})
        }
        
    } 

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onDefault = () => {
        this.setState({
            editMessage: this.state.defaultMessage,
            isHiden: false
        })
    }

    showReply = () => {
        if (this.state.replyIsShow == true) {
            this.setState({
                replyIsShow: false
            })
        } else {
            this.setState({
                replyIsShow: true
            })
        }
    } 

    onReply = () => {
        this.props.postReply(this.state.replyMessage, this.props.username, moment(), this.props.comment.id)
        this.showReply()
    }

    render() {
        return (
            <div>
                { !this.state.isHiden ? 
                    <Comment.Content>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                        <Comment.Author style={{marginLeft: 10}} as="a">{this.props.comment.username}</Comment.Author>
                        <Comment.Metadata>
                            <div>{dataCounter(this.props.comment.date)}</div>
                        </Comment.Metadata>
                        <Comment.Text style={{marginLeft: 45}}>{this.state.editMessage}</Comment.Text>
                        <Comment.Actions style={{marginLeft: 45}}>
                            <Comment.Action onClick={this.showReply}>Reply</Comment.Action>
                            {this.props.username == this.props.comment.username ? 
                                <Comment.Action onClick = {this.onEditChange} >Edit</Comment.Action>
                                :
                                ""
                            }
                        </Comment.Actions>
                    </Comment.Content> 
                    :
                    <Grid columns = {2} style={{marginLeft: 14, paddingLeft: 15}} divided>
                        <Grid.Row>
                            <Grid.Column textAlign="center" width={2}>
                                <Image size="tiny" src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'></Image>
                                <Icon onClick={this.onDefault} style={{marginTop: 20}} size="big" name="close"></Icon>
                            </Grid.Column>
                            <Grid.Column>
                                <Form reply style={{marginBottom:60}}>
                                    <Form.TextArea  name = "editMessage" onChange = {this.onChange} placeholder = "Edit your coment" defaultValue = {this.state.editMessage} />
                                    <Button onClick = {this.onEditChange} content = "Edit Coment" labelPosition = 'left' icon = 'edit' primary/>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>  
                }

                { this.state.replyIsShow ?
                    <Form reply>
                        <Form.TextArea onChange={this.onChange} name = "replyMessage" placeholder="Write your reply"/>
                        <Grid style={{marginLeft: 29}} columns={2}>
                            <GridRow>
                                <GridColumn >
                                    <Button onClick={this.onReply} content="Add Reply" labelPosition='left' icon='edit' primary/>
                                </GridColumn>
                                <GridColumn>
                                    <Icon onClick={this.showReply} size="big" name="close"></Icon>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </Form>
                    :
                    ""
                }

                <Comment.Group key={this.props.comment.replies.id} >
                    <Replies replies={this.props.comment.replies} parentId={this.props.comment.id}/>
                </Comment.Group>

            </div>
        )
    }
    
}

const dataCounter =  date => {
    if (!(date == null)) {
        switch(true) {

            case moment().diff(date, 'minutes') <= 1:
                return "a few second ago"

            case moment().diff(date, 'minutes') > 1 &&  moment().diff(date, 'hours') <= 1:
               return moment().diff(date, 'minutes') + " minutes ago"

            case moment().diff(date, 'hours') > 1 &&  moment().diff(date, 'days') <= 1:
                return moment().diff(date, 'hours') + " hours ago"

            case moment().diff(date, 'days') > 1 &&  moment().diff(date, 'months') <= 1:
                return moment().diff(date, 'days') + " days ago"

            case moment().diff(date, 'months') > 1 &&  moment().diff(date, 'years') <= 1:
                return moment().diff(date, 'months') + " months ago"

            default :
                return moment().diff(date, 'years') + " years ago"
            
        }
    } else {
        return "default"
    }
}

export default connect(null, {postReply})(CommentModule)