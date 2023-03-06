import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import MaterialReactTable from 'material-react-table';
import { grey } from '@mui/material/colors';
import { Avatar, Box, Typography } from '@mui/material';
import ItemApi from "../../Services/items.services";
import EditIcon from '@mui/icons-material/Edit';

import { DataGrid, gridClasses } from "@mui/x-data-grid";

const NewTable = ({ columns, data }) => {
    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState(null);
    //data and fetching state
    // const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    const tutorialsRef = useRef();
    tutorialsRef.current = data;

    //table state
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    //if you want to avoid useEffect, look at the React Query example instead
    // useEffect(() => {
    //     ItemApi.getAllItems().then(items => {
    //         setData(items.data.Result);
    //         console.log("items", items.data)
    //     })
    //     const fetchData = async () => {
    //         if (!data.length) {
    //             setIsLoading(true);
    //         } else {
    //             setIsRefetching(true);
    //         }

    //         const url = new URL(
    //             '/api/data',
    //             process.env.NODE_ENV === 'production'
    //                 ? 'https://www.material-react-table.com'
    //                 : 'http://localhost:3000',
    //         );
    //         url.searchParams.set(
    //             'start',
    //             `${pagination.pageIndex * pagination.pageSize}`,
    //         );
    //         url.searchParams.set('size', `${pagination.pageSize}`);
    //         url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
    //         url.searchParams.set('globalFilter', globalFilter ?? '');
    //         url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

    //         // try {
    //         //     const response = await fetch(url.href);
    //         //     const json = await response.json();
    //         //     setData(json.data);
    //         //     setRowCount(json.meta.totalRowCount);
    //         // } catch (error) {
    //         //     setIsError(true);
    //         //     console.error(error);
    //         //     return;
    //         // }
    //         setIsError(false);
    //         setIsLoading(false);
    //         setIsRefetching(false);
    //     };
    //     fetchData();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [
    //     columnFilters,
    //     globalFilter,
    //     pagination.pageIndex,
    //     pagination.pageSize,
    //     sorting,
    // ]);


    return (
        <div className="table-responsive">
            <Box
                sx={{
                    height: 400,
                    width: '100%',
                }}
            >
                <DataGrid
                    checkboxSelection
                    columns={columns}
                    rows={data}
                    getRowId={(row) => row._id}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    getRowSpacing={(params) => ({
                        top: params.isFirstVisible ? 0 : 5,
                        bottom: params.isLastVisible ? 0 : 5,
                    })}
                    sx={{
                        [`& .${gridClasses.row}`]: {
                            bgcolor: (theme) =>
                                theme.palette.mode === 'light' ? grey[200] : grey[900],
                        },
                    }}
                    onCellEditCommit={(params) => setRowId(params.id)}
                />
            </Box>
        </div>
    );
};

export default NewTable;
