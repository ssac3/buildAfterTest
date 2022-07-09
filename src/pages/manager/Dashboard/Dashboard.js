import React, {useState, useEffect} from 'react';
import {style} from './DashboardStyle';
import {useSelector, useDispatch} from 'react-redux';
import {SwpEmpReq} from 'redux/actions/ManagerAction';
import {LOCAL_STORAGE} from 'utils/constants';
import {formatter} from 'utils/convertDateTime';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.MangerReducer);
  const [workingTime, setWorkingTime] = useState();
  const [position, setPosition] = useState(undefined);
  const [vacCount, setVacCount] = useState(0);
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

    if(selector?.empData?.vacCount !== undefined) {
      setVacCount(selector.empData.vacCount);
    }
  }, [selector]);

  useEffect(() => {
    setSum(position?.map((v) => v.count).reduce((prev, cur) => prev + cur));
  }, [position, vacCount]);

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
            <h4 style={{margin: 0}}>오늘 출근 및 휴가인 사원 수를 표시합니다.</h4>
          </CardTitle>
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
} = style;