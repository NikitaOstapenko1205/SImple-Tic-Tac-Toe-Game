function checkWinner(field) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (field[a].value && field[a].value === field[b].value && field[a].value === field[c].value) {
      return { winItem: `win${field[a].value}`, winNumbers: lines[i] };
    }
  }

  // check on a draw game
  const fieldFilteredLength = field.filter(item => item.value === '').length;
  if (!fieldFilteredLength) {
    return { winItem: 'drawGame', winNumbers: [] };
  }

  return { winItem: 'inProcess', winNumbers: [] };
}

export default (state, action) => {
  switch (action.type) {
    case 'MAKE_MOVE': {
      if (state.field[action.id].value === '') {
        const oldItem = state.currentItem;
        const newItem = oldItem === 'X' ? 'O' : 'X';
        const newField = _.set(state, `field[${action.id}].value`, oldItem);
        const { winItem, winNumbers } = checkWinner(newField.field);
        if (!winNumbers.length) {
          winNumbers.forEach(i => {
            newField.field[i].winItem = true;
            console.log(newField.field[i].winItem);
          });
        }
        return { ...newField, currentItem: newItem, gameStatus: winItem };
      }
      return { ...state };
    }
    case 'MAKE_NEW_GAME': {
      return { ...action.initialState };
    }
    default:
      throw new Error();
  }
};
