import React, { useState } from 'react';
import styled from 'styled-components';
import Yoga from '../assets/images/yoga.jpg';
import Book from '../assets/images/book.jpeg';
import Coding from '../assets/images/coding.jpg';
interface SearchContentProps {
  className?: string;
}
const SearchContent: React.FC<SearchContentProps> = ({ className }) => {
  console.log(className);
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = () => {
      //검색 로직
      console.log(`Searching for: ${searchQuery}`);
    };

    function check(){
      console.log("search");
  }
  
    return (
      <Searches>
        <input
          className='search-bar'
          type="text"
          placeholder="도전하고 싶은 미션을 찾아보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className='search-button' onClick={handleSearch}>🔍︎</div>
        <div className='recommend-container'>
          <div className='recommend' style={{backgroundImage:`url(${Yoga})`, backgroundSize: 'cover'}}>
            <div className='recommend-name' onClick={check}>하루 요가</div>
            <div className='recommend-explain'>간단한 요가 챌린지</div>
          </div>
          <div className='recommend' style={{backgroundImage:`url(${Book})`, backgroundSize: 'cover'}}>
            <div className='recommend-name'>마음의 양식</div>
            <div className='recommend-explain'>현대인의 독서 습관 기르기</div>
          </div>
          <div className='recommend' style={{backgroundImage:`url(${Coding})`, backgroundSize: 'cover'}}>
            <div className='recommend-name'>C를 씹어먹자</div>
            <div className='recommend-explain'>1일 1백준</div>
          </div>
        </div>
      </Searches>
    );
}
const Searches = styled.div`
box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1), -5px 0 10px rgba(0, 0, 0, 0.1) ;
width: 580px;
height: 330px;
position: absolute;
top:60px;
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;

.search-bar{
  width: 300px;
  height: 30px;
  border-radius: 30px;
  border-style: none;
  background-color: lightgrey;
  text-align: center;
  margin-top: 26px;
  margin-bottom: 30px;
  
}
.search-button{
  position: absolute;
  top: 30px;
  right: 150px;
}
    .recommend-container{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 10px;
      margin-left: 22px;
    }
    .recommend{
      width: 160px;
      height: 170px;
      border-radius: 10px;
      background-color: lightgrey;
    }
    .recommend-name{
      width: 120px;
      height: 20px;
      border-radius: 10px;
      color: white;
      font-size: 20px;
      font-weight: bold;
      margin: 0 auto;
      margin-top: 40px;
    }
    .recommend-explain{
      width: 130px;
      height: 20px;
      border-radius: 10px;
      color: white;
      margin: 0 auto;
      margin-top: 40px;
    }
`;


  export default SearchContent;