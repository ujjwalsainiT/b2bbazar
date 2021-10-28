import React, { useState, useEffect } from 'react'
import { Grid, Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./Subscription.css";

//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import Loder from '../../../Loder/Loder';
import { blankValidator } from "../../../utils/Validation";

function Subscription(props) {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [profile, setprofile] = useState("");
    const [SubscriptionDataArr, setSubscriptionDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editname, setEditname] = useState("");
    const [Editdescription, setEditdescription] = useState("")
    const [EditSubscriptionId, setEditSubscriptionId] = useState("")
    const [Editprofile, setEditprofile] = useState("")
    const [EditProfileName, setEditProfileName] = useState("")
    const [isUpdated, setisUpdated] = useState(false)
    const [isloading, setisloading] = useState(false)

    //errors
    const [nameError, setnameError] = useState(false);
    const [descriptionError, setdescriptionError] = useState(false);
    const [profileError, setprofileError] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);

        //to get data of subscription
        const getsubscriptiondata = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "getSubscriptionDetails";
                axios
                    .get(url)
                    .then(
                        (res) => {
                            console.log("get data", res)
                            setSubscriptionDataArr(res.data.data)
                            setisloading(false)
                        },
                        (error) => {
                            setisloading(false)
                            console.log("Error", error)
                        }
                    )
            } catch (error) {
                setisloading(false)
                console.log("Error", error)
            }
        }
        getsubscriptiondata();
    }, [isUpdated])


    const OpenEditDailog = (data) => {
        setEditname(data.name);
        setEditdescription(data.description);
        setEditSubscriptionId(data._id)
        setEditProfileName(data.profile)
        setEditDailogOpen(!EditDailogOpen)
    }


    //to add new subscription
    const AddSubscriptionData = () => {
        try {
            if (!blankValidator(name)) {
                setnameError(true)
                return;
            }
            if (!blankValidator(description)) {
                setdescriptionError(true)
                return;
            }
            if (!blankValidator(profile)) {
                setprofileError(true)
                return;
            }

            setisloading(true)

            let url = getBaseUrl() + "addSubscription";
            const fd = new FormData();
            fd.append('name', name)
            fd.append('description', description)
            fd.append('myField', profile, profile.name)
            axios
                .post(url, fd)
                .then(
                    (res) => {
                        console.log("response daata:::", res)
                        setaddMangeopen(!addMangeopen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setname("");
                        setdescription("");
                        setprofile("")
                    },
                    (error) => {
                        setisloading(false)
                        console.log("Error", error)
                    }
                )
        } catch (error) {
            setisloading(false)
            console.log("Error", error)
        }
    };

    //to delete the subscription

    const DeleteSubcription = (data) => {
        //subscription id
        let id = data._id
        try {
            setisloading(true)
            let url = getBaseUrl() + `deleteSubscription/${id}`;
            axios
                .get(url)
                .then(
                    (res) => {
                        console.log("get data", res)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                    },
                    (error) => {
                        setisloading(false)
                        console.log("Error", error)
                    }
                )
        } catch (error) {
            setisloading(false)
            console.log("Error", error)
        }
    }


    //To Update the data of subscripion

    const updateSubscriptiondata = (ID) => {
        //subscription id
        let id = ID
        try {
            setisloading(true)
            let url = getBaseUrl() + `updateSubscription/${id}`;
            const fd = new FormData();
            fd.append('name', Editname)
            fd.append('description', Editdescription)
            fd.append('myField', Editprofile, Editprofile.name)
            axios
                .post(url, fd)
                .then(
                    (res) => {
                        console.log("response daata:::", res)
                        setEditDailogOpen(!EditDailogOpen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setEditname("");
                        setEditdescription("");
                        setEditprofile("")
                    },
                    (error) => {
                        console.log("Error", error)
                        setisloading(false)
                    }
                )
        } catch (error) {
            console.log("Error", error)
            setisloading(false)
        }
    }

    return (
        <>
            <div className="content_padding">

                <div className="mb-3 page_heading">Manage Subscription</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    <div className="card_admissiondetails_height">
                        <div className="textfiled_margin">
                            {!addMangeopen ? (
                                <div className="d-flex">
                                    <span className="icon_color">
                                        <i className="fa fa-plus-circle"></i>
                                    </span>
                                    <span className="mt-1 ml-2 addmanageuserfont hover_cursor" onClick={() => setaddMangeopen(!addMangeopen)}>
                                        <strong> Add New Subscription</strong>
                                    </span>
                                </div>
                            ) : (
                                <Expand open={addMangeopen}>
                                    <Card className=" mb-2 Card_shadow">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <div className="card_content_instition">
                                                    <div className="text-right">
                                                        <span className="icon_color hover_cursor">
                                                            <i className="fa fa-times cursor" onClick={() => setaddMangeopen(!addMangeopen)}></i>
                                                        </span>
                                                    </div>
                                                    <div className="text_filed_heading">
                                                        Subscription Name
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter the Subscription Name"
                                                            autoComplete="off"
                                                            value={name}
                                                            onChange={(e) => {
                                                                setnameError(false)
                                                                setname(e.target.value)
                                                            }}
                                                        />
                                                        {nameError && (
                                                            <span className="text-danger">Enter the Name</span>
                                                        )}
                                                    </div>

                                                    <div className="text_filed_heading">
                                                        Description
                                                    </div>
                                                    <div className=" mt-1">
                                                        <textarea
                                                            className="form-control"
                                                            rows="3"
                                                            value={description}
                                                            onChange={(e) => {
                                                                setdescriptionError(false)
                                                                setdescription(e.target.value)
                                                            }}
                                                        ></textarea>
                                                        {descriptionError && (
                                                            <span className="text-danger">Enter the Description</span>
                                                        )}
                                                    </div>

                                                    <div className="text_filed_heading">
                                                        Subscription Image
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            onChange={(e) => {
                                                                setprofileError(false)
                                                                setprofile(e.target.files[0])
                                                            }}
                                                        />
                                                        {profileError && (
                                                            <span className="text-danger">Select the Picture</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={AddSubscriptionData}
                                                    >
                                                        Create
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Expand>
                            )}
                        </div>
                    </div>

                    <div className="card_admissiondetails_height mt-4">
                        <div className="textfiled_margin cardheight_overflow">
                            {/* <div className="d-flex justify-content-between">
                                <div className=" mt-1 mb-1">
                                    <strong> Subsciption Name</strong>
                                </div>

                                <div className=" mt-1 mb-1">
                                    <strong> Month</strong>
                                </div>

                                {" "}
                                <div className="p-2">
                                    <strong> Action</strong>
                                </div>

                            </div> */}
                            <hr />
                            {SubscriptionDataArr.length > 0 ?
                                (SubscriptionDataArr.map((item, index) => (
                                    <Card className="Card_shadow mb-2 mt-2">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <Grid className="Component_main_grid mt-2">
                                                    <Grid item md={1}>

                                                        <div className=" p-2">
                                                            <img src={`https://secure-plains-62142.herokuapp.com/public/images/${item.profile}`} alt="" style={{ width: "60px", height: "40px" }} />
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={3}>

                                                        <div className=" p-2">
                                                            {item.name}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <div className="p-2">
                                                            {item.description}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <div className="d-flex p-2">

                                                            <span className="action_icon mr-2 ml-1">
                                                                <i
                                                                    className="fa fa-pencil"
                                                                    onClick={() => OpenEditDailog(item)}
                                                                ></i>
                                                            </span>
                                                            <span className="action_icon ml-2">
                                                                <i
                                                                    className="fa fa-trash "
                                                                    onClick={() =>
                                                                        DeleteSubcription(item)
                                                                    }
                                                                ></i>
                                                            </span>
                                                            <span className="action_icon  ml-2" onClick={() => props.history.push("/subscription-point", {
                                                                item
                                                            })}>
                                                                Manage Points
                                                            </span>

                                                            <span className="action_icon  ml-2" onClick={() => props.history.push("/subscription-month", {
                                                                item
                                                            })}>
                                                                Manage Months
                                                            </span>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    </Card>
                                )))
                                : (
                                    <span>No Data</span>
                                )}
                        </div>
                    </div>
                </Card>
            </div>

            <Dialog
                open={EditDailogOpen}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth="fullWidth"
            >
                <DialogTitle>
                    Edit Subscription
                    <span
                        className="float-right icon_color"

                    >
                        <i className="fa fa-times hover_cursor" onClick={() => setEditDailogOpen(!EditDailogOpen)}></i>{" "}
                    </span>
                </DialogTitle>
                <DialogContent>
                    <div className="text_filed_heading">
                        Subscription Name
                    </div>
                    <div className=" mt-1">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter the Subscription Name"
                            autoComplete="off"
                            value={Editname}
                            onChange={(e) => {
                                setEditname(e.target.value);
                            }}
                        />
                    </div>

                    <div className="text_filed_heading">
                        Description
                    </div>
                    <div className=" mt-1">
                        <textarea
                            className="form-control"
                            rows="3"
                            value={Editdescription}
                            onChange={(e) => {
                                setEditdescription(e.target.value)
                            }}
                        ></textarea>
                    </div>

                    <div className="text_filed_heading">
                        Subscription Image
                    </div>
                    <div className=" mt-1">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-paperclip"></i>
                                </span>
                            </div>
                            <div class="custom-file">
                                <input
                                    type="file"
                                    class="custom-file-input"
                                    onChange={(e) => {
                                        setEditprofile(e.target.files[0])
                                        setEditProfileName(e.target.files[0].name)
                                    }}
                                />
                                <label
                                    class="custom-file-label"
                                    for="inputGroupFile01"
                                >
                                    {EditProfileName}
                                </label>
                            </div>
                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        className="button_formatting"
                        onClick={() => setEditDailogOpen(!EditDailogOpen)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="button_formatting"
                        onClick={() => updateSubscriptiondata(EditSubscriptionId)}
                    >
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>

            <Loder loading={isloading} />
        </>
    )
}

export default HOC(Subscription)
