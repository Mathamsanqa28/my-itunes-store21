import React from 'react';
import Card from '../components/Card';
import {render} from '@testing-library/react';

//test functionality of the card component
it(' should render correctly', () => {
    //create variable to hold component
    const tree = render(<Card />)
    //compare if original component matches snapshot
    expect(tree).toMatchSnapshot();
    const functionality = <Card />;
    expect(functionality).toBeDefined();
})

//test functionality of sessionStorage
it('should work with sessionStorage', () => {
    let addFav = []
    addFav.push('test')
    sessionStorage.setItem('favList', JSON.stringify(addFav));
    let testFav = JSON.parse(sessionStorage.getItem('favList'));
    expect(testFav).toHaveLength(1)
})