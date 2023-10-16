import {useContext,createContext} from "react"

export const TodoContext=createContext(
    {
       items:[
        {
            id:Date.now(),
            checked:false,
            data:""
        }
       ],
       addItem:(Items)=>{},
       deleteItem:(id)=>{},
       editItem:(id,Items)=>{},
       toggleItemChecked:(id)=>{}
    }
    
    )

export const ToDo=()=>{
    return useContext(TodoContext)
}

export const TodoProvider=TodoContext.Provider