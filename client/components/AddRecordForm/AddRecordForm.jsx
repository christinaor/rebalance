import React, {useCallback, useState } from "react";

import styles from './styles.module.scss';

const AddRecordForm = (props) => {
  const { 
    currentCounterparty,
    recordsList,
    setRecordsList,
    setIsAdding,
    setIsAltering,
  } = props;

  const [addedRecord, setAddedRecord] = useState({
    name: 'CO', // TODO: set to user
    counterparty: currentCounterparty,
    item: '',
    cost: '',
    perc: 50,
  });

  const addRecord = useCallback(e => {
    e.preventDefault();

    const postAddedRecord = async () => {
      fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: addedRecord.name,
          counterparty: currentCounterparty,
          item: addedRecord.item,
          cost: addedRecord.cost,
          split: addedRecord.cost * addedRecord.perc / 100,
          percentage: addedRecord.perc,
        })
      })
        .then(res => res.json())
        .then(addedId => {
          setRecordsList([...recordsList, {
            counterparty_username: currentCounterparty,
            id: addedId,
            input_date: new Date().toISOString(),
            item_cost: addedRecord.cost,
            item_name: addedRecord.item,
            user_perc: addedRecord.perc,
            user_split: parseFloat(addedRecord.cost * addedRecord.perc / 100).toFixed(2).toString(),
            username: "CO",
          }])
          setAddedRecord({
            name: 'CO',
            counterparty: currentCounterparty,
            item: '',
            cost: '',
            perc: 50
          })
        })
        .catch(err => `Error adding record: ${err}`)
        .finally(() => {
          setIsAdding(false);
          setIsAltering(false);
        })
      };
      postAddedRecord();
  }, [addedRecord, currentCounterparty, recordsList]);

  const handleCancel = () => {
    setIsAdding(false);
    setIsAltering(false);
  };

  return (
    <form className={styles.recordsAddForm} action="/api/records" method="POST">
      <div className={styles.formField}>
        <label className={styles.formFieldLabel}  htmlFor="added-item">Item Purchased:</label>
        <input className={styles.formFieldInput} name="added-item" type="text" value={addedRecord.item} onChange={(e) => setAddedRecord({...addedRecord, item: e.target.value})} required />
      </div>
      <div className={styles.formField}>
        <label className={styles.formFieldLabel} htmlFor="added-cost">Item Cost ($):</label>
        <input className={styles.formFieldInput} name="added-cost" type="text" value={addedRecord.cost} onChange={(e) => setAddedRecord({...addedRecord, cost: e.target.value})} required />
      </div>
      <div className={styles.formField}>
        <label className={styles.formFieldLabel}  htmlFor="added-userPercent">Your Split (%):</label>
        <input className={styles.formFieldInput} name="added-userPercent" type="text" placeholder={50} value={addedRecord.perc} id="records-post-user-percent" onChange={(e) => setAddedRecord({...addedRecord, perc: e.target.value})} required />
      </div>
      <div className={styles.addCancelButtons}>
        <button className={styles.submitNewRecordButton} onClick={addRecord}>Add Record</button>
        <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default AddRecordForm;