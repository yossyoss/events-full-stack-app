import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import columns from '../utils/tableConfig'
import Severity from './Cells/Severity';
import User from './Cells/User';

const DataTable = ({ handlePageCb, handleRowsCb, events, page, rowsPerPage }) => {
  const handleChangePage = (event, newPage) => {
    handlePageCb(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    handleRowsCb(+event.target.value)
  };

  const formatData = (col, row) => {
    const colId = col.id
    const value = row[colId]
    switch (colId) {
      case 'date':
        return col.format(value);
      case 'formattedEventType':
        return value;
      case 'severity':
        return (<Severity value={value} fonrmatHandler={col.format} />);
      case 'user':
        return (<User value={value} />);
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {events.eventsList && events.eventsList
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" key={row.id}>
                    {columns.map((column) => {
                      const value = formatData(column, row);
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={events.totalItems | 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default DataTable