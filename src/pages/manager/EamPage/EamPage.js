import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {style} from './EamPageStyle';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEamReq} from 'redux/actions/ManagerAction';
import {BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend} from 'recharts';
import theme from 'styles/theme';

const MyChart = ({data}) => {
  return(
    <BarChart
      width={400}
      height={500}
      data={data}
    >
      <CartesianGrid strokeDasharray="4"/>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip/>
      <Bar dataKey="okCount" name={'정상'} stackId={'a'} fill={theme.colorSet.ATTENDANCE_STATUS.OK} />
      <Bar dataKey="lateCount" name={'지각'} stackId={'a'} fill={theme.colorSet.ATTENDANCE_STATUS.LATE} />
      <Bar dataKey="absenceCount" name={'결근'} stackId={'a'} fill={theme.colorSet.ATTENDANCE_STATUS.ABSENCE} />
      <Legend />
    </BarChart>
  );
};

export const EamPage = ({openEamDetail, onClickEamDetail, findYear}) => {
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state.MangerReducer);
  const date = findYear?.getFullYear().toString().concat('년도 근태현황');
  const [infos, setInfos] = useState([]);
  const onCloseModal = () => {
    onClickEamDetail([]);
  };

  useEffect(() => {
    dispatch(SwpEamReq(openEamDetail[0].username, findYear?.getFullYear()));
  }, []);

  useEffect(() => {
    if(reducer?.result?.length > 0) {
      setInfos(reducer.result);
    }
  }, [reducer]);

  return (
    <EamWrapper onClick={onCloseModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <BoxLayout>
          <TextLayout>
            <div id={'name'}>{openEamDetail[0]?.name}</div>
            <div id={'username'}>{openEamDetail[0]?.username}</div>
          </TextLayout>

          <ChartLayout>
            <div id={'title'}>{date}</div>
            <div id={'contents'}>
              <MyChart data={infos}/>
            </div>
          </ChartLayout>
        </BoxLayout>

      </Container>
    </EamWrapper>
  );
};

const {
  EamWrapper,
  Container,
  BoxLayout,
  TextLayout,
  ChartLayout,
} = style;

EamPage.propTypes = {
  openEamDetail: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired,
  onClickEamDetail: PropTypes.func.isRequired,
  findYear:PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func])
  ).isRequired,
};

MyChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired,
};

// CustomTooltip.propTypes = {
//   active: PropTypes.bool.isRequired,
//   payload: PropTypes.objectOf(
//     PropTypes.oneOfType([PropTypes.number, PropTypes.string])
//   ).isRequired,
//   label: PropTypes.number.isRequired,
// };
