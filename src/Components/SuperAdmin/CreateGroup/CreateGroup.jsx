import React, { useState, useEffect } from 'react'
import { Grid, Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./CreateGroup.css";


function CreateGroup(props) {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [name, setname] = useState("");
    const [catgory, setcatgory] = useState("");
    const [subcatgory, setsubcatgory] = useState("");
    const [SubscriptionDataArr, setSubscriptionDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editname, setEditname] = useState("")
    const [Editcatgory, setEditcatgory] = useState("");
    const [Editsubcatgory, setEditsubcatgory] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const OpenEditDailog = (data) => {
        setEditname(data.name);
        setEditcatgory(data.catgory);
        setEditsubcatgory(data.subcatgory);
        setEditDailogOpen(!EditDailogOpen)
    }
    return (
        <>
            <div className="content_padding">

                <div className="mb-3 page_heading">Manage Group</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    <div className="card_admissiondetails_height">
                        <div className="textfiled_margin">
                            {!addMangeopen ? (
                                <div className="d-flex">
                                    <span className="icon_color">
                                        <i className="fa fa-plus-circle"></i>
                                    </span>
                                    <span className="mt-1 ml-2 addmanageuserfont hover_cursor" onClick={() => setaddMangeopen(!addMangeopen)}>
                                        <strong> Add New group</strong>
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
                                                        Group Name
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter the Group Name"
                                                            autoComplete="off"
                                                            value={name}
                                                            onChange={(e) => {
                                                                setname(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="text_filed_heading">
                                                        Group Image
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"

                                                        />

                                                    </div>
                                                    <Grid className="Component_main_grid mt-2">
                                                        <Grid item md={6}>
                                                            <div className="text_filed_heading">
                                                                Category
                                                            </div>
                                                            <div className="input_Margin_right mt-1">
                                                                <select
                                                                    class="form-control"
                                                                    value={catgory}
                                                                    onChange={(e) => {
                                                                        setcatgory(e.target.value);
                                                                    }}
                                                                >
                                                                    <option value="">select Cateory</option>
                                                                    <option value="Cateory 1">Cateory 1</option>
                                                                    <option value="Cateory 2">Cateory 2</option>
                                                                    <option value="Cateory 3">Cateory 3</option>
                                                                    <option value="Cateory 4">Cateory 4</option>
                                                                </select>
                                                            </div>
                                                        </Grid>

                                                        <Grid item md={6}>
                                                            <div className="text_filed_heading">
                                                                Sub Category
                                                            </div>
                                                            <div className=" mt-1">
                                                                <select
                                                                    class="form-control"
                                                                    value={subcatgory}
                                                                    onChange={(e) => {
                                                                        setsubcatgory(e.target.value);
                                                                    }}
                                                                >
                                                                    <option value="">select sub-Cateory</option>
                                                                    <option value="sub Cateory 1">sub Cateory 1</option>
                                                                    <option value="sub Cateory 2">sub Cateory 2</option>
                                                                    <option value="sub Cateory 3">sub Cateory 3</option>
                                                                    <option value="sub Cateory 4">sub Cateory 4</option>
                                                                </select>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={() => {
                                                            if (name === "") {
                                                                alert("Enter the Group Name");
                                                                return;
                                                            }
                                                            if (catgory === "") {
                                                                alert("Select the Category");
                                                                return;
                                                            }
                                                            if (subcatgory === "") {
                                                                alert("Select the sub-Category");
                                                                return;
                                                            }
                                                            SubscriptionDataArr.push({
                                                                name: name,
                                                                catgory: catgory,
                                                                subcatgory: subcatgory,
                                                            });
                                                            setSubscriptionDataArr([...SubscriptionDataArr]);
                                                            setname("");
                                                            setcatgory("");
                                                            setsubcatgory("");
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
                                                    <Grid item md={3}>
                                                        <div className=" p-2">
                                                            {item.name}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <div className=" p-2">
                                                            {item.catgory}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <div className=" p-2">
                                                            {item.subcatgory}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={3}>
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
                    Edit Group
                    <span
                        className="float-right icon_color"

                    >
                        <i class="fa fa-times hover_cursor" onClick={() => setEditDailogOpen(!EditDailogOpen)}></i>{" "}
                    </span>
                </DialogTitle>
                <DialogContent>
                    <div className="text_filed_heading">
                        Group Name
                    </div>
                    <div className=" mt-1">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter the group Name"
                            autoComplete="off"
                            value={Editname}
                            onChange={(e) => {
                                setEditname(e.target.value);
                            }}
                        />
                    </div>


                    <div className="text_filed_heading">
                        Category
                    </div>
                    <div className="mt-1">
                        <select
                            class="form-control"
                            value={Editcatgory}
                            onChange={(e) => {
                                setEditcatgory(e.target.value);
                            }}
                        >
                            <option value="">select Cateory</option>
                            <option value="Cateory 1">Cateory 1</option>
                            <option value="Cateory 2">Cateory 2</option>
                            <option value="Cateory 3">Cateory 3</option>
                            <option value="Cateory 4">Cateory 4</option>
                        </select>
                    </div>

                    <div className="text_filed_heading">
                        Sub Category
                    </div>
                    <div className=" mt-1">
                        <select
                            class="form-control"
                            value={Editsubcatgory}
                            onChange={(e) => {
                                setEditsubcatgory(e.target.value);
                            }}
                        >
                            <option value="">select sub-Cateory</option>
                            <option value="sub Cateory 1">sub Cateory 1</option>
                            <option value="sub Cateory 2">sub Cateory 2</option>
                            <option value="sub Cateory 3">sub Cateory 3</option>
                            <option value="sub Cateory 4">sub Cateory 4</option>
                        </select>
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

export default HOC(CreateGroup)
