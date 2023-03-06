import React, { useState } from 'react';
import AdminApi from '../../Services/admin.services';

// import { Form } from 'react-bootstrap';
// import { Offline, Online } from "react-detect-offline";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";
// import Switch from "@mui/material/Switch";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDInput from "../MDInput";
import MDButton from "../MDButton";

// Authentication layout components
import BasicLayout from "../../layouts/authentication/components/BasicLayout";

// Images
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg";


function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [AdminData, setAdminData] = useState({
    name: '',
    email: ''
  })

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const LoginData = {
      email: email,
      password: password
    }
    await AdminApi.adminLogin(LoginData).then((res) => {

      setAdminData({
        name: res.data.UserData.name,
        email: res.data.UserData.email
      })
      const Admin = {
        name: res.data.UserData.name,
        email: res.data.UserData.email
      }
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('TokenData', JSON.stringify(Admin));
      window.location.reload(false);
    }).catch((err) => {
      const ErrorMessage = err.response;
      if (ErrorMessage) {
        setError(ErrorMessage.data.message);
      } else {
        setError("Please Connect to internet");
      }
    })
  }
  return (
    <>
      {!loading ?
        <BasicLayout image={bgImage}>
          <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                  >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                      Hello Admin!
                    </MDTypography>
                    {error && <MDTypography variant="h4" fontWeight="medium" color="red" mt={1}>
                      {error}
                    </MDTypography>}
                  </MDBox>
                  <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form" onSubmit={(e) => handleSubmit(e)}>
                      <MDBox mb={2}>
                        <MDInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" fullWidth />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" fullWidth />
                      </MDBox>
                      <MDBox mt={4} mb={1}>
                        <MDButton variant="gradient" color="info" type="submit" fullWidth>
                          sign in
                        </MDButton>
                      </MDBox>
                    </MDBox>
                    {/* <Form className="pt-3" onSubmit={(e) => handleSubmit(e)}>
                      <Form.Group className="d-flex search-field">
                        <Form.Control type="email" placeholder="Email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} className="h-auto" />
                      </Form.Group>
                      <Form.Group className="d-flex search-field">
                        <Form.Control type="password" placeholder="Password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} className="h-auto" />
                      </Form.Group>
                      <div className="mt-3">
                        <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                      </div>
                    </Form> */}
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </BasicLayout>
        :
        <>Loading please wait...</>}
    </>
  )
}


export default LoginComponent
