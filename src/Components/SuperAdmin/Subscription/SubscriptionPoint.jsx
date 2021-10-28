import React, { useState, useEffect } from 'react'
import { Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./Subscription.css";

//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import Loder from '../../../Loder/Loder';
import { blankValidator, showNotificationMsz } from "../../../utils/Validation";

function SubscriptionPoint(props) {

    //subscription name
    let subscriptionName = props.location.state.item.name

    //subscription id
    let subcriptionId = props.location.state.item._id

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [point, setpoint] = useState("");
    const [isvalid, setisvalid] = useState(false);
    const [SubscriptionDataArr, setSubscriptionDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editpoint, setEditpoint] = useState("");
    const [Editisvalid, setEditisvalid] = useState(false);
    const [EditSubscriptionPointId, setEditSubscriptionPointId] = useState("")
    const [isloading, setisloading] = useState(false)
    const [isUpdated, setisUpdated] = useState(false)

    //Error
    const [pointError, setpointError] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        //to get data of subscription
        const getsubscriptiondata = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + `getSubscriptionPoints/${subcriptionId}`;
                axios
                    .get(url)
                    .then(
                        (res) => {
                            console.log("get data", res)
                            setSubscriptionDataArr(res.data)
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
    }, [isUpdated, subcriptionId])

    const OpenEditDailog = (data) => {
        setEditpoint(data.subcriptionPoints);
        setEditisvalid(data.isValid)
        setEditSubscriptionPointId(data._id)
        setEditDailogOpen(!EditDailogOpen)
    }

    //to add new subscription point
    const AddSubscriptionPointData = () => {
        try {
            if (!blankValidator(point)) {
                setpointError(true);
                return;
            }
            setisloading(true)
            let url = getBaseUrl() + `addSubscriptionPoints/${subcriptionId}`;
            let temp = {
                subcriptionId,
                subcriptionPoints: point,
                isValid: isvalid
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        console.log("response daata:::", res)
                        setaddMangeopen(!addMangeopen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setpoint("");
                        setisvalid(false);
                        setaddMangeopen(!addMangeopen)
                        showNotificationMsz(res.data.msg, "success")
                    },
                    (error) => {
                        setisloading(false)
                        showNotificationMsz(error, "danger")
                        console.log("Error", error)
                    }
                )
        } catch (error) {
            setisloading(false)
            showNotificationMsz(error, "danger")
            console.log("Error", error)
        }
    };

    //To Update the data of subscripion

    const updateSubscriptionpointdata = (ID) => {
        //subscription id
        let id = ID
        try {
            setisloading(true)
            let url = getBaseUrl() + `updateSubscriptionPoints/${id}`;
            let temp = {
                subcriptionPoints: Editpoint,
                isValid: Editisvalid
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        setEditDailogOpen(!EditDailogOpen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setEditpoint("");
                        setEditisvalid(false);
                        showNotificationMsz(res.data.msg, "success")
                    },
                    (error) => {
                        showNotificationMsz(error, "danger")
                        setisloading(false)
                    }
                )
        } catch (error) {
            console.log("Error", error)
            showNotificationMsz(error, "danger")
            setisloading(false)
        }
    }


    //to delete the subscription

    const DeleteSubcriptionPoint = (data) => {
        //subscription id
        let id = data._id
        try {
            setisloading(true)
            let url = getBaseUrl() + `deleteSubscriptionPoint/${id}`;
            axios
                .get(url)
                .then(
                    (res) => {
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        showNotificationMsz(res.data.msg, "success")
                    },
                    (error) => {
                        setisloading(false)
                        showNotificationMsz(error, "danger")
                    }
                )
        } catch (error) {
            setisloading(false)
            showNotificationMsz(error, "danger")
        }
    }


    return (
        <>
            <div className="content_padding">

                <div className="mb-3 page_heading">Manage {subscriptionName} Point</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    <div className="card_admissiondetails_height">
                        <div className="textfiled_margin">
                            {!addMangeopen ? (
                                <div className="d-flex">
                                    <span className="icon_color">
                                        <i className="fa fa-plus-circle"></i>
                                    </span>
                                    <span className="mt-1 ml-2 addmanageuserfont hover_cursor" onClick={() => setaddMangeopen(!addMangeopen)}>
                                        <strong> Add New Point</strong>
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
                                                            <i class="fa fa-times cursor" onClick={() => setaddMangeopen(!addMangeopen)}></i>
                                                        </span>
                                                    </div>
                                                    <div className="text_filed_heading">
                                                        Subscription Point
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter the Subscription point"
                                                            autoComplete="off"
                                                            value={point}
                                                            onChange={(e) => {
                                                                setpointError(false)
                                                                setpoint(e.target.value);
                                                            }}
                                                        />
                                                        {pointError && (
                                                            <span className="text-danger">Enter the Point</span>
                                                        )}
                                                    </div>
                                                    <div className="text_filed_heading">
                                                        Is Valid
                                                    </div>
                                                    <div className=" mt-1">
                                                        <div class="form-check">
                                                            <input
                                                                class="form-check-input"
                                                                type="checkbox"
                                                                checked={isvalid}
                                                                onChange={(e) => {
                                                                    setisvalid(e.target.checked)
                                                                }} />
                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                is Valid
                                                            </label>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={AddSubscriptionPointData}
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
                                                <div className="d-flex justify-content-between">

                                                    <div className=" p-2">
                                                        <span>
                                                            {item.isValid ?
                                                                <i class="fa fa-check text-success"></i>
                                                                : <i class="fa fa-times text-danger"></i>
                                                            }
                                                        </span>
                                                        <span className="ml-3"> {item.subcriptionPoints}</span>

                                                    </div>



                                                    {" "}
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
                                                                onClick={() => DeleteSubcriptionPoint(item)}
                                                            ></i>
                                                        </span>

                                                    </div>

                                                </div>
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
                    Edit Subscription Point
                    <span
                        className="float-right icon_color"

                    >
                        <i class="fa fa-times hover_cursor" onClick={() => setEditDailogOpen(!EditDailogOpen)}></i>{" "}
                    </span>
                </DialogTitle>
                <DialogContent>
                    <div className="text_filed_heading">
                        Subscription Point
                    </div>
                    <div className=" mt-1">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter he Subscrription point"
                            autoComplete="off"
                            value={Editpoint}
                            onChange={(e) => {
                                setEditpoint(e.target.value);
                            }}
                        />
                    </div>

                    <div className="text_filed_heading">
                        Is Valid
                    </div>
                    <div className=" mt-1">
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                checked={Editisvalid}
                                onChange={(e) => {
                                    setEditisvalid(e.target.checked)
                                }} />
                            <label class="form-check-label" for="flexCheckDefault">
                                is Valid
                            </label>
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
                        onClick={() => updateSubscriptionpointdata(EditSubscriptionPointId)}
                    >
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>

            <Loder loading={isloading} />
        </>
    )
}

export default HOC(SubscriptionPoint)
