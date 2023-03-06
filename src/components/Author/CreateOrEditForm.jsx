import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import AuthorApi from '../../Services/admin.author.services';
import UserApi from '../../Services/user.services';
import { useNavigate } from 'react-router-dom';
// import Select from 'react-select';

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
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';

function CreateOrEditForm({ InisialData }) {
    let navigate = useNavigate();
    const [error, setError] = useState('');
    const [data, setData] = useState({
        image: '',
        name: '',
        gender: 'male',
        // email: '',
        password: '',
        username: '',
        user: '',
        status: true,
    })
    const [userData, setUserData] = useState([])
    useEffect(() => {
        if (InisialData) {
            setData({
                image: InisialData.imagePath,
                name: InisialData.name,
                gender: InisialData.gender,
                email: InisialData.email,
                password: InisialData.password,
                username: InisialData.username,
                user: InisialData.user,
                status: InisialData.status,
            })
        }

        UserApi.getAllUserWithoutPagination().then((users) => {
            console.log("users", users.data)
            setUserData(users.data)
        }).catch((err) => {
            console.log("user err", err)
        })
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
        console.log("user data", data)
        if (InisialData) {
            await AuthorApi.editAuthor({ data: data, id: InisialData.id }).then((res) => {
                console.log("User Data", res);
                alert("updated succefully!")
            }).catch((err) => {
                console.log(err)
                setError(err.response.data.message)
            })
        } else {
            await AuthorApi.createAuthor(data).then((res) => {
                console.log("User Data", res);
                alert("added succefully!")
                navigate('/authors')
            }).catch((err) => {
                console.log("err", err.response.data.message)
                setError(err.response.data.message)
            })
        }
    }

    if (InisialData) {
        if (data.status == false) {
            var AuthorStatus = 'Active';
            var AuthorHeaderStatus = 'Inactive';
        } else {
            var AuthorStatus = 'Inactive';
            var AuthorHeaderStatus = 'Active';
        }
    }
    const HandleUpdateUser = async () => {
        const authorStatus = {
            isActive: !data.status
        }

        await AuthorApi.editAuthor({ data: authorStatus, id: InisialData.id }).then((response) => {
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
    //         await AuthorApi.deleteAuthor(InisialData.id).then((res) => {
    //             navigate('/users')
    //         }).catch((err) => {
    //             console.log("err", err)
    //             navigate('/users')
    //         })
    //     }
    // }
    const [userArr, setuserArry] = useState([{ value: "", lable: "", id: "" }]);


    useEffect(() => {
        userData.map((user, i) => {
            console.log(`user${i}`, { value: user.name, lable: user.name, id: user._id })
            setuserArry({ value: user.name, lable: user.name, id: user._id })
        })
    }, [])

    if (InisialData) {
        var AuthorTitle = 'Update Author';
    } else {
        var AuthorTitle = 'Create Author';
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
                                    <h4 className="card-title">{AuthorTitle}</h4>
                                    <p className="card-description" style={{ color: 'red' }}> {error && error} </p>
                                </div>
                                <div>
                                    {InisialData && <div className="top-0 start-0">
                                        {AuthorHeaderStatus == 'Inactive' ?
                                            <p className="card-description" style={{ color: 'red' }}> This author is {AuthorHeaderStatus} </p>
                                            :
                                            <p className="card-description" style={{ color: 'green' }}> This author is {AuthorHeaderStatus} </p>
                                        }</div>
                                    }
                                </div>
                            </MDTypography>
                        </MDBox>

                        <Card sx={{ mt: 3, p: 3 }}>
                            <form className="forms-sample" onSubmit={(e) => HandleSubmit(e)} >
                                <MDBox>
                                    <MDInput label="Name" size="large" name="name" value={data.name} onChange={(e) => HandleChange(e)} required sx={{ ml: 3 }} />
                                    <MDInput label="username" type="text" className="form-control" id="exampleInputEmail3" name="username" value={data.username} onChange={(e) => HandleChange(e)} required sx={{ ml: 3 }} />
                                    <MDInput label="Password" type="password" className="form-control" id="exampleInputPassword4" name="password" value={data.password} onChange={(e) => HandleChange(e)} placeholder="Password" required sx={{ ml: 3 }} />
                                </MDBox>
                                <MDBox sx={{ mt: 3, pl: 3 }}>
                                    <FormControl>
                                        <div>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Gender {InisialData && `: ${data.gender}`} </FormLabel>
                                            {/* {InisialData && <FormControlLabel value={data.gender} control={<Radio />} label={data.gender} />} */}
                                        </div>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            onChange={(e) => HandleChange(e)}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </FormControl>
                                </MDBox>
                                <MDBox sx={{ mt: 1, pl: 3 }}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ mr: 2 }}>Users</FormLabel>
                                    <select className="form-control" placeholder="select" id="exampleSelectGender" name="user" onChange={(e) => HandleChange(e)} >
                                        {/* <option >Select User</option> */}
                                        {InisialData ?
                                            <option>{data.user.name} </option>
                                            :
                                            <>
                                                <option>Select User</option>
                                                {userData.map((user, i) => (
                                                    <option key={i} value={user._id}>{user.name}</option>
                                                ))}

                                            </>
                                        }
                                    </select>
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
                                                    <MDButton variant="gradient" color="error" size="medium" onClick={() => HandleUpdateUser()}>Inactive this Author</MDButton>
                                                    :
                                                    <MDButton variant="gradient" color="success" size="medium" onClick={() => HandleUpdateUser()}>Active this Author</MDButton>

                                                }
                                                {/* <button type="submit" className="btn btn-gradient-primary mr-2" onClick={() => HandleUpdateUser()}>{UserStatus} this User</button> */}
                                                {/* <button className="btn btn-light" onClick={() => HandleDeleteUser()}>Delete User</button> */}
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