import React, {useEffect, useState} from "react";

const AddRecord = (props) => {
  const {  } = props;

  const [togglePostRecordForm, setTogglePostRecordForm] = useState(false);
  const [postedRecord, setPostedRecord] = useState({
    name: '',
    item: '',
    cost: ''
  });

  const postRecord = (e) => {
    console.log('postRecord fired')
    e.preventDefault();
    fetch('/api/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: postedRecord.name,
        item_name: postedRecord.item,
        item_cost: postedRecord.cost
      })
    })
      .then(() => {
        console.log('added record!')
        setPopulatedRecords(false);
      })
      .catch(err => `Error adding record: ${err}`)
      .finally(
        setPostedRecord({
          name: '',
          item: '',
          cost: ''
        })
      )
  };


  return (
    <div className="records-post-form">
      <button onClick={() => setTogglePostRecordForm(!togglePostRecordForm)}>{togglePostRecordForm ? `Exit Adding A Record`: `Add A Record Here`}</button>
      {
      togglePostRecordForm && <form className="inner-records-post-form" action="/api/records" method="POST">
        <div>
          <label for="name">Name:</label>
          <input name="name" type="text" value={postedRecord.name} id="records-post-name" onChange={(e) => setPostedRecord({...postedRecord, name: e.target.value})} />
        </div>
        <div>
          <label for="item">Item Purchased:</label>
          <input name="item" type="text" value={postedRecord.item} id="records-post-item" onChange={(e) => setPostedRecord({...postedRecord, item: e.target.value})} />
        </div>
        <div>
          <label for="cost">Item Cost:</label>
          <input name="cost" type="text" value={postedRecord.cost} id="records-post-cost" onChange={(e) => setPostedRecord({...postedRecord, cost: e.target.value})} />
        </div>
        <div>
          <button type="submit" onClick={postRecord}>Add A Record</button>
        </div>
      </form>
      }
  </div>
  )
}

export default AddRecord;