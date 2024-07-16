import { useState, useEffect } from "react";
import icon from "../../assets/ideaIcon.png";
import "./searchBar.css";

const SearchBar = ({ onSearchTermChange,onClickSearch }) => {
  const [searchTerm,setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([]);

  // useEffect(() => {

  //   const fetchSuggestions = async () => {
  //     if (searchTerm.length > 1) {
  //       try {
  //         const response = await fetch(
  //           `https://api.datamuse.com/sug?s=${searchTerm}`
  //         );
  //         const data = await response.json();
       
  //         const wordSuggestions = data.map((suggestion) => suggestion.word);
  //         setSuggestions(wordSuggestions);
  //       } catch (error) {
  //         console.error("Erro ao buscar sugestões:", error);
  //       }
  //     } else {
  //       setSuggestions([]);
  //     }
  //   };

  //   const timeoutId = setTimeout(() => {
  //     fetchSuggestions();
  //   }, 300);


  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    onSearchTermChange(suggestion);
  };
      
 
  const handleChange = (e) => {
    const term  = e.target.value;
    setSearchTerm(term);
    onSearchTermChange(term)
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };

  return (
    <div className="search">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        <button className="search-button" onClick={onClickSearch}>
          <img src={icon} alt="Pesquisar" className="search-icon" />
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
