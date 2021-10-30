import React, { useState, useEffect } from 'react'
import { Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./Category.css";

//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import Loder from '../../../Loder/Loder';
import { blankValidator, showNotificationMsz } from "../../../utils/Validation";

function SubCategory(props) {
    console.log("categgorprops:::", props)

    //category id
    let category_Id = props.location.state.item._id

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [category, setcategory] = useState("");
    const [CategoryDataArr, setCategoryDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editcategory, setEditcategory] = useState("");
    const [isloading, setisloading] = useState(false);
    const [isUpdated, setisUpdated] = useState(false)

    //error
    const [categoryError, setcategoryError] = useState(false)


    useEffect(() => {
        window.scrollTo(0, 0);
        //to get data of category
        const getCategoryData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + `getSubCategoryDetail/${category_Id}`;
                axios
                    .get(url)
                    .then(
                        (res) => {
                            setisloading(false)
                            setCategoryDataArr(res.data)
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
    }, [isUpdated, category_Id])

    const OpenEditDailog = (data) => {
        setEditcategory(data.category);
        setEditDailogOpen(!EditDailogOpen)
    }

    //to add new subcategory
    const AddsubcategoryData = () => {
        try {
            if (!blankValidator(category)) {
                setcategoryError(true)
                return;
            }
            setisloading(true)

            let url = getBaseUrl() + "addSubCategory";
            let temp = {
                parentCategoryId: category_Id,
                name: category
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setaddMangeopen(!addMangeopen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setcategory("");
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

                <div className="mb-3 page_heading">Manage Sub-Category</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    <div className="card_admissiondetails_height">
                        <div className="textfiled_margin">
                            {!addMangeopen ? (
                                <div className="d-flex">
                                    <span className="icon_color">
                                        <i className="fa fa-plus-circle"></i>
                                    </span>
                                    <span className="mt-1 ml-2 addmanageuserfont hover_cursor" onClick={() => setaddMangeopen(!addMangeopen)}>
                                        <strong> Add New sub-category</strong>
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
                                                        sub-Category Name
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter the sub-category"
                                                            autoComplete="off"
                                                            value={category}
                                                            onChange={(e) => {
                                                                setcategory(e.target.value);
                                                            }}
                                                        />
                                                        {categoryError && (
                                                            <span className="text-danger">Enter the Sub-Category</span>
                                                        )}
                                                    </div>



                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={AddsubcategoryData}
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
                            {CategoryDataArr.length > 0 ?
                                (CategoryDataArr.map((item, index) => (
                                    <Card className="Card_shadow mb-2 mt-2">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <div className="d-flex justify-content-between">

                                                    <div className=" p-2">
                                                        {item.name}
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
                                                                    CategoryDataArr.splice(index, 1);
                                                                    setCategoryDataArr([...CategoryDataArr]);
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
                    Edit Sub-Category
                    <span
                        className="float-right icon_color"

                    >
                        <i class="fa fa-times hover_cursor" onClick={() => setEditDailogOpen(!EditDailogOpen)}></i>{" "}
                    </span>
                </DialogTitle>
                <DialogContent>
                    <div className="text_filed_heading">
                        Sub-Category Name
                    </div>
                    <div className=" mt-1">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter the sub-category"
                            autoComplete="off"
                            value={Editcategory}
                            onChange={(e) => {
                                setEditcategory(e.target.value);
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

            <Loder loading={isloading} />
        </>
    )
}

export default HOC(SubCategory)
