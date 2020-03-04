import React, { Component } from 'react'
import { Comment} from 'semantic-ui-react'
import { connect } from 'react-redux';
import CommentModule from './CommentModule';

 class Replies extends Component {

    componentWillMount() {
        console.log(this.props.replies)
    }

    render() {


        //  End here
        console.log(this.props.isShow)

        const render = this.props.replies.map(reply => (
            <CommentModule key={reply.id} username = {this.props.user.username} comment={reply}/>
        ))

        return (
            <Comment>{render}</Comment>
        )
    }
}

const mapStateToProps = state => ({
    user : state.userReducer.user
})

export default connect(mapStateToProps)(Replies)