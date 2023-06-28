import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, XCircleIcon } from '@heroicons/react/24/outline';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, SubmitHandler } from "react-hook-form"
import Period from './Period';

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

interface DrawerProps {
  show: boolean;
  data: RowItem;
  leave: Array<any>;
  onToggleDrawer: () => void;
  reloadTable: () => void;
}

interface FormDataType {
  reasonType: string;
  reason: string;
  startDate: Date;
  endDate: Date | null;
  leaveManagerId: number;
}

export default function Drawer({show,data,leave,onToggleDrawer,reloadTable}:DrawerProps) {


  /**
   * Probably need to spend a few more minutes cleaning out these useStates.
   * Some are legacy from testing the form submit process
   */
  const [open, setOpen] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date>(new Date(data.start_date));
  const [endDate, setEndDate] = useState<Date>(new Date(data.end_date));
  const [reasonComment, setReason] = useState<string>(data.reason);
  const [reasonType, setType] = useState<string>(data.type);
  const [reasonTypeId, setReasonTypeId] = useState<number>(data.type_manager_id);
  const [leaveManagerId, setLeaveManagerId] = useState<number>(data.leave_manager_id);
  const [error, setError] = useState<string>("");
  

  useEffect(() => {
    setOpen(show);
  }, [show]);
 
  const onChange = (dates: Array<Date>) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const closeDrawer = () => {
    onToggleDrawer();
  };

  const { register, handleSubmit, formState: { errors } } = useForm<FormDataType>();

  const headers = {
    "x-api-key":import.meta.env.VITE_API_KEY,
    "Content-Type": "application/json"
  };

  /**
   * Form submit handler.
   */
  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    
    const responseBody: FormDataType = {
      reasonType: data.reasonType,
      reason: data.reason,
      startDate: startDate,
      endDate: endDate,
      leaveManagerId: leaveManagerId
    };
    
    /**
     * Put request to update the database record.
     */
    axios.put(import.meta.env.VITE_BACKEND_API+'v1/leave', responseBody, { 
      headers: headers 
    })
    .then(res=>{
      processResponse(res);
    })
    .catch(ex => {
      const error =
      ex.response.status === 404
          ? "Resource Not found"
          : "An unexpected error has occurred";
      setError(error);
  });
  
  }

  /**
   * A basic function to process the response from the API and look for any errors
   */
  const processResponse = (response: any) => {

    if(!response.data.success){
      setError(response.data.error)
    }else{
      reloadTable();
      onToggleDrawer();
    } 

  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onToggleDrawer}>
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
                      
                      <div className="bg-gray-200 px-4 py-6 sm:px-6">
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
                              onClick={() => closeDrawer()}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                      {error &&
                        <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">{error}</h3>
                            </div>
                          </div>
                        </div>
                        }
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
                                {...register("reasonType")}
                                defaultValue={reasonTypeId}
                              >
                                {leave.map((e, key) => {
                                    return <option key={key} value={e.id}>{e.label}</option>;
                                })}
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
                            <Period 
                            start={startDate}
                            end={endDate}
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
                                placeholder={reasonComment}
                                {...register("reason", { maxLength: 50 })}
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
                          onClick={() => closeDrawer()}
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
