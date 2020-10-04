import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { getWeek, getWeekNames } from '../../common/util';
import './NewTask.less';

export const initDate = () => {
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
    startTime: initDate(),
    endTime: initDate(),
    period: false,
    repeat: '',
    tags: [],
    info: '',
  });

  const repeatList = ['Day', 'Week'];

  const handleTagDelete = (chipToDelete) => {
    let newList = task.tags.filter((chip) => chip.label !== chipToDelete.label);
    setTask({ ...task, tags: newList });
  };

  const handleTagAdd = (label) => {
    if (task.tags.filter((e) => e.label === label).length > 0 || !label) {
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
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>
            <div className="schedule-newtask-item">
              <FormControlLabel
                control={<Checkbox value={task.period} color="primary" />}
                label="Perioded"
                labelPlacement="start"
                style={{ marginRight: 30 }}
                onChange={(e) => setTask({ ...task, period: !task.period })}
              />
              <DatePicker
                lable={
                  task.period
                    ? 'Start'
                    : `Day(${getWeekNames()[getWeek(task.startDate)]})`
                }
                date={task.startDate}
                handleDateChange={handleStartDateChange}
                style={{ float: 'left' }}
              />
              {task.period ? (
                <>
                  <div style={{ margin: 'auto' }}>~</div>
                  <DatePicker
                    disabled={!task.period}
                    lable={'End'}
                    date={task.dueDate}
                    handleDateChange={handleDueDateChange}
                    style={{ float: 'right' }}
                  />
                </>
              ) : null}
            </div>
            <div className="schedule-newtask-item">
              <FormControl>
                <FormHelperText>Repeat</FormHelperText>
                <Select
                  value={task.repeat}
                  onChange={handleRepeatChange}
                  style={{ width: 120, marginRight: 30, marginBottom: 10 }}
                >
                  <MenuItem value="">{'None'}</MenuItem>
                  {repeatList.map((item, i) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TimePicker
                lable={'Start'}
                date={task.startTime}
                handleTimeChange={(d) => setTask({ ...task, startTime: d })}
              />
              <div style={{ margin: 'auto' }}>~</div>
              <TimePicker
                lable={'Start'}
                style={{ float: 'right' }}
                date={task.endTime}
                handleTimeChange={(d) => setTask({ ...task, endTime: d })}
              />
            </div>
            <div className="schedule-newtask-item"></div>
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
            <div className="schedule-newtask-item" style={{ display: 'block' }}>
              {task.tags.map((data) => (
                <Chip
                  style={{ marginRight: 12, marginBottom: 8 }}
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

export function TimePicker(props) {
  const { date, handleTimeChange, lable, disabled, style } = { ...props };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ width: 120, ...style }}>
        <KeyboardTimePicker
          disabled={disabled}
          variant="inline"
          ampm={false}
          label={lable}
          value={date}
          onChange={handleTimeChange}
          //disablePast
          mask="__:__ _M"
          minutesStep={5}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export function DatePicker(props) {
  const { date, handleDateChange, lable, disabled } = { ...props };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ width: 140 }}>
        <KeyboardDatePicker
          disabled={disabled}
          variant="inline"
          ampm={false}
          label={lable}
          value={date}
          onChange={handleDateChange}
          //disablePast
          format="yyyy/MM/dd"
          //minutesStep={5}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}
