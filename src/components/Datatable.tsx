import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable,{TableColumn} from 'react-data-table-component';
import Tablefilters from './Tablefilters';
import format from 'date-fns/format';

  interface IPost {
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
        type_manager_id: number;
        leave_manager_id: number;

  }

  interface ErrorResponse {
    success: false;
    data: {
      message: string;
    };
  }

  const defaultPosts:IPost[] = [];

  export default function Datatable ({reload,clickedData}) {

    const [posts, setPosts] = useState<IPost[]>(defaultPosts);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchStart, setSearchStart] = useState<string>("");
    const [searchEnd, setSearchEnd] = useState<string>("");

        const customStyles = {
            rows: {
                style: {
                    cursor: 'pointer',
                },
            }
        }


        const columns: TableColumn<IPost>[] = [
            {
                name: 'First Name',
                maxWidth:'150px',
                selector: row => row.first_name,
            },
            {
                name: 'Last Name',
                maxWidth:'150px',
                selector: row => row.last_name,
            },
            {
                name: 'Start Date',
                maxWidth:'120px',
                selector: row => row.start_date,
                sortable: true,
            },
            {
                name: 'End Date',
                maxWidth:'120px',
                selector: row => row.end_date,
                sortable: true,
            },
            {
                name: 'Leave Days',
                maxWidth:'50px',
                center:true,
                selector: row => row.leave_days,
            },
            {
                name: 'Type',
                maxWidth:'150px',
                selector: row => row.type,
            },
            {
                name: 'Reason',
                wrap:true,
                minWidth:'300px',
                selector: row => row.reason,
            }
        ];

        useEffect(() => {
            if(reload){
                axios
                .get(import.meta.env.VITE_BACKEND_API+"v1/leave", {
                    headers: {
                      "x-api-key":import.meta.env.VITE_API_KEY,
                      "Content-Type": "application/json"
                    },
                })
                .then(response => {
                    setPosts(response.data.data);
                    setLoading(false);
                })
                .catch(ex => {
                    const error =
                    ex.response.status === 404
                        ? "Resource Not found"
                        : "An unexpected error has occurred";
                    setError(error);
                    setLoading(false);
                });
            }
        }, [reload]);
        
        /**
         * 
         * Handler to manage then a data table row is clicked
         * 
         * @param e Date
         */
        const handleClick = (r:IPost) => {
            clickedData(r);
        };

        /**
         * 
         * Basic function to set the name to filter results with
         * 
         * @param e string
         */
        const filterNames = (e:string) => {
            
            if(e.length > 1){
                setSearchTerm(e);
            }else{
                setSearchTerm('');
            }
            
        }

        /**
         * 
         * Basic function to set the start date to filter results with
         * 
         * @param e Date
         */
        const filterStartDates = (e:Date) => {
            if(e){
                setSearchStart( format(e,'yyyy-MM-dd') );
            }else{
                setSearchStart('');
            }
          
            
        }

        /**
         * 
         * Basic function to set the end date to filter results with
         * 
         * @param e Date
         */
        const filterEndDates = (e:Date) => {
            if(e){
                setSearchEnd( format(e,'yyyy-MM-dd') );
            }else{
                setSearchEnd('');
            }
            
        }
        
        return (
            <div className='border'>
            <Tablefilters 
            filterName={filterNames}
            filterStartDate = {filterStartDates}
            filterEndDate = {filterEndDates}
            />
            <DataTable
                columns={columns}
                data={posts.filter((item) => {
                    // This is ugly I would spend more time to bring the filter back into a function
                    // which would return the posts data.
                    if (searchTerm === "" && searchStart === "" && searchEnd === "" ) {
                      return item;
                    } else if (searchTerm && searchStart === "" && searchEnd === "" ) {
                        return item.last_name.toLowerCase().includes(searchTerm.toLowerCase());
                    } else if (searchStart) {
                        return item.start_date.includes(searchStart)
                    }else if (searchEnd) {
                        return item.end_date.includes(searchEnd)
                    } else {
                        return item;
                    }
                    
                  })}
                  
                pagination
                responsive
                onRowClicked={handleClick}
                customStyles={customStyles}
                
            />
            </div>
          );

         


  };