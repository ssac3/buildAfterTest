import React, {useState} from 'react';
import {style} from './SearchStyle';
import {MdSearch} from 'react-icons/md';
// const handleInputClear = () => {
//     setSearchValue("");
// }

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <Container>
      <SearchInput autoFocus value={searchValue} onChange={handleInputChange}/>
      <BtnContainer>
        <MdSearch size={25}/>
      </BtnContainer>
    </Container>
  );
};
const {Container, SearchInput, BtnContainer} = style;