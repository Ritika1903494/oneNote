import axios from 'axios';

export const post_notebook=async(note_name:string) => {
    console.log("service",note_name)
    try{
       const response= await axios.post("http://localhost:8080/Main/CreateNotebook", {
           note_name
        }) 
        console.log("response",response)
            return response;
    }
    catch(error){
      console.log("error",error)
    }
  }

  export const get_notebooks=async()=>{
   
         try{
          console.log("asfdfgghhg")
          const response = await axios.get("http://localhost:8080/Main/GetNotebooks");
          console.log("data",response.data)
          console.log("status",response.status)
          return response;
         }
         catch(error){
          console.log("error",error)
         }
       
 
}

export const post_sections=async(section_name:string,note_id:any) => {
  console.log("service",section_name,note_id)
  try{
     const response= await axios.post("http://localhost:8080/Main/CreateSection", {
         section_name,note_id
      }) 
      console.log("response",response)
          return response;
  }
  catch(error){
    console.log("error",error)
  }
}


export const get_sections=async(note_id:number)=>{
   
  try{
   console.log("asfdfgghhg")
   const response = await axios.get(`http://localhost:8080/Main/GetSections/${note_id}`);
   console.log("data",response.data)
   console.log("status",response.status)
   return response;
  }
  catch(error){
   console.log("error",error)
  }


}

export const post_page=async(page_name:string,section_id:number) => {
  
  try{
     const response= await axios.post("http://localhost:8080/Main/CreatePage", {
         page_name,section_id
      }) 
      console.log("response",response)
          return response;
  }
  catch(error){
    console.log("error",error)
  }
}


export const get_pages=async(sec_id:number)=>{
  console.log("sec_id",sec_id)
   
  try{
   const response = await axios.get(`http://localhost:8080/Main/GetPages/${sec_id}`);
   console.log("data",response.data)
   console.log("status",response.status)
   return response;
  }
  catch(error){
   console.log("error",error)
  }

}

export const post_content=async(page_content:string,page_id:number) => {
  
  try{
     const response= await axios.post("http://localhost:8080/Main/CreateContent", {
      page_content,page_id
      }) 
      console.log("response",response)
          return response;
  }
  catch(error){
    console.log("error",error)
  }
}


export const get_content=async(page_id:number)=>{
  console.log("page_id",page_id)
   
  try{
   const response = await axios.get(`http://localhost:8080/Main/GetContent/${page_id}`);
   console.log("data",response.data)
   console.log("status",response.status)
   return response;
  }
  catch(error){
   console.log("error",error)
  }

}

export const update_content=async(content_id:number,page_content:string) => {
  console.log("page_content",page_content,content_id)  
  try{
      const response=await axios.post(`http://localhost:8080/Main/UpdateContent/${content_id}`, {
          page_content
      })
       return response;
  }
  catch(error){
 console.log("error",error)
  }
}

