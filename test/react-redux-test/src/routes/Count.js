import React from 'react';
import { connect } from 'dva';
let i = 0
class Count extends React.Component {
  render(){
    console.log('from Count', ++i)
    return (
      <div>
        {this.props.example.count}
        <br/>
        {this.props.count}
      </div>
    );
  }
}

export default connect(state => ({
  example: state.example
}))(Count);