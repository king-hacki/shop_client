import React, { Component } from 'react'
import { Comment} from 'semantic-ui-react'
import { connect } from 'react-redux';
import CommentModule from './CommentModule';

 class Replies extends Component {

    
    render() {

        let comentModuleReply
        let render

        if (this.props.newReplies != 0) {
            comentModuleReply = this.props.newReplies
                .filter(newReply => newReply[1] == this.props.parentId)    
                .map(newReply => (
                    <Comment key={newReply[0].id}>
                        <CommentModule  username = {this.props.user.username} comment={newReply[0]}/>
                    </Comment>
                )
            )
        }
        if (this.props.replies != undefined) {
            render = this.props.replies.reverse().map(reply => (
                <Comment key={reply.id}>
                    <CommentModule  username = {this.props.user.username} comment={reply}/>
                </Comment>
        ))
        } else {
            return (
                <div>
                    Loanding...
                </div>
            )
        }

        return (
            <div>
                {comentModuleReply}
                {render}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user : state.userReducer.user,
    newReplies: state.repliesReducer.replies
})

export default connect(mapStateToProps)(Replies)