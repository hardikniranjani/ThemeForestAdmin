import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemApi from '../../Services/items.services';
import BaseUrl from '../../Services/baseUrl';
import DetailsFields from './DetailsFields.jsx';
import ActionForm from './ActionForm';
import { Form } from 'react-bootstrap';
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDButton from "../MDButton";
import MDInput from "../MDInput";


function ViewItem() {
    const { id } = useParams();
    const [authorData, setAuthorData] = useState({});
    const [userData, setUserData] = useState({});
    const [itemData, setItemData] = useState({});
    const [itemDetailsData, setItemDetailsData] = useState({});
    const [compatibleWithData, setCompatibleWithData] = useState([]);
    const [compatible_BrowsersData, setCompatible_BrowsersData] = useState([]);
    const [files_IncludedData, setFiles_IncludedData] = useState([]);
    const [software_VersionData, setSoftware_VersionData] = useState([]);
    const [tagsData, setTagsData] = useState([]);

    useEffect(() => {
        ItemData();
    }, [])

    const ItemData = async () => {
        const res = await ItemApi.getAnItem(id)
        console.log("ItemData", res.data)
        setItemData(res.data);
        setAuthorData(res.data.author)
        setUserData(res.data.author.user)
        setItemDetailsData(res.data.itemDetails)
        setCompatibleWithData(res.data.itemDetails.CompatibleWith)
        setCompatible_BrowsersData(res.data.itemDetails.Compatible_Browsers)
        setFiles_IncludedData(res.data.itemDetails.Files_Included)
        setSoftware_VersionData(res.data.itemDetails.Software_Version)
        setTagsData(res.data.itemDetails.Tags)
    }

    const baseUrl = BaseUrl();
    // ${BaseUrl}/${item.imagePath[0]}
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
                                    {/* <h4 className="card-title">Item</h4> */}
                                    <h4 className="card-title">{itemData.title}</h4>
                                    {/* <p className="card-description" style={{ color: 'red' }}> {error && error} </p> */}
                                </div>
                            </MDTypography>
                        </MDBox>
                    </Grid>

                    {/* Left side  */}
                    <Grid item xs={8}>
                        <Card sx={{ p: 2 }}>
                            <img className="card-img-top" src={`${baseUrl}/${itemData.imagePath}`} alt={itemData.title}></img>
                        </Card>
                        <Card sx={{ mt: 3, p: 2 }}>
                            <h4 className="text-primary">Discription</h4>
                            <div className="overflow-auto" dangerouslySetInnerHTML={{ __html: itemData.discription }} />
                        </Card>
                    </Grid>


                    {/* Right Side */}
                    <Grid item xs={4}>
                        <Card sx={{ p: 2 }}>
                            <h4 className="text-primary">Portfolio </h4>
                            {/* <h4 className="card-title">Author</h4> */}
                            <img className="card-img-top"
                                style={{ width: "5rem", border: "1px solid gray", borderRadius: "50%" }}
                                src={`${baseUrl}/${authorData.imagePath}`} alt={authorData.name}>
                            </img>
                            <p className="d-flex m-0">Author Name:<h4 className="ms-2 card-title">{authorData.name}</h4></p>
                            <p className="d-flex m-0">UserName: <h5 className="ms-2 card-title">{authorData.username}</h5></p>
                        </Card>
                        <Card sx={{ mt: 3, p: 2 }}>
                            <h4 className="text-primary">Item Details</h4>
                            <p className="col">
                                <span className="d-flex">Documented:<h6 className="ms-2 card-title">{itemDetailsData.IsDocumentation ? "Yes" : "No"}</h6></span>
                                <span className="d-flex">Gutenberg Optimized:<h6 className="ms-2 card-title">{itemDetailsData.Is_Gutenberg_Optimized ? "Yes" : "No"}</h6></span>
                                <span className="d-flex">High Resolution:<h6 className="ms-2 card-title">{itemDetailsData.Is_High_Resolution ? "Yes" : "No"}</h6></span>
                                <span className="d-flex">Widget Ready:<h6 className="ms-2 card-title">{itemDetailsData.Is_Widget_Ready ? "Yes" : "No"}</h6></span>
                                <span className="d-flex">Layout:<h6 className="ms-2 card-title">{itemDetailsData.Layout}</h6></span>
                            </p>
                        </Card>
                        <Card sx={{ mt: 3, p: 2 }}>
                            <DetailsFields fieldName="Compatible Plugins" data={compatibleWithData} />
                        </Card>
                        <Card sx={{ mt: 3, p: 2 }}>
                            <DetailsFields fieldName="Compatible Browsers" data={compatible_BrowsersData} />
                        </Card>
                        <Card sx={{ mt: 3, p: 2 }}>
                            <DetailsFields fieldName="Files Included" data={files_IncludedData} />
                        </Card>
                        <Card sx={{ mt: 3, p: 2 }}>
                            <DetailsFields fieldName="Software Version" data={software_VersionData} />
                        </Card>
                        <Card sx={{ mt: 3, p: 2 }}>
                            <DetailsFields fieldName="Tags" data={tagsData} />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card sx={{ mt: 3, p: 2 }}>
                            <h2 className="text-primary">Action</h2>
                            <div className="col-sm-4">
                                <div className="form-check">
                                    <label sx={{ p: 2 }}>
                                        <input type="radio" name="ExampleRadio4" id="membershipRadios1" sx={{ mr: 2 }} /> Approve
                                        <input type="radio" name="ExampleRadio4" id="membershipRadios2" defaultChecked sx={{ ml: 2 }} /> Reject
                                    </label>
                                </div>
                            </div>
                            <label htmlFor="exampleTextarea1">Remark</label>
                            {/* <textarea className="form-control" id="exampleTextarea1" rows="4"></textarea> */}
                            <MDInput label="Type here..." multiline rows={5} />
                            <MDBox sx={{display: 'flex', mt:1}}>
                                <MDButton type="button" variant="gradient" color="success" sx={{mr:1}}>Submit</MDButton>
                                <MDButton type="button" variant="gradient" color="error">Cancle</MDButton>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </>
    )
}

export default ViewItem