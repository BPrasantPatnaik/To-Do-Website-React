import React, { useContext, useState } from 'react';
import { TodoContext } from './Todocontext';

function ItemLists(props) {
  const { deleteItem, editItem, toggleItemChecked } = useContext(TodoContext);

  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(props.item.data);

  const handleDeleteClick = () => {
    console.log('Deleting item with Data:', props.item.data);
    deleteItem(props.item.id); // Pass the item ID to deleteItem
  };

  return (
    <>
      <div
        className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
          props.item.checked ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}
      >
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={props.item.checked}
          onChange={() => toggleItemChecked(props.item.id)}
        />
        <input
          type="text"
          className={`border outline-none w-full bg-transparent rounded-lg ${
            isTodoEditable ? "border-black/10 px-2" : "border-transparent"
          } ${props.item.checked ? "line-through" : ""}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
        {/* Edit, Save Button */}
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover-bg-gray-100 shrink-0 disabled:opacity-50"
          onClick={() => {
            if (props.item.checked) return;

            if (isTodoEditable) {
              editItem(props.item.id, { ...props.item, data: todoMsg });
              setIsTodoEditable(false);
            } else setIsTodoEditable(true);
          }}
          disabled={props.item.checked}
        >
          {isTodoEditable ? '📁' : '✏️'}
        </button>
        {/* Delete Todo Button */}
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover-bg-gray-100 shrink-0"
          onClick={handleDeleteClick} // Use the function to handle delete
        >
          ❌
        </button>
      </div>
    </>
  );
}

export default ItemLists;
