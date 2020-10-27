import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import InfoIcon from '@material-ui/icons/Info';
import { getWeek, getWeekNames, getMinutes } from '../../common/util';
import { useRemoveTask } from '../redux/hooks';
import './WeekTable.less';

export function getWeekStartEnd(date) {
  let wk = getWeek(date);
  let weekStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - wk,
  );
  return [weekStart, new Date(weekStart.getTime() + 7 * 60000 * 60 * 24 - 1)];
}

const genWeekDates = (date) => {
  let res = [];
  [...Array(7).keys()].forEach((i) => {
    res.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + i));
  });

  return res;
};

const makeDateHead = (weekNames, date) => {
  let today = new Date();
  let isToday =
    today.getFullYear() == date.getFullYear() &&
    today.getMonth() == date.getMonth() &&
    today.getDate() == date.getDate();
  return (
    <div style={{ display: 'flex' }}>
      <Typography
        variant="subtitle1"
        style={{
          padding: '0 5px',
          fontWeight: 'bold',
          marginRight: 5,
          background: isToday ? '#dafbeb' : null,
          color: isToday ? '#61e9a3' : null,
          borderRadius: 12,
        }}
      >
        {`${date.getMonth() + 1}/${date.getDate()}`}
      </Typography>
      <Typography variant="subtitle1">{`${
        weekNames[getWeek(date)]
      }`}</Typography>
    </div>
  );
};

const makeDetail = (task, config, handleClose) => {
  if (!task) {
    return null;
  }
  const deleteTask = () => {
    //handleDelete(task.id);
    handleClose(task);
  };

  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getFullYear()}`;
  };

  return (
    <div
      className="feature-schedule-task-item-detail"
      style={{
        height: config.detailHeight,
        width: config.detailWidth,
        top: Math.max(
          Math.min(task.Y - 20, 24 * config.cellHeight - config.detailHeight),
          0,
        ),
        left: Math.min(
          task.X + config.cellWidth + 20,
          config.timeWidth + 7 * config.cellWidth - config.detailWidth - 3,
        ),
      }}
    >
      <div>
        <CloseIcon
          style={{ float: 'right' }}
          onClick={(e) => handleClose(task)}
        />
      </div>
      <div>
        <Typography align="center" style={{ fontWeight: 'bold' }}>
          {task.taskType}
        </Typography>
      </div>
      <div className="detail-item">
        <div className="icon-container">
          <FiberManualRecordIcon
            style={{ fill: task.taskType == 'TASK' ? '#89e1ea' : '#8d91ee' }}
          />
        </div>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          {task.title}
        </Typography>
      </div>
      <div className="detail-item">
        <div className="icon-container">
          <DateRangeIcon />
        </div>
        <Typography style={{ fontWeight: 'bold' }}>
          {`${formatDate(task.startDate)}`}
        </Typography>
      </div>
      <div className="detail-item">
        <div className="icon-container">
          <WatchLaterIcon />
        </div>
        <Typography style={{ fontWeight: 'bold' }}>{`${getMinutes(
          task.startTime,
        )} ~ 
        ${getMinutes(task.endTime)}`}</Typography>
      </div>
      <div className="detail-item">
        <div className="icon-container">
          <InfoIcon />
        </div>
        <Typography style={{ color: '#bbbabc' }}>{task.info}</Typography>
      </div>
    </div>
  );
};

export default function WeekTable(props) {
  const { bodyHeight, weekDate, tasks, handleSelect, selected } = { ...props };
  const [selectedTask, setSelectedTask] = useState(null);

  const config = {
    cellHeight: 60,
    cellWidth: 120,
    timeWidth: 70,
    detailWidth: 200,
    detailHeight: 300,
  };

  const [weekStart, weekEnd] = getWeekStartEnd(weekDate || new Date());
  const headDates = genWeekDates(weekStart);
  const weekNames = getWeekNames();

  const resolveY = (task) => {
    let ht = task.startTime.getHours() * config.cellHeight;
    ht += Math.ceil((task.startTime.getMinutes() * config.cellHeight) / 60);
    return ht;
  };

  const resolveX = (task) => {
    //let week = task.weekly ? task.day : getWeek(task.startTime);
    let week = task.day;
    let w = config.timeWidth + week * config.cellWidth;
    return w;
  };

  // TODO: update for overlap
  const resolveW = (task) => {
    return config.cellWidth;
  };

  const resolveH = (task) => {
    let [start, end] = [task.startTime, task.endTime];
    // end should not exceed current day
    end = new Date(
      Math.min(
        end.getTime(),
        new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          23,
          59,
        ).getTime(),
      ),
    );
    let diff = Math.ceil(Math.abs(start - end) / 60000);
    return Math.ceil((diff * config.cellHeight) / 60);
  };

  const handleTaskSelect = (task) => {
    handleSelect(task.id);
    if (task.id == selected) {
      setSelectedTask(null);
    } else {
      setSelectedTask(task);
    }
  };

  // unselect by other component
  const forceCloseDetail = () => {
    if (selected == null && selectedTask != null) {
      setSelectedTask(null);
    }
  };

  const makeBody = (date) => {
    let res = [];
    [...Array(24).keys()].forEach((i) => res.push([...Array(7).keys()]));
    return res;
  };
  const body = makeBody();
  forceCloseDetail();

  let taskList = tasks || [];
  taskList.forEach((item) => {
    item.X = resolveX(item);
    item.Y = resolveY(item);
    item.W = resolveW(item);
    item.H = resolveH(item);
  });

  return (
    <div className="feature-schedule-weektable-root">
      <TableContainer className="feature-schedule-weektable">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ height: config.cellHeight }}>
              <TableCell
                style={{
                  borderBottom: 'none',
                  width: config.timeWidth,
                }}
              ></TableCell>
              {headDates.map((item) => (
                <TableCell
                  align="center"
                  style={{
                    width: config.cellWidth,
                    borderBottom: 'none',
                  }}
                >
                  {makeDateHead(weekNames, item)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <div
        className="feature-schedule-table-container"
        style={{ height: bodyHeight ? bodyHeight : null }}
      >
        {/* task list */}
        {taskList.map((item) => (
          <div
            className={`${
              item.taskType == 'TASK'
                ? 'feature-schedule-task-item-task'
                : 'feature-schedule-task-item-lecture'
            }
             ${
               selected == item.id ? 'feature-schedule-task-item-selected' : ''
             }`}
            style={{
              top: item.Y,
              left: item.X,
              height: item.H,
              width: item.W,
            }}
            onClick={(e) => handleTaskSelect(item)}
          >
            {`${item.title}`}
          </div>
        ))}
        {makeDetail(selectedTask, config, handleTaskSelect)}
        <TableContainer className="feature-schedule-weektable">
          <Table aria-label="simple table">
            <TableBody>
              {body.map((row, i) => (
                <TableRow key={i}>
                  <TableCell
                    align="center"
                    style={{
                      verticalAlign: 'top',
                      borderBottom: 'none',
                      width: config.timeWidth,
                      padding: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ marginTop: -10, color: '#cad4da' }}
                    >
                      {i > 0 ? `${i}:00` : null}
                    </Typography>
                  </TableCell>
                  {row.map((d, j) => (
                    <TableCell
                      align="center"
                      style={{
                        borderLeft: j > 0 ? 'solid 1px #e1e5e9' : '',
                        height: config.cellHeight,
                        width: config.cellWidth,
                        borderBottom: 'none',
                        borderTop: i > 0 ? 'solid 1px #e1e5e9' : 'none',
                      }}
                    ></TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
