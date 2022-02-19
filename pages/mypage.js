import Head from 'next/head'
import Image from 'next/image'

import { useEffect, useState } from 'react';
import { SWRConfig } from "swr";
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';

const fetcher = async (url) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };

export default function Home(props) {
    const [data, setData] = useState("");

    // const GridRowsProp = [
    //     { id: 1, col1: 'Hello', col2: 'World' },
    //     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    //     { id: 3, col1: 'MUI', col2: 'is Amazing' },
    //   ];
      
    //useSWR('https://api.flipsidecrypto.com/api/v2/queries/1d3eb78f-f38c-45dd-85f3-7c81dca56138/data/latest', fetcher)
    
    useEffect(() => {
        axios.get('/api/getMagicEdenSales').then( res => {
            //console.log(res)
            setData(res);
        }).catch(err => {
            console.log(err);
        })
    },[])

    if (data === "") return <div>Loading...</div>

    const gridColDef = [
        { field: 'DAY_DATE', headerName: 'Column 1', width: 450 },
        { field: 'PROJECT_NAME', headerName: 'Column 2', width: 150 },
      ];

    return (<div style={{ height: 800, width: '100%' }}>hello world
    <DataGrid getRowId={(row) => row.DAY_DATE + row.PROJECT_NAME} rows={data.data} columns={gridColDef}></DataGrid>
     </div>
    );
}
