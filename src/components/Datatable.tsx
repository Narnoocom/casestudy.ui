import React from 'react';
import axios from 'axios';
import DataTable,{TableColumn} from 'react-data-table-component';
import Tablefilters from './Tablefilters';

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

  const Datatable = ({reload,clickedData}) => {

        const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
        const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
        const [error, setError]: [string, (error: string) => void] = React.useState("");
        const [reloadData, setReloadData]: [boolean, (loading: boolean) => void] = React.useState<boolean>(reload);
        const [searchTerm, setSearchTerm]: [string, (searchTerm: string) => void] = React.useState("");
        const [searchStart, setSearchStart]: [string, (searchTerm: string) => void] = React.useState("");


        const columns: TableColumn<IPost>[] = [
            {
                name: 'Staff',
                selector: row => row.last_name,
            },
            {
                name: 'Start Date',
                selector: row => row.start_date,
                sortable: true,
            },
            {
                name: 'End Date',
                selector: row => row.end_date,
                sortable: true,
            },
            {
                name: 'Leave Days',
                selector: row => row.leave_days,
            },
            {
                name: 'Type',
                selector: row => row.type,
            },
            {
                name: 'Reason',
                selector: row => row.reason,
            }
        ];

        React.useEffect(() => {
            if(reload){
                axios
                .get("http://localhost/api/v1/leave", {
                    headers: {
                      "x-api-key":'12345678',
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
        
        // Handle the row click
        const handleClick = (r:IPost) => {
            clickedData(r);
        };

        const filterNames = (e) => {
            if(e.length > 1){
                setSearchTerm(e);
            }else{
                setSearchTerm('');
            }
            
        }

        const filterStartDates = (e) => {
            if(e.length > 1){
                setSearchStart(e);
            }else{
                setSearchStart('');
            }
            
        }
        
        return (
            <div>
            <Tablefilters 
            filterName={filterNames}
            filterStartDate = {filterStartDates}
            />
            <DataTable
                columns={columns}
                //data={posts}
                data={posts.filter((item) => {
                    if (searchTerm === "" && searchStart === "" ) {
                      return item;
                    } else if (searchTerm && searchStart === "" ) {
                      item.last_name.toLowerCase().includes(searchTerm.toLowerCase());
                    } else if (searchStart) {
                        item.start_date.includes(searchStart)
                    } else {
                        return item;
                    }
                    
                  })}
                pagination
                responsive
                onRowClicked={handleClick}
                
            />
            </div>
          );

         


  };

  export default Datatable;