import React, {useState} from 'react';
import {style} from './SearchStyle';
import {MdSearch} from 'react-icons/md';
// const handleInputClear = () => {
//     setSearchValue("");
// }

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const handleInputChange = (e) => {
    // console.log(e.target.value);
    setSearchValue(e.target.value);
  };
  return (
    <Container>
      <input id="serchInput" type="text" value={searchValue} onChange={handleInputChange}></input>
      <button id="searchBtn" type="submit">검색</button>
      <MdSearch/>
    </Container>
  );
};
const {Container} = style;