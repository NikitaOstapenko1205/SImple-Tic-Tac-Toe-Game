import React from 'react';
import { mount } from 'enzyme';
import TicTacToe from '../app/TicTacToe';
import reducer from '../app/reducer';

describe('Reducer tests', () => {
  const initialState = {
    field: [
      { value: '', id: 0, winItem: false },
      { value: '', id: 1, winItem: false },
      { value: '', id: 2, winItem: false },
      { value: '', id: 3, winItem: false },
      { value: '', id: 4, winItem: false },
      { value: '', id: 5, winItem: false },
      { value: '', id: 6, winItem: false },
      { value: '', id: 7, winItem: false },
      { value: '', id: 8, winItem: false }
    ],
    currentItem: 'X',
    gameStatus: 'inProcess'
  };

  it('Check on default', () => {
    expect(reducer({}, { type: 'default' })).toEqual('default');
  });

  it('Check on start new game', () => {
    expect(reducer({}, { type: 'MAKE_NEW_GAME', initialState }).gameStatus).toBe('inProcess');
  });

  it('Check on first move, first field changed on X', () => {
    expect(reducer(initialState, { type: 'MAKE_MOVE', id: 0 }).field[0].value).toBe('X');
  });

  it('Check on second move, first field dont changed', () => {
    expect(reducer(initialState, { type: 'MAKE_MOVE', id: 0 }).field[0].value).toBe('X');
  });

  it('Check on win X', () => {
    expect(
      reducer(
        {
          field: [
            { value: 'X', id: 0, winItem: false },
            { value: 'X', id: 1, winItem: false },
            { value: '', id: 2, winItem: false },
            { value: 'O', id: 3, winItem: false },
            { value: 'O', id: 4, winItem: false },
            { value: '', id: 5, winItem: false },
            { value: '', id: 6, winItem: false },
            { value: '', id: 7, winItem: false },
            { value: '', id: 8, winItem: false }
          ],
          currentItem: 'X',
          gameStatus: 'inProcess'
        },
        { type: 'MAKE_MOVE', id: 2 }
      ).gameStatus
    ).toBe('winX');
  });

  it('Check on win O', () => {
    expect(
      reducer(
        {
          field: [
            { value: 'X', id: 0, winItem: false },
            { value: 'X', id: 1, winItem: false },
            { value: '', id: 2, winItem: false },
            { value: 'O', id: 3, winItem: false },
            { value: 'O', id: 4, winItem: false },
            { value: '', id: 5, winItem: false },
            { value: 'X', id: 6, winItem: false },
            { value: '', id: 7, winItem: false },
            { value: '', id: 8, winItem: false }
          ],
          currentItem: 'O',
          gameStatus: 'inProcess'
        },
        { type: 'MAKE_MOVE', id: 5 }
      ).gameStatus
    ).toBe('winO');
  });

  it('Check on draw', () => {
    expect(
      reducer(
        {
          field: [
            { value: 'X', id: 0, winItem: false },
            { value: 'X', id: 1, winItem: false },
            { value: 'O', id: 2, winItem: false },
            { value: 'O', id: 3, winItem: false },
            { value: 'O', id: 4, winItem: false },
            { value: 'X', id: 5, winItem: false },
            { value: 'X', id: 6, winItem: false },
            { value: 'O', id: 7, winItem: false },
            { value: '', id: 8, winItem: false }
          ],
          currentItem: 'X',
          gameStatus: 'inProcess'
        },
        { type: 'MAKE_MOVE', id: 8 }
      ).gameStatus
    ).toBe('drawGame');
  });
});

describe('Component snapshot tests', () => {
  const myComponent = mount(<TicTacToe />);

  it('Drawing initial field with right title', () => {
    expect(myComponent.find('h1').hasClass('makeStyles-title-2')).toBeTruthy();
    expect(myComponent.find('h1 span').text()).toBe('X');
  });

  it('Drawing initial field and check title snapshot', () => {
    expect(myComponent.find('h1').html()).toMatchSnapshot();
  });

  it('Make firts move', () => {
    const row0 = myComponent.find('.row-0').hostNodes();
    row0.simulate('click');
    expect(row0.text()).toBe('X');
    expect(row0.html()).toMatchSnapshot();
  });

  it('Check on win X', () => {
    for (let i = 0; i < 7; i++) {
      const row = myComponent.find(`.row-${i}`).hostNodes();
      row.simulate('click');
    }
    expect(myComponent.find('h1').text()).toBe('Win player X');
    expect(myComponent.find('h1').html()).toMatchSnapshot();
  });

  it('Check on start new game', () => {
    const newGameButton = myComponent.find('.MuiButtonBase-root').hostNodes();
    newGameButton.simulate('click');
    expect(myComponent.find('h1').text()).toBe('Now player X move');
    expect(myComponent.html()).toMatchSnapshot();
  });

  it('Check on draw', () => {
    const drawSequence = [0, 1, 2, 3, 5, 4, 6, 8, 7];
    drawSequence.forEach(item =>
      myComponent
        .find(`.row-${item}`)
        .hostNodes()
        .simulate('click')
    );
    expect(myComponent.find('h1').text()).toBe('It`s a draw!');
    expect(myComponent.find('h1').html()).toMatchSnapshot();
  });
});
