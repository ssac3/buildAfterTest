import React from 'react';
import AtdcCalendar from 'components/AtdcCalendar';
import locale from "antd/es/calendar/locale/ko_KR";

export const AtdcManagement = () => {
  return (
    <div style={{width:'100%', height:'100%', backgroundColor:'yellow', padding:'20px'}}>
      <AtdcCalendar locale={locale}/>
    </div>
  );
};
