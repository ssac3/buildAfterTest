import React from 'react';
import {style} from './ManagerListStyle';
import PropTypes from 'prop-types';

export const ManagerList = ({headerData}) => {
  return (
    <ListContainer>
      <HeaderContainer>
        {headerData.map((v) => {
          return <InnerLayout key={v.id}>{v.title}</InnerLayout>;
        })}
      </HeaderContainer>

      <ListItemContainer>
        <ItemContainer/>
      </ListItemContainer>
    </ListContainer>
  );
};

const {
  ListContainer,
  HeaderContainer,
  InnerLayout,
  ListItemContainer,
  ItemContainer,
} = style;

ManagerList.propTypes = {
  headerData: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ).isRequired,
};