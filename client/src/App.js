import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { REACT_APP_API_URL } from "./config";

function App() {
  const [info, setInfo] = useState("");

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}`).then((res) => {
      setInfo(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{info}</p>
        <p>{info.id}</p>
        <p>{info.firstName}</p>
        <p>{info.lastName}</p>
        <p>{info.email}</p>
      </header>
    </div>
  );
}

export default App;
