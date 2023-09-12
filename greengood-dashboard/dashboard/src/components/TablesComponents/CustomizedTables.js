import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
}

TablePaginationActions.propTypes = {
count: PropTypes.number.isRequired,
onPageChange: PropTypes.func.isRequired,
page: PropTypes.number.isRequired,
rowsPerPage: PropTypes.number.isRequired,
};
  

export default function CustomizedTables({products}) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.grey[400],
          color: theme.palette.grey[800],
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    }));
    
    function createData(id, image, manufacturer, title, category, subcategory, stock, salesAmount, price, discount, createdDate, editedDate, softDeletedDate) {
      return { id, image, manufacturer, title, category, subcategory, stock, salesAmount, price, discount, createdDate, editedDate, softDeletedDate };
    };
    
    const rows = products.map( prod => {
        return createData(prod.id, prod.image, prod.manufacturer, prod.title, prod.category, prod.subcategory, prod.stock, prod.sales_amount, prod.price, prod.discount, prod.createdDate, prod.updatedDate, prod.softDeletedDate );
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table sx={{ width: '100%' }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Imagen</StyledTableCell>
            <StyledTableCell align="center">Manufacturer</StyledTableCell>
            <StyledTableCell align="center">Título</StyledTableCell>
            <StyledTableCell align="center">Categoría</StyledTableCell>
            <StyledTableCell align="center">Subcategoría</StyledTableCell>
            <StyledTableCell align="center">Stock</StyledTableCell>
            <StyledTableCell align="center">Ventas</StyledTableCell>
            <StyledTableCell align="center">Precio(ARS$)</StyledTableCell>
            <StyledTableCell align="center">Descuento(%)</StyledTableCell>
            <StyledTableCell align="center">Creación</StyledTableCell>
            <StyledTableCell align="center">Modificación</StyledTableCell>
            <StyledTableCell align="center">Retirado</StyledTableCell>
            <StyledTableCell align="center">Detalle</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell component="th" scope="row">
                <img src={row.image} alt="Product Img" className="product-image img-fluid" />
              </StyledTableCell>
              <StyledTableCell align="center" >{row.manufacturer}</StyledTableCell>
              <StyledTableCell align="center" >{row.title}</StyledTableCell>
              <StyledTableCell align="center" >{row.category}</StyledTableCell>
              <StyledTableCell align="center" >{row.subcategory}</StyledTableCell>
              <StyledTableCell align="center" >{row.stock}</StyledTableCell>
              <StyledTableCell align="center" >{row.salesAmount === 0.00? row.salesAmount: "--"  }</StyledTableCell>
              <StyledTableCell align="center" >${row.price}</StyledTableCell>
              <StyledTableCell align="center" >{row.discount}%</StyledTableCell>
              <StyledTableCell align="center" >{row.createdDate}</StyledTableCell>
              <StyledTableCell align="center" >{row.editedDate}</StyledTableCell>
              <StyledTableCell align="center" >{row.softDeletedDate}</StyledTableCell>
              <StyledTableCell align="center" >
                    <Link className="link-dark" to={`/product/${row.id}/detail`}>
                      <FontAwesomeIcon icon={faSearch} />
                    </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={3}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
            inputProps: {
            'aria-label': 'rows per page',
            },
            native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
     />
    </Paper>
  );
}