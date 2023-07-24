
import{AppBar,Toolbar,IconButton,Typography,Drawer} from'@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NoteIcon from '@mui/icons-material/Note';
import { Notebook } from './Notebook';
import{useState} from 'react';
export const Navbar = () => {
 
  return (
    <>
        <AppBar position='sticky' color='secondary'>
    <Toolbar>
        {/* <IconButton size='large' edge='start'  disableRipple sx={{color:"white"}} onClick={handleChange}>
            <MenuIcon sx={{fontSize:"40px"}}/>
        </IconButton> */}
        <Typography variant='h5' component='div' sx={{flexGrow:1,fontSize:"30px"}}>
            oneNote
            <IconButton  edge='end' disableRipple sx={{color:"white"}}><EventNoteIcon sx={{fontSize:"40px"}} />
            </IconButton>
        </Typography>
    </Toolbar>
</AppBar>
 {/* <Drawer
 variant="persistent"
 anchor="left"
 open={drawer}
 onClick={() =>setDrawer(false)}
 sx={{
  width: drawerWidth,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    marginTop:8
  }
}}
 >
    <Typography variant='h5' component='div' sx={{paddingLeft:2,fontSize:"25px",color:"black",display:"flex",justifyContent:"start"}}>
    <IconButton  edge='start' disableRipple sx={{padding:0 }}>
        <NoteIcon sx={{ fontSize:"40px",color:"black"}} />
            </IconButton>
        Total Notebook
     </Typography>
</Drawer> */}

</>
    
  )
}
