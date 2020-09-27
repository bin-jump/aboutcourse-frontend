import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getWeekNames } from '../../common/util';

const genWeekDate = (year, mon) => {
  let start = new Date(`${year}-${mon}-01`);
  let num = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
  let res = [start];

  for (let i = 0; i < num - 1; i++) {
    res.push(
      new Date(start.getFullYear(), start.getMonth(), start.getDate() + i),
    );
  }
  return res;
};

function MonthCell(props) {
  const { date } = { ...props };

  return (
    <div style={{ height: 120, background: 'grey' }}>{`${
      date.getMonth() + 1
    }/${date.getDate()}`}</div>
  );
}

export default function MonthTable(props) {
  const { year, mon } = { ...props };

  const y = year || new Date().getFullYear();
  const m = mon || new Date().getMonth() + 1;

  const headFull = getWeekNames();
  const days = genWeekDate(y, m);

  const genRowFromDates = (dates) => {
    let res = [[]];
    dates.forEach((item) => {
      res[res.length - 1].push(item);
      if (getWeek(item) == 6) {
        res.push([]);
      }
    });

    let firstRow = res[0];
    let lastRow = res[res.length - 1];
    [...Array(7 - firstRow.length)].forEach((item) => {
      let date = new Date(firstRow[0].getTime());
      date.setDate(date.getDate() - 1);
      firstRow.unshift(date);
    });

    [...Array(7 - lastRow.length)].forEach((item) => {
      let date = new Date(lastRow[lastRow.length - 1].getTime());
      date.setDate(date.getDate() + 1);
      lastRow.push(date);
    });

    return res;
  };

  const cal = genRowFromDates(days);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headFull.map((item) => (
                <TableCell align="center">{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cal.map((row, i) => (
              <TableRow key={i}>
                {row.map((d, j) => (
                  <TableCell align="center" style={{ padding: 1 }}>
                    <MonthCell date={d} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
