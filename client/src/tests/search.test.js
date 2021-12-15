import React from 'react';
import Search from '../components/Search';
import {render} from '@testing-library/react';
import { expect } from 'chai';

//test functionality of Search component
it('should render search results', () => {
  //create variable to hold search component
  const tree = render(<Search />);
  //compare if original tree matches snapshot
  expect(tree).toMatchSnapshot();
})

it('should test if API functions well', async () => {
    //await fetch and test the assigned variables
    const serverTest = await fetch(`https://itunes.apple.com/search?term=rihanna&media=all`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            search: 'rihanna',
            option: 'all'
        })
    })
    expect(serverTest).toBeDefined();
    //convert  data result to JSON string
    const convertJSON = await serverTest.json();
    expect(convertJSON).toBeTruthy();
})