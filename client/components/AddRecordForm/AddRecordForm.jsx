import React, {useCallback, useState } from "react";

import styles from './styles.module.scss';

const AddRecord = (props) => {
  const { 
    currentCounterparty,
    handleCancel,
    setIsAdding,
    setIsAltering,
  } = props;

  const [addedRecord, setAddedRecord] = useState({
    name: 'CO', // TODO: set to user
    counterparty: currentCounterparty,
    item: '',
    cost: '',
    userPercent: 50
  });

  const addRecord = useCallback(e => {
    e.preventDefault();
    const splitCalculation =  addedRecord.cost * addedRecord.userPercent / 100;
    const postAddedRecord = async () => {
      await fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: addedRecord.name,
          counterparty: currentCounterparty,
          item: addedRecord.item,
          cost: addedRecord.cost,
          split: splitCalculation,
          percentage: addedRecord.userPercent
        })
      })
        .then(() => {
          console.log('added record!')
        })
        .catch(err => `Error adding record: ${err}`)
        .finally(() => {
          setAddedRecord({
            name: 'CO',
            counterparty: currentCounterparty,
            item: '',
            cost: '',
            userPercent: 50
          })
          setIsAdding(false);
          setIsAltering(false);
        })
      };
      postAddedRecord();
  }, [addedRecord, currentCounterparty]);


  return (
    <form className={styles.recordsAddForm} action="/api/records" method="POST">
      <div>
        <label htmlFor="added-item">Item Purchased</label>
        <input name="added-item" type="text" value={addedRecord.item} onChange={(e) => setAddedRecord({...addedRecord, item: e.target.value})} required />
      </div>
      <div>
        <label htmlFor="added-cost">Item Cost ($)</label>
        <input name="added-cost" type="text" value={addedRecord.cost} onChange={(e) => setAddedRecord({...addedRecord, cost: e.target.value})} required />
      </div>
      <div>
        <label htmlFor="added-userPercent">Your Split (%)</label>
        <input name="added-userPercent" type="text" placeholder={50} value={addedRecord.userPercent} id="records-post-user-percent" onChange={(e) => setAddedRecord({...addedRecord, userPercent: e.target.value})} required />
      </div>
      <div className={styles.addCancelButtons}>
        <button className={styles.submitNewRecordButton} onClick={addRecord}>Add Record</button>
        <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default AddRecord;