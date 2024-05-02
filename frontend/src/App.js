import logo from './logo.svg';
import './App.css';
import { useState, useEffect, React } from "react"


function App() {


  const [nameInput, setNameInput] = useState("")
  const [surnameInput, setSurnameInput] = useState("")

  const [allUsers, setAllUsers] = useState([]);
  

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('https://8nejldjugj.execute-api.eu-central-1.amazonaws.com/prod/api/User', requestOptions)
        .then(response => response.json())
        .then(data => {
          setAllUsers([...allUsers, ...data]);
        });
  }, []);



  const registerFunc = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          name: nameInput,
          surname: surnameInput
        }
      )
    };
    fetch('https://8nejldjugj.execute-api.eu-central-1.amazonaws.com/prod/api/User', requestOptions)
        .then(response => response.json())
        .then(data => {
          setAllUsers([...allUsers, data]);
        });
  }

  return (
    <div className="App">
      <p></p>
      <p></p>
      <p></p>
      <div className="input-group mb-3  w-75 mx-auto">
        <span className="input-group-text" id="basic-addon1">NAME</span>
        <input
          id="nameInput"
          type="text"
          className="form-control"
          placeholder="NAME"
          aria-label="NAME"
          aria-describedby="basic-addon1"
          onChange={(e) => {setNameInput(e.target.value)}}
        />
      </div>
      <p></p>
      <div className="input-group mb-3  w-75 mx-auto">
        <span className="input-group-text" id="basic-addon1">SURNAME</span>
        <input
          id="surnameInput"
          type="text"
          className="form-control"
          placeholder="SURNAME"
          aria-label="SURNAME"
          aria-describedby="basic-addon1"
          onChange={(e) => {setSurnameInput(e.target.value)}}
        />
      </div>
      <p></p>
      <button type="button w-75 mx-auto" className="btn btn-primary" onClick={registerFunc} data-mdb-ripple-init>REGISTER</button>
      <p></p>
      <table className="table w-75 mx-auto">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">surname</th>
            <th scope="col">creation date</th>
          </tr>
        </thead>
        {
          allUsers.sort((a,b) => { return a.creationDate < b.creationDate ? -1 : 1; }).map((e) => {
            return <tbody key={e.id}>
                    <tr>
                      <th scope="row">{e.id}</th>
                      <td>{e.name}</td>
                      <td>{e.surname}</td>
                      <td>{new Date(e.creationDate).toLocaleString()}</td>
                    </tr>
                  </tbody>
          })
        }
      </table>
      <p></p>
    </div>
  );
}

export default App;
