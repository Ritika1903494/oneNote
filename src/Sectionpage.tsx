import React from 'react'
import{Grid,Typography,Box,Popover,IconButton,Button,TextField,Menu,MenuItem,List,ListItem,ListItemButton,ListItemText}from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import{useState,useEffect} from 'react';
import { getContentID, getNotebook,getPageID,getSection,getSectionID,setContentID,setNotebook, setPageID, setSection, setSectionID} from './Local_service';
import { get_notebooks,get_sections,post_sections,get_pages,post_page, get_content, update_content,post_content} from './Services';
import'./style.css';
import DoneIcon from '@mui/icons-material/Done';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import'./quill-style.css';
type data={
  note_name:string;
}

type section={
  section_name:string;
}

type page ={
  page_name:string;
}


export const Sectionpage = () => {
    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const[Data,setData]=useState<data|string>("");
    const[display,setDisplay]=useState<Boolean>(false);
    const[openTitle,setTitle]=useState<Boolean>(false);
    const[openMenu,setMenu]=useState<Boolean>(false);
    const[openContent,setContentPage]=useState<Boolean>(false);
    const[pop1,setPop1]=useState<boolean>(false);
    const[pop2,setPop2]=useState<boolean>(false);
    const[pass,setValues]=useState<string>("") 
    const[content,setContent]=useState<string>("") 
    const[pageName,setPagename]=useState<string>("") 
    const[postcontent,postContent]=useState<string>("") 
    const[pagetitle,setPagetitle]=useState<string>("") 
    const[menuSection,setMenuSection]=useState<string>("") 
    const[Sections,setSections]=useState<section|string>("");
    const[openPage,setOpenPage]=useState<Boolean>(false);
    const[Pages,setPages]=useState<page|string>("");
    const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
    const open1 = Boolean(anchorEl1);
    const modules={
      toolbar:[
         [{header:[1,2,3,4,5,6,false]}],
         [{font:[]}],
         [{size:[]}],
         ["bold","italic","underline","strike","blockquote"],
         [{list:"ordered"},
         {list:"bullet"},
         {indent:"-1"},
         {indent:"+1"}
        ],
        [{color: ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff",
         "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", 
         "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", 
         "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", 
        "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ["link","image","video"],
      ]
     }
 
     const formats = [
         "header", "height", "bold", "italic",
         "underline", "strike", "blockquote",
         "list",  "bullet", "indent","color",
         "link", "image","video" 
       ];
    const handleClick2= (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl1(event.currentTarget);
      };
      const handleClose2 = () => {
        setAnchorEl1(null);
      };

      const handleClosepop1=()=>{
        setPop1(false)
      }
      const handleClosepop2=()=>{
        setPop2(false)
      }

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChange = (note_name:string,note_id:number) =>{
      setAnchorEl(null);
      setNotebook("note_name",note_name)
      setSection("note_id",note_id)
      const notebook_id:number=getSection('note_id');
      getSections(notebook_id)
    }

    const handleClick1=() =>{
      setDisplay(true)  
    }
    const notebook_name:string=getNotebook('note_name')

    const getData=async()=>{
      let response:any = await get_notebooks();
      console.log("response",response.data)
      if(response.status===200) {
          console.log("status",response.status)
        setData(response.data)
      }
  }

  const getSections=async(note_id:number) =>{
    let response:any=await get_sections(note_id)
    console.log("response",response.data)
      if(response.status===200) {
          console.log("status",response.status)
        setSections(response.data)
      }
  }

  const getPages=async(section_id:number)=>{
    console.log("section_id in page",section_id)
    let response:any=await get_pages(section_id)
    console.log("response",response.data)
      if(response.status===200) {
          console.log("status",response.status)
          setPages(response.data)
      }
  }

  const getContent=async(page_id:number)=>{
    let response:any=await get_content(page_id)
    console.log("response",response.data)
      if(response.status===200) {
          console.log("status",response.status)
          if(response.data.length===0){
            setContent("")
            setContentPage(true)
          }
          else{
            setContent(response.data[0].page_content)
            setContentID("content_id",response.data[0].content_id)
            setContentPage(true)
          }
      }
  }


  const handlePageContent=(page_id:number,page_name:string)=>{
     setPageID("page_id",page_id)
      getContent(page_id)
      setPagename(page_name)
  }
  const handleMenu =(section_name:string,section_id:number) =>{
      setMenu(true)
      setMenuSection(section_name)
      setSectionID("section_id",section_id)
      const sec_id:number=getSectionID('section_id')
      getPages(sec_id)
      setOpenPage(true)
  }
   
  const handleChange1=(section_name:string,section_id:number) =>{
    setMenuSection(section_name)
    setSectionID("section_id",section_id)
    const sec_id:number=getSectionID('section_id')
    getPages(sec_id)
    setAnchorEl1(null);
  }
  const handlePage=()=>{
    setTitle(true)
  }

  const handleSubmit=() =>{
    console.log("pass",pass)
    const id:number=getSection('note_id');
    post_sections(pass,id)
    setValues('')
    setDisplay(false)
    setPop1(true)
  }

  
  const handlePageSubmit=() =>{
    console.log("pagetitle",pagetitle)
    const section_id:number=getSectionID("section_id");
    post_page(pagetitle,section_id)
    setPagetitle('')
    setTitle(false)
    setPop2(true)
  }
  const contentSubmit=() =>{
  
    console.log("postcontent",postcontent)
    const page_id:number=getPageID("page_id")
    post_content(postcontent,page_id)
    postContent('')
  }

  const updatecontentSubmit=() =>{
    console.log("updatecontent",content)
    const content_id:number=getContentID("content_id")
    console.log("updatecontent",content_id)
    update_content(content_id,content)
   
  }
  

    useEffect(() => {
      const notebook_id:number=getSection('note_id');
      getSections(notebook_id)
      const sec_id:number=getSectionID('section_id')
      getPages(sec_id)
      getData()
    },[]);

    let original_data=Object.values(Data)
    let original_section=Object.values(Sections)
    let original_page=Object.values(Pages)
    
  return (
    <>          
<Grid container rowSpacing={1} sx={{marginTop:0}}>

<Grid item xs={2} sx={{ fontSize:40,height:'100vh',
boxShadow: "2px 2px 2px grey",
position:"relative",
justifyContent: "flex-start",
display:"flex",
flexDirection:"column",
paddingTop:0}}>
<Button      
             sx={{fontSize:21,
             padding:0,
             justifyContent:"flex-start",
             marginRight:"20px",
             marginLeft:"4px",
             '& .MuiButton-endIcon': {
              marginLeft:0
           }}}
             color='inherit'
             id="basic-button"
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}
             endIcon={ <KeyboardArrowDownIcon />}
             disableRipple>{notebook_name}</Button>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
                vertical:'bottom',
                horizontal:'right'
            }}
            transformOrigin={{
                vertical:'top',
                horizontal:'right'
            }}
           >
              {original_data && original_data.length && (
                              <div>           
                           {original_data.map((item:any) => {
                             return (
                              <MenuItem onClick={()=>{handleChange(item.note_name,item.note_id)}}>{item.note_name}</MenuItem>
                        ) }
                         )}
      </div>   
    )}
       </Menu>

       {original_section && original_section.length!=0 &&
            <Typography sx={{overflow:"hidden",minHeight:"10px",width:"auto",
            '& .MuiTypography-root': {
              fontSize:"22px",
           }}}  variant="h1">
                     <List sx={{padding:0}}>
                       {original_section.map((item:any) => {
                   return (
                    <>
                     <ListItem  divider disablePadding>
                      <ListItemButton disableRipple sx={{padding:"4px"}} onClick={()=>{handleMenu(item.section_name,item.section_id)}}>
                      <ListItemText  primary={item.section_name} sx={{marginBottom:0,color:"grey"}} />
                      </ListItemButton>
                     </ListItem>
                   </> ) }
                     )}
      </List>
            </Typography>
       }
       
 {
  display && display===true &&
   (
    <form onSubmit={handleSubmit} className="form">
    <TextField
  className='textsection'
  label="Section Title"
  variant="filled"
  color="secondary"
  sx={{width:"400px"}}
  value={pass}
  onChange={(e) =>{setValues(e.target.value)}}
/>
   </form> 
   )
 }

<Box className="typoid">
<Typography variant='h5' component='div' 
sx=
{{fontSize:"20px",
color:"purple",
bottom:0,
paddingRight:2
}}> 
    <IconButton  edge='start'   disableRipple sx={{color:"purple",padding:0 }} onClick={handleClick1}>
        < AddIcon  sx={{fontSize:"35px"}} />
    </IconButton>
    Section
</Typography>
</Box>   
{pop1 && pop1===true &&
  <Popover
    open={pop1}
    onClose={handleClosepop1}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
  >
    <Typography variant="h3"  sx={{padding:"10px",fontSize:"22px",width:"250px",color:"white",
     height:"42px",bgcolor:"#2EFF2E"}} >
        Created Section
      <IconButton  edge='end' disableRipple sx={{padding:0 }}>
          <DoneIcon sx={{ color:"white",fontSize:"30px"}} />
              </IconButton>
      </Typography>
  </Popover>
}
</Grid>
{
  openPage && openPage===true &&
  (
    <Grid item  xs={2} sx={{fontSize:30,boxShadow: "2px 2px 0px grey",position:"relative",
    height:'100vh',
    padding:0,
    paddingTop:0,
    }}>
      {openMenu && openMenu===true &&
      (
        <div>
        <Button      
        sx={{fontSize:21,
        padding:0,
        width:"204px",
        marginLeft:"4px",
         justifyContent:"flex-start",
         display:"flex",
        '& .MuiButton-endIcon': {
         marginLeft:0,
      }}}
        color='inherit'
        id="basic-button"
        aria-controls={open1 ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        onClick={handleClick2}
        endIcon={ <KeyboardArrowDownIcon />}
        disableRipple>{menuSection}</Button>
       <Menu
       id="basic-menu"
       anchorEl={anchorEl1}
       open={open1}
       onClose={handleClose2}
       MenuListProps={{
       'aria-labelledby': 'basic-button',
       }}
       anchorOrigin={{
           vertical:'bottom',
           horizontal:'right'
       }}
       transformOrigin={{
           vertical:'top',
           horizontal:'right'
       }} >
         {original_section && original_section.length && (
                       <div>       
                      {original_section.map((item:any) => {
                        return (
                         <MenuItem onClick={()=>{handleChange1(item.section_name,item.section_id)}}>{item.section_name}</MenuItem>
                   ) }
                    )}
                      </div>  
    )}
    </Menu>
    {original_page && original_page.length!=0 &&
                <Typography sx={{overflow:"hidden",minHeight:"10px",width:"auto",
                '& .MuiTypography-root': {
                  fontSize:"22px",
               }}}>
                         <List sx={{padding:0}}>
                           {original_page.map((item:any) => {
                       return (
                        <>
                         <ListItem  divider disablePadding>
                          <ListItemButton disableRipple sx={{padding:"4px"}} onClick={()=>{handlePageContent(item.page_id,item.page_name)}}>
                          <ListItemText primary={item.page_name} sx={{marginBottom:0,color:"grey"}} />
                          </ListItemButton>
                         </ListItem>
                       </> ) }
                         )}
          </List>
                </Typography>
           }
    </div>
    
      )
      }
      
    {
      openTitle && openTitle===true &&
      (
        <form onSubmit={handlePageSubmit} className="form">
        <TextField
      className='textsection'
      label="Page Title"
      variant="filled"
      color="secondary"
      value={pagetitle}
      sx={{width:"300px"}}
        onChange={(e) =>{setPagetitle(e.target.value)}}
    />
       </form> 
      )
    }
    <Box className="typoid">
    <Typography variant='h5' component='div' 
    sx=
    {{fontSize:"20px",
    color:"purple",
    bottom:0,
    paddingRight:2
    }}> 
        <IconButton  edge='start'   disableRipple sx={{color:"purple",padding:0 }} onClick={handlePage}>
            < AddIcon  sx={{fontSize:"35px"}} />
        </IconButton>
        Page
    </Typography>
    </Box> 
    {pop2 && pop2===true &&
      <Popover
        open={pop2}
        onClose={handleClosepop2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography variant="h3"  sx={{padding:"10px",fontSize:"22px",width:"250px",color:"white",
         height:"42px",bgcolor:"#2EFF2E"}} >
            Created Page
          <IconButton  edge='end' disableRipple sx={{padding:0 }}>
              <DoneIcon sx={{ color:"white",fontSize:"30px"}} />
                  </IconButton>
          </Typography>
      </Popover>
    } 
    </Grid>
  )
}

<Grid item xs={8} sx={{fontSize:40,height:'100vh'}}>
  { openContent && openContent===true &&
  ( 
    <div>
      {
       content.length===0 ?
        (
        <div>
            <ReactQuill  className="editor " 
            theme="snow"
             value={postcontent}
            onChange={postContent}
            formats={formats}
            modules={modules} 
            />  
            <IconButton edge="end"  onClick={contentSubmit} disableRipple>
            <FileDownloadDoneIcon color="secondary" className="editbut"/>
            </IconButton>
        </div>
            
     ):( 
        <div>
        <ReactQuill  className="editor " 
        theme="snow"
         value={content}
        onChange={setContent}
        formats={formats}
        modules={modules} 
        />  
        <IconButton edge="end"  onClick={updatecontentSubmit} disableRipple>
        <FileDownloadDoneIcon color="secondary" sx={{paddingRight:"4px",display:"flex",fontSize:"30px",top:"-816px"}}/>
        </IconButton>
        </div>
     )
      } 
    </div>    
  ) 
  }
  
{/* {/* {
   openContent && openContent===true &&
   (
    < Box className="box">

     <Typography variant='h1' component='div' 
    sx={{fontSize:"40px",display:"flex",justifyContent:"flex-start"}}>
              {pageName}
        </Typography>      
      {
        content.length===0?
        (
      <form  style={{"width":"700px",height:"auto"}}> 
    <TextField
      className='textfield'
      variant="standard"
      color="secondary"
      type="string"
      label="Page Content"
      fullWidth
      multiline
      sx={{
        marginTop:5,
        paddingTop:"10px",
        fontSize:"25px",
        '& .MuiInput-input ':{
          height:"32px",
          fontSize:"25px",
          color:"grey"
        }
      }}
      value={postcontent}
      onChange={(e) =>{postContent(e.target.value)}}
      InputProps={{
        endAdornment:
        <InputAdornment position="end">
          <IconButton
           onClick={(e:any) =>{contentSubmit(e)}}
            edge="end"
            disableRipple
          >
          <FileDownloadDoneIcon color="secondary" sx={{paddingRight:"4px",fontSize:"30px"}}/>
          </IconButton>
        </InputAdornment>
      }}
    />
    </form>
     ):(
       <form  style={{"width":"700px",height:"auto"}}> 
    <TextField
      className='textfield'
      variant="standard"
      color="secondary"
      type="string"
      label="Page Content"
      fullWidth
      multiline
      sx={{
        marginTop:5,
        paddingTop:"10px",
        fontSize:"25px",
        '& .MuiInput-input ':{
          height:"32px",
          fontSize:"25px",
          color:"grey"
        }
      }}
      value={content}
      onChange={(e) =>{setContent(e.target.value)}}
      InputProps={{
        endAdornment:
        <InputAdornment position="end">
          <IconButton
           onClick={(e:any) =>{updatecontentSubmit(e)}}
            edge="end"
            disableRipple
          >
          <FileDownloadDoneIcon color="secondary" sx={{paddingRight:"4px",fontSize:"30px"}}/>
          </IconButton>
        </InputAdornment>
      }}
    />
    </form>
     )
      } */}
    
    {/* <Typography variant='h1' component='div' 
    sx={{fontSize:"20px",marginTop:1,color:"black",display:"flex"}}>
      {currDate}    {currTime}
        </Typography> 
    </Box>
   )
} */} 

</Grid>
</Grid>     
    </>
  )
}
