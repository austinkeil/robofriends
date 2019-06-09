import React, { useState, useEffect } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import {robots} from './robots';

function App() {
    const [bots, setBots] = useState(robots);
    const [searchField, setSearchField] = useState('');
    
    function onSearchChange(event) {
        setSearchField(event.target.value);
    }

    useEffect(() => {
        setBots(robots.filter(bot => {
            return bot.name.toLowerCase().includes(searchField.toLowerCase());
        }))
    }, [searchField])

    return (
        <div className='tc'>
            <h1>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange} />
            <CardList robots={ bots } />
        </div>
    )
}

export default App;