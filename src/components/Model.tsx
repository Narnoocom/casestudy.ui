import React from 'react'
import { Fragment, useRef, useState } from 'react'
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, SubmitHandler } from "react-hook-form"

interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
  }

export default function Model({show,onToggleModel}) {

  //Sets the state of the model - set to false and we will set it ourselves
  const [open, setOpen] = useState(show);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  React.useEffect(() => {
    setOpen(show)
  }, [show]);

  const cancelButtonRef = useRef(null)

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


    interface formDataType {staffMember:string, reasonType: string, reason: string, startDate:Date, endDate:Date | null};
    const responseBody: formDataType = {staffMember: "", reasonType: "", reason: "", startDate: startDate, endDate:endDate}


    const { register,handleSubmit,formState: { errors } } = useForm<formDataType>();

    const onSubmit: SubmitHandler<formDataType> = (data) => {
      
      responseBody['staffMember'] = data.staffMember;
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
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onToggleModel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <div>
                  
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Record Leave 
                    </Dialog.Title>
                    <div className="mt-2">
                    <form 
                     onSubmit={handleSubmit(onSubmit)}
                    >

                    <div className="border-b border-gray-900/10 pb-12">
                        <p className="mt-1 text-sm leading-6 text-gray-600">Lodge a staff members leave.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="col-span-full">

                            <label htmlFor="staffMember" className="block text-sm font-medium leading-6 text-gray-900">
                             Staff Member
                            </label>
                            <div className="mt-2 ml-5">
                              <select
                                id="staffMember"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                {...register("staffMember", { required: true})}
                              >
                                <option></option>
                                <option value="1">United States</option>
                                <option value="2">Canada</option>
                                <option value="3">Mexico</option>
                              </select>
                              {errors.staffMember && <span className='text-sm text-gray-500'>This field is required</span>}
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label htmlFor="reasonType" className="block text-sm font-medium leading-6 text-gray-900">
                             Leave Type
                            </label>
                            <div className="mt-1 ml-5">
                              <select
                                id="reasonType"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                {...register("reasonType", { required: true})}
                              >
                                <option></option>
                                <option value="1">Sick</option>
                                <option value="2">Unhappy</option>
                                <option value="3">Whatever</option>
                              </select>
                              {errors.reasonType && <span className='text-sm text-gray-500'>This field is required</span>}
                            </div>
                          </div>
                        
                          <div className="col-span-full">
                            <label htmlFor="period" className="block text-sm font-medium leading-6 text-gray-900">
                              Period Requested
                            </label>
                            <div className="mt-2">
                            <DatePicker 
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                            onChange={onChange}/>
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                              Add the reason
                            </label>
                            <div className="mt-2">
                              <textarea
                                rows={3}
                                id="reason"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                                {...register("reason", { required: true})}
                              />
                            </div>
                            {errors.reason && <span className='text-sm text-gray-500'>This field is required</span>}
                          </div>

                          <div className="col-span-full">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                          >
                            Save
                          </button>
                          </div>
                         
                        </div>
                      </div>

                    </form>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => onToggleModel()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
