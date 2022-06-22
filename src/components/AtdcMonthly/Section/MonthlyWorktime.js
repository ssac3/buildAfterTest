import {Box, Card, CardHeader} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ReactECharts from 'echarts-for-react';


export const MonthlyWorktime = ({title, subheader, ...other}) => {
  const optionBar = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200],
        type: 'bar'
      }
    ]
  };
  const optionDoughnut = {
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
          {value: 1048, name: 'Search Engine'},
          {value: 735, name: 'Direct'},
        ]
      }
    ]
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader}/>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        padding: '10',
      }}
      >
        <Box>
          <ReactECharts option={optionBar}/>
        </Box>
        <Box>
          <ReactECharts option={optionDoughnut}/>
        </Box>
      </Box>
    </Card>
  );
};

MonthlyWorktime.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
};
