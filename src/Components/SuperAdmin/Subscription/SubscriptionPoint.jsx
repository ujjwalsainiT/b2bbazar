import React, { useState, useEffect } from 'react'
import { Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./Subscription.css";

function SubscriptionPoint(props) {

    console.log("props:::::::", props)

    let subscriptionName = props.location.state.item.name

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [point, setpoint] = useState("");
    const [isvalid, setisvalid] = useState(false);
    const [SubscriptionDataArr, setSubscriptionDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editpoint, setEditpoint] = useState("");
    const [Editisvalid, setEditisvalid] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const OpenEditDailog = (data) => {
        setEditpoint(data.point);
        setEditisvalid(data.valid)
        setEditDailogOpen(!EditDailogOpen)
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
                                                                setpoint(e.target.value);
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
                                                        onClick={() => {
                                                            if (point === "") {
                                                                alert("Enter the Subscription point");
                                                                return;
                                                            }

                                                            SubscriptionDataArr.push({
                                                                point: point,
                                                                valid: isvalid,
                                                            });
                                                            setSubscriptionDataArr([...SubscriptionDataArr]);
                                                            setpoint("");
                                                            setisvalid(false);
                                                            setaddMangeopen(!addMangeopen)
                                                        }}
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
                                                            {item.valid ?
                                                                <i class="fa fa-check text-success"></i>
                                                                : <i class="fa fa-times text-danger"></i>
                                                            }
                                                        </span>
                                                        <span className="ml-3"> {item.point}</span>

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
                                                                onClick={() => {
                                                                    SubscriptionDataArr.splice(index, 1);
                                                                    setSubscriptionDataArr([...SubscriptionDataArr]);
                                                                }}
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
                            placeholder="Enter he Subscrripttion point"
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
                    >
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default HOC(SubscriptionPoint)
