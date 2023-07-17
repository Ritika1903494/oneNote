import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import DialogTitle from '@mui/material/DialogTitle';
import './style.css';
import { useState } from 'react';

import { post_notebook } from './Services';

type dialogProps={
    dialog:boolean;
    setDialog: React.Dispatch<React.SetStateAction<boolean>>;
 }
export const Dialogs = (props:dialogProps) => {
  console.log("dialog",props.dialog)
  const[pass,setValues]=useState<string>('') 

  const handleClick=(notebook:any)=>{
    console.log("111")
    if(notebook){
      console.log("notebook",notebook)
      post_notebook(notebook)
      props.setDialog(false);
    }
  }
  
  const handleClose =()=> {
    props.setDialog(false);
  };
 
  return (
    <>
    { props.dialog && props.dialog===true &&
       <div>
     <Dialog open={props.dialog} onClose={handleClose}>
       <DialogTitle>Add NoteBook</DialogTitle>
       <DialogContent>
         <TextField
           autoFocus
           margin="dense"
           id="name"
           label="NoteBook Name"
           type="text"
           variant='outlined' 
           color='secondary'
           sx={{width:500}}
           value={pass}
           onChange={(e) =>{setValues(e.target.value)}}
         />
       </DialogContent>
       <DialogActions>
         <Button onClick={() =>{handleClick(pass)}}   startIcon={<CreateIcon /> } color="success">Create</Button>
         <Button onClick={handleClose} startIcon={<DeleteIcon /> }  color="error">Cancel</Button>
       </DialogActions>
     </Dialog>
  </div>     
    }
    </>
  )
}
