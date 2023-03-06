import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import MaterialReactTable from 'material-react-table';
import ItemApi from "../../Services/items.services";
import EditIcon from '@mui/icons-material/Edit';


const MiUiTable = (props) => {
    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState(null);
    const [itemData, setItemData] = useState([]);

    const tutorialsRef = useRef();
    tutorialsRef.current = itemData;

    useEffect(() => {
        ItemApi.getAllItems().then(items => {
            setItemData(items.data.Result);
            console.log("items", items.data)
        })
    }, [])
    const columns = useMemo(
        () => [
            {
                Header: "Author",
                accessor: "author.username",
            },
            {
                Header: "Item Name",
                accessor: "title",
            },
            {
                Header: "Sale Price",
                accessor: "salePrice",
            },
            {
                Header: "Aproved Status",
                accessor: "isApproved",
                Cell: (props) => {
                    return props.value === 1 ? "Aproved" : "Pending";
                },
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <Link to={`/items/edit/${tutorialsRef.current[rowIdx]._id}`}>
                                <EditIcon />
                            </Link>
                        </div>
                    );
                },
            },
        ],
        []
    );

    return (
        <>
            {console.log("itemData",itemData.length)}
            Items not available
            {/* <MaterialReactTable columns={columns} data={itemData} /> */}
            {/* {itemData.lenght > 0 ?
                <MaterialReactTable columns={columns} data={itemData} />
                :
                <>
                    Items not available
                </>} */}
        </>);
};

export default MiUiTable;
