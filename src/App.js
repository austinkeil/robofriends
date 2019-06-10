import React, { useState, useEffect } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './App.css';

function App() {
    const [bots, setBots] = useState([]);
    const [filteredBots, setFilteredBots] = useState([]);
    const [searchField, setSearchField] = useState('');
    
    function onSearchChange(event) {
        setSearchField(event.target.value);
    }

    useEffect(() => {
        fetch('https:/jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(users => setBots(users))
            .catch(error => console.log(error));

        setFilteredBots(bots.filter(bot => {
            return bot.name.toLowerCase().includes(searchField.toLowerCase());
        }))
    }, [searchField, bots])

    if (bots.length === 0) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <CardList robots={ filteredBots } />
                </Scroll>
            </div>
        )
    }
}

export default App;