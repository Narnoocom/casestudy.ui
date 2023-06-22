import React from 'react';
import { useState } from 'react'

export default function Tablefilters({filterName, filterStartDate}) {

    const [lastName, setLastName]: [string, (lastName: string) => void] = React.useState("");
    const [startDate, setStartDate]: [string, (startDate: string) => void] = React.useState("");
    const [endDate, setEndDate]: [string, (endDate: string) => void] = React.useState("");

    const onNameChange = (d) => {
        setLastName(d.target.value);
        filterName(lastName)
    };

    const onStartDateChange = (d) => {
        setStartDate(d.target.value);
        filterStartDate(startDate)
    };
    

return (
    <div>
        <div className="border-b border-gray-900/10 pb-12">
           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-2 sm:col-start-1">
              
              <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Search Last Name:</span>
                <input
                    onChange={ evt => onNameChange(evt)}
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Search Start Date:</span>
                <input
                    onChange={ evt => onStartDateChange(evt)}
                    type="text"
                    name="startDate"
                    id="startDate"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              
              <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Search End Date:</span>
                <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
)

}