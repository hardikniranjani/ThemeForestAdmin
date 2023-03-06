import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import UserApi from '../../Services/user.services';
import { useNavigate } from 'react-router-dom'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDButton from "../MDButton";

// import MDDropzone from "../MDDropzone";
import MDInput from "../MDInput";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



function CreateOrEditForm({ InisialData }) {
    {InisialData && console.log("InisialData",InisialData)}
    let navigate = useNavigate();
    const [error, setError] = useState('');
    const [data, setData] = useState({
        image: "",
        name: "",
        gender: "male",
        email: "",
        password: "",
        status: true,

    })
    useEffect(() => {
        if (InisialData) {
            setData({
                image: InisialData.imagePath,
                name: InisialData.name,
                gender: InisialData.gender,
                email: InisialData.email,
                password: InisialData.password,
                status: InisialData.status,
            })
        }
    }, [InisialData])

    const HandleChange = (e) => {
        if (e.target.name === 'image') {
            setData({
                ...data,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();

        if (InisialData) {
            await UserApi.editUser({ data: data, id: InisialData.id }).then((res) => {
                alert("Updated succefully!")
            }).catch((err) => {
                console.log(err)
                setError(err.response.data.Message)
            })
        } else {
            await UserApi.createUser(data).then((res) => {
                alert("added succefully!");
                navigate('/users')
            }).catch((err) => {
                console.log(err)
                setError(err.response.data.Message)
            })
        }
    }
    if (InisialData) {
        if (data.status == false) {
            var UserStatus = 'Active';
            var UserHeaderStatus = 'Inactive';
        } else {
            var UserStatus = 'Inactive';
            var UserHeaderStatus = 'Active';
        }
    }
    const HandleUpdateUser = async () => {
        const userStatus = {
            isActive: !data.status
        }
        await UserApi.editUser({ data: userStatus, id: InisialData.id }).then((response) => {
            alert("Update user status: " + response.data.isActive)
            // console.log("response update user status", response)
            window.location.reload()

        }).catch((err) => {
            console.log("err", err)
        })
    }

    // const HandleDeleteUser = async () => {
    //     const confirmBox = window.confirm(
    //         "Are you sure you want to delete this user?"
    //     )
    //     if (confirmBox === true) {
    //         await UserApi.deleteUser(InisialData.id).then((res) => {
    //             navigate('/users')
    //         }).catch((err) => {
    //             console.log("err", err)
    //             navigate('/users')
    //         })
    //     }
    // }

    if (InisialData) {
        var UserTitle = 'Update User';
    } else {
        var UserTitle = 'Create User';
    }
    return (
        <>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
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
                                <div>
                                    <h4 className="card-title">{UserTitle}</h4>
                                    <p className="card-description" style={{ color: 'red' }}> {error && error} </p>
                                </div>
                                <div>
                                    {InisialData && <div className="top-0 start-0">
                                        {UserHeaderStatus == 'Inactive' ?
                                            <p className="card-description" style={{ color: 'red' }}> This user is {UserHeaderStatus} </p>
                                            :
                                            <p className="card-description" style={{ color: 'green' }}> This user is {UserHeaderStatus} </p>
                                        }</div>
                                    }
                                </div>
                            </MDTypography>
                        </MDBox>

                        <Card sx={{ mt: 3, p: 3 }}>
                            <form className="forms-sample" onSubmit={(e) => HandleSubmit(e)} >
                                <MDBox>
                                    <MDInput label="Name" size="large" name="name" value={data.name} onChange={(e) => HandleChange(e)} required sx={{ ml: 3 }} />
                                    <MDInput label="email" type="email" className="form-control" id="exampleInputEmail3" name="email" value={data.email} onChange={(e) => HandleChange(e)} required sx={{ ml: 3 }} />
                                    <MDInput label="Password" type="password" className="form-control" id="exampleInputPassword4" name="password" value={data.password} onChange={(e) => HandleChange(e)} placeholder="Password" required sx={{ ml: 3 }} />
                                </MDBox>
                                <MDBox sx={{ mt: 3, pl: 3 }}>
                                    <FormControl>
                                        <div>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Gender {InisialData && `: ${data.gender}`} </FormLabel>
                                        </div>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            onChange={(e) => HandleChange(e)}
                                            id="exampleSelectGender"
                                            name="gender"
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </FormControl>
                                </MDBox>
                                <MDBox sx={{ mt: 1, pl: 3, mb: 2 }}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ mr: 2 }}>Profile Upload</FormLabel>
                                    <Form.Control type="file" name="image" onChange={(e) => HandleChange(e)} className="form-control visibility-hidden" id="customFileLang" lang="es" />
                                </MDBox>

                                <MDButton variant="gradient" color="success" size="medium" type="submit" sx={{ mr: 1, mt: 1 }}>Submit</MDButton>
                                <MDButton variant="gradient" color="error" size="medium" sx={{ mt: 1 }}>Cancel</MDButton>
                            </form>
                        </Card>
                        {InisialData && <Card sx={{ mt: 3, p: 3 }}>
                            <>
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title mb-4">Action</h4>
                                            <div className="d-flex justify-content-between">
                                                {InisialData.status ?
                                                    <MDButton variant="gradient" color="error" size="medium" onClick={() => HandleUpdateUser()}>Inactive this User</MDButton>
                                                    :
                                                    <MDButton variant="gradient" color="success" size="medium" onClick={() => HandleUpdateUser()}>Active this User</MDButton>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </Card>}
                    </Grid>
                </Grid>
            </MDBox>

        </>
    )
}

export default CreateOrEditForm