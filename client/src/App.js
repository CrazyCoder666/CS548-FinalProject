import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [Name, setName] = useState(""); // Changed name to Name
  const [StudentID, setStudentID] = useState(0); // Changed age to StudentID
  const [BookName, setBookName] = useState(""); // Changed username to BookName

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name: Name, // Changed to Name
      age: StudentID, // Changed to StudentID, assuming that the backend expects 'age'
      username: BookName, // Changed to BookName, assuming that the backend expects 'username'
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          name: Name, // Changed to Name
          age: StudentID, // Changed to StudentID
          username: BookName, // Changed to BookName
        },
      ]);
    });
  };

  return (
    <div className="App">
      <header className="App-header"> {/* Added header */}
        <h2>Library System</h2>
      </header>
      <div className="usersDisplay">
        {listOfUsers.map((user, index) => {
          return (
            <div key={index}> {/* Added key for list rendering */}
              <h1>Name: {user.name}</h1>
              <h1>Student ID: {user.age}</h1> {/* Changed age to Student ID */}
              <h1>Book Name: {user.username}</h1> {/* Changed username to Book Name */}
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Student ID..."
          onChange={(event) => {
            setStudentID(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Book Name..."
          onChange={(event) => {
            setBookName(event.target.value);
          }}
        />
        <button onClick={createUser}> Create User </button>
      </div>
    </div>
  );
}

export default App;
