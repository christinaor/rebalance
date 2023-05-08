/**
 * ************************************
 *
 * @module  RecordsList
 * @author
 * @date
 * @description Component holding state consisting of records list and conditional rendering
 *
 * ************************************
 */

import React, { useCallback, useEffect, useState } from "react";
import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import { Button, ButtonGroup, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AlterRecordsComponent from "../AlterRecordsOld/AlterRecords.jsx";

import styles from './styles.module.scss';

const RecordsList = props => {
  const {
    recordsList,
    setRecordsList,
    populatedRecords,
    setPopulatedRecords,
    recordToUpdate,
    setRecordToUpdate,
    currentCounterparty,
    setCurrentCounterparty,
    sortedRecords,
    setSortedRecords,
    counterpartiesList,
    setCounterpartiesList,
    populatedCounterparties,
    setPopulatedCounterparties,

    isEditing,
    editedRecord,
    setEditedRecord,
  } = props;
  
  const [toggleAddRecordForm, setToggleAddRecordForm] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [clickedRecordToEdit, setClickedRecordToEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editCost, setEditCost] = useState(null);
  const [editUserPerc, setEditUserPerc] = useState(null);
  const [inDeleteMode, setInDeleteMode] = useState(false);
  const [allButtonsVisible, setAllButtonsVisible] = useState(true);

  useEffect(() => {
    if (currentCounterparty !== 'All Parties') setSortedRecords(false);
  }, [currentCounterparty]);

  // editOrDeleteRecord with MUI's onCellClick
  // delete a record clicked based on its id
  const deleteRecord = (params) => {
    console.log('deleteRecord fired');
    fetch('api/records/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: params.row.id
      })
    })
      .catch(err => `Error deleting record: ${err}`)
      .finally(() => {
        console.log('deleted record')
        setPopulatedRecords(false);
      })
  };

  const editOrDeleteRecord = (params) => {
    if (inDeleteMode) deleteRecord(params);
    // For update, set recordToUpdate when record has been clicked
    if (inEditMode && !clickedRecordToEdit) {
      setRecordToUpdate({
        id: params.row.id,
        item: params.row.item_name,
        cost: params.row.item_cost,
        perc: params.row.user_perc
      });
      console.log('this is params: ',params)
      setEditId(params.row.id);
      setEditItem(params.row.item_name);
      setEditCost(params.row.item_cost);
      setEditUserPerc(params.row.user_perc);
      // Opens edit form when clickedRecordToEdit is set to true
      setClickedRecordToEdit(true);
    // Reset recordToUpdate if the same or different record is clicked
    } else if (inEditMode && clickedRecordToEdit) {
      // If the id is different than the id in recordToUpdate, then a different record was clicked, so recordToUpdate should reflect info from this clicked record
      if (recordToUpdate.id !== params.row.id) {
        console.log('in the if statement comparing ids')
        setRecordToUpdate({
          id: params.row.id,
          item: params.row.item_name,
          cost: params.row.item_cost,
          perc: params.row.user_perc
        });
        setEditId(params.row.id);
        setEditItem(params.row.item_name);
        setEditCost(params.row.item_cost);
        setEditUserPerc(params.row.user_perc);
        setClickedRecordToEdit(true);
      // If id is the same, the record already has clicekdRecordToEdit set to true, so clicking the same record should set it to false and reset recordToUpdate
      } else {
        setRecordToUpdate({
          id: null,
          item: null,
          cost: null,
          perc: null
        });
        setEditId(null);
        setEditItem(null);
        setEditCost(null);
        setEditUserPerc(null);
        // Closes edit form for same record clicked when clickedRecordToEdit is set to false
        setClickedRecordToEdit(false);
      }
    }
  };

  // MUI datagrid columns
  let recordCols;
  if (populatedRecords) {
    recordCols = [
      // {
      //   field: 'id',
      //   headerName: 'ID',
      //   minWidth: 30,
      //   headerAlign: 'center',
      //   align: 'center',
      //   flex: 1
      //   // justifyContent: 'center'
      // },
      {
        field: 'counterparty_username',
        headerName: 'Counterparty',
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
        flex: 1
      },
      {
        field: 'input_date',
        headerName: 'Date',
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        valueGetter: (params) => {
          const recordDate = new Date(params.row.input_date);
          const yyyy = recordDate.getFullYear();
          let mm = recordDate.getMonth() + 1; // month starts at 0;
          let dd = recordDate.getDate();

          dd = (dd < 10) ? '0' + dd : dd;
          mm = (mm < 10) ? '0' + mm : mm;

          return `${mm}/${dd}/${yyyy}`
        }
      },
      {
        field: 'item_name',
        headerName: 'Item',
        minWidth: 100,
        // editable: true,
        headerAlign: 'center',
        align: 'left',
        flex: 1
      },
      {
        field: 'item_cost',
        headerName: 'Cost',
        minWidth: 70,
        // editable: true,
        headerAlign: 'center',
        align: 'center',
        flex: 1
      },
      {
        field: 'user_split',
        headerName: 'User Split',
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        valueGetter: (params) => '$' + params.row.item_cost
      },
      // {
      //   field: 'counterparty_split',
      //   headerName: 'Counterparty Split',
      //   description: 'This column has a value getter',
      //   minWidth: 150,
      //   headerAlign: 'center',
      //   align: 'center',
      //   flex: 1,
      //   valueGetter: (params) => {
      //     // MUI's getValue is deprecated, use params.row object to access data instead
      //     const cpSplit = (params.row.item_cost - params.row.item_cost * params.row.user_perc / 100).toFixed(2);
      //     return '$' + cpSplit;
      //   }
      // },
      // {
      //   field: 'user_perc',
      //   headerName: 'User Percentage',
      //   minWidth: 150,
      //   headerAlign: 'center',
      //   align: 'center',
      //   flex: 1,
      //   valueGetter: (params) => {
      //     return params.row.user_perc + '%'
      //   },
      //   // editable: true
      // }
    ]
  };

  const handleRecordRowClick = useCallback(e => {
    if (isEditing) {
      console.log(e.currentTarget)
      const recordId = e.currentTarget.id;
      const recordItem = e.currentTarget.querySelector('.recordItemName').textContent;
      const recordCost = e.currentTarget.querySelector('.recordCost').textContent;
      const recordPercent = e.currentTarget.querySelector('.recordSplitPercent').textContent;

      setEditedRecord({
        id: recordId,
        item: recordItem,
        cost: recordCost,
        perc: recordPercent,
      })
      console.log(recordId, recordItem, recordCost, recordPercent)
    }
  }, [isEditing]);

console.log(recordsList)
  return (
    <div className={styles.recordsContainer}>
      <div className={styles.listTitleRow}>
        <div className={styles.listTitleCounterparty}>Counterparty</div>
        <div className={styles.listTitleItemName}>Item Name</div>
        <div className={styles.listTitleCost}>Cost ($)</div>
        <div className={styles.listTitleSplitDollar}>Your Split ($)</div>
        <div className={`${styles.listTitleSplitPercent} ${styles.mobileHidden}`}>Your Split (%)</div>
        <div className={`${styles.listTitleDate} ${styles.mobileHidden}`}>Date Entered</div>
      </div>

      {recordsList?.map(record => (<div key={`record-${record.id}`} id={record.id} className={styles.recordRow} onClick={handleRecordRowClick}>
        <div className={`recordCounterparty ${styles.recordCounterparty}`}>{record.counterparty_username}</div>
        <div className={`recordItemName ${styles.recordItemName}`}>{record.item_name}</div>
        <div className={`recordCost ${styles.recordCost}`}>{record.item_cost}</div>
        <div className={`recordSplitDollar ${styles.recordSplitDollar}`}>{record.user_split}</div>
        <div className={`recordSplitPercent ${styles.recordSplitPercent} ${styles.mobileHidden}`}>{record.user_perc}</div>
        <div className={`recordDate ${styles.recordDate} ${styles.mobileHidden}`}>{record.input_date}</div>
      </div>
      ))}



      
    <Paper elevation={3} className={styles.recordsContainer}>
      <AlterRecordsComponent 
        allButtonsVisible={allButtonsVisible}
        setAllButtonsVisible={setAllButtonsVisible}
        toggleAddRecordForm={toggleAddRecordForm}
        setToggleAddRecordForm={setToggleAddRecordForm}
        inEditMode={inEditMode}
        setInEditMode={setInEditMode}
        inDeleteMode={inDeleteMode}
        setInDeleteMode={setInDeleteMode}
        recordToUpdate={recordToUpdate}
        setRecordToUpdate={setRecordToUpdate}
        clickedRecordToEdit={clickedRecordToEdit}
        setClickedRecordToEdit={setClickedRecordToEdit}
        recordsList={recordsList}
        setRecordsList={setRecordsList}
        populatedRecords={populatedRecords}
        setPopulatedRecords={setPopulatedRecords}
        currentCounterparty={currentCounterparty}
        setCurrentCounterparty={setCurrentCounterparty}
        editId={editId}
        setEditId={setEditId}
        editCost={editCost}
        setEditCost={setEditCost}
        editUserPerc={editUserPerc}
        setEditUserPerc={setEditUserPerc}
        counterpartiesList={counterpartiesList}
        setCounterpartiesList={setCounterpartiesList}
        populatedCounterparties={populatedCounterparties}
        setPopulatedCounterparties={setPopulatedCounterparties}
        
      />
      <div className={styles.recordsListWrapper}>
        {populatedRecords && <div style={{ height: 600, width: '90%'}}>
          <DataGrid
            rows={recordsList}
            columns={recordCols}
            density='comfortable'
            // autoPageSize='true'
            // autoHeight='true'
            pageSize={20}
            rowsPerPageOptions={[20]}
            onRowClick={editOrDeleteRecord}
          />
        </div>}
      </div>
      <br />
    </Paper>
    </div>
  )
};

export default RecordsList;
