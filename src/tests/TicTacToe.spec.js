import React from 'react';
import { shallow, render, mount, configure } from 'enzyme';
import TicTacToe from '../app/TicTacToe.jsx';

// configure({ adapter: new Adapter() });

it('Drawing initial field', () => {
  const myComponent = shallow(<TicTacToe />);
  console.log(myComponent.find('.makeStyles-paper-5'));

  expect(['a']).toHaveLength(1);
  expect(['a']).toHaveLength(0);
});
