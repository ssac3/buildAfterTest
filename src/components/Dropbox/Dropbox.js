import React from 'react';
import PropTypes from 'prop-types';
import {style} from './DropboxStyle';
import {MdKeyboardArrowDown} from 'react-icons/md';

export const Dropbox = ({open, onClickDropBox, menu, select, onClickDropBoxItem}) => {
  return (
    <Container>
      <ItemName>{select}</ItemName>
      <MdKeyboardArrowDown size={24} color={'white'} onClick={onClickDropBox} style={{cursor:'pointer'}}/>

      {open ? (
        <DropContainer>
          {menu.map(k => (
            <DropdownItem key={k.id} id={k.title} onClick={onClickDropBoxItem}>
              {k.title}
            </DropdownItem>
          ))}
        </DropContainer>
      )
        :
        <></>}
    </Container>
  );
};

const { Container, ItemName, DropContainer, DropdownItem } = style;

Dropbox.propTypes = {
  open: PropTypes.bool.isRequired,
  onClickDropBox:PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  select:PropTypes.string.isRequired,
  onClickDropBoxItem:PropTypes.func.isRequired
};