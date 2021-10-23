import React, { useState, useEffect } from 'react'
import { Grid, Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./Subscription.css";

function SubscriptionMonth(props) {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [month, setmonth] = useState("");
    const [price, setprice] = useState("");
    const [SubscriptionDataArr, setSubscriptionDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editmonth, setEditmonth] = useState("");
    const [Editprice, setEditprice] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const OpenEditDailog = (data) => {
        setEditmonth(data.month);
        setEditprice(data.price);
        setEditDailogOpen(!EditDailogOpen)
    }
    return (
        <>
            <div className="content_padding">

                <div className="mb-3 page_heading">Manage Subscription Month</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    <div className="card_admissiondetails_height">
                        <div className="textfiled_margin">
                            {!addMangeopen ? (
                                <div className="d-flex">
                                    <span className="icon_color">
                                        <i className="fa fa-plus-circle"></i>
                                    </span>
                                    <span className="mt-1 ml-2 addmanageuserfont hover_cursor" onClick={() => setaddMangeopen(!addMangeopen)}>
                                        <strong> Add New Month</strong>
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
                                                        Month
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter the Month"
                                                            autoComplete="off"
                                                            value={month}
                                                            onChange={(e) => {
                                                                setmonth(e.target.value);
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="text_filed_heading">
                                                        Price
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter the Price"
                                                            autoComplete="off"
                                                            value={price}
                                                            onChange={(e) => {
                                                                setprice(e.target.value)
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={() => {
                                                            if (month === "") {
                                                                alert("Enter the Month");
                                                                return;
                                                            }
                                                            if (price === "") {
                                                                alert("Enter the Price");
                                                                return;
                                                            }
                                                            SubscriptionDataArr.push({
                                                                month: month,
                                                                price: price,

                                                            });
                                                            setSubscriptionDataArr([...SubscriptionDataArr]);
                                                            setmonth("");
                                                            setprice("");
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
                                                <Grid className="Component_main_grid mt-2">
                                                    <Grid item md={4}>

                                                        <div className=" p-2">
                                                            {item.month}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <div className="p-2">
                                                            {item.price}
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
                        Month
                    </div>
                    <div className=" mt-1">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter the Month"
                            autoComplete="off"
                            value={Editmonth}
                            onChange={(e) => {
                                setEditmonth(e.target.value);
                            }}
                        />
                    </div>

                    <div className="text_filed_heading">
                        Price
                    </div>
                    <div className=" mt-1">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter the Price"
                            autoComplete="off"
                            value={Editprice}
                            onChange={(e) => {
                                setEditprice(e.target.value)
                            }}
                        />
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

export default HOC(SubscriptionMonth)
