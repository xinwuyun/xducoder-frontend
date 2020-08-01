import React, {Component } from 'react';
import { Comment, Tooltip, List } from 'antd';
import CommentLike from './CommentLike';
import CommentInput from './CommentInput';
import moment from 'moment';
const data = [
  {
    actions: [ <span  key="comment-list-reply-to-0" ><CommentLike></CommentLike> 回复</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        能看到我吗？
      </p>
    ),
    datetime: (
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
             <span>{moment().format('YYYY-MM-DD HH:mm:ss')}</span>
             </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0"><CommentLike></CommentLike> 回复</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        能看到我吗？
      </p>
    ),
    datetime: (
      <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().format('YYYY-MM-DD HH:mm:ss')}</span>
        </Tooltip>
    ),
  },
];

class CommentList extends Component {
    render() {
        return(
            <div>
                <List
                className="comment-list"
                header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <li>
                        <Comment
                        actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                        />
                    </li>
                )}
            />,
            </div>
        )
    }
}

export default CommentList
