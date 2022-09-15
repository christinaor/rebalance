import React, {useEffect, useState} from "react";

const AddRecord = (props) => {
  const { 
    populatedRecords,
    setPopulatedRecords,
    currentCounterparty,
    setCurrentCounterparty
  } = props;

  // const [togglePostRecordForm, setTogglePostRecordForm] = useState(false);
  const [isEmptyCounterparty, setIsEmptyCounterparty] = useState(false);
  const [postedRecord, setPostedRecord] = useState({
    name: 'CO',
    counterparty: currentCounterparty,
    item: '',
    cost: '',
    userPercent: 50
  });

  useEffect(() => {
    setPostedRecord({...postedRecord, counterparty: currentCounterparty})
  }, [currentCounterparty])

  const postRecord = (e) => {
    e.preventDefault();    
    console.log('currentCounterparty here', currentCounterparty)
    if (currentCounterparty === null) {
      return setIsEmptyCounterparty(true);
    } else {
      console.log('postRecord fired')
      // Add cases dealing with blanks/nulls in postedRecord
      const splitCalculation = postedRecord.cost * postedRecord.userPercent / 100;
      console.log('this is split',splitCalculation)
      fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: postedRecord.name,
          counterparty: postedRecord.counterparty,
          item: postedRecord.item,
          cost: postedRecord.cost,
          split: splitCalculation,
          percentage: postedRecord.userPercent
        })
      })
        .then(() => {
          console.log('added record!')
          setPopulatedRecords(false);
          setIsEmptyCounterparty(false);
        })
        .catch(err => `Error adding record: ${err}`)
        .finally(
          setPostedRecord({
            name: 'CO',
            counterparty: currentCounterparty,
            item: '',
            cost: '',
            userPercent: 50
          })
        )
    }
  };

  return (
    <div className="records-post-form">
      {/* <h2>Add A Record:</h2> */}
      {/* <button onClick={() => setTogglePostRecordForm(!togglePostRecordForm)}>{togglePostRecordForm ? `Exit Adding A Record`: `Add A Record Here`}</button> */}
      {isEmptyCounterparty &&
      <div>Please choose a counterparty before adding!</div>
      }
      {/* {togglePostRecordForm &&  */}

      <form className="post-form-inputs-wrapper" action="/api/records" method="POST">
        <div>
          <label for="item">Item Purchased:</label>
          <input name="item" type="text" value={postedRecord.item} id="records-post-item" onChange={(e) => setPostedRecord({...postedRecord, item: e.target.value})} />
        </div>
        <div>
          <label for="cost">Item Cost:</label>
          <input name="cost" type="text" value={postedRecord.cost} id="records-post-cost" onChange={(e) => setPostedRecord({...postedRecord, cost: e.target.value})} />
        </div>
        <div>
          <label for="userPercent">Your Percent Split:</label>
          <input name="userPercent" type="text" placeholder={50}value={postedRecord.userPercent} id="records-post-user-percent" onChange={(e) => setPostedRecord({...postedRecord, userPercent: e.target.value})} />
        </div>
        <div>
          <button type="submit" onClick={postRecord}>Add</button>
        </div>
      </form>
      {/* } */}
  </div>
  )
}

export default AddRecord;