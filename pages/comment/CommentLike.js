import React, { createElement, useState} from 'react';
import { Comment, Tooltip, } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

export default function CommentLike (props) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <span key="comment-basic-like">
        <Tooltip title="Like">
            {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
            onClick: like,
            })}
        </Tooltip>
        <span className="comment-action">{likes}</span>
        </span>,
        <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
            {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined, {
            onClick: dislike,
            })}
        </Tooltip>
        <span className="comment-action">{dislikes}</span>
        </span>,
    ];    
        return (
            <div>
                    <Comment
                    actions={actions}
                    />
            </div>
            );
} 
