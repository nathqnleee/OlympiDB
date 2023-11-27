import React, { useState, useEffect } from 'react';
import Olympics from '../olympics.png';
import Animals from '../animals.png';
import InsertDatabase from '../components/InsertDatabase';
import UpdateDatabase from '../components/UpdateDatabase';
import DeleteDatabase from '../components/deleteDatabase';

function ManageDatabase() {
    
    return (
      <div className="updateDatabasePage">
        <img src={Olympics} alt="Olympics Logo" />
          <InsertDatabase></InsertDatabase>
          <UpdateDatabase></UpdateDatabase>
          <DeleteDatabase></DeleteDatabase>
        <img src={Animals} alt="Animals Photo" />   
      </div>
    );
  }
  
  export default ManageDatabase;