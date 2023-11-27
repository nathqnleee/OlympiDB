import React, { useState, useEffect } from 'react';
import Olympics from '../olympics.png';
import Animals from '../animals.png';
import InsertDatabase from '../components/InsertDatabase';
import UpdateDatabase from '../components/UpdateDatabase';

function ManageDatabase() {
    
    return (
      <div className="updateDatabasePage">
        <img src={Olympics} alt="Olympics Logo" />
          <InsertDatabase></InsertDatabase>
          <UpdateDatabase></UpdateDatabase>
        <img src={Animals} alt="Animals Photo" />   
      </div>
    );
  }
  
  export default ManageDatabase;