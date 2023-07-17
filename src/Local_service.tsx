

export const setNotebook=(key:string,value:string) =>{
    try{
        localStorage.setItem(key,JSON.stringify(value));
        return true;
    }
    catch{
        console.log("notebook is not added");
    }

}

export const getNotebook=(key:string) =>{
    try{
        const data:any = localStorage.getItem(key);
        const final_data = JSON.parse(data);
        return final_data;
    }
    catch{
      console.log("notebook is not present in given key");
    }
}

export const setSection=(key:string,value:number) =>{
    try{
        localStorage.setItem(key,JSON.stringify(value));
        return true;
    }
    catch{
        console.log("section is not added");
    }

}

export const getSection=(key:string) =>{
    try{
        const data:any = localStorage.getItem(key);
        const final_data = JSON.parse(data);
        return final_data;
    }
    catch{
      console.log("section is not present in given key");
    }
}

export const setSectionID=(key:string,value:number) =>{
    try{
        localStorage.setItem(key,JSON.stringify(value));
        return true;
    }
    catch{
        console.log("section id is not added");
    }

}

export const getSectionID=(key:string) =>{
    try{
        const data:any = localStorage.getItem(key);
        const final_data = JSON.parse(data);
        return final_data;
    }
    catch{
      console.log("section id is not present in given key");
    }
}

export const setContentID=(key:string,value:number) =>{
    try{
        localStorage.setItem(key,JSON.stringify(value));
        return true;
    }
    catch{
        console.log("content id is not added");
    }

}

export const getContentID=(key:string) =>{
    try{
        const data:any = localStorage.getItem(key);
        const final_data = JSON.parse(data);
        return final_data;
    }
    catch{
      console.log("content id is not present in given key");
    }
}

export const setPageID=(key:string,value:number) =>{
    try{
        localStorage.setItem(key,JSON.stringify(value));
        return true;
    }
    catch{
        console.log("Page id is not added");
    }

}

export const getPageID=(key:string) =>{
    try{
        const data:any = localStorage.getItem(key);
        const final_data = JSON.parse(data);
        return final_data;
    }
    catch{
      console.log("Page id is not present in given key");
    }
}

