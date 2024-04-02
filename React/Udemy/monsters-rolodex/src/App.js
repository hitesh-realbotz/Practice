import './App.css';
import CardList from './components/card-list/card-list.component';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchBox from './components/search-box/serch-box.component';

function App() {
  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => {
        setMonsters(users);

      });
  }, []);

  useEffect(() => {

    const newFilteredMonsters = monsters.filter(monster => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })
    setFilteredMonsters(newFilteredMonsters);


  }, [monsters, searchField]);


  const onSearchChange = (event) => {
    setSearchField((event.target.value.toLocaleLowerCase()));
  }


  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox className="monsters-search-box" onChangeHandler={onSearchChange} placeholder="search monster" />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

export default App;
