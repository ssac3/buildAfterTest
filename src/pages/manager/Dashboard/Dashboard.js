import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {style} from './DashboardStyle';
import {useSelector, useDispatch} from 'react-redux';
import {SwpEmpReq} from 'redux/actions/ManagerAction';
import {LOCAL_STORAGE} from 'utils/constants';
import {formatter} from 'utils/convertDateTime';
import {Bar, BarChart, Pie, PieChart, Sector, Tooltip, XAxis} from 'recharts';
import theme from 'styles/theme';

const AttendaceBarChart = ({data, sum}) => {
  const tmp = [];
  if(data !== undefined) {
    tmp.push({name: '출근', aCount: (sum - data.vCount)});
    tmp.push({name: '휴가', vCount: data.vCount});
    console.log(tmp);
  }
  return (
    <BarChart
      data={tmp}
      width={150}
      height={200}
      barGap={-23}
      barSize={20}
    >
      <XAxis
        dy={10}
        type="category"
        dataKey={'name'}
        tickLine={false}
        axisLine={false}
        minTickGap={15}
      />

      <Bar
        dataKey={'aCount'}
        name={'인원 수'}
        height={40}
        radius={5}
        fill={theme.colorSet.PRIMARY.BLUE_1A}
      />
      <Bar
        dataKey={'vCount'}
        name={'인원 수'}
        height={40}
        radius={5}
        fill={theme.colorSet.SECONDARY.GRAY_CC}
      />
      <Tooltip cursor={false}/>
    </BarChart>
  );
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
      <text x={cx} y={cy} dy={10} textAnchor="middle" fill={theme.colorSet.PRIMARY.BLUE_1A}>
        <tspan fontSize={18} fontWeight={'bold'} textAnchor="middle" x={cx} dy={0}>{payload.value.toString().concat('%')}</tspan>
        <tspan fontWeight={'normal'} textAnchor="middle" x={cx} dy={20}>{payload.name}</tspan>
      </text>
      <Sector
        fill={theme.colorSet.PRIMARY.BLUE_1A}
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

const AttendancePiChart = ({current, total}) => {
  console.log(current, total);
  const [chartInfo, setChartInfo] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  useEffect(() => {
    if(current !== undefined && !Number.isNaN(total)) {
      const convertData = [
        {name: '출근 완료', value: 100 * (current / total)},
        {name: '미출근', value: 100 * ((total - current) / total)},
      ];
      setChartInfo(convertData);
    }
  }, [current, total]);

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
export const Dashboard = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.MangerReducer);
  const [workingTime, setWorkingTime] = useState();
  const [position, setPosition] = useState(undefined);
  const [count, setCount] = useState({});
  const [sum, setSum] = useState(0);
  const convertText = (target) => {
    if(target !== undefined) {
      return target.substring(0, 5);
    }
    return '';
  };

  useEffect(() => {
    dispatch(SwpEmpReq(LOCAL_STORAGE.get('depId')));
  }, []);

  useEffect(() => {
    console.log(selector);
    if(selector?.startTime !== undefined) {
      const startTimeSlice = selector?.startTime.split(':');
      const endTimeSlice = selector?.endTime.split(':');
      const startTime = new Date(0, 0, 0, startTimeSlice[0], startTimeSlice[1], startTimeSlice[2]);
      const endTime = new Date(0, 0, 0, endTimeSlice[0], endTimeSlice[1], endTimeSlice[2]);
      const temp = formatter((endTime.getHours() - 1) - startTime.getHours())
        .concat(':')
        .concat(formatter(endTime.getMinutes() - startTime.getMinutes()));
      setWorkingTime(temp);
    }

    if(selector?.empData?.posCount?.length > 0) {
      setPosition(selector.empData.posCount);
    }

    if(selector?.empData?.count !== undefined) {
      setCount(selector.empData.count);
    }
  }, [selector]);

  useEffect(() => {
    setSum(position?.map((v) => v.count).reduce((prev, cur) => prev + cur));
  }, [position, count]);

  return (
    <Wrapper>
      <InnerContainer>
        <Card w={49}>
          <CardTitle align={'flex-start'} dir={'column'}>
            <h2 style={{margin: 0}}>정규 출퇴근 시간</h2>
            <h4 style={{margin: 0}}>사원의 정규 출/퇴근 시간입니다.</h4>
          </CardTitle>
          <CircleLayout>
            <Circle>
              <div id={'title'}>출근</div>
              <div id={'time'}>{convertText(selector?.startTime)}</div>
            </Circle>
            <Circle>
              <div id={'title'}>퇴근</div>
              <div id={'time'}>{convertText(selector?.endTime)}</div>
            </Circle>
            <Circle>
              <div id={'title'}>근무 시간</div>
              <div id={'time'}>{workingTime}</div>
            </Circle>
          </CircleLayout>
        </Card>
        <Card w={49}>
          <CardTitle align={'flex-start'} dir={'column'}>
            <h2 style={{margin: 0}}>오늘 근태 현황</h2>
            <h4 style={{margin: 0}}>출근과 전일 휴가인 사원 수를 표시합니다.</h4>
          </CardTitle>
          <ChartLayout>
            <AttendaceBarChart data={count} sum={sum}/>
            <AttendancePiChart current={count?.aCount} total={(sum - count.vCount)}/>
          </ChartLayout>
        </Card>
      </InnerContainer>
      <ImageCard>
        <ImageLayout url={'https://user-images.githubusercontent.com/40657327/178105517-d4d814ef-b54d-41f2-b6c4-373e45046368.jpeg'}/>

        <DepInfoLayout>
          <div id={'depName'}>
            {selector?.name}
            <div id={'text'}>직급별 인원 수를 표시합니다.</div>
          </div>
          <div id={'divider'}/>
          <div id={'positionInfo'}>
            {position?.map((v) => {
              return (
                <div key={v.position} id={'position'}>
                  {v.position}
                  <div id={'count'}>{v.count}</div>
                </div>
              );
            })}
          </div>
          <div id={'divider'}/>
          <div id={'sumInfo'}>
            합
            <div id={'sum'}>{sum}</div>
          </div>
        </DepInfoLayout>
      </ImageCard>
    </Wrapper>
  );
};

const {
  Wrapper,
  Card,
  CardTitle,
  CircleLayout,
  Circle,
  InnerContainer,
  ImageCard,
  ImageLayout,
  DepInfoLayout,
  ChartLayout,
} = style;

AttendaceBarChart.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  sum: PropTypes.number.isRequired,
};

AttendancePiChart.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
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