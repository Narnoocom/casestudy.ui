import React from 'react';
import axios from 'axios';
import DataTable,{TableColumn} from 'react-data-table-component';

  interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
  }

  const defaultPosts:IPost[] = [];

  const Datatable = ({clickedData}) => {

        const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
        const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
        const [error, setError]: [string, (error: string) => void] = React.useState("");
        const columns: TableColumn<IPost>[] = [
            {
                name: 'Id',
                selector: row => row.id,
            },
            {
                name: 'userId',
                selector: row => row.userId,
                sortable: true,
            },
            {
                name: 'title',
                selector: row => row.title,
                sortable: true,
            },
            {
                name: 'body',
                selector: row => row.body,
            },
        ];

        React.useEffect(() => {
            axios
                .get<IPost[]>("https://jsonplaceholder.typicode.com/posts", {
                    headers: {
                      "Content-Type": "application/json"
                    },
                })
                .then(response => {
                    setPosts(response.data);
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
        }, []);
        
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