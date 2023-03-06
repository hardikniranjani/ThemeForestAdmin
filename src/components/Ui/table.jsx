import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";



function Table({ Title, columns, data, url }) {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3 className="card-title">{Title}</h3>
                      <Link to={`/item-detail/${url}/add`} type="button" className="btn btn-outline-success btn-fw mb-4">Add {Title}</Link>
                    </Box>
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
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
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
    </>
  )
}

export default Table