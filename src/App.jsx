import { useState } from 'react'
import './App.css'
import Datatable from './components/Datatable'
import Model from './components/Model'
import Drawer from './components/Drawer'

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [editRow, setEditRow] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const test = () => {
    setIsOpen(false);
  }

  const openDrawer = () => {
    setIsOpenDrawer(true);
  };

  const toggleDrawer = () => {
    setIsOpenDrawer(false);
  }

  const selectedRow = (r) => {
    setEditRow(r);
    console.info('31',r)
    openDrawer();
  }

  return (
    
      <div>
      <h1 className="text-3xl font-bold underline text-center">Leave Manager!</h1>
      <button 
      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
      onClick={openModal}>Open Model
      </button>
      <Model 
        show={isOpen}
        onToggleModel={test}
      />
      <Drawer 
        show={isOpenDrawer}
        data={editRow}
        onToggleDrawer={toggleDrawer}
      />
      <Datatable 
      clickedData = {selectedRow}
      />

      </div>
    
  )
}


export default App
