import React from 'react'
import { useState } from 'react'
import './App.css'
import Datatable from './components/Datatable'
import Model from './components/Model'
import Drawer from './components/Drawer'
import axios from 'axios';

interface StaffData {
  id: number;
  first_name: string;
  last_name: string;
}

interface LeaveTypesData {
  id: number;
  label: string;
}

const defaultStaff:StaffData[] = [];
const defaultSLeaveTypes:LeaveTypesData[] = [];

function App() {


  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [editRow, setEditRow] = useState('');
  const [error, setError]: [string, (error: string) => void] = React.useState("");
  const [staff, setStaff]: [StaffData[], (staff: StaffData[]) => void] = React.useState(defaultStaff);
  const [leaveTypes, setleaveTypes]: [LeaveTypesData[], (staff: LeaveTypesData[]) => void] = React.useState(defaultSLeaveTypes);
  const [dataReload, setdataReload] = useState(true);

  
  React.useEffect(() => {
    axios
        .get("http://localhost/api/v1/employees", {
            headers: {
              "x-api-key":'12345678',
              "Content-Type": "application/json"
            },
        })
        .then(response => {
            setStaff(response.data.data);
            
        })
        .catch(ex => {
            const error =
            ex.response.status === 404
                ? "Resource Not found"
                : "An unexpected error has occurred";
            setError(error);
        });

        axios
        .get("http://localhost/api/v1/leave-types", {
            headers: {
              "x-api-key":'12345678',
              "Content-Type": "application/json"
            },
        })
        .then(response => {
          setleaveTypes(response.data.data);
            
        })
        .catch(ex => {
            const error =
            ex.response.status === 404
                ? "Resource Not found"
                : "An unexpected error has occurred";
            setError(error);
        });
  }, []);

  const reloadTableData = () => {
    setdataReload(true);
  }

  const openModal = () => {
    setIsOpen(true);
    setdataReload(false);
  };

  const toggleModal = () => {
    setIsOpen(false);
  }

  const openDrawer = () => {
    setIsOpenDrawer(true);
    setdataReload(false);
  };

  const toggleDrawer = () => {
    setIsOpenDrawer(false);
    setEditRow('');
  }

  const selectedRow = (r) => {
    setEditRow(r);
    console.info('r',r)
    openDrawer();
  }

  return (
    
      <div>
      <h1 className="text-3xl font-bold underline text-center">Leave Manager!</h1>
      <button 
      className="mt-4 mb-7 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
      onClick={openModal}>Open Model
      </button>
      {isOpen === true &&
      <Model
        show={isOpen}
        staff={staff}
        leave={leaveTypes}
        onToggleModel={toggleModal}
        reloadTable={reloadTableData}
      />
      }
      {isOpenDrawer === true &&
      <Drawer
        show={isOpenDrawer}
        data={editRow}
        leave={leaveTypes}
        onToggleDrawer={toggleDrawer}
        reloadTable={reloadTableData}
      />
      }
      <Datatable 
      reload={dataReload}
      clickedData = {selectedRow}
      />

      </div>
    
  )
}


export default App
