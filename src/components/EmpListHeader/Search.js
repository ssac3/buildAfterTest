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
      <BtnContainer>
        <MdSearch size={25}/>
      </BtnContainer>
      <SearchInput autoFocus value={searchValue} placeholder="사원번호 혹은 사원명을 입력하세요." onChange={handleInputChange}/>
    </Container>
  );
};
const {Container, SearchInput, BtnContainer} = style;