import React, {useState} from 'react';
import {style} from './EmplAttendanceMngmentStyle';
import ButtonGroup from 'components/ButtonGroup';
import ManagerList from 'components/ManagerList';
import {MANAGER_EMP_MNG_HEADER} from 'utils/constants';

// const sampleData = {
//   username: 5414290,
//   name: '박채연',
//   email: 'pcyeon07@gmail.com',
//   gender: '1',
//   deptName:'프론트엔드',
//   position:'사원',
//   create_at:'2022.06.10'
// };

export const EmplAttendanceMngment = () => {
  const [selectType, setSelectType] = useState('일별');

  const onClickType = (target) => {
    setSelectType(target);
  };

  return (
    <Wrapper>
      <TitleContainer>
        <InnerContainer>
          <h2>사원별 근태 관리</h2>
          <ButtonGroup selectType={selectType} onClickType={onClickType}/>
        </InnerContainer>
      </TitleContainer>

      <Container>
        <ManagerList headerData={MANAGER_EMP_MNG_HEADER}/>
      </Container>
    </Wrapper>
  );
};

const {
  Wrapper,
  TitleContainer,
  InnerContainer,
  Container
} = style;