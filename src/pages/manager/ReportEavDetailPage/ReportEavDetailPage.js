import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {style} from './ReportEavDetailPageStyle';
import {formatter} from 'utils/convertDateTime';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEavReq} from 'redux/actions/ManagerAction';
import {PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts';
import theme from 'styles/theme';
export const ReportEavDetailPage = ({openEavDetail, onClickEavDetail, findDate}) => {
  const [info, setInfo] = useState([]);
  const [attendanceData, setAttendanceData] = useState();
  const [reArrangeData, setRearrangeData] = useState();
  const COLORS = [
    theme.colorSet.ATTENDANCE_STATUS.OK,
    theme.colorSet.SECONDARY.GRAY_CC,
    theme.colorSet.PRIMARY.BLUE_1A,
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
  const renderCustomizedLabel = ({ cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    dispatch(SwpEavReq(openEavDetail[0], date));
  }, []);

  useEffect(() => {
    if(selector.result?.okCount !== undefined) {
      setInfo(selector.result);
    } else {
      setInfo([]);
    }
  }, [selector]);

  useEffect(() => {
    console.log(info);
    const convertData = [
      {name:'정상', value:info.okCount},
      {name:'이상', value:info.failCount},
    ];

    const convertData2 = [
      {name: '전월', lastMonth:info.lastRCount},
      {name: '금월', todayMonth:info.rCount},
    ];
    setAttendanceData(convertData);
    setRearrangeData(convertData2);
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
              maxBarSize={1000}
              layout="vertical"
            >
              <XAxis ticks={10} type="number" datakey={'value'} tickLine={false} axisLine={false}/>
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
                minPointSize={10}
              />
              <Tooltip cursor={false}/>
            </BarChart>

            <RearrangeStatus>
              전월 대비
              <div id={'number'}>
                {Math.abs(info.rCount - info.lastRCount)}
              </div>
              건
              <div id={'number'}>
                {(info.rCount - info.lastRCount) > 0 ? '증가' : '감소'}
              </div>
            </RearrangeStatus>
          </div>
        </FirstChartLayout>
        <SecondChartLayout/>
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
  RearrangeStatus
} = style;

ReportEavDetailPage.propTypes = {
  openEavDetail:PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  onClickEavDetail:PropTypes.func.isRequired,
  findDate:PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func])
  ).isRequired,
};