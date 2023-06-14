import React from 'react';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, SubmitHandler } from "react-hook-form"



export default function Drawer({show,data,onToggleDrawer}) {

  const [open, setOpen] = useState(true);
  const [rowData, setData] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  interface RowItem {
    id: number;
    userId: number;
    title: string;
    body: string;
  }

  React.useEffect(() => {
    setOpen(show)
    setData(data)
  }, [show,data]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  interface formDataType {staffMember:string, reasonType: string, reason: string, startDate:Date, endDate:Date | null};
  const responseBody: formDataType = {staffMember: "", reasonType: "", reason: "", startDate: startDate, endDate:endDate};

  const { register,handleSubmit,formState: { errors } } = useForm<formDataType>();

  const onSubmit: SubmitHandler<formDataType> = (data) => {
    
    responseBody['reasonType'] = data.reasonType;
    responseBody['reason'] = data.reason;
    responseBody['startDate'] = startDate;
    responseBody['endDate'] = endDate;
    
    //Form submission happens here
    axios.post('https://jsonplaceholder.typicode.com/users', { responseBody })
    .then(res=>{
      console.log(res);
      console.log(res.data);
      
    })
  
  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <form 
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              Edit Leave
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Edit staff members leave.
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => onToggleDrawer()}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="reasonType"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Leave Reason
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                          <select
                                id="reasonType"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                {...register("reasonType", { required: true})}
                              >
                                <option value="1">Sick</option>
                                <option value="2">Unhappy</option>
                                <option value="3">Whatever</option>
                              </select>
                              {errors.reasonType && <span className='text-sm text-gray-500'>This field is required</span>}
                          </div>
                        </div>
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="period"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Leave Period
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <DatePicker 
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                            onChange={onChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <div>
                            <label
                              htmlFor="reason"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Reason for leave update
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                              <textarea
                                rows={3}
                                id="reason"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                                {...register("reason", { required: true, maxLength: 50 })}
                              />
                              {errors.reason && <span className='text-sm text-gray-500'>This field is required</span>}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => onToggleDrawer()}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Update leave
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
