import React, { useState, useRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Search } from '@material-ui/icons';
import './Style.less';

export default function SearchHead(props) {
  return (
    <Paper
      className="lecture-shadow"
      elevation={0}
      style={{ padding: 18, display: 'flex', alignItems: 'center' }}
    >
      <Autocomplete
        size="small"
        freeSolo
        options={[{ name: 'school1' }, { name: 'school2' }]}
        getOptionLabel={(option) => option.name}
        style={{ width: 280, marginRight: 32 }}
        // onChange={(e, v) => {
        //   handleInputChange(e, v);
        // }}
        //onInputChange={(e) => handleTagChange(e)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="School"
            margin="normal"
            variant="outlined"
          />
        )}
      />
      <Autocomplete
        size="small"
        inputValue={'ma'}
        options={[{ name: 'major' }, { name: 'major new' }]}
        getOptionLabel={(option) => option.name}
        style={{ width: 220, marginRight: 32 }}
        // onChange={(e, v) => {
        //   handleInputChange(e, v);
        // }}
        //onInputChange={(e) => handleTagChange(e)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Major"
            margin="normal"
          />
        )}
      />
      <div style={{ margin: 'auto' }}></div>
      <Button color="primary" variant="contained" style={{ height: 40 }}>
        Mine
      </Button>
    </Paper>
  );
}
