import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { setSearchField } from '../actions'

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

function App(props) {
    const [bots, setBots] = useState([]);
    const [filteredBots, setFilteredBots] = useState([]);
    
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
            return bot.name.toLowerCase().includes(props.searchField.toLowerCase());
        }))

    }, [props.searchField, bots])

    if (!bots.length) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={props.onSearchChange} />
                <Scroll>
                    <CardList robots={ filteredBots } />
                </Scroll>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);