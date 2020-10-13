import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NewTask from './NewTask';
import NewLecture from './NewLecture';
import WeekTable from './WeekTable';
import { getMonthNames } from '../../common/util';
import './TaskCalendar.less';

const nextMonth = (date) => {
  let res = date;
  if (date.getMonth() == 11) {
    res = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    res = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }
  return res;
};

const prevMonth = (date) => {
  let res = date;
  if (date.getMonth() == 0) {
    res = new Date(now.getFullYear() - 1, 0, 1);
  } else {
    res = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  }
  return res;
};

export default function TaskCalendar(props) {
  const { tasks } = { ...props };

  const curTime = new Date();
  const [curDate, setCurDate] = useState(
    new Date(curTime.getFullYear(), curTime.getMonth(), curTime.getDate()),
  );
  const [open, setOpen] = useState(false);
  const [openNewLecture, setOpenNewLecture] = useState(false);

  const increaseWeek = () => {
    let newDate = curDate.getTime() + 1000 * 3600 * 24 * 7;
    setCurDate(new Date(newDate));
  };

  const decreaseWeek = () => {
    let newDate = curDate.getTime() - 1000 * 3600 * 24 * 7;
    setCurDate(new Date(newDate));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLectureOpen = () => {
    setOpenNewLecture(true);
  };

  const handleLectureClose = () => {
    setOpenNewLecture(false);
  };

  const makeCalenderTasks = (tasks) => {
    let res = [];
    for (let task of tasks) {
      let item = {};
      if (task.taskType == 'TASK') {
        item = {
          id: task.id,
          weekly: false,
          title: task.title,
          day: task.startDate,
          startTime: task.startTime,
          endTime: task.endTime,
        };
      } else if (task.taskType == 'LECTURE') {
        for (let interval of task.intervals) {
          item = {
            id: task.id,
            weekly: true,
            title: task.title,
            day: interval.day,
            startTime: interval.startTime,
            endTime: interval.endTime,
          };
        }
      }
      res.push(item);
    }
    return res;
  };

  return (
    <div>
      <Paper square>
        <Grid container>
          <Grid item xs={4} />
          <Grid item xs={3} className="feature-schedule-cal-title">
            <div style={{ display: 'flex' }}>
              <Typography
                variant="h6"
                style={{ marginRight: 10, fontWeight: 'bold' }}
              >
                {getMonthNames(curDate.getMonth())[curDate.getMonth()]}
              </Typography>
              <Typography variant="h6">{curDate.getFullYear()}</Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div style={{ display: 'flex' }}>
              <Button onClick={(e) => setCurDate(curTime)}>Today</Button>
              <IconButton onClick={(e) => decreaseWeek()}>
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton onClick={(e) => increaseWeek()}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <IconButton aria-label="add" onClick={handleClickOpen}>
              <AddCircleIcon />
            </IconButton>
            <IconButton aria-label="add" onClick={handleLectureOpen}>
              <AddCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
        <WeekTable
          weekDate={curDate}
          tasks={makeCalenderTasks(tasks)}
          bodyHeight={300}
        />
      </Paper>
      <NewTask
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <NewLecture
        open={openNewLecture}
        handleClickOpen={handleLectureOpen}
        handleClose={handleLectureClose}
      />
    </div>
  );
}
