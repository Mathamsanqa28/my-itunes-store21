import React from 'react';
import Card from './Card';

//styling emphasis with icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

//use fetch
require('isomorphic-fetch');

//create class component for a stateful component
class Search extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            error: null,
            option: 'all',
            search: '',
            results: [],
            reload: false
        }
    }

    //function to get activated onClick event
    handleSubmit(event) {
        if (this.state.search === '');
        
        this.setState({results: []});
        event.preventDefault();
        fetch('/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                search:this.state.search,
                option:this.state.option
            })
        })
        .then(res => res.json())
        .then(response => {
            this.setState({results: response})
            console.log(this.state);
        })

        .catch(error => {
            alert('Server offline');
            this.setState(error);
            console.log(error);
        })
    }

    //create cards to dispaly search results
    searchResults() {
        const results = this.state.results.results;
        return (
            results.map(result => 
                <Card 
                id={result.collectionId} 
                key={result.collectionArtistId}
                kind={result.kind} 
                link={result.tracViewUrl} 
                name={result.trackName} 
                artistName={result.artistName}
                imgThumbnail={result.artworkUrl100} />
            )
        )
    }

    render() {
        return (
            <>
                <h2>Search</h2>
                    <form className='search-bar-form' onSubmit={this.handleSubmit}>
                        <input type='text' placeholder='search....' onChange={(event) => this.setState({ search: event.target.value })}></input>
                        <button type='submit'> Search <FontAwesomeIcon icon={faSearch} color='teal' /> </button>
                        <br />
                        <br />
                    <div className='dropdown'>
                        <select className='drop-btn form-select form-select-lg mb-3 mt-3' onChange={(event) => this.setState({ option: event.target.value })}>
                            <option value='all'>All</option>
                            <option value='audiobook'>AudioBook</option>
                            <option value='ebook'>eBook</option>
                            <option value='movie'>Movie</option>
                            <option value='music'>Music</option>
                            <option value='podcast'>Podcast</option>
                            <option value='shortFilm'>Short Film</option>
                            <option value='tvshow'>tvShow</option>
                        </select>
                    </div>
                    </form>
                <>
                    {this.state.results.length !== 0 ? <div>{this.searchResults()}</div> : ''}
                </>
            </>    
        )
    }
}

export default Search