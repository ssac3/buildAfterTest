import React from 'react';
import {style} from './NavigationStyle';
import PropTypes from 'prop-types';
import {
  MdSpaceDashboard,
  MdAssignmentTurnedIn,
  MdPeople,
  MdAssignment,
  MdCreate
} from 'react-icons/md';

export const Navigation = ({role, menu, onClickMenu, onClickSubMenu}) => {
  return (
    <>
      <Container>
        {role === 'manager' && (
          <>
            <IconLayout id={0} onClick={onClickMenu} status={menu[0]?.check}>
              <MdSpaceDashboard pointerEvents={'none'} size={40}/>
            </IconLayout>
            <IconLayout id={1} onClick={onClickMenu} status={menu[1]?.check}>
              <MdAssignmentTurnedIn pointerEvents={'none'} size={40}/>
            </IconLayout>
            <IconLayout id={2} onClick={onClickMenu} status={menu[2]?.check}>
              <MdPeople pointerEvents={'none'} size={40}/>
            </IconLayout>
            <IconLayout id={3} onClick={onClickMenu} status={menu[3]?.check}>
              <MdAssignment pointerEvents={'none'} size={40}/>
            </IconLayout>
          </>
        )}

        {role === 'admin' && (
          <>
            <IconLayout id={0} onClick={onClickMenu} status={menu[0]?.check}>
              <MdPeople pointerEvents={'none'} size={40}/>
            </IconLayout>
          </>
        )}


        {role === 'user' && (
          <>
            <IconLayout id={0} onClick={onClickMenu} status={menu[0]?.check}>
              <MdAssignmentTurnedIn pointerEvents={'none'} size={40}/>
            </IconLayout>
            <IconLayout id={1} onClick={onClickMenu} status={menu[1]?.check}>
              <MdCreate pointerEvents={'none'} size={40}/>
            </IconLayout>
          </>
        )}
        {menu?.map(value => (value.check
          && value.sub.length > 0)
            &&
            (
            <DrawerContainer key={value.id}>
              <div id={'title'}>{value.title}</div>
              {value.sub.map(e => {
                return (
                  <SubTitle key={e.id} id={e.id} check={e.check} onClick={onClickSubMenu}>
                    {e.title}
                  </SubTitle>
                );
              })}
            </DrawerContainer>
            ))}

      </Container>
    </>
  );
};
Navigation.propTypes = {
  role: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array, PropTypes.bool])
    )
  ).isRequired,
  onClickSubMenu:PropTypes.func.isRequired,
  onClickMenu:PropTypes.func.isRequired,
};

const {Container, IconLayout, DrawerContainer, SubTitle} = style;

