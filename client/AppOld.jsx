import React, { Component } from 'react';
import BudgetDisplay from './components/BudgetDisplay.jsx'
import PurchaseLog from './components/PurchaseLog.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      str: 'hello world',
      dbData: [],
      added: [],
      searched: [],
      budget: 0,
      total: 0
    };
    // bind each function    
    // this.deleteFunc = this.deleteFunc.bind(this)
    this.addOneHandleClick = this.addOneHandleClick.bind(this)
    this.getOneHandleClick = this.getOneHandleClick.bind(this)
    // this.updateHandleClick = this.updateHandleClick.bind(this)
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

  getOneEntry() {
    const id = document.querySelector("#entry-id").value;
    const name = document.querySelector("#post-name").value;
    const purchase_date = document.querySelector("#post-purchase_date").value;
    const item_name = document.querySelector("#post-item_name").value;
    const cost = document.querySelector("#post-cost").value;

    fetch(`/api/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('returned specific data', data)
        console.log('found one entry');        
        this.setState({
          ...this.state,
          searched: data[0]
        });
      })
      .catch(err => console.log('There is an error getting the entry: ' + err))
  }

  addEntry() {
    const name = document.querySelector("#post-name").value;
    const purchase_date = document.querySelector("#post-purchase_date").value;
    const item_name = document.querySelector("#post-item_name").value;
    const cost = document.querySelector("#post-cost").value;

    fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        purchase_date,
        item_name,
        cost
      })
    })
      .then(response => {
        console.log('added data returned')        
        return response.json()
      })
      .then(() => this.getAllEntries())
      .catch(err => `There is an error adding: ${err}`)
  }



  // updateEntry() {
  //   const id = document.querySelector("#update-id").value;
    // fetch('/api/:' + id, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     id,
    //     name,
    //     purchase_date,
    //     item_name,
    //     cost
    //   })
    // })
  // }

  addOneHandleClick(e) {
    e.preventDefault();

    // check if ID is filled in
    // const id = document.querySelector("#update-id").value;
    // if (id) return this.updateEntry();

    return this.addEntry();
  }

  getOneHandleClick(e) {
    e.preventDefault();
    return this.getOneEntry();
  }



//   componentDidMount() {
//     // Simple POST request with a JSON body using fetch
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title: 'React POST Request Example' })
//     };
//     fetch('https://reqres.in/api/posts', requestOptions)
//         .then(response => response.json())
//         .then(data => this.setState({ postId: data.id }))
//         .catch(err => console.log(err))
// }



  // deleteFunc()


  // LIFECYCLE METHODS
  componentDidMount() {
    this.getAllEntries();
  }

  // componentDidUpdate() {
    
  // }

  render() {
    // for reading all entries upon mount (state's dbData will be populated)
    let entries = this.state.dbData.map((obj, i) => {
      const { id, cost, category, purchase_date, notes, input_date, name, item_name } = obj;
      return (
        <div className='single-entry-container' key={`entry ${i}`}>
          <div className='item-box' key={`id ${i}`}>{id} </div>
          <div className='name-box' key={`name ${i}`}>{name}</div>
          {/* <div key={`input_date ${i}`}>{input_date} </div> */}
          <div className='purchase_date-box' key={`purchase_date ${i}`}>{purchase_date} </div>
          <div className='item_name-box' key={`item_name ${i}`}>{item_name} </div>
          <div className='cost-box' key={`cost ${i}`}>{cost} </div>
          {/* <div key={`category ${i}`}>{category} </div> */}
          <div className='notes-box' key={`notes ${i}`}>{notes} </div>
        </div>
      )
    }
  )

  // for the searched record
  let searched = [];
  if (this.state.searched !== undefined) {
    const { id, name, purchase_date, item_name, cost, notes } = this.state.searched;
    searched = [(
      <>
        <div className='item-box' key={`searched-id`}>{id} </div>
        <div className='name-box' key={`searched-name`}>{name}</div>
        {/* <div key={`input_date ${i}`}>{input_date} </div> */}
        <div className='purchase_date-box' key={`searched-purchase_date`}>{purchase_date} </div>
        <div className='item_name-box' key={`searched-item_name`}>{item_name} </div>
        <div className='cost-box' key={`searched-cost`}>{cost} </div>
        {/* <div key={`category ${i}`}>{category} </div> */}
        <div className='notes-box' key={`searched-notes`}>{notes} </div>
      </>
    )]
  }

  // // for reading in added data
  // let addedData = this.state.added.map(obj => {
  //   const { id, cost, category, purchase_date, notes, input_date, name, item_name } = obj;
  //   return (
  //     <>
  //       <div key={`id ${i}`}>{id} </div>
  //       <div key={`name ${i}`}>{name}</div>
  //       <div key={`purchase_date ${i}`}>{purchase_date} </div>
  //       <div key={`item_name ${i}`}>{item_name} </div>
  //       <div key={`cost ${i}`}>{cost} </div>
  //       <div key={`notes ${i}`}>{notes} </div>
  //     </>
  //   )
  // })


    return (
      <div>
        <p>Leave ID empty if adding your purchase information.</p>
        {/* <BudgetDisplay data={this.state.dbData} budget={this.state.budget} total={this.state.total}/> */}
        {/* <PurchaseLog data={this.state.dbData}/> */}
        <div>{entries}</div>

        {/* for post request */}
        <div className="input-fields">
          <div>
            <label for="id">ID: </label>     
            <input name="id" type="text" id="entry-id" />                   
          </div>
          <div>
            <label for="name">Name: </label>     
            <input name="name" type="text" id="post-name" />                   
          </div>
          <div>
            <label for="purchase_date">Purchase Date: </label>
            <input name="purchase_date" type="text" id="post-purchase_date"/>
          </div>
          <div>
            <label for="item_name">Item Name: </label>
            <input name="item_name" type="text" id="post-item_name"/>
          </div>
          <div>
            <label for="cost">Cost: </label>
            <input name="cost" type="text" id="post-cost"/>
          </div>
          
          {/* READ - get one search entry */}
          <button onClick={this.getOneHandleClick}>Find Entry</button>

          {/* CREATE - post adding new entry */}
          <button onClick={this.addOneHandleClick}>Add Purchase</button>
          <div className='searched-container'>{searched}</div>

          {/* UPDATE - handles updating an existing entry */}
          {/* <button onClick={this.updateHandleClick}></button> */}

          {/* <button onSubmit={this.addEntry}></button> */}
          {/* <button onSubmit={e => handleClick(e)}></button> */}
        </div>

        {/* <div>Added Data: {addedData}</div> */}
      </div>
    )
  }
}

// render(<App />, document.querySelector('#root'));

export default App;


// this.handleSubmit = this.handleSubmit.bind(this);
{/* <button onClick={delete} >Delete</button>
<button onClick={() => deleteFunc()} >Delete</button>
<ChildComp deleteFunc={this.deleteFunc} /> */}
