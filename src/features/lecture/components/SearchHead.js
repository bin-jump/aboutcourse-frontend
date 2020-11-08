import React, { useState, useRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Search } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  useFetchSchools,
  useFetchMajors,
  useFetchLectures,
} from '../redux/hooks';
import './Style.less';

export default function SearchHead(props) {
  const {
    school,
    major,
    onSchoolChange,
    onMajorChange,
    majorInput,
    setMajorInput,
  } = { ...props };

  const { schools, fetchSchools, fetchSchoolsPending } = useFetchSchools();
  const {
    majors,
    resetMajors,
    fetchMajors,
    fetchMajorsPending,
  } = useFetchMajors();

  const schoolMajor = () => {
    if (!school) {
      return null;
    }
    if (!major) {
      return <div>{`${school.name}`}</div>;
    }
    return <div>{`${school.name} >> ${major.name}`}</div>;
  };

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  useEffect(() => {
    if (!school) {
      resetMajors();
      return;
    }
    fetchMajors(school.id);
  }, [school, fetchMajors]);

  return (
    <Paper className="lecture-shadow" elevation={0} style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Autocomplete
          size="small"
          freeSolo
          options={schools}
          getOptionLabel={(option) => option.name}
          style={{ width: 280, marginRight: 32 }}
          onChange={(e, v) => {
            if (!v || !v.id) {
              onSchoolChange(null);
              return;
            }
            onSchoolChange(v);
          }}
          //onInputChange={(e) => handleTagChange(e)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="School"
              margin="normal"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {fetchSchoolsPending ? (
                      <CircularProgress size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <Autocomplete
          size="small"
          inputValue={majorInput}
          options={majors}
          getOptionLabel={(option) => option.name}
          style={{ width: 220, marginRight: 32 }}
          onChange={(e, v) => {
            if (!v || !v.id) {
              onMajorChange(null);
              return;
            }
            onMajorChange(v);
            setMajorInput(v.name);
          }}
          onInputChange={(e) => {
            if (e) {
              setMajorInput(e.target.value);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Major"
              margin="normal"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {fetchMajorsPending ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <div style={{ margin: 'auto' }}></div>
        <Button color="primary" variant="contained" style={{ height: 40 }}>
          Mine
        </Button>
      </div>
      <div>{schoolMajor()}</div>
    </Paper>
  );
}
