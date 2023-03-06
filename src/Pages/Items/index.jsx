import React, { useEffect, useMemo, useState ,useRef } from 'react';
import { Link } from 'react-router-dom';
import ItemTable from '../../components/Items/ItemTable';
// import ItemTable from '../../components/Items/NewTable';
// import ItemTable from '../../components/Items/MiUiTable';
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import EditIcon from '@mui/icons-material/Edit';
import ItemApi from "../../Services/items.services";

function Items() {

  const [data, setData] = useState([]);
  const tutorialsRef = useRef();
  tutorialsRef.current = data;
  useEffect(() => {
    ItemApi.getAllItems().then(items => {
      setData(items.data.Result);
      console.log("items", items.data.Result)
    })
  }, [])
  const columns = useMemo(
    () => [
      // {
      //   Header: "Author",
      //   accessor: "author.username",
      // },
      {
        Header: "Item Name",
        accessor: "title",
      },
      {
        Header: "Sale Price",
        accessor: "salePrice",
      },
      // {
      //   Header: "Aproved Status",
      //   accessor: "isApproved",
      //   Cell: (props) => {
      //     return props.value === 1 ? "Aproved" : "Pending";
      //   },
      // },
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
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Items Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ ml: 3, mb: 3 }}>
                <ItemTable />
                {/* <ItemTable columns={columns} data={data} /> */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </>
  )
}

export default Items;


{/* <DataTable
 table={{ columns, rows }}
 isSorted={false}
 entriesPerPage={false}
 showTotalEntries={false}
 noEndBorder
/> */}