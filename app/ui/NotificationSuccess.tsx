'use client'
import * as React from 'react';
import Snackbar, { SnackbarProps } from '@mui/joy/Snackbar';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

interface State extends SnackbarOrigin {
  open: boolean;
  message: string;
}

export default class NotificationSuccess extends React.Component{

  constructor(){
    super()
    window.notification = this;

  }
//const [state, setState] = React.useState<State>({
//      message: 'I love snacks@@@',
//      open: true,
//    });
//

  render() {
  
  //    const handleClick = (newState: SnackbarOrigin) => () =>{
  //  alert("click")
  //  setState({ ...newState, open: true });
  //};
  //
  //const handleClose = () => {
  //  setState({ ...state, open: false });
  //};

  return (
    <div>placeholder</div>
          )
  }

}
 //<Snackbar
 //       anchorOrigin={{ vertical:'top' , horizontal: 'right'}}
 //       open={state.open}
 //       onClose={handleClose}
 //     >
 //     {state.message} 
 //     </Snackbar>

//export default NotificationSuccess;
        //key={state.vertical + state.horizontal}
//onClose={(event, reason) => {
//          if (reason === 'clickaway') {
//            return;
//          }
//          setOpen(false);
//        }}

