import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { UC, LC, NC, SC } from "./data/PassChar";

function App() {
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [specialchar, setSpecialchar] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [passwordlen, setPasswordLen] = useState(6);
  const [fpass, setFpass] = useState("");

  // Function to generate password
  const createPassword = () => {
    if (!uppercase && !lowercase && !specialchar && !numbers) {
      alert("Please select at least one option");
      return;
    }

    let charSet = "";
    let guaranteedChars = [];

    // Add selected character types to charSet and guarantee one of each selected type in the password
    if (uppercase) addCharType(UC, guaranteedChars);
    if (lowercase) addCharType(LC, guaranteedChars);
    if (specialchar) addCharType(SC, guaranteedChars);
    if (numbers) addCharType(NC, guaranteedChars);

    // Complete the password with random characters from charSet
    let finalPassword = Array.from({ length: passwordlen - guaranteedChars.length }, () =>
      charSet.charAt(Math.floor(Math.random() * charSet.length))
    ).join('');

    // Concatenate guaranteed characters and shuffle
    finalPassword += guaranteedChars.join('');
    setFpass(shufflePassword(finalPassword));
  };

  // Helper function to add characters of a type and push a guaranteed character
  const addCharType = (chars, guaranteedChars) => {
    charSet += chars;
    guaranteedChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  };

  // Function to shuffle characters in a password string
  const shufflePassword = (password) => password.split('').sort(() => Math.random() - 0.5).join('');

  // Function to copy password to clipboard
  const copyPass = () => navigator.clipboard.writeText(fpass);

  return (
    <div className="App">
      <div className="passwordbox">
        <h2>Password Generator App</h2>
        <div className="passwordBoxIn">
          <input type="text" value={fpass} readOnly />
          <button onClick={copyPass}>Copy</button>
        </div>
        <div className="passwordlen2">
          <label>Password Length:</label>
          <input
            type="number"
            value={passwordlen}
            onChange={(e) => setPasswordLen(e.target.value)}
            max={20}
            min={4}
          />
        </div>
        <Checkbox label="Including Uppercase" checked={uppercase} onChange={() => setUppercase(!uppercase)} />
        <Checkbox label="Including Lowercase" checked={lowercase} onChange={() => setLowercase(!lowercase)} />
        <Checkbox label="Including Special Characters" checked={specialchar} onChange={() => setSpecialchar(!specialchar)} />
        <Checkbox label="Including Numbers" checked={numbers} onChange={() => setNumbers(!numbers)} />
        <button className="btn-gen" onClick={createPassword}>Generate Password</button>
      </div>
    </div>
  );
}

// Checkbox component for each option
const Checkbox = ({ label, checked, onChange }) => (
  <div className="passwordlen">
    <label>{label}:</label>
    <input type="checkbox" checked={checked} onChange={onChange} />
  </div>
);

export default App;
