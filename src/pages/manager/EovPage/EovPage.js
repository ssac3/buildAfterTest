import React, {useState, useEffect} from 'react';
import PropTyeps from 'prop-types';
import {style} from './EovPageStyle';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEovReq} from 'redux/actions/ManagerAction';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import krLocale from 'date-fns/locale/ko';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import {formatter} from 'utils/convertDateTime';
import {LOCAL_STORAGE} from 'utils/constants';
import theme from 'styles/theme';
import {Bar, BarChart, XAxis, Tooltip, PieChart, Pie, Cell, Legend} from 'recharts';

const convertTime = (target) => {
  return (Math.floor(target / 60).toString())
    .concat('시간 ')
    .concat((target % 60).toString())
    .concat('분');
};


const EmployeeBarChart = ({data}) => {
  return (
    <BarChart
      data={data}
      width={1000}
      height={300}
      barGap={40}
      barSize={20}
    >
      <XAxis
        dy={10}
        type="category"
        dataKey={'name'}
        tickLine={false}
        axisLine={false}
      />
      <Bar
        dataKey={'overTime'}
        height={40}
        radius={5}
        name={'연장근무 시간'}
        fill={theme.colorSet.SECONDARY.GRAY_79}
      />
      <Tooltip cursor={false} formatter={(value) => [convertTime(value)]}/>
    </BarChart>
  );
};



export const EovPage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.MangerReducer);
  const [findDate, setFindDate] = useState(new Date()); // 근태 담당자 부서별 근태 현황 조회 (년/월)
  const [emplData, setEmplData] = useState([]);
  const [depOverTime, setDepOverTime] = useState([]);
  const [pieChart, setPieChart] = useState([]);
  const COLORS = [
    theme.colorSet.SECONDARY.GRAY_79,
    theme.colorSet.SECONDARY.GRAY_CC,
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const date = (findDate.getFullYear().toString())
    .concat('-')
    .concat(formatter((findDate.getMonth() + 1).toString()));

  const displayDate = (findDate.getFullYear().toString())
    .concat('년')
    .concat(formatter((findDate.getMonth() + 1).toString()))
    .concat('월');

  const onClickFindDate = (newDate) => {
    setFindDate(newDate);
  };
  useEffect(() => {
    console.log('EOV 통신 시작');
    dispatch(SwpEovReq(LOCAL_STORAGE.get('depId'), date));
  }, [findDate]);

  useEffect(() => {
    if(selector.data?.overTime?.length > 0 && selector.data?.overTime !== undefined) {
      const filterArr = selector.data.overTime.filter((e) => e.overTime);
      let todayDepOverTime = 0;
      filterArr.forEach((e) => todayDepOverTime += e.overTime);
      setDepOverTime([todayDepOverTime, selector.data.lastOverTime]);
      setEmplData(selector.data.overTime);
    } else {
      setEmplData([]);
    }
  }, [selector]);

  useEffect(() => {
    const convertOverTimeData = [
      {name:'금월', value: depOverTime[0]},
      {name:'전월', value: depOverTime[1]},
    ];

    setPieChart(convertOverTimeData);
  }, [depOverTime]);
  return (
    <Wrapper>
      <TitleContainer>
        <h2>연장 근무 현황</h2>

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={krLocale}>
          <DatePicker
            views={['year', 'month']}
            label="조회할 날짜"
            value={findDate}
            disableFuture
            onChange={(newValue) => {
              onClickFindDate(newValue);
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
        <Card w={100} h={50}>
          <CardTitle align={'flex-end'} dir={'row'}>
            <h2 style={{margin: 0}}>{displayDate}</h2>
            <h4 style={{margin: 0}}>금월 사원별 연장 근무 시간을 표시합니다.</h4>
          </CardTitle>

          <ChartLayout>
            <EmployeeBarChart data={emplData}/>
          </ChartLayout>
        </Card>
        <div id={'bottom'}>
          <Card w={50} h={100}>
            <CardTitle align={'flex-start'} dir={'column'}>
              <h2 style={{margin: 0}}>연장 근무 현황</h2>
              <h4 style={{margin: 0}}>전월 대비 {selector.name}의 연장근무 현황입니다.</h4>
            </CardTitle>
            <ChartLayout>
              <PieChart width={250} height={200}>
                <Pie
                  data={pieChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieChart?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                  ))}
                </Pie>
                <Legend layout={'vertical'} verticalAlign="bottom" align={'right'} height={40}/>
                <Tooltip cursor={false} formatter={(value) => [convertTime(value)]}/>
              </PieChart>
            </ChartLayout>
          </Card>
          <Card w={42} h={100} url={'https://user-images.githubusercontent.com/40657327/177935430-2658e6cf-e313-4db5-9a39-7af3dd8015a3.jpeg'}>
            <DepInfo>
              <div id={'title'}>더존 비즈온</div>
              <div id={'depName'}>{selector.name}</div>
            </DepInfo>
          </Card>
        </div>
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
  DepInfo,
  ChartLayout
} = style;

EmployeeBarChart.propTypes = {
  data: PropTyeps.arrayOf(
    PropTyeps.objectOf(PropTyeps.oneOfType([PropTyeps.number, PropTyeps.string]))
  ).isRequired,
};