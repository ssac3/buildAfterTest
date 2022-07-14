import React, {useEffect, useState, useCallback} from 'react';
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
import {PieChart, Pie, Cell, Legend, Tooltip, Sector, BarChart, XAxis, Bar} from 'recharts';
import {TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TablePagination} from '@mui/material';
import theme from 'styles/theme';
const COLORS = [
  theme.colorSet.ATTENDANCE_STATUS.OK,
  theme.colorSet.ATTENDANCE_STATUS.LATE,
  theme.colorSet.ATTENDANCE_STATUS.ABSENCE
];

const convertTime = (target) => {
  return (Math.floor(target / 60).toString())
    .concat('시간 ')
    .concat((target % 60).toString())
    .concat('분');
};
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={10} textAnchor="middle" fill={theme.colorSet.ATTENDANCE_STATUS.VACATION}>
        <tspan fontSize={18} fontWeight={'bold'} textAnchor="middle" x={cx} dy={0}>{convertTime(payload.value)}</tspan>
        <tspan fontWeight={'normal'} textAnchor="middle" x={cx} dy={20}>{payload.name}</tspan>
      </text>
      <Sector
        fill={theme.colorSet.ATTENDANCE_STATUS.VACATION}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
      />
      <Sector />
    </g>
  );
};
const MonthlyOverTime = ({data}) => {
  const tmp = [];
  const pie = [];
  if(data !== undefined) {
    tmp.push({name: '근무 시간', workTime: data.workTime});
    tmp.push({name: '연장 시간', overTime: data.overTime});
    pie.push({name: '총 근무 시간', value: data.workTime + data.overTime});
    pie.push({name:'', value:1000});
  }

  return (
    <>
      <BarChart
        data={tmp}
        width={150}
        height={200}
        barGap={-23}
        barSize={20}
      >
        <XAxis
          dy={5}
          type="category"
          dataKey={'name'}
          tickLine={false}
          axisLine={false}
        />

        <Bar
          dataKey={'workTime'}
          name={'근무시간'}
          height={40}
          radius={5}
          fill={theme.colorSet.PRIMARY.BLUE_1A}
        />
        <Bar
          dataKey={'overTime'}
          name={'연장시간'}
          height={40}
          radius={5}
          fill={theme.colorSet.SECONDARY.GRAY_CC}
        />
        <Tooltip cursor={false} formatter={(value) => [convertTime(value)]}/>
      </BarChart>
      <PieChart width={200} height={200}>
        <Pie
          activeIndex={0}
          activeShape={renderActiveShape}
          data={pie}
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill={theme.colorSet.SECONDARY.GRAY_CC}
          dataKey="value"
        />
      </PieChart>
    </>
  );
};

const MonthlyWorkDetail = ({data}) => {
  const [chartData, setChartData] = useState([]);
  const convertTitle = ['정상', '지각', '결근'];
  useEffect(() => {
    if(data !== undefined) {
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

const MonthlyWorkTime = ({data}) => {
  console.log(data);
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
    { id: 'date', label: '일자', minWidth: 170 },
    { id: 'start_time', label: '출근 시간', minWidth: 100 },
    {
      id: 'end_time',
      label: '퇴근 시간',
      minWidth: 170,
    },
    {
      id: 'workTime',
      label: '근무 시간',
      minWidth: 170,
    },
  ];

  return (
    <>
      <TableContainer>
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value === undefined
                            ? '-'
                            : value}
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{height:'100px'}}
      />
    </>
  );
};

const MonthlyVacTime = ({usedTime, restTime}) => {
  const [chartInfo, setChartInfo] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  useEffect(() => {
    if(usedTime !== undefined && restTime !== undefined) {
      const convertData = [
        {name: '사용 휴가 시간', value: usedTime},
        {name: '남은 휴가 시간', value: restTime},
      ];
      setChartInfo(convertData);
    }
  }, [usedTime, restTime]);
  return(
    <PieChart width={200} height={200}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={chartInfo}
        cx={100}
        cy={100}
        innerRadius={60}
        outerRadius={80}
        fill={theme.colorSet.SECONDARY.GRAY_CC}
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
};

export const AtdcMonthly = () => {
  const [findDate, setFindDate] = useState(new Date());
  const [monthlyOverTime, setMonthlyOverTime] = useState({});
  const [monthlyWorkDetail, setMonthlyWorkDetail] = useState(undefined);
  const [monthlyWorkTime, setMonthlyWorkTime] = useState([]);
  const [monthlyVacTime, setMonthlyVacTime] = useState({});
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

    if(selector?.data?.overtime !== undefined && selector?.data?.totalWorkTIme !== undefined) {
      setMonthlyOverTime({workTime: selector.data.totalWorkTIme, overTime: selector.data.overtime});
    }

    if(selector?.data?.timeMap?.ok_count !== undefined) {
      setMonthlyWorkDetail(selector.data.timeMap);
    }

    if (selector?.data?.startList) {
      const cnvrtStartList = selector?.data?.startList.map((v) => {
        return ({...v, workTime: v.workTime === undefined ? '-' : convertTime(v.workTime)});
      });
      setMonthlyWorkTime(cnvrtStartList);
    }

    if(selector?.data?.restTime !== undefined && selector?.data?.totalUseVac !== undefined) {
      setMonthlyVacTime({usedTime: selector.data.totalUseVac, restTime: selector.data.restTime});
    }
  }, [selector]);

  const onChangeFindDate = (target) => {
    setFindDate(target);
  };
  return(
    <Wrapper>
      <TitleContainer>
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
          <ChartLayout>
            <MonthlyOverTime data={monthlyOverTime}/>
          </ChartLayout>
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
          <TableLayout>
            <MonthlyWorkTime data={monthlyWorkTime}/>
          </TableLayout>
        </Card>
        <Card>
          <CardTitle>
            월별 휴가 사용 시간
            <div id={'subTitle'}>부서별 해당 월에 사용한 휴가 현황입니다.</div>
          </CardTitle>
          <ChartLayout>
            <DisplayLayout>
              <div id={'title'}>사용 시간</div>
              <div id={'timeLayout'}>
                <div id={'item'}>{formatter((monthlyVacTime.usedTime / 60).toString())}</div>
                <div id={'display'}>시간</div>
                <div id={'item'}>{formatter((monthlyVacTime.usedTime % 60).toString())}</div>
                <div id={'display'}>분</div>
              </div>
            </DisplayLayout>
            <MonthlyVacTime
              usedTime={monthlyVacTime?.usedTime}
              restTime={monthlyVacTime?.restTime}
            />
          </ChartLayout>
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
  ChartLayout,
  DisplayLayout,
  TableLayout,
} = style;

MonthlyOverTime.propTypes = {
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number])).isRequired,
};
MonthlyWorkDetail.propTypes = {
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number])).isRequired,
};

MonthlyWorkDetail.propTypes = {
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number])).isRequired,
};

MonthlyWorkTime.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ).isRequired,
};

MonthlyVacTime.propTypes = {
  usedTime: PropTypes.number.isRequired,
  restTime: PropTypes.number.isRequired,
};

renderActiveShape.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  innerRadius:PropTypes.number.isRequired,
  outerRadius:PropTypes.number.isRequired,
  startAngle:PropTypes.number.isRequired,
  endAngle:PropTypes.number.isRequired,
  fill:PropTypes.string.isRequired,
  payload:PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  data:PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ).isRequired,
};