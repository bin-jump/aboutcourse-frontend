import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import './NewTask.less';

const initDate = () => {
  let d = new Date();
  d.setMinutes(0);
  return d;
};

export default function NewTask(props) {
  const { open, handleClickOpen, handleClose } = { ...props };
  const [tagName, setTagName] = useState('');
  const [task, setTask] = useState({
    title: '',
    startDate: initDate(),
    dueDate: initDate(),
    repeat: 'None',
    tags: [],
    info: '',
  });

  const repeatList = ['Day', 'Week'];

  const handleTagDelete = (chipToDelete) => {
    let newList = task.tags.filter((chip) => chip.label !== chipToDelete.label);
    setTask({ ...task, tags: newList });
  };

  const handleTagAdd = (label) => {
    if (task.tags.filter((e) => e.label === label).length > 0) {
      return;
    }
    let newList = [{ label }, ...task.tags];
    setTask({ ...task, tags: newList });
    setTagName('');
  };

  const handleRepeatChange = (event) => {
    setTask({ ...task, repeat: event.target.value });
  };

  const handleStartDateChange = (date) => {
    setTask({ ...task, startDate: date });
  };

  const handleDueDateChange = (date) => {
    setTask({ ...task, dueDate: date });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      modal={true}
      autoDetectWindowHeight={false}
      autoScrollBodyContent={false}
      contentStyle={{ width: '100%', maxWidth: 'none' }}
    >
      <div style={{ width: 500 }}>
        <DialogTitle>{'Create New Task'}</DialogTitle>
        <div>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-description"></DialogContentText> */}
            <div className="schedule-newtask-item">
              <TextField
                id="standard-basic"
                label="Title"
                style={{ width: '100%' }}
              />
            </div>
            <div className="schedule-newtask-item">
              <DatePicker
                lable={'Start'}
                date={task.startDate}
                handleDateChange={handleStartDateChange}
                style={{ float: 'left' }}
              />
              <div style={{ margin: 'auto' }}></div>
              <DatePicker
                lable={'End'}
                date={task.dueDate}
                handleDateChange={handleDueDateChange}
                style={{ float: 'right' }}
              />
            </div>
            <div className="schedule-newtask-item">
              <FormControl>
                <FormHelperText>Repeat</FormHelperText>
                <Select
                  value={task.repeat}
                  onChange={handleRepeatChange}
                  style={{ width: 140 }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {repeatList.map((item, i) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="schedule-newtask-item">
              <TextField
                label="tag name"
                variant="outlined"
                style={{ marginRight: 20 }}
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              />
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                onClick={(e) => handleTagAdd(tagName)}
              >
                Add
              </Button>
            </div>
            <div className="schedule-newtask-item">
              {task.tags.map((data) => (
                <Chip
                  style={{ marginRight: 12 }}
                  variant="outlined"
                  color="secondary"
                  label={data.label}
                  onDelete={(e) => handleTagDelete(data)}
                />
              ))}
            </div>
            <div className="schedule-newtask-item">
              <TextField
                fullWidth
                label="Infomation"
                multiline
                rows={3}
                value={task.info}
                variant="outlined"
                onChange={(e) => setTask({ ...task, info: e.target.value })}
              />
            </div>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Create
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

function DatePicker(props) {
  const { date, handleDateChange, lable } = { ...props };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ width: 190 }}>
        <KeyboardDateTimePicker
          variant="inline"
          ampm={false}
          label={lable}
          value={date}
          onChange={handleDateChange}
          //disablePast
          format="yyyy/MM/dd HH:mm"
          minutesStep={5}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}
