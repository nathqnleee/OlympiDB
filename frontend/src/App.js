import logo from './logo.svg';
import Olympics from './olympics.png';
import Animals from './animals.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={Olympics} alt="Olympics Logo" />  
      <h1>Insert Athlete</h1>
        <form>
          <label>
            First Name:
            <input type="text" name="First Name" />
          </label>
          <label>
            Last Name:
            <input type="text" name="Last Name" />
          </label>
          <label>
            Gender:
            <input type="text" name="Gender" />
          </label>
          <input type="submit" value="Insert" />
        </form>
      <h1>Update Athlete</h1>
      <form>
          <label>
            First Name:
            <input type="text" name="First Name" />
          </label>
          <label>
            Last Name:
            <input type="text" name="Last Name" />
          </label>
          <label>
            For:
            <input type="text" name="PlayerID" />
          </label>
          <input type="submit" value="Update" />
        </form>
      <h1>Delete Athlete Using PlayerID</h1>
        <form>
            <label>
              PlayerID:
              <input type="text" name="PlayerID" />
            </label>
            <input type="submit" value="Delete" />
          </form>
      <img src={Animals} alt="Animals Photo" />   
      </div>
  );
}

export default App;
