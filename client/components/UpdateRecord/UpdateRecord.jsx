import React, {useEffect, useState} from "react";
import { Button, Box, TextField } from '@mui/material';

const UpdateRecord = (props) => {
  const {
    // id,
    // counterpartyName,
    // dateEntered,
    // itemName,
    // cost,
    // userSplit,
    // counterpartySplit,
    // userPercent,
    populatedRecords,
    setPopulatedRecords,
    recordToUpdate,
    setRecordToUpdate,
    clickedRecordToEdit,
    setClickedRecordToEdit,
    editId,
    setEditId,
    editItem,
    setEditItem,
    editCost,
    setEditCost,
    editUserPerc,
    setEditUserPerc
  } = props;

  const updateRecord = (e) => {
    console.log('updateRecord fired: ', recordToUpdate);
    console.log('current populated records is: ', populatedRecords)
    e.preventDefault();
    fetch('api/records/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: recordToUpdate.id,
        item_name: recordToUpdate.item,
        item_cost: recordToUpdate.cost,
        perc_split: recordToUpdate.perc
      })
    })
      .then(() => {
        setClickedRecordToEdit(false);
        setEditId(null);
        setEditItem(null);
        setEditCost(null);
        setEditUserPerc(null);
        setRecordToUpdate({
          id: null,
          item: null,
          cost: null,
          perc: null
        })
      })
      .catch(err => `Error updating record: ${err}`)
      .finally(setPopulatedRecords(false))
  };

  // const cancelClicked = () => {
  //   setClickedRecordToEdit(false);
  //   setEditId(null);
  //   setEditItemName(null);
  //   setRecordToUpdate({
  //     id: null,
  //     item: null,
  //     cost: null,
  //     perc: null
  //   }) 
  // }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <span>{editId}</span>
      <TextField 
        id="edit-item" 
        label="Item Name" 
        variant="outlined"
        onInput={e => {
          if (e.target.value !== '') {
            setRecordToUpdate({...recordToUpdate, item: e.target.value})
          }
        }} />
      <TextField 
        id="edit-cost" 
        label="Item Cost" 
        variant="outlined" 
        onInput={e => {
          if (e.target.value !== '') {
            setRecordToUpdate({...recordToUpdate, cost: e.target.value})
          }
        }} />
      <TextField 
        id="edit-user-percentage" 
        label="Your %" 
        variant="outlined" 
        onInput={e => {
          if (e.target.value !== '') {
            setRecordToUpdate({...recordToUpdate, perc: e.target.value})
          }
        }} />
      <Button className="center update-button" type="submit" variant="contained" size="small" onClick={updateRecord}>Update</Button>
    </Box>
    // <form className="records-put-form grid-record center" action="/api/records" method="PUT">
    //   {/* <div>{id}</div>
    //   <div>{counterpartyName}</div>
    //   <div>{dateEntered}</div> */}


    //   <div>{editId}</div>
    //   <div>
    //     <label name="item" value="Item Name"/>
    //     <input 
    //       name="item" 
    //       type="text" 
    //       size={15}
    //       placeholder={editItem}
    //       id="records-update-item" 
    //       onChange={(e) => {
    //         if (e.target.value !== '') {
    //           setRecordToUpdate({...recordToUpdate, item: e.target.value})
    //         }
    //       }} 
    //     />
    //   </div>
    //   <div>
    //     <input 
    //       name="cost" 
    //       type="text" 
    //       placeholder={editCost}
    //       size={5}
    //       id="records-update-cost" 
    //       onChange={(e) => {
    //         if (e.target.value !== '') {
    //           setRecordToUpdate({...recordToUpdate, cost: e.target.value})
    //         }
    //       }} 
    //     />
    //   </div>
    //   {/* <div>{userSplit}</div>
    //   <div>{counterpartySplit}</div> */}
    //   <div>
    //     <input 
    //       name="perc" 
    //       type="number"
    //       step="0.01"
    //       size={10}
    //       placeholder={editUserPerc}
    //       id="records-update-perc" 
    //       onChange={(e) => {
    //         if (e.target.value !== '') {
    //           setRecordToUpdate({...recordToUpdate, perc: e.target.value})
    //         }
    //       }} 
    //     />
    //   </div>
    //   <div className="center">
    //     <Button className="center update-button" type="submit" variant="contained" size="small" onClick={updateRecord}>Update</Button>
    //     {/* <Button className="center update-button" type="submit" variant="contained" size="small" onClick={updateRecord}>Update No.{recordToUpdate.id}</Button> */}
    //     {/* <button onClick={cancelClicked}>Cancel Update</button>
    //     {console.log('in UpdateRecord render checking recordToUpdate: ', recordToUpdate)} */}
    //   </div>
    // </form>
  )
};

export default UpdateRecord;