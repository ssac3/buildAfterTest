import React from 'react';
import PropTypes from 'prop-types';
import AtdcCalendar from 'components/AtdcCalendar';
import locale from 'antd/es/calendar/locale/ko_KR';
import AtdcMonthly from 'components/AtdcMonthly';
import MyProfile from 'components/MyProfile';
import UpdatePw from 'components/UpdatePw';
import {style} from './AtdcManagementStyle';

export const AtdcManagement = ({
  selectedId,
  onClickDavDetail,
  onClickVaeDetail,
  onClickVavDetail,
}) => {
  const renderUI = React.useMemo(() => {
    if (selectedId === 0) {
      return (
        <CalendarLayout>
          <AtdcCalendar
            locale={locale}
            onClickDavDetail={onClickDavDetail}
            onClickVaeDetail={onClickVaeDetail}
            onClickVavDetail={onClickVavDetail}
          />
        </CalendarLayout>
      );
    }

    if(selectedId === 1) {
      return <AtdcMonthly/>;
    }

    if(selectedId === 2) {
      return <MyProfile/>;
    }

    if(selectedId === 3) {
      return <UpdatePw/>;
    }
    return <></>;
  }, [selectedId]);


  return renderUI;
};

const {
  CalendarLayout
} = style;

AtdcManagement.propTypes = {
  selectedId:PropTypes.number.isRequired,
  onClickDavDetail: PropTypes.func.isRequired,
  onClickVaeDetail: PropTypes.func.isRequired,
  onClickVavDetail: PropTypes.func.isRequired,
};