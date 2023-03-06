import React, { Component, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
// import ItemDetailApi from '../../Services/item.details.services';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../Services/baseUrl';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

import MDButton from "../../components/MDButton";
import MDInput from "../../components/MDInput";


function ItemDetailsForm({ InitialDate, FormTitle, FieldTitle, URL, API_Title, API_URL }) {
    let navigate = useNavigate();
    let baseUrl = BaseUrl();
    const Field_Title = FieldTitle || 'Name';
    const Main_Title = FormTitle || 'Form';

    const AddURL = `${baseUrl}/${API_URL}`;

    if (InitialDate) {
        var EditURL = `${baseUrl}/${API_URL}/edit/${InitialDate.id}`;
        var RemoveURL = `${baseUrl}/${API_URL}/remove/${InitialDate.id}`;
        var ActiveURL = `${baseUrl}/${API_URL}/active/${InitialDate.id}`;
    }

    console.log("InitialDate", InitialDate)

    const [data, setData] = useState({
        name: '',
        status: ''
    })
    const [status, setStatus] = useState({
        isActive: true
    })
    const [error, setError] = useState('');

    useEffect(() => {
        if (InitialDate) {
            setData({
                name: InitialDate.name,
                status: InitialDate.status
            })
        }
    }, [InitialDate])

    const HandleChange = (e) => {
        setData({
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        if (InitialDate) {
            await axios.put(`${EditURL}`, data).then((res) => {
                console.log("User Data", res);
                alert("updated succefully!")
                // navigate(`/item-detail/${URL}`)
            }).catch((err) => {
                console.log(err)
                setError(err.response.data.Message)
            })
        } else {
            await axios.post(`${AddURL}`, data).then((res) => {
                console.log("User Data", res);
                alert("added succefully!")
                navigate(`/item-detail/${URL}`)
            }).catch((err) => {
                console.log(err)
                setError(err.response.data.Message)
            })
        }
    }
    const HandleRemoveUpdate = async () => {
        if (InitialDate.status) {
            const confirmBox = window.confirm(
                `Are you sure you want to Inactive this ${API_Title}?`
            )
            if (confirmBox === true) {
                await axios.put(`${RemoveURL}`).then(() => {
                    alert("Inactive succefully!")
                    window.location.reload(true)
                }).catch((err) => {
                    console.log("err", err)
                    alert("Please, try again")
                })
            }
        } else {
            const confirmBox = window.confirm(
                `Are you sure you want to Active this ${API_Title}?`
            )
            if (confirmBox === true) {
                await axios.put(`${ActiveURL}`, status).then(() => {
                    alert("Active succefully!")
                    window.location.reload(true)
                }).catch((err) => {
                    console.log("err", err)
                    alert("Please, try again")
                })
            }
        }

    }

    // const HandleDelete = async () => {
    //     const confirmBox = window.confirm(
    //         `Are you sure you want to delete this ${FormTitle}?`
    //     )
    //     if (confirmBox === true) {
    //         await axios.delete(`${DeleteURL}`).then(() => {
    //             navigate.push(`/item-detail/${URL}`)
    //         }).catch((err) => {
    //             console.log("err", err)
    //             navigate.push(`/item-detail/${URL}`)
    //         })
    //     }
    // }

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
                                    <MDBox sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h4 className="card-title">{Main_Title}</h4>
                                        {InitialDate ?
                                            <>
                                                {InitialDate.status ?
                                                    <>
                                                        <p className="card-description text-success"> This {API_Title} is Active </p>
                                                    </>
                                                    :
                                                    <>
                                                        <p className="card-description text-danger"> This {API_Title} is currently Inactive</p>
                                                    </>
                                                }
                                            </>
                                            :
                                            <></>}
                                    </MDBox>
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3} sx={{ ml: 3, mb: 2, mt: 1 }}>
                                <form className="forms-sample"  >
                                    <Form.Group >
                                        <label htmlFor="exampleInputName1" >Name</label>
                                        <MDInput sx={{ ml: 2 }} label={`${Field_Title}`} type="text" className="form-control" name="name" onChange={(e) => HandleChange(e)} value={data.name} />
                                        {/* <Form.Control type="text" className="form-control" name="name" onChange={(e) => HandleChange(e)} value={data.name} placeholder={`${Field_Title}`} /> */}
                                    </Form.Group>
                                    <>
                                        {InitialDate ?
                                            <MDButton variant="gradient" color="info" size="medium" type="submit" onClick={(e) => HandleSubmit(e)} sx={{ m: 1 }} >Edit</MDButton>
                                            :
                                            <MDButton variant="gradient" color="info" size="medium" type="submit" onClick={(e) => HandleSubmit(e)} sx={{ m: 1 }} >Add</MDButton>
                                        }
                                        <MDButton variant="gradient" color="info" size="medium" onClick={() => window.location.reload()} sx={{ m: 1 }} >Cancel</MDButton>
                                    </>
                                </form>
                            </MDBox>

                        </Card>
                        <Card sx={{ mt: 3 }}>
                            {InitialDate && <MDBox pt={3} sx={{ p: 3 }}>
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <MDTypography variant="h4">Action</MDTypography>
                                            <div className="d-flex justify-content-between" >
                                                <MDBox sx={{ mt: 1 }}>
                                                {InitialDate.status ?
                                                    <MDButton variant="gradient" color="info" size="medium" type="button" onClick={() => HandleRemoveUpdate()} className="btn btn-outline-danger btn-fw">Inactive {API_Title}</MDButton>
                                                    :
                                                    <MDButton variant="gradient" color="info" size="medium" type="button" onClick={() => HandleRemoveUpdate()} className="btn btn-outline-success btn-fw">Active {API_Title}</MDButton>

                                                }
                                                </MDBox>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </MDBox>}
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </>
    )
}

export default ItemDetailsForm