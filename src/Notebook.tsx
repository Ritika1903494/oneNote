
import{Grid,Box,Typography,IconButton,List,ListItem,ListItemText,ListItemButton,ListItemIcon}from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import'./style.css';
import{useState,useEffect} from 'react';
import { Dialogs } from './Dialogs';
import { Navbar } from './Navbar';
import { get_notebooks } from './Services';
import { setNotebook, setSection} from './Local_service';
import { Sectionpage } from './Sectionpage';
import axios from 'axios';
type data={
  note_name:string;
}

export const Notebook = () => {
    const[dialog,setDialog]=useState<boolean>(false);
    const[openSectionpage,setSectionpage]=useState<boolean>(false);
     const[Data,setData]=useState<data|string>("");
    const handleChange=() =>{
        setDialog(true)
    }
     
    let Note_name:string;
    const RouteChange = (note_name:string,note_id:number) =>{
      Note_name=note_name;
      setNotebook("note_name",note_name)
      setSection("note_id",note_id)
      setSectionpage(true)
     
    }
      const getData=async()=>{
        let response:any = await get_notebooks();
        console.log("response",response.data)
        if(response.status===200) {
            console.log("status",response.status)
          setData(response.data)
        }
    }
   
    let original_data=Object.values(Data)
    useEffect( () => {
       getData()
      },[]);

  return (
     <>
     <Navbar/>
     <Grid container sx={{width:"100%",display:"flex",flexDirection:"row"}}>
     <Grid item xs={1.5} sx={{ boxShadow: "2px 2px 2px grey", position:"relative",height:'100vh'}}>
     <Typography variant='h1' component='div' sx={{fontSize:"26px",display:"flex",justifyContent:"start",paddingLeft:2}}>
    <IconButton  edge='start' disableRipple sx={{padding:0 }}>
        <FormatListNumberedIcon sx={{ color:"black",fontSize:"40px"}} />
            </IconButton>
            <Typography variant='h1' component='div' sx={{fontSize:"26px",color:"black",paddingTop:1}}>
               NoteBooks
            </Typography>
           </Typography>
       
                <Typography sx={{overflow:"hidden",minHeight:"100px",
                '& .MuiTypography-root': {
                  fontSize:"22px",
               }}}>
                         <List>
                         {original_data && original_data.length && (
                                <>               
                           {original_data.map((item:any) => {
                      
                       return (
                        <>
                         <ListItem  divider disablePadding>
                          <ListItemButton disableRipple sx={{padding:"2px"}} onClick={() =>{RouteChange(item.note_name,item.note_id)}}>
                          <ListItemIcon sx={{minWidth:"21px"}}>
                            <LabelImportantIcon  sx={{color:"black"}}/>
                          </ListItemIcon>
                          <ListItemText primary={item.note_name}  sx={{color:"grey"}}/>
                          </ListItemButton>
                         </ListItem>
                       </> ) }
                         )}
      </>
    )}
          </List>
                </Typography>
        
        <Box className="typoid">
        <Typography variant='h5' component='div' 
        sx=
        {{fontSize:"20px",
        color:"purple",
        bottom:0,
        paddingRight:2
    }}> 
            <IconButton  edge='start'   disableRipple sx={{color:"purple",padding:0 }} onClick={handleChange}>
                <EditNoteIcon  sx={{fontSize:"40px"}} />
            </IconButton>
            NoteBook
        </Typography>
        </Box>
       
     </Grid>
     {openSectionpage && openSectionpage===true &&
          <Grid item xs={10.5}>
           <Sectionpage />
           </Grid>
     }
     </Grid>
     <Dialogs dialog={dialog} setDialog={setDialog} />
     </>
    
  )
}
