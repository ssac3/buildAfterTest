import React, {useState, useEffect} from 'react';
import {style} from './DashboardStyle';
import {useSelector} from 'react-redux';
import {formatter} from 'utils/convertDateTime';

export const Dashboard = () => {
  const selector = useSelector((state) => state.MangerReducer);
  const [workingTime, setWorkingTime] = useState();
  const convertText = (target) => {
    if(target !== undefined) {
      return target.substring(0, 5);
    }
    return '';
  };

  useEffect(() => {
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
  }, [selector]);

  return (
    <Wrapper>
      <Container>
        <Card w={95}>
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
        <Card w={95}></Card>
        <Card w={95}></Card>
        <Card w={95}></Card>
      </Container>
    </Wrapper>
  );
};

const {
  Wrapper,
  Container,
  Card,
  CardTitle,
  CircleLayout,
  Circle
} = style;