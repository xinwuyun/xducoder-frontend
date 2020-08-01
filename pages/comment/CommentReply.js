import { Comment,  Tooltip, Avatar } from 'antd';
import React, { Component } from 'react';
import CommentLike from './CommentLike';
import moment from 'moment';
import CommentInput from './CommentInput';
const ExampleComment = ({ children }) => (
  <Comment
    actions={[<span key="comment-nested-reply-to" onClick={() => CommentInput}><CommentLike></CommentLike> 回复</span>]}
    author={<a>哈哈</a>}
    avatar={
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    }
    content={
      <p>
        能看到我吗？
      </p>
    }
    datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().format('YYYY-MM-DD HH:mm:ss')}</span>
        </Tooltip>
    }
        
  >
    {children}
  </Comment>
);
class CommentReply extends Component {
    render() {
        return(
            <div>
            <ExampleComment>
                    <ExampleComment>
                    <ExampleComment />
                    <ExampleComment />
                    </ExampleComment>
            </ExampleComment>,
            </div>
        )
    }
}
export default CommentReply