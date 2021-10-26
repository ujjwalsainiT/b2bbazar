import React, { useState, useEffect } from 'react'
import { Grid, Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./Subscription.css";

//for backend call
import axios from "axios";
import { blankValidator } from "../../../utils/Validation";

function Subscription(props) {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [ImageUrl, setImageUrl] = useState("")
    const [SubscriptionDataArr, setSubscriptionDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editname, setEditname] = useState("");
    const [Editdescription, setEditdescription] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const OpenEditDailog = (data) => {
        setEditname(data.name);
        setEditdescription(data.description);
        setEditDailogOpen(!EditDailogOpen)
    }

    const ImageUpload = (e) => {
        setImageUrl(e.target.files[0])
        console.log("image respose", e.target.files[0])
    }

    const AddSubscriptionData = () => {
        try {
            if (!blankValidator(name)) {
                alert("Enter the Subscription Name");
                return;
            }
            if (!blankValidator(description)) {
                alert("Enter the Description");
                return;
            }

            let url = "https://whispering-earth-22757.herokuapp.com/addSubscription";
            let temp = {
                name: name,
                description: description,
                image: ImageUrl
            };
            console.log("data send", temp)
            axios
                .post(url, temp)
                .then(
                    (res) => {

                        setname("");
                        setdescription("");
                        setImageUrl("");
                        setaddMangeopen(!addMangeopen)
                    },
                    (error) => {
                        console.log("Error", error)
                    }
                )
        } catch (error) {
            console.log("Error", error)
        }
    };
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
                                                            <i class="fa fa-times cursor" onClick={() => setaddMangeopen(!addMangeopen)}></i>
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
                                                                setname(e.target.value);
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="text_filed_heading">
                                                        Description
                                                    </div>
                                                    <div className=" mt-1">
                                                        <textarea
                                                            class="form-control"
                                                            rows="3"
                                                            value={description}
                                                            onChange={(e) => {
                                                                setdescription(e.target.value)
                                                            }}
                                                        ></textarea>
                                                    </div>

                                                    <div className="text_filed_heading">
                                                        Subscription Image
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            onChange={(e) => ImageUpload(e)}
                                                        />
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
                                                            <img src={item.ImageUrl} alt="" style={{ width: "30px" }} />
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
                                                                    onClick={() => {
                                                                        SubscriptionDataArr.splice(index, 1);
                                                                        setSubscriptionDataArr([...SubscriptionDataArr]);
                                                                    }}
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
                        <i class="fa fa-times hover_cursor" onClick={() => setEditDailogOpen(!EditDailogOpen)}></i>{" "}
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
                            class="form-control"
                            rows="3"
                            value={Editdescription}
                            onChange={(e) => {
                                setEditdescription(e.target.value)
                            }}
                        ></textarea>

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

export default HOC(Subscription)
