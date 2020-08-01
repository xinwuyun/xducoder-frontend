import { Rate } from 'antd';
import React from 'react';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

class CommentStar extends React.Component {
  state = {
    value: 3,
  };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <span>
        <Rate tooltips={desc} onChange={this.handleChange} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
      </span>
    );
  }
}
export default CommentStar