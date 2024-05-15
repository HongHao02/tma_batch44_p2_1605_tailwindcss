import axios from "axios"

const httpRequest= axios.create({
    baseURL: "https://dummyjson.com",
})

export const get: any = async (path: string, option?: any)=>{
    const response= await httpRequest.get(path, option);
    return response.data;
}

export const getTodosRandom: any= async (limit: number, skip: number)=>{
    try{
        const response= await get('/todos', {
            params: {
                limit: limit,
                skip: skip,
            }
        })
        console.log('response from utils ', response.todos);
        return response.todos;
    }catch(e){
        return e;
    }
}