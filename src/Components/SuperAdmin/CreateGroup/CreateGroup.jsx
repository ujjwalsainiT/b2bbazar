import React, { useState, useEffect } from 'react'
import { Grid, Card, Button, Dialog, DialogActions, DialogTitle, DialogContent, Select, MenuItem, useTheme, FormControl } from '@material-ui/core';

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
    const [name, setname] = useState("");
    const [catgoryArr, setcatgoryArr] = useState([]);
    const [subcatgoryArr, setsubcatgoryArr] = useState([]);
    const [CategorydataArr, setCategorydataArr] = useState([])
    const [SubCategorydataArr, setSubCategorydataArr] = useState([])
    const [SubscriptionDataArr, setSubscriptionDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editname, setEditname] = useState("")
    const [Editcatgory, setEditcatgory] = useState("");
    const [Editsubcatgory, setEditsubcatgory] = useState("")
    const [isloading, setisloading] = useState(false);

    const theme = useTheme();


    useEffect(() => {
        window.scrollTo(0, 0);

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
                            console.log("res data:::", res)
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
    }, [])


    const OpenEditDailog = (data) => {
        setEditname(data.name);
        setEditcatgory(data.catgory);
        setEditsubcatgory(data.subcatgory);
        setEditDailogOpen(!EditDailogOpen)
    }

    const handleCategoryData = (event) => {
        const {
            target: { value },
        } = event;
        setCategorydataArr(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log("category:::", CategorydataArr)
    };

    const handleSubCategoryData = (event) => {
        const {
            target: { value },
        } = event;
        setSubCategorydataArr(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log("Subcategory:::", SubCategorydataArr)
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
                                                                <FormControl sx={{ m: 1, width: 300 }}>
                                                                    <Select
                                                                        multiple
                                                                        placeholder="Select Categories"
                                                                        value={CategorydataArr}
                                                                        onChange={handleCategoryData}
                                                                        variant="outlined"
                                                                        MenuProps={MenuProps}
                                                                    >
                                                                        {catgoryArr.map((item, index) => (
                                                                            <MenuItem
                                                                                key={index}
                                                                                value={item._id}
                                                                                style={getStyles(name, CategorydataArr, theme)}
                                                                            >
                                                                                {item.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </div>
                                                        </Grid>

                                                        <Grid item md={6}>
                                                            <div className="text_filed_heading">
                                                                Sub Category
                                                            </div>
                                                            <div className=" mt-1">
                                                                <FormControl sx={{ m: 1, width: 300 }}>
                                                                    <Select
                                                                        multiple
                                                                        placeholder="Select Categories"
                                                                        value={SubCategorydataArr}
                                                                        onChange={handleSubCategoryData}
                                                                        variant="outlined"
                                                                        MenuProps={MenuProps}
                                                                    >
                                                                        {subcatgoryArr.map((item, index) => (
                                                                            <MenuItem
                                                                                key={index}
                                                                                value={item._id}
                                                                                style={getStyles(name, SubCategorydataArr, theme)}
                                                                            >
                                                                                {item.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"

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

            <Loder loading={isloading} />
        </>
    )
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
export default HOC(CreateGroup)
