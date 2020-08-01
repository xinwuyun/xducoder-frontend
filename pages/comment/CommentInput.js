import React, { Component} from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import CommentLike from './CommentLike';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        发送
      </Button>
    </Form.Item>
  </>
);

class CommentInput extends Component {

  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  }  

  state = {
        comments: [],
        submitting: false,
        value: '',
    };

    handleSubmit = () => {
        if (!this.state.value) {
          return;
        }

        this.setState({
        submitting: true,
        });

        setTimeout(() => {
        this.setState({
            submitting: false,
            value: '',
            comments: [
            {
                actions: [ <span  key="comment-list-reply-to-0"><CommentLike></CommentLike> 回复</span>],
                author: 'heihei',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: <p>{this.state.value}</p>,
                datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
            ...this.state.comments,
            
            ],

        });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
        value: e.target.value,
        });
    };
    handleDeleteComment () {
      if (this.props.onDeleteComment) {
        this.props.onDeleteComment(this.props.index)
      }
    }
  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div>
                    <span
              onClick={this.handleDeleteComment.bind(this)}
              className='comment-delete'>
              删除
            </span>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
       
        avatar={
        <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="嘿嘿"
        />
        }
        
        content={
        <Editor
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            submitting={submitting}
            value={value}
        />
        }
        />
        
        
      </div>
    );
  }
}

export default CommentInput
