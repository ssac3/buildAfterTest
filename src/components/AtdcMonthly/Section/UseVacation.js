import {Box, Card, CardHeader} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import ReactECharts from "echarts-for-react";

export const UseVacation = ({title, subheader, ...other}) => {
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
  return(
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        padding: '10',
      }}
      >
        <Box>
            <Card>
              <CardHeader title={'ㅇㅇㅇ'}/>
            </Card>
        </Box>
        <Box>
          <ReactECharts option={option}/>
        </Box>
      </Box>
    </Card>
  );
};

UseVacation.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
};