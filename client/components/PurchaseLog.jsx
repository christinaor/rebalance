import React, { Component } from 'react'

class PurchaseLog extends Component {
  constructor(props) {
    super(props)
  }
  
  getAllEntries() {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        this.setState({
          ...this.state,
          dbData: data
        });
        console.log('returned data')
      })
      .catch(err => console.log('There is an error getting all entries: ' + err))   
  };

  componentDidMount() {
    this.getAllEntries();
  }

  render() {
    // access to dbData
    // console.log('this is dbdata', this.props.dbData)
    let itemNames = this.props.dbData.map((obj, i) => {
      const { id, cost, category, purchase_date, notes, input_date, name, item_name } = obj;
      return (<div key={`list ${i}`}>{name} {item_name} </div>)
    }
  )

    // display purchase log
    return (
      <div>
        <div>{itemNames}</div>
      </div>      
    )
  }
}






export default PurchaseLog;