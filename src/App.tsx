import React, { useState, useEffect } from 'react';
import './App.css';
import Datatable from './components/Datatable';
import Model from './components/Model';
import Drawer from './components/Drawer';
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

interface RowItem {
  start_date: string;
  end_date: string;
  leave_days: number;
  reason: string;
  staff_member_id: number;
  first_name: string;
  last_name: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  leave_manager_id: number;
  type_manager_id: number;
}

const defaultStaff:StaffData[] = [];
const defaultSLeaveTypes:LeaveTypesData[] = [];

function App() {


  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [editRow, setEditRow] = useState<RowItem | null>(null);
  const [error, setError] = useState<string>("");
  const [staff, setStaff] = useState<StaffData[]>(defaultStaff);
  const [leaveTypes, setleaveTypes] = useState<LeaveTypesData[]>(defaultSLeaveTypes);
  const [dataReload, setdataReload] = useState<boolean>(true);

  
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_BACKEND_API+"v1/employees", {
            headers: {
              "x-api-key":import.meta.env.VITE_API_KEY,
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
        .get(import.meta.env.VITE_BACKEND_API+"v1/leave-types", {
            headers: {
              "x-api-key":import.meta.env.VITE_API_KEY,
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

  /**
   * Basic function to reload the table data on a change.
   */
  const reloadTableData = () => {
    setdataReload(true);
  }

  /**
   * Basic function to open the model.
   */
  const openModal = () => {
    setIsOpen(true);
    setdataReload(false);
  };

  /**
   * Basic function to toggle the model closed.
   * @comment - I could likely combine the openModal and toggleModal.
   */
  const toggleModal = () => {
    setIsOpen(false);
  }

   /**
   * Basic function to open the model.
   */
  const openDrawer = () => {
    setIsOpenDrawer(true);
    setdataReload(false);
  };

   /**
   * Basic function to toggle the drawer closed.
   * @comment - I could likely combine the openModal and toggleModal.
   */
  const toggleDrawer = () => {
    setIsOpenDrawer(false);
    setEditRow(null);
  }

  /**
   * Basic function to handle when a row is selected.
   */
  const selectedRow = (r:RowItem) => {
    setEditRow(r);
    openDrawer();
  }

  return (
    
      <div>
      <h1 className="text-3xl font-bold underline text-center">Leave Manager!</h1>
      <button 
      className="mt-4 mb-7 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
      onClick={openModal}>Record Leave
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
      {isOpenDrawer === true && editRow &&
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
