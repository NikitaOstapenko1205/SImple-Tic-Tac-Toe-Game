import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    maxWidth: '1440px',
    margin: '25px auto 0'
  },
  title: {
    margin: '50px 0 0',
    textAlign: 'center',
    fontSize: '30px',
    [theme.breakpoints.down('xs')]: {
      margin: '25px 0 0',
      fontSize: '22px'
    }
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start'
    }
  },
  button: {
    display: 'block',
    background: 'green',
    color: 'white',
    fontWeight: 'bold',
    margin: '25px auto',
    transition: '0.3s',
    border: 'none',
    fontSize: '80px',
    width: '80%',
    minWidth: '300px',
    height: '150px',
    '&:hover': {
      background: '#8ec2f7',
      transition: '0.3s'
    },
    [theme.breakpoints.down('md')]: {
      height: '115px',
      fontSize: '50px'
    },
    [theme.breakpoints.down('xs')]: {
      height: '75px',
      fontSize: '30px',
      margin: '285px auto 0'
    }
  },
  paper: {
    padding: '10px',
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '30px',
    transition: '0.3s',
    '&:hover': {
      background: '#8ec2f7',
      transition: '0.3s'
    },
    [theme.breakpoints.down('xs')]: {
      height: '30px',
      width: '30px',
      fontSize: '22px'
    }
  },
  paperWin: {
    background: 'green'
  }
}));
