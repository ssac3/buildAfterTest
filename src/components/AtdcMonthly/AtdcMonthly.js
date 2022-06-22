import React from "react";
import {Container, Grid} from "@mui/material";
import {MonthlyAttendance, MonthlyWorkDetail, MonthlyWorktime, UseVacation} from "./Section";


export const AtdcMonthly = () => {
  return(
    <>
      <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <MonthlyWorktime
              title="월별 근무 시간"
              subheader="이번달 월별 근무 시간입니다."
            />
          </Grid>
          <Grid item xs={6}>
            <MonthlyAttendance
              title="월별 근태 현황"
              subheader="이번달 근태 현황입니다."
            />
          </Grid>
          <Grid item xs={6}>
            <MonthlyWorkDetail
              title="상세 근무 시간"
              subheader="이번달 상세 근무 시간입니다."
            />
          </Grid>
          <Grid item xs={6}>
            <UseVacation
              title="휴가 사용 시간"
              subheader="이번달 사용한 휴가 시간입니다."
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};