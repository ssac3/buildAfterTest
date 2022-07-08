import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {style} from './ReportEavDetailPageStyle';
import {formatter} from 'utils/convertDateTime';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEavReq} from 'redux/actions/ManagerAction';
import {PieChart, Sector, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts';
import theme from 'styles/theme';


const convertTime = (target) => {
  return (Math.floor(target / 60).toString())
    .concat('시간 ')
    .concat((target % 60).toString())
    .concat('분');
};

const convertTime2 = (target) => {
  return formatter(Math.floor(target / 60).toString())
    .concat('시간 ')
    .concat(formatter((target % 60).toString()))
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
    fill,
    payload,
  } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={10} textAnchor="middle" fill={fill}>
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


export const ReportEavDetailPage = ({openEavDetail, onClickEavDetail, findDate}) => {
  const [info, setInfo] = useState([]);
  const [attendanceData, setAttendanceData] = useState();
  const [reArrangeData, setRearrangeData] = useState();
  const [vacationData, setVacationData] = useState();
  const [restVacData, setRestVacData] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const COLORS = [
    theme.colorSet.ATTENDANCE_STATUS.OK,
    theme.colorSet.SECONDARY.GRAY_CC,
    theme.colorSet.PRIMARY.BLUE_1A,
    theme.colorSet.ATTENDANCE_STATUS.VACATION,
  ];
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.MangerReducer);
  const date = (findDate.getFullYear().toString())
    .concat('-')
    .concat(formatter((findDate.getMonth() + 1).toString()));

  const displayDate = (findDate.getFullYear().toString())
    .concat('년')
    .concat(formatter((findDate.getMonth() + 1).toString()))
    .concat('월');

  const onCloseModal = () => {
    onClickEavDetail([]);
  };
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
  const convertText = (x, y) => {
    if (Number.isNaN(Math.abs(x - y))) {
      return 0;
    }
    return Math.abs(x - y);
  };

  const convertText2 = (x, y) => {
    let result = '감소';
    if (x - y > 0) {
      result = '증가';
    } else if (x - y === 0) {
      result = '-';
    }
    return result;
  };

  const calculateUsedTime = (x) => {
    return Number.isNaN(7200 - x) ? '00시간 00분' : convertTime2(7200 - x);
  };

  useEffect(() => {
    dispatch(SwpEavReq(openEavDetail[0], date));
  }, []);

  useEffect(() => {
    if (selector.result?.okCount !== undefined) {
      setInfo(selector.result);
    } else {
      setInfo([]);
    }
  }, [selector]);

  useEffect(() => {
    console.log(info);
    const convertData = [
      {name: '정상', value: info.okCount},
      {name: '이상', value: info.failCount},
    ];

    const convertData2 = [
      {name: '전월', lastMonth: info.lastRCount},
      {name: '금월', todayMonth: info.rCount},
    ];

    const convertData3 = [
      {name: '전월', lastMonth: info.lastVTime},
      {name: '금월', todayMonth: info.vTime},
    ];

    const convertData4 = [
      {name: '사용 휴가 시간', value:info.vTime},
      {name:'남은 휴가 시간', value:info.restTime},
    ];
    setAttendanceData(convertData);
    setRearrangeData(convertData2);
    setVacationData(convertData3);
    setRestVacData(convertData4);
  }, [info]);

  useEffect(() => {
    console.log(info);
  }, [info]);
  return (
    <Wrap onClick={onCloseModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <TitleContainer>
          <div id={'title'}>
            {displayDate}
            <div id={'subTitle'}>사원별로 근태 현황을 한눈에 쉽게 파악할 수 있습니다.</div>
          </div>
        </TitleContainer>
        <NameContainer>{openEavDetail[1]}님의 월별 근태 현황 보고서입니다.</NameContainer>

        <FirstChartLayout>
          <div id={'innerLayout'}>
            <h2>근태 현황</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {attendanceData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                ))}
              </Pie>
              <Legend layout={'vertical'} verticalAlign="bottom" align={'left'} height={40}/>
            </PieChart>
          </div>

          <div id={'innerLayout'}>
            <h2>전월 대비 조정 요청 현황</h2>
            <BarChart
              width={300}
              height={200}
              data={reArrangeData}
              barGap={-20}
              layout="vertical"
            >
              <XAxis hide type="number" datakey={'value'} tickLine={false} axisLine={false}/>
              <YAxis type="category" dataKey="name" tickLine={false} axisLine={false}/>
              <Bar
                dataKey="lastMonth"
                name={'전월'}
                fill={COLORS[1]}
                radius={10}
                barSize={25}
              />
              <Bar
                dataKey="todayMonth"
                name={'금월'}
                fill={COLORS[2]}
                radius={10}
                barSize={25}
              />
              <Tooltip cursor={false}/>
            </BarChart>

            <RearrangeStatus>
              전월 대비
              <div id={'number'}>
                {convertText(info?.rCount, info?.lastRCount)}
              </div>
              건
              <div id={'number'}>
                {convertText2(info?.rCount, info?.lastRCount)}
              </div>
            </RearrangeStatus>
          </div>
        </FirstChartLayout>
        <SecondChartLayout>
          <h2>전월 대비 휴가 신청 현황</h2>
          <div id={'dataLayout'}>
            <div id={'partition1'}>
              <BarChart
                width={180}
                height={200}
                data={vacationData}
                barGap={-20}
              >
                <XAxis
                  type="category"
                  dy={10}
                  dx={0}
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide ticks={10} type="number" datakey={'value'}/>
                <Bar
                  dataKey="lastMonth"
                  name={'전월'}
                  fill={COLORS[1]}
                  radius={10}
                  barSize={25}
                />
                <Bar
                  dataKey="todayMonth"
                  name={'금월'}
                  fill={COLORS[2]}
                  radius={10}
                  barSize={25}
                  minPointSize={10}
                />
                <Tooltip cursor={false} formatter={(value) => [convertTime(value)]}/>
              </BarChart>
            </div>
            <div id={'partition2'}>
              <VacDataLayout>
                <div id={'text'}>
                  전체 <div id={'value'}>120시간 00분</div>
                </div>
                <div id={'text'}>
                  사용 <div id={'value'}>{calculateUsedTime(info?.restTime)}</div>
                </div>
                <div id={'text'}>
                  잔여 <div id={'value'}>{convertTime2(info?.restTime)}</div>
                </div>
              </VacDataLayout>
              <PieChart width={190} height={200}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={restVacData}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill={'gray'}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                />
              </PieChart>
            </div>
          </div>
        </SecondChartLayout>
      </Container>
    </Wrap>
  );
};

const {
  Wrap,
  Container,
  TitleContainer,
  NameContainer,
  FirstChartLayout,
  SecondChartLayout,
  RearrangeStatus,
  VacDataLayout
} = style;

ReportEavDetailPage.propTypes = {
  openEavDetail   : PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  onClickEavDetail: PropTypes.func.isRequired,
  findDate        : PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func])
  ).isRequired,
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