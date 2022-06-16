import React, {useState} from 'react';
import {style} from './NavigationStyle';
import PropTypes from 'prop-types';
import {MdSpaceDashboard, MdAssignmentTurnedIn, MdPeople, MdAssignment, MdCreate} from 'react-icons/md';

export const Navigation = ({role, menu}) => {
  const [select, setSelect] = useState(menu);

  const onClickMenu = (e) => {
    const change = menu.map(value => (value.id === Number(e.target.id) ? {
      ...value,
      check: true
    } : {...value, check: false}));
    setSelect(change);
  };

  return (
    <>
      <Container>
        {role === 'manager' && (
          <>
            <IconLayout id={0} onClick={onClickMenu} status={select[0].check}>
              <MdSpaceDashboard pointerEvents={'none'} size={40}/>
            </IconLayout>
            <IconLayout id={1} onClick={onClickMenu} status={select[1].check}>
              <MdAssignmentTurnedIn pointerEvents={'none'} size={40}/>
            </IconLayout>
            <IconLayout id={2} onClick={onClickMenu} status={select[2].check}>
              <MdPeople pointerEvents={'none'} size={40}/>
            </IconLayout>
            <IconLayout id={3} onClick={onClickMenu} status={select[3].check}>
              <MdAssignment pointerEvents={'none'} size={40}/>
            </IconLayout>
          </>
        )}

        {role === 'admin' && (
          <>
            <IconLayout id={0} onClick={onClickMenu} status={select[0].check}>
              <MdPeople pointerEvents={'none'} size={40}/>
            </IconLayout>
          </>
        )}


        {role === 'user' && (
          <>
            <IconLayout id={0} onClick={onClickMenu} status={select[0].check}>
              <MdAssignmentTurnedIn pointerEvents={'none'} size={40}/>
            </IconLayout>
            <IconLayout id={1} onClick={onClickMenu} status={select[1].check}>
              <MdCreate pointerEvents={'none'} size={40}/>
            </IconLayout>
          </>
        )}

        {select.map(value => (value.check && value.sub.length > 0) &&
          <DrawerContainer key={value.id}/>)}
      </Container>
    </>
  );
};
Navigation.propTypes = {
  role: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

const {Container, IconLayout, DrawerContainer} = style;



