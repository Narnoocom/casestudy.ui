import React from 'react';
import axios from 'axios';
import DataTable,{TableColumn} from 'react-data-table-component';

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

  }

  interface ErrorResponse {
    success: false;
    data: {
      message: string;
    };
  }

  const defaultPosts:IPost[] = [];

  const Datatable = ({rows, clickedData}) => {

        const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(rows);
        const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
        const [error, setError]: [string, (error: string) => void] = React.useState("");
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
        }, [rows]);
        
        // Handle the row click
        const handleClick = (r:IPost) => {
            clickedData(r);
        };
        
        return (
            <DataTable
                columns={columns}
                data={posts}
                pagination
                responsive
                onRowClicked={handleClick}
            />
          );

         


  };

  export default Datatable;