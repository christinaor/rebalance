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

import React, { useEffect, useState } from "react";
import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import { Button, ButtonGroup, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AlterRecordsComponent from "../AlterRecords/AlterRecords.jsx";

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
    setPopulatedCounterparties
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
  // const [actionsValue, setActionsValue] = useState('Select')

  useEffect(() => {
    if (currentCounterparty !== 'All Parties') setSortedRecords(false);
  }, [currentCounterparty]);

  // const sortByCounterparty = async () => {
  //   if (!sortedRecords && currentCounterparty === 'All Parties') {
  //     await setRecordsList(recordsList.sort((a, b) => a.counterparty_username.localeCompare(b.counterparty_username)));
  //     setSortedRecords(true);
  //     console.log('done sorting:')
  //   } else {
  //     setSortedRecords(false);
  //   }
  // };

  // // Create array of records to render later
  // const recordElements = recordsList.map(record => {
  //   const { id, counterparty_username, input_date, item_name, item_cost, user_split, user_perc } = record;
  //   return (
  //     <Record 
  //       key={`record${id}`}
  //       id={id}
  //       counterpartyName={counterparty_username}
  //       inputDate={input_date}
  //       itemName={item_name}
  //       cost={item_cost}
  //       userSplit={user_split}
  //       userPercent={user_perc}
  //       populatedRecords={populatedRecords}
  //       setPopulatedRecords={setPopulatedRecords}
  //       recordToUpdate={recordToUpdate}
  //       setRecordToUpdate={setRecordToUpdate}
  //       allButtonsVisible={allButtonsVisible}
  //       setAllButtonsVisible={setAllButtonsVisible}
  //       inEditMode={inEditMode}
  //       setInEditMode={setInEditMode}
  //       inDeleteMode={inDeleteMode}
  //       setInDeleteMode={setInDeleteMode}
  //       clickedRecordToEdit={clickedRecordToEdit}
  //       setClickedRecordToEdit={setClickedRecordToEdit}
  //       currentCounterparty={currentCounterparty}
  //       setCurrentCounterparty={setCurrentCounterparty}
  //     />
  //   )
  // });

  // const sortOptions = [
  //   { value: 'Counterparty', label: 'Counterparty'},
  //   { value: 'Date', label: 'Date'},
  //   { value: 'Cost', label: 'Cost'},
  //   { value: 'User Split', label: 'User Split'},
  //   { value: 'Counterparty Split', label: 'Counterparty Split'},
  //   { value: 'User Percentage', label: 'User Percentage'}
  // ];

  // const animatedComponents = makeAnimated();

  // const AnimatedMultiFilter = () => {
  //   return (
  //     <Select
  //       closeMenuOnSelect={false}
  //       components={animatedComponents}
  //       isMulti
  //       options={sortOptions}
  //     />
  //   )
  // };

  // // Set button visibilities based on whether one is clicked
  // const clickedInitialAdd = () => {
  //   setToggleAddRecordForm(true);
  //   setAllButtonsVisible(false);
  // };
  // const cancelAdd = () => {
  //   setToggleAddRecordForm(false);
  //   setAllButtonsVisible(true);
  // };
  // const clickedInitialEdit = () => {
  //   setInEditMode(true);
  //   setAllButtonsVisible(false);
  // };
  // const cancelEdit = () => {
  //   setInEditMode(false);
  //   setAllButtonsVisible(true);
  //   // set update object state to null
  //   setRecordToUpdate({
  //     id: null,
  //     item: null,
  //     cost: null,
  //     perc: null
  //   });
  //   setClickedRecordToEdit(false);
  // }
  // const clickedInitialDelete = () => {
  //   setInDeleteMode(true);    
  //   setAllButtonsVisible(false);
  // }
  // const cancelDelete = () => {
  //   setInDeleteMode(false);
  //   setAllButtonsVisible(true);
  // }

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
      {
        field: 'id',
        headerName: 'ID',
        minWidth: 30,
        headerAlign: 'center',
        align: 'center',
        flex: 1
        // justifyContent: 'center'
      },
      {
        field: 'counterparty_username',
        headerName: 'Counterparty',
        minWidth: 120,
        headerAlign: 'center',
        align: 'center',
        flex: 1
      },
      {
        field: 'input_date',
        headerName: 'Date Entered',
        minWidth: 120,
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
        minWidth: 120,
        // editable: true,
        headerAlign: 'center',
        align: 'left',
        flex: 1
      },
      {
        field: 'item_cost',
        headerName: 'Cost',
        minWidth: 90,
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
      {
        field: 'counterparty_split',
        headerName: 'Counterparty Split',
        description: 'This column has a value getter',
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        valueGetter: (params) => {
          // MUI's getValue is deprecated, use params.row object to access data instead
          const cpSplit = (params.row.item_cost - params.row.item_cost * params.row.user_perc / 100).toFixed(2);
          return '$' + cpSplit;
        }
      },
      {
        field: 'user_perc',
        headerName: 'User Percentage',
        minWidth: 150,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        valueGetter: (params) => {
          return params.row.user_perc + '%'
        },
        // editable: true
      }
    ]
  };

  return (
    <div className={styles.recordsWrapper}>
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
      <div className={styles.recordsListWrapper}
      >
        {/* MUI datagrid */}
        {populatedRecords &&
        <div style={{ height: 600, width: '90%'}}>
          <DataGrid
            rows={recordsList}
            columns={recordCols}
            density='comfortable'
            // autoPageSize='true'
            // autoHeight='true'
            pageSize={20}
            rowsPerPageOptions={[20]}
            onRowClick={editOrDeleteRecord}
            // sx={{
            //   m: 2,
            //   border: 2,
            //   borderColor: 'inherit.light',
            //   '& .MuiDataGrid-cell:hover': {
            //     color: 'primary.main',
            //   }
            // }}
            // checkboxSelection
            // disableSelectionOnClick

          />
        </div>}
      </div>
      <br />
    </Paper>
    </div>
  )
};

export default RecordsList;
