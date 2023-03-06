import React from 'react';
import UserTable from '../../components/User/UserTable';
import {Link} from 'react-router-dom';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
// Data
// import authorsTableData from "../../layouts/tables/data/authorsTableData";
// import projectsTableData from "../../layouts/tables/data/projectsTableData";

// import DataTable from "../../examples/Tables/DataTable";
// import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";

function Authors() {

  // const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();

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
                  <MDTypography variant="h6" color="white" sx={{ display: 'flex', justifyContent: 'space-between' }}>                   
                    Users Table
                    <Link to='/users/adduser'><MDButton variant="gradient" color="secondary">Add User</MDButton></Link>
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} sx={{ml:3, mb:3}}>
                  <UserTable />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
    </>
  )
}

export default Authors;


{/* <DataTable
 table={{ columns, rows }}
 isSorted={false}
 entriesPerPage={false}
 showTotalEntries={false}
 noEndBorder
/> */}