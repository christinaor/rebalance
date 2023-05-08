import React, { useCallback } from "react";

import styles from './styles.module.scss';

const EditRecordForm = (props) => {
  const {
    currentCounterparty,
    editedRecord,
    setEditedRecord,
    recordsList,
    setRecordsList,
    setIsAltering,
    setIsEditing,
  } = props;

  const updateRecord = useCallback(e => {
    e.preventDefault();
    const putEditedRecord = async () => {
      fetch('api/records/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: editedRecord.id,
          item_name: editedRecord.item,
          item_cost: editedRecord.cost,
          perc_split: editedRecord.perc
        })
      })
        .then(() => {
          // Filter out record that was edited, then add editedRecord
          const filteredRecords = recordsList.filter(record => record.id != editedRecord.id)
          setRecordsList([...filteredRecords, {
            counterparty_username: editedRecord.name,
            id: parseInt(editedRecord.id),
            input_date: new Date().toISOString(),
            item_cost: editedRecord.cost,
            item_name: editedRecord.item,
            user_perc: editedRecord.perc,
            user_split: parseFloat(editedRecord.cost * editedRecord.perc / 100).toString(),
            username: "CO",
          }]);
          setEditedRecord({
            name: null,
            id: null,
            item: null,
            cost: null,
            perc: null,
          });
          setIsEditing(false);
          setIsAltering(false);
        })
        .catch(err => `Error updating record: ${err}`)
      };
      putEditedRecord();
  }, [currentCounterparty, editedRecord, recordsList]);

  const handleCancel = () => {
    setIsEditing(false);
    setIsAltering(false);
  };

  console.log(editedRecord)
  return (
    <>
      {!editedRecord?.id && <div className={styles.chooseRecordPrompt}>
        <div className={styles.chooseRecordText}>Choose a record to update.</div>
        {<button className={styles.cancelButton} onClick={handleCancel}>CANCEL</button>}
      </div>
      }

      {editedRecord?.id && <form className={styles.editRecordForm}>
        <div className={styles.formField}>
          <label className={styles.formFieldLabel} htmlFor="edited-item-name">Item Name</label>
          <input className={styles.formFieldInput} name="edited-item-name" type="text" value={editedRecord.item} onChange={(e) => setEditedRecord({...editedRecord, item: e.target.value})} />
        </div>
        <div className={styles.formField}>
          <label className={styles.formFieldLabel} htmlFor="edited-cost">Cost ($)</label>
          <input className={styles.formFieldInput} name="edited-cost" type="text" value={editedRecord.cost} onChange={(e) => setEditedRecord({...editedRecord, cost: e.target.value})} />
        </div>
        <div className={styles.formField}>
          <label className={styles.formFieldLabel} htmlFor="edited-user-percentage">Your Split (%)</label>
          <input className={styles.formFieldInput} name="edited-user-percentage" type="number" value={editedRecord.perc} onChange={(e) => setEditedRecord({...editedRecord, perc: e.target.value})} />
        </div>
        <div className={styles.updateCancelButtons}>
          <button className={styles.updateButton} onClick={updateRecord}>Update Record</button>
          <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
        </div>
      </form>}
    </>
  )
}

export default EditRecordForm;