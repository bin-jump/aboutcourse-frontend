import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TodayIcon from '@material-ui/icons/Today';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SchoolIcon from '@material-ui/icons/School';
import NewTask from './NewTask';
import NewLecture from './NewLecture';
import WeekTable, { getWeekStartEnd } from './WeekTable';
import { getMonthNames, getWeek } from '../../common/util';
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

const today = () => {
  return new Date(new Date().setHours(0, 0, 0, 0));
};

export default function TaskCalendar(props) {
  const { tasks, handleSelect, selected } = { ...props };

  const [curDate, setCurDate] = useState(today());
  const [weekStart, weekEnd] = getWeekStartEnd(curDate);

  const [openNewTask, setOpenNewTask] = useState(false);
  const [openNewLecture, setOpenNewLecture] = useState(false);

  const currentWeekTasks = (task) => {
    let res = !(
      weekStart.getTime() > task.dueDate.getTime() ||
      weekEnd.getTime() < task.startDate.getTime()
    );
    return res;
  };

  const increaseWeek = () => {
    let newDate = curDate.getTime() + 1000 * 3600 * 24 * 7;
    setCurDate(new Date(newDate));
  };

  const decreaseWeek = () => {
    let newDate = curDate.getTime() - 1000 * 3600 * 24 * 7;
    setCurDate(new Date(newDate));
  };

  const handleTaskOpen = () => {
    setOpenNewTask(true);
  };

  const handleTaskClose = () => {
    setOpenNewTask(false);
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
      if (!currentWeekTasks(task)) {
        continue;
      }
      if (task.taskType == 'TASK') {
        let item = {
          ...task,
          day: getWeek(task.startDate),
        };
        if (task.repeat == 'DAY') {
          let start =
            task.startDate.getTime() < weekStart.getTime() ? 0 : item.day;
          let end =
            weekEnd.getTime() <= task.dueDate.getTime()
              ? 6
              : getWeek(task.dueDate);
          [...Array(7).keys()].slice(start, end + 1).forEach((i) => {
            item = { ...item, day: i };
            res.push(item);
          });
        } else {
          res.push(item);
        }
      } else if (task.taskType == 'LECTURE') {
        for (let interval of task.intervals) {
          let item = {
            ...task,
            day: interval.day,
            startTime: interval.start,
            endTime: interval.end,
          };
          res.push(item);
        }
      }
    }
    return res;
  };

  return (
    <div>
      <Paper square variant="outlined">
        <Grid container>
          <Grid item xs={5} />
          <Grid item xs={3} className="schedule-cal-title">
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
          <Grid item xs={3}>
            <div className="schedule-cal-header-operation">
              <div
                style={{
                  display: 'flex',
                  background: '#e5fbf1',
                  padding: 5,
                  borderRadius: 10,
                  marginRight: 20,
                }}
              >
                <Button onClick={(e) => setCurDate(today())}>Today</Button>
                <Button
                  style={{ color: '#17df7d' }}
                  onClick={(e) => decreaseWeek()}
                >
                  <KeyboardArrowLeftIcon />
                </Button>
                <Button
                  style={{ color: '#17df7d' }}
                  onClick={(e) => increaseWeek()}
                >
                  <KeyboardArrowRightIcon />
                </Button>
              </div>

              <Button
                className="operation-icon"
                aria-label="add"
                onClick={handleTaskOpen}
              >
                <PlaylistAddIcon />
              </Button>
              <Button
                className="operation-icon"
                aria-label="add"
                onClick={handleLectureOpen}
              >
                <SchoolIcon />
              </Button>
            </div>
          </Grid>
        </Grid>
        <WeekTable
          weekDate={curDate}
          tasks={makeCalenderTasks(tasks)}
          handleSelect={handleSelect}
          selected={selected}
          bodyHeight={300}
        />
      </Paper>
      <NewTask
        open={openNewTask}
        tasks={tasks}
        handleClickOpen={handleTaskOpen}
        handleClose={handleTaskClose}
      />
      <NewLecture
        open={openNewLecture}
        tasks={tasks}
        handleClickOpen={handleLectureOpen}
        handleClose={handleLectureClose}
      />
    </div>
  );
}
