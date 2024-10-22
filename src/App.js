import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { UC, LC, NC, SC } from "./data/PassChar";

function App() {
  let [uppercase, setUppercase] = useState(false);
  let [lowercase, setLowercase] = useState(false);
  let [specialchar, setSpecialchar] = useState(false);
  let [numbers, setNumbers] = useState(false);
  let [passwordlen, setPasswordLen] = useState(6);
  let [fpass, setFpass] = useState("");

  
  let createPassword = () => {
    let finalPassword = "";
    let charSet = "";
    let guaranteedChars = []; 

    if (uppercase || lowercase || specialchar || numbers) {
      
      if (uppercase) {
        charSet += UC;
        guaranteedChars.push(UC.charAt(Math.floor(Math.random() * UC.length)));
      }
      if (lowercase) {
        charSet += LC;
        guaranteedChars.push(LC.charAt(Math.floor(Math.random() * LC.length)));
      }
      if (specialchar) {
        charSet += SC;
        guaranteedChars.push(SC.charAt(Math.floor(Math.random() * SC.length)));
      }
      if (numbers) {
        charSet += NC;
        guaranteedChars.push(NC.charAt(Math.floor(Math.random() * NC.length)));
      }

      
      for (let i = guaranteedChars.length; i < passwordlen; i++) {
        finalPassword += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }

      
      finalPassword += guaranteedChars.join('');
      finalPassword = shufflePassword(finalPassword); 
      setFpass(finalPassword);
    } else {
      alert("Please select at least one option");
    }
  };

  
  let shufflePassword = (password) => {
    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  let copyPass = () => {
    navigator.clipboard.writeText(fpass);
  };

  return (
    <div className="App">
      <div className="passwordbox">
        <h2>Password Generator</h2>
        <div className="passwordBoxIn">
          <input type="text" value={fpass} id="password" readOnly />
          <button id="generate" onClick={copyPass}>
            Copy
          </button>
        </div>
        <div className="passwordlen2">
          <label>Password Length :</label>
          <input
            type="number"
            value={passwordlen}
            onChange={(event) => setPasswordLen(event.target.value)}
            max={20}
            min={4}
          />
        </div>
        <div className="passwordlen">
          <label>Including Uppercase :</label>
          <input
            type="checkbox"
            checked={uppercase}
            onChange={() => setUppercase(!uppercase)}
          />
        </div>

        <div className="passwordlen">
          <label>Including Lowercase :</label>
          <input
            type="checkbox"
            checked={lowercase}
            onChange={() => setLowercase(!lowercase)}
          />
        </div>

        <div className="passwordlen">
          <label>Including Special Characters :</label>
          <input
            type="checkbox"
            checked={specialchar}
            onChange={() => setSpecialchar(!specialchar)}
          />
        </div>

        <div className="passwordlen">
          <label>Including Numbers :</label>
          <input
            type="checkbox"
            checked={numbers}
            onChange={() => setNumbers(!numbers)}
          />
        </div>
        <button className="btn-gen" onClick={createPassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
