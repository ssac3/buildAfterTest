import React from 'react';
import PropTypes from 'prop-types';
import {style} from './DropboxStyle';
import {MdKeyboardArrowDown} from 'react-icons/md';

export const Dropbox = ({
  id,
  open,
  onClickDropBox,
  menu,
  select,
  readOnly,
  onChangeFilter,
  onClickDropBoxItem}) => {
  return (
    <Container onClick={onClickDropBox}>
      <ItemName id={id} readOnly={readOnly} value={select} onChange={onChangeFilter}/>
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
  id:PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClickDropBox:PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  select:PropTypes.string.isRequired,
  onChangeFilter:PropTypes.func,
  onClickDropBoxItem:PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
};
