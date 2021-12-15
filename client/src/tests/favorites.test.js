import React from 'react';
import Favorites from '../components/Favorites';
import {render} from '@testing-library/react';
import { expect } from 'chai';

//test functionality of Favorites component
it('should render correctly', () => {
  //create variable to hold Favorites component
  const tree = render(<Favorites />);
  //compare if original tree matches snapshot
  expect(tree).toMatchSnapshot();
  const functionality = <Favorites />;
  expect(functionality).toBeDefined();
})