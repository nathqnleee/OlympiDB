import React, { useState, useEffect } from 'react';
import Olympics from '../olympics.png';
import {Link} from 'react-router-dom';

function frontPage() {
    return (
        <div>
            <img src={Olympics} alt="Olympics Logo" />
          <header>
            <h1>Olympics Database Application</h1>
          </header>
          <Link to ="/manageDatabase">Manage Database</Link>
          <Link to ="/searchDatabase">Search Database</Link>
          <Link to ="/login">Login Page</Link>
        </div>
      );
}
  
  export default frontPage;