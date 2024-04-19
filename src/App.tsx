import React, { useEffect , useState} from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchUsers } from './redux/userSlice';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, styled } from '@mui/material';
import {TablePaginationActions} from "./components/TablePaginationActiona";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
    padding: '12px 6px 12px 6px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '6px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users</div>;

  return (
    <div>
      <h2 className='title' style={{color:'#00b300', padding:'20px'}}>Danh sách người dùng</h2>
      <TableContainer component={Paper} className='table' style={{margin:'1%', width:'98%'}}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow >
              <StyledTableCell style={{width:'40%'}}>
                Name 
              </StyledTableCell>
              <StyledTableCell style={{width:'40%'}}>
                Username 
              </StyledTableCell >
              <StyledTableCell >Profile Picture</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).map((user, index) => (
            <StyledTableRow key={index}>
               <StyledTableCell >{`${user.name.title} ${user.name.first} ${user.name.last}`}</StyledTableCell>
                <StyledTableCell >{user.login.username}</StyledTableCell>
                
                <StyledTableCell >
                  <img src={user.picture.thumbnail} alt={`Profile of ${user.name.first}`} style={{ width: 30, height: 30, borderRadius: '50%' }} />
                </StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
