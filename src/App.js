import React, { Component } from 'react'
import { Button } from 'antd';
export default class App extends Component {
  render() {
    return (
      <div>
        <Button type="dashed">Dashed</Button>
        <Button type="primary">Primary</Button>
        首页
      </div>
    )
  }
}
