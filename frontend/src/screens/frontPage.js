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
          <Link to ="/searchDatabase">Search Database    </Link>
          <Link to ="/manageDatabase">Manage Database</Link>
        </div>
      );
}
  
  export default frontPage;