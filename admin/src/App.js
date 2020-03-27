import React from 'react';
import logo from './logo.svg';
import './App.css';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";

function App() {
  return (
    <div className="App">
      <Autocomplete
          id="combo-box-demo"
          options={profs.sort()}
          groupBy={option => option[0].toUpperCase()}
          onChange={(event, value) => changeProfSelected(value)}
          getOptionLabel={option => option}
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} label="Professors" variant="outlined" />}
      />
      {
        profs.includes(profSelected)?
            <a href={"/professors/"+profSelected}>Submit</a>
            :null
      }
    </div>
  );
}

export default App;
