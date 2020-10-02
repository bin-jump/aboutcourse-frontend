import React, { useState, useRef, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import './TaskList.less';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function TaskList(props) {
  const {} = { ...props };

  const calProgress = (task) => {
    let cur = new Date();
    let total = task.dueDate.getTime() - task.startDate.getTime();
    let prog = Math.max(cur.getTime() - task.startDate.getTime(), 0);
    prog = Math.min(total, prog);
    return Math.ceil((prog * 100) / total);
  };

  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getFullYear()}`;
  };

  const tasks = [
    {
      name: 'task1',
      startDate: new Date(new Date().getFullYear(), 8, 30, 10, 0),
      dueDate: new Date(new Date().getFullYear(), 8, 30, 12, 0),
      status: 'started',
      info: 'information',
    },
  ];

  const header = [
    'Task',
    'Start Date',
    'Due Date',
    'Progress',
    'Status',
    'Info',
  ];

  return (
    <Paper square className="feature-schedule-tasklist-container">
      <div>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Lecture and Task
        </Typography>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((item) => (
              <TableCell>
                <Typography>{item}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((item, i) => (
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell>{formatDate(item.startDate)}</TableCell>
              <TableCell>{formatDate(item.dueDate)}</TableCell>
              <TableCell align="left">
                <LinearProgressWithLabel value={calProgress(item)} />
              </TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.info}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
