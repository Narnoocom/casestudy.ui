import React, { useState, ChangeEvent } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TablefiltersProps {
  filterName: (lastName: string) => void;
  filterStartDate: (sDate: Date) => void;
  filterEndDate: (eDate: Date) => void;
}


export default function Tablefilters({filterName, filterStartDate, filterEndDate}:TablefiltersProps) {

  const [lastName, setLastName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

    /**
     * 
     * Manage the user typing in a name
     * 
     * @param event HTMLInputElement
     */
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setLastName(value);
        filterName(value)
    };

    /**
     * 
     * Manage the start date change and send back to the Datatable component
     * @param sDate Date
     */
    const onStartDateChange = (sDate: Date) => {
      setStartDate(sDate);
      filterStartDate(sDate);
    };

    /**
     * 
     * Manage the end date change and send back to the Datatable component
     * @param eDate Date
     */
    const onEndDateChange = (eDate: Date) => {
      setEndDate(eDate);
      filterEndDate(eDate);
    };
    

return (
    <div className='bg-indigo-700 p-3 mb-7'>
        <div className="border-b border-gray-900/10 pb-12">
           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-2 sm:col-start-1">
              
              <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-100 sm:text-sm">Search Last Name:</span>
                <input
                    onChange={ evt => onNameChange(evt)}
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-100 sm:text-sm">Search Start Date:</span>
                <DatePicker 
                  selected={startDate}
                  dateFormat="yyyy-MM-dd"
                  onChange={onStartDateChange}/>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              
              <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-100 sm:text-sm">Search End Date:</span>
                <DatePicker 
                  selected={endDate}
                  dateFormat="yyyy-MM-dd"
                  onChange={onEndDateChange}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
)

}