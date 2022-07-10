import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {style} from './AtdcMonthlyStyle';
import {useDispatch, useSelector} from 'react-redux';
import {SwpUagReq} from 'redux/actions/UserAction';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import krLocale from 'date-fns/locale/ko';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {formatter} from 'utils/convertDateTime';
import TextField from '@mui/material/TextField';
import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import theme from 'styles/theme';
import TablePagination from '@mui/material/TablePagination';
const COLORS = [
  theme.colorSet.ATTENDANCE_STATUS.OK,
  theme.colorSet.ATTENDANCE_STATUS.LATE,
  theme.colorSet.ATTENDANCE_STATUS.ABSENCE
];

const MonthlyWorkDetail = ({data}) => {
  const [chartData, setChartData] = useState([]);
  const convertTitle = ['정상', '지각', '결근'];
  useEffect(() => {
    if(data !== undefined) {
      console.log(data);
      const tmp = [];
      Object.keys(data).forEach(key => {
        tmp.push({name: key, value: data[key]});
      });
      setChartData(tmp);
    }
  }, [data]);

  return (
    <PieChart width={250} height={250}>
      <Pie
        data={chartData}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {chartData?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={convertTitle[index]}/>
        ))}
      </Pie>
      <Legend layout={'vertical'} verticalAlign="middle" align={'left'} height={40}/>
      <Tooltip cursor={false}/>
    </PieChart>
  );
};

const MonthlyWorkTime = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];

  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }

  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];
  return (
    <>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{minWidth: column.minWidth}}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
export const AtdcMonthly = () => {
  const [findDate, setFindDate] = useState(new Date());
  const [monthlyWorkDetail, setMonthlyWorkDetail] = useState(undefined);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.UserReducer);
  useEffect(() => {
    const date = (findDate.getFullYear().toString())
      .concat('-')
      .concat(formatter(findDate.getMonth() + 1).toString());

    dispatch(SwpUagReq(date));
  }, [findDate]);

  useEffect(() => {
    console.log(selector);

    if(selector?.data?.timeMap?.ok_count !== undefined) {
      setMonthlyWorkDetail(selector.data.timeMap);
    }
  }, [selector]);

  const onChangeFindDate = (target) => {
    setFindDate(target);
  };
  return(
    <Wrapper>
      <TitleContainer>
        보고서 / 연장 근무 관리

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={krLocale}>
          <DatePicker
            views={['year', 'month']}
            label="조회할 날짜"
            value={findDate}
            onChange={(newValue) => {
              onChangeFindDate(newValue);
            }}
            renderInput={(params) => (
              <TextField
                size={'small'}
                {...params}
                helperText={null}
                style={{backgroundColor:'white'}}
              />
            )}
          />
        </LocalizationProvider>
      </TitleContainer>
      <Container>
        <Card>
          <CardTitle>
            월별 근무 시간
            <div id={'subTitle'}>해당 월의 근무 시간입니다.</div>
          </CardTitle>
        </Card>
        <Card>
          <CardTitle>
            월별 근태 현황
            <div id={'subTitle'}> 근태 현황입니다.</div>
          </CardTitle>
          <ChartLayout>
            <MonthlyWorkDetail data={monthlyWorkDetail}/>
          </ChartLayout>
        </Card>
        <Card>
          <CardTitle>
            상세 근무 시간
            <div id={'subTitle'}>이번달 상세 근무 시간입니다. </div>
          </CardTitle>
          <ChartLayout>
            <MonthlyWorkTime/>
          </ChartLayout>
        </Card>
        <Card>
          <CardTitle>
            월별 휴가 사용 시간
            <div id={'subTitle'}>부서별 해당 월에 사용한 휴가 현황입니다.</div>
          </CardTitle>
        </Card>
      </Container>
    </Wrapper>
  );
};

const {
  Wrapper,
  TitleContainer,
  Container,
  Card,
  CardTitle,
  ChartLayout
} = style;

MonthlyWorkDetail.propTypes = {
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number])).isRequired,
};