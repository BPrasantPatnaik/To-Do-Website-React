import { useState, useContext, createContext, useEffect } from 'react';
import { ToDo } from './components/Todocontext';
import { TodoProvider } from './components/Todocontext';
import Item from './components/Item';
import ItemLists from './components/ItemLists';

function App() {
  const [items, setItems] = useState([]); // Changed from a string to an array

  const addItem = (item) => {
    setItems([...items, item]); // Updated to properly add an item
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const editItem = (id, item) => {

    setItems((items) => items.map((Item) => (Item.id === id ? item : Item)))

  }

  const toggleItemChecked = (id) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  };

  useEffect(() => {
    const storedData = localStorage.getItem("itemsList");

    if (storedData) {
      try {
        const itemList = JSON.parse(storedData);

        if (Array.isArray(itemList)) {
          setItems(itemList);
        }
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("itemsList", JSON.stringify(items)); // Added JSON.stringify
  }, [items]);

  return (
    <TodoProvider value={{ items, addItem, deleteItem, editItem, toggleItemChecked }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <Item />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {items.map((element) => (
              <ItemLists key={element.id} item={element}/>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
