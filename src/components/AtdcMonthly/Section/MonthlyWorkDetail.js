import {Box, Card, CardHeader} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: '일정', width: 100 }, //  datetype 삽입
  { field: 'firstName', headerName: 'First name', width: 100 },
  { field: 'lastName', headerName: 'Last name', width: 100 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const MonthlyWorkDetail = ({title, subheader, ...other}) => {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader}/>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Box>
    </Card>
  );
};

MonthlyWorkDetail.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
};