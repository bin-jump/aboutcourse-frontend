import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { getWeek, getWeekNames } from '../../common/util';
import { useCreateTask, useAutocompleteTag } from '../redux/hooks';
import './NewTask.less';

export const initDate = () => {
  let d = new Date();
  //d = new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
};

export default function NewTask(props) {
  const { open, handleClickOpen, handleClose } = { ...props };
  const initialTask = {
    title: '',
    startDate: initDate(),
    dueDate: initDate(),
    startTime: initDate(),
    endTime: initDate(),
    period: false,
    repeat: 'NONE',
    tags: [],
    info: '',
  };
  const initialTag = {
    id: null,
    label: '',
  };

  const [newTag, setNewTag] = useState({ id: null, label: '' });
  const [task, setTask] = useState(initialTask);

  const { createTask, createTaskPending } = useCreateTask();
  const {
    tags,
    autocompleteTags,
    autocompleteTagsPending,
  } = useAutocompleteTag();

  const repeatList = ['NONE', 'DAY', 'WEEK'];

  const handleTagDelete = (chipToDelete) => {
    let newList = task.tags.filter((chip) => chip.label !== chipToDelete.label);
    setTask({ ...task, tags: newList });
  };

  const handleTagAdd = (newTag) => {
    if (
      task.tags.filter((e) => e.label === newTag.label).length > 0 ||
      !newTag.label
    ) {
      return;
    }
    let newList = [newTag, ...task.tags];
    setTask({ ...task, tags: newList });
    setNewTag(initialTag);
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

  const handleDialogClose = () => {
    setTask(initialTask);
    handleClose();
  };

  const handleCreate = () => {
    createTask(task);
    handleDialogClose();
  };

  const handleTagChange = (e) => {
    setNewTag({ ...newTag, label: e.target.value });
    autocompleteTags(e.target.value);
  };

  const handleInputChange = (e, v) => {
    if (typeof v === 'string' || v instanceof String) {
      setNewTag({ ...newTag, label: e.target.value });
    } else {
      setNewTag(v);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      modal={true}
      autoDetectWindowHeight={false}
      autoScrollBodyContent={false}
      contentStyle={{ width: '100%', maxWidth: 'none' }}
    >
      <div style={{ width: 500 }}>
        <DialogTitle>{'New Task'}</DialogTitle>
        <div>
          <DialogContent>
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
            <div
              className="schedule-newtask-item"
              style={{ display: 'inline-block', width: '100%' }}
            >
              <div
                style={{
                  display: 'flex',
                  verticalAlign: 'middle',
                  alignItems: 'center',
                }}
              >
                <Autocomplete
                  freeSolo
                  options={tags}
                  getOptionLabel={(option) => option.label}
                  style={{ width: '100%', marginRight: 26 }}
                  onChange={(e, v) => {
                    handleInputChange(e, v);
                  }}
                  onInputChange={(e) => handleTagChange(e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tag Name"
                      margin="normal"
                      variant="outlined"
                    />
                  )}
                />
                <Button
                  style={{ height: 55, width: 100 }}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleTagAdd(newTag)}
                >
                  Add
                </Button>
              </div>
              <div>
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
            </div>
            {/* <div
              className="schedule-newtask-item"
              style={{ display: 'block' }}
            ></div> */}
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
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary" autoFocus>
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
