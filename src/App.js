import Navbar from "./Components/Navbar";
import logo from "./logo.svg";

import Button from "@mui/material/Button";

import "./App.css";

function App() {
  // let isGay = true;
  // let nameOfGay = "Matan";

  // const handleOnClickMatanGay = (nameOfGayToBeNotGay) => {
  //   if (nameOfGayToBeNotGay === nameOfGay) {
  //     isGay = !isGay;
  //   }
  //   console.log("Is " + nameOfGay + " Gay? " + isGay);
  // };

  return (
    <div className='App'>
      <Navbar />
      <Button> Hello World </Button>
      {/* <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header> */}
      {/* <HomePage /> */}
    </div>
  );
}

export default App;
