import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { initDate, TimePicker, DatePicker } from './NewTask';
import { getWeekNames, getMinutes, toLocalTime } from '../../common/util';
import { useAddLecture, useAutocompleteLecture } from '../redux/hooks';
import './NewTask.less';

const formatTimeInterval = (lecture) => {
  return `${getMinutes(lecture.start)} ~ ${getMinutes(lecture.end)}`;
};

export default function NewLecture(props) {
  const { open, handleClickOpen, handleClose, tasks } = { ...props };
  const initialLecture = {
    title: '',
    startDate: initDate(),
    dueDate: initDate(),
    intervals: [],
    info: '',
  };
  const [timeInterval, setTimeInterval] = useState({
    day: 1,
    start: initDate(),
    end: initDate(),
  });

  const { addLecture, addLecturePending } = useAddLecture();
  const {
    lectures,
    autocompleteLectures,
    autocompleteLecturesPending,
  } = useAutocompleteLecture();

  const [lecture, setLecture] = useState(initialLecture);

  const handleStartDateChange = (date) => {
    setTimeInterval({ ...timeInterval, start: date });
  };

  const handleDueDateChange = (date) => {
    setTimeInterval({ ...timeInterval, end: date });
  };

  const handleAddInterval = () => {
    setLecture({
      ...lecture,
      intervals: [...lecture.intervals, timeInterval],
    });
  };

  const handleDeleteInterval = (idx) => {
    let removed = lecture.intervals
      .slice(0, idx)
      .concat(lecture.intervals.slice(idx + 1, lecture.intervals.length));
    setLecture({ ...lecture, intervals: removed });
  };

  const handleAdd = () => {
    if (
      tasks.filter(
        (item) => item.taskType == 'LECTURE' && item.id == lecture.id,
      ).length > 0
    ) {
      return;
    }
    addLecture(lecture);
    handleDialogClose();
  };

  const handleDialogClose = () => {
    setLecture(initialLecture);
    handleClose();
  };

  const handleTitleChange = (e) => {
    setLecture({ ...lecture, title: e.target.value });
    autocompleteLectures(e.target.value);
  };

  const handleInputChange = (e, v) => {
    if (typeof v === 'string' || v instanceof String) {
      setLecture({ ...lecture, title: e.target.value });
    } else {
      let newState = v != null ? v : initialLecture;
      setLecture(newState);
    }
  };

  const existedLecture = lecture.hasOwnProperty('id');

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
        <DialogTitle>{'New Lecture'}</DialogTitle>
        <div>
          <DialogContent>
            <div className="schedule-newtask-item">
              <Autocomplete
                freeSolo
                options={lectures}
                getOptionLabel={(option) => option.title}
                style={{ width: '100%' }}
                onChange={(e, v) => {
                  handleInputChange(e, v);
                }}
                onInputChange={(e) => handleTitleChange(e)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lecture Name"
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="schedule-newtask-item">
              <Typography style={{ marginRight: 20, marginTop: 20 }}>
                Time Span:
              </Typography>
              <DatePicker
                disabled={existedLecture}
                lable={'Start'}
                date={lecture.startDate}
                handleDateChange={(d) =>
                  setLecture({ ...lecture, startDate: d })
                }
                style={{ float: 'left' }}
              />
              <div style={{ margin: 'auto' }}>~</div>
              <DatePicker
                disabled={existedLecture}
                lable={'End'}
                date={lecture.dueDate}
                handleDateChange={(d) => setLecture({ ...lecture, dueDate: d })}
                style={{ float: 'right' }}
              />
            </div>
            <div className="schedule-newtask-item">
              <IconButton
                disabled={existedLecture}
                style={{
                  marginTop: 12,
                  marginRight: 18,
                  width: 40,
                  height: 40,
                  backgroundColor: '#133d4b',
                  color: 'white',
                }}
                onClick={handleAddInterval}
              >
                <AddIcon />
              </IconButton>
              <FormControl>
                <FormHelperText>Week</FormHelperText>
                <Select
                  disabled={existedLecture}
                  value={timeInterval.day}
                  onChange={(e) =>
                    setTimeInterval({ ...timeInterval, day: e.target.value })
                  }
                  style={{ width: 100, marginRight: 20, marginBottom: 10 }}
                >
                  {[...Array(getWeekNames().length).keys()].map((i) => (
                    <MenuItem value={i}>{getWeekNames()[i]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TimePicker
                disabled={existedLecture}
                lable={'Start'}
                date={timeInterval.start}
                handleTimeChange={handleStartDateChange}
                style={{ float: 'left', width: 100 }}
              />
              <div style={{ margin: 'auto' }}>~</div>
              <TimePicker
                disabled={existedLecture}
                lable={'End'}
                date={timeInterval.end}
                handleTimeChange={handleDueDateChange}
                style={{ float: 'right', width: 100 }}
              />
            </div>
            <Typography style={{ fontWeight: 'bold' }}>
              Time Intervals
            </Typography>
            <div className="schedule-newtask-item">
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">#</TableCell>
                      <TableCell align="center">Week Day</TableCell>
                      <TableCell align="center">Time Interval</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lecture.intervals.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">
                          {getWeekNames()[item.day]}
                        </TableCell>
                        <TableCell align="center">
                          {formatTimeInterval(item)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            disabled={existedLecture}
                            onClick={(e) => handleDeleteInterval(i)}
                          >
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="schedule-newtask-item">
              <TextField
                disabled={existedLecture}
                fullWidth
                label="Infomation"
                multiline
                rows={3}
                value={lecture.info}
                variant="outlined"
                onChange={(e) =>
                  setLecture({ ...lecture, info: e.target.value })
                }
              />
            </div>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary" autoFocus>
            Create
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
