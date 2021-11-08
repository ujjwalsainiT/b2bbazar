import React, { useState, useEffect } from 'react'
import { Grid, Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';

import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./CreateGroup.css";

//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import Loder from '../../../Loder/Loder';
import { showNotificationMsz } from "../../../utils/Validation";


function CreateGroup(props) {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    //for sending data
    const [profile, setprofile] = useState("")
    const [Category, setCategory] = useState("")
    const [SubCategory, setSubCategory] = useState("")

    //for set category and sub-catgory
    const [catgoryArr, setcatgoryArr] = useState([]);
    const [subcatgoryArr, setsubcatgoryArr] = useState([]);

    const [GroupDataArr, setGroupDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [isloading, setisloading] = useState(false);
    const [isUpdated, setisUpdated] = useState(false)


    const OpenEditDailog = (data) => {
        setEditDailogOpen(!EditDailogOpen)
    }

    useEffect(() => {
        //to get data of category
        const getCategoryData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "getCategoryDetail";
                axios
                    .get(url)
                    .then(
                        (res) => {
                            setisloading(false)
                            setcatgoryArr(res.data)
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
        getCategoryData();

        //to get data of category
        const getSubCategoryData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "getSubCategory";
                axios
                    .get(url)
                    .then(
                        (res) => {
                            setisloading(false)
                            setsubcatgoryArr(res.data)
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
        getSubCategoryData();
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);

        //to get data of Group
        const getGroupDetailData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "getGroupDetail";
                axios
                    .get(url)
                    .then(
                        (res) => {
                            setisloading(false)
                            setGroupDataArr(res.data)
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
        getGroupDetailData();
    }, [isUpdated])


    //to add new Group
    const AddGroupData = () => {
        try {

            setisloading(true)

            let url = getBaseUrl() + "addGroup";
            const fd = new FormData();
            fd.append('category_name', Category)
            fd.append('sub_category_name', SubCategory)
            fd.append('myField', profile, profile.name)
            axios
                .post(url, fd)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setaddMangeopen(!addMangeopen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
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
    };
    return (
        <>
            <div className="content_padding">

                <div className="mb-3 page_heading">Manage Group</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    <div className="card_admissiondetails_height">
                        <div className="textfiled_margin">
                            {!addMangeopen ? (
                                <div>
                                    <span className="addmanageuserfont hover_cursor" onClick={() => setaddMangeopen(!addMangeopen)}>
                                        <i className="fa fa-plus-circle icon_color mr-1"></i> <strong> Add New group</strong>
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
                                                    <Grid className="Component_main_grid mt-2">
                                                        <Grid item md={6}>
                                                            <div className="text_filed_heading">
                                                                Category
                                                            </div>
                                                            <div className="input_Margin_right mt-1">
                                                                <select
                                                                    class="form-control"
                                                                    value={Category}
                                                                    onChange={(e) => {
                                                                        setCategory(e.target.value)
                                                                    }}>
                                                                    <option value="">Select Category</option>
                                                                    {catgoryArr.map((item, index) => (
                                                                        <option value={item.name}>{item.name}</option>
                                                                    ))}
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
                                                                    value={SubCategory}
                                                                    onChange={(e) => {
                                                                        setSubCategory(e.target.value)
                                                                    }}
                                                                >
                                                                    <option value="">Select Sub-Category</option>
                                                                    {subcatgoryArr.map((item, index) => (
                                                                        <option value={item.name}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <div className="text_filed_heading">
                                                        Group Image
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            onChange={(e) => {
                                                                setprofile(e.target.files[0])
                                                            }}
                                                        />

                                                    </div>

                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={AddGroupData}
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

                            <hr />
                            {GroupDataArr.length > 0 ?
                                (GroupDataArr.map((item, index) => (
                                    <Card className="Card_shadow mb-2 mt-2">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <Grid className="Component_main_grid mt-2">
                                                    <Grid item md={1}>
                                                        <div className=" p-2">
                                                            <img src={`https://secure-plains-62142.herokuapp.com/public/images/${item.image}`} alt="" style={{ width: "60px", height: "40px" }} />
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={5}>
                                                        <div className=" p-2">
                                                            {item.name}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <div className="d-flex p-2">
                                                            {item.category_name.map((item, index) => (
                                                                <span>{item}</span>
                                                            ))}
                                                        </div>
                                                    </Grid>

                                                </Grid>
                                                <Grid className="Component_main_grid mt-2">
                                                    <Grid item md={9}>
                                                        <div className="d-flex p-2">
                                                            {item.sub_category_name.map((item, index) => (
                                                                <span>{item}</span>
                                                            ))}
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
                                                                        GroupDataArr.splice(index, 1);
                                                                        setGroupDataArr([...GroupDataArr]);
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
                        Group Image
                    </div>
                    <div className=" mt-1">
                        <input
                            type="file"
                            className="form-control "
                            autoComplete="off"

                        />

                    </div>


                    <div className="text_filed_heading">
                        Category
                    </div>
                    <div className="mt-1">
                        <select class="form-control">
                            <option>Select Category</option>
                            {catgoryArr.map((item, index) => (
                                <option>{item.item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="text_filed_heading">
                        Sub Category
                    </div>
                    <div className=" mt-1">
                        <select class="form-control">
                            <option>Select Sub-Category</option>
                            {subcatgoryArr.map((item, index) => (
                                <option>{item.item}</option>
                            ))}
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

            <Loder loading={isloading} />
        </>
    )
}

export default HOC(CreateGroup)
