import{ useState } from 'react';
import{Typography,Box,IconButton}from '@mui/material';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';
import'./quill-style.css';
import {getPageID,getContentID} from './Local_service';
import {update_content,post_content} from './Services';
type editorprops={
    pageName:string;
    content:string;
    setContent:React.Dispatch<React.SetStateAction<string>>;
}
export const Editor = (props:editorprops) => {
    const[post,setPost]=useState<string>('');

    const contentSubmit=() =>{
        const page_id:number=getPageID("page_id")
        post_content(post,page_id)
        setPost('')
      }
    
      const updatecontentSubmit=() =>{
        console.log("updatecontent",props.content)
        const content_id:number=getContentID("content_id")
        console.log("updatecontent",content_id)
        update_content(content_id,props.content)
       
      }
      
    
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

    return (
        <Box>  
       
    {
       props.content.length===0 ?
        (
        <div>
            <ReactQuill  className="editor " 
            theme="snow"
             value={post}
            onChange={setPost}
            formats={formats}
            modules={modules} 
            />  
            <IconButton edge="end"  onClick={contentSubmit} disableRipple>
            <FileDownloadDoneIcon color="secondary" sx={{paddingRight:"4px",display:"flex",fontSize:"30px",top:"-816px"}}/>
            </IconButton>
        </div>
            
     ):( 
        <div>
        <ReactQuill  className="editor " 
        theme="snow"
         value={props.content}
        onChange={props.setContent}
        formats={formats}
        modules={modules} 
        />  
        <IconButton edge="end"  onClick={updatecontentSubmit} disableRipple>
        <FileDownloadDoneIcon color="secondary" sx={{paddingRight:"4px",display:"flex",fontSize:"30px",top:"-816px"}}/>
        </IconButton>
        </div>
     )
      } 
        </Box>  
    )
}

