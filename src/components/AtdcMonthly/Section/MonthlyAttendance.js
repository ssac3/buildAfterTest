import {Box, Card, CardHeader} from "@mui/material";
import React from 'react';
import PropTypes from "prop-types";
import ReactECharts from "echarts-for-react";

export const MonthlyAttendance = ({title, subheader, ...other}) => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '10',
            fontWeight: 'bold',
            formatter: '{b} : {c}시'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
        ]
      }
    ]
  };
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader}/>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactECharts option={option}/>
      </Box>
    </Card>
  );
};

MonthlyAttendance.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
};