import React, { Component } from 'react';
import {Table} from 'react-bootstrap';


class Widgets extends Component{
  constructor(props) {
    super(props);
    this.state = {
      conntryData : [{name:"india",currency:"rupeess"}]
    };
   
  }

  render() {
    return (  <Table responsive>
      <thead>
        <tr>
          {/* <th>"name"</th>
          <th>"sachin"</th> */}
        {this.state.conntryData.forEach((data, key) => {
          return Object.keys(data).map((da)=>{
            console.log(da);
            return (<th>{da}</th>)
          })
              
           })}
        </tr>
      </thead>
      <tbody>
      {this.state.conntryData.map((data, key) => {
              return (
              <tr key={key}>
                <td>{data.name}</td>
                <td>{data.currency}</td>
                <td>{data.neighbour}</td>
              </tr>
              )
           })}
      </tbody>
    </Table>
);
  }
}
export default Widgets;