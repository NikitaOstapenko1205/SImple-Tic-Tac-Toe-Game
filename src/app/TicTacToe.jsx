import React, { useReducer } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import useStyles from './style';
import reducer from './reducer';

let classes;

const FormRow = props => {
  const { rows, makeMove } = props;
  const addId = id => () => {
    makeMove({ type: 'MAKE_MOVE', id });
  };
  return (
    <>
      {rows.map(item => (
        <Grid key={item.id} item>
          <Paper
            onClick={addId(item.id)}
            className={`row-${item.id} ${classes.paper} ${item.winItem ? classes.paperWin : ''}`}
          >
            {item.value}
          </Paper>
        </Grid>
      ))}
    </>
  );
};

const showModal = newGame => {
  return (
    <Modal
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open
      display="flex"
    >
      <Button onClick={newGame} size="large" className={classes.button} variant="outlined">
        New Game
      </Button>
    </Modal>
  );
};

export default () => {
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

  const [state, dispatch] = useReducer(reducer, initialState);
  classes = useStyles();

  const newGame = () => {
    dispatch({ type: 'MAKE_NEW_GAME', initialState });
  };

  const getTitle = () => {
    if (state.gameStatus === 'inProcess') {
      return (
        <h1 className={classes.title}>
          Now player <span>{state.currentItem}</span> move
        </h1>
      );
    }
    if (state.gameStatus === 'drawGame') {
      return <h1 className={classes.title}>It`s a draw!</h1>;
    }
    return (
      <h1 className={classes.title}>
        Win player <span>{state.gameStatus.slice(-1)}</span>
      </h1>
    );
  };

  return (
    <>
      {getTitle()}
      <Grid className={classes.root} container justify="center" alignItems="center" spacing={2}>
        <Grid container justify="center" alignItems="center" item md={8} spacing={4}>
          <FormRow makeMove={dispatch} rows={state.field.filter(item => item.id < 3)} />
        </Grid>
        <Grid container justify="center" alignItems="center" item md={8} spacing={4}>
          <FormRow
            makeMove={dispatch}
            rows={state.field.filter(item => item.id > 2 && item.id < 6)}
          />
        </Grid>
        <Grid container justify="center" alignItems="center" item md={8} spacing={4}>
          <FormRow makeMove={dispatch} rows={state.field.filter(item => item.id >= 6)} />
        </Grid>
      </Grid>
      {state.gameStatus !== 'inProcess' && showModal(newGame)}
    </>
  );
};
