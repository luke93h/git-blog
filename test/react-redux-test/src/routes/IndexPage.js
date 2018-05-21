import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Count from './Count'
let i = 0
class IndexPage extends React.Component {
  onClick = () => {
    this.props.dispatch({
      type: 'example/add'
    })
  }
  render(){
    console.log('From Parent', ++i)
    return (
      <div className={styles.normal}>
        <button
          onClick={this.onClick}
        >
          点我{this.props.example.count}
        </button>
        <Count count={this.props.example.count}></Count>
      </div>
    );
  }
}

export default connect(state => ({
  example: state.example
}))(IndexPage);
