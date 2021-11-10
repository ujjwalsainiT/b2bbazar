import React, { useState, useEffect } from 'react'
import { Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";


//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import Loder from '../../../Loder/Loder';
import { blankValidator, showNotificationMsz } from "../../../utils/Validation";

function NewsType(props) {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [name, setname] = useState("");
    const [NewtypeArr, setNewtypeArr] = useState([])
    const [NameEdit, setNameEdit] = useState("")
    const [EditId, setEditId] = useState("")
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [isloading, setisloading] = useState(false)
    const [isUpdated, setisUpdated] = useState(false)

    //error
    const [NameError, setNameError] = useState(false)
    const [EditNameError, setEditNameError] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        //to get data of News type
        const getNewstypeData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "getNewsType";
                axios
                    .get(url)
                    .then(
                        (res) => {
                            setisloading(false)
                            setNewtypeArr(res.data)
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
        getNewstypeData();
    }, [isUpdated])


    //to add new Newtype
    const AddNewtypeData = () => {
        try {
            if (!blankValidator(name)) {
                setNameError(true)
                return;
            }
            setisloading(true)

            let url = getBaseUrl() + "addNewsType";
            let temp = {
                name
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setaddMangeopen(!addMangeopen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setname("");
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

    const OpenEditDailog = (data) => {
        setNameEdit(data.name);
        setEditId(data._id);
        setEditDailogOpen(!EditDailogOpen)
    }


    //To Update the data of NewType

    const updateNewTypedata = (ID) => {
        //NewType id
        let id = ID
        try {
            if (!blankValidator(NameEdit)) {
                setEditNameError(true);
                return
            }
            setisloading(true)
            let url = getBaseUrl() + `updateNewsType/${id}`;
            let temp = {
                name: NameEdit
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setEditDailogOpen(!EditDailogOpen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setNameEdit("");
                    },
                    (error) => {
                        showNotificationMsz(error, "danger")
                        setisloading(false)
                    }
                )
        } catch (error) {
            showNotificationMsz(error, "danger")
            setisloading(false)
        }
    }

    //to delete the NewsType

    const DeleteNewsType = (data) => {
        //NewsType id
        let id = data._id
        try {
            setisloading(true)
            let url = getBaseUrl() + `deleteNewsType/${id}`;
            axios
                .get(url)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
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
    }
    return (
        <>
            <div className="content_padding">

                <div className="mb-3 page_heading">Manage News Type</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    <div className="card_admissiondetails_height">
                        <div className="textfiled_margin">
                            {!addMangeopen ? (
                                <div>
                                    <span className="addmanageuserfont hover_cursor" onClick={() => setaddMangeopen(!addMangeopen)}>
                                        <i className="fa fa-plus-circle icon_color mr-1"></i> <strong> Add News Type</strong>
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
                                                        Type Name
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter the news type"
                                                            autoComplete="off"
                                                            value={name}
                                                            onChange={(e) => {
                                                                setNameError(false)
                                                                setname(e.target.value);
                                                            }}
                                                        />
                                                        {NameError && (
                                                            <span className="text-danger">Enter the News Type</span>
                                                        )}
                                                    </div>

                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={AddNewtypeData}
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
                            {NewtypeArr.length > 0 ?
                                (NewtypeArr.map((item, index) => (
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
                                                                onClick={() => DeleteNewsType(item)}
                                                            ></i>
                                                        </span>
                                                        <span className="action_icon ml-2" onClick={() => props.history.push("/add-new-news", { item })}>
                                                            Manage News
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
                    Edit Category
                    <span
                        className="float-right icon_color"

                    >
                        <i class="fa fa-times hover_cursor" onClick={() => setEditDailogOpen(!EditDailogOpen)}></i>{" "}
                    </span>
                </DialogTitle>
                <DialogContent>
                    <div className="text_filed_heading">
                        Type Name
                    </div>
                    <div className=" mt-1">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter the News Type"
                            autoComplete="off"
                            value={NameEdit}
                            onChange={(e) => {
                                setEditNameError(false)
                                setNameEdit(e.target.value);
                            }}
                        />
                        {EditNameError && (
                            <span className="text-danger">Enter the News Type</span>
                        )}
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
                        onClick={() => updateNewTypedata(EditId)}
                    >
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>


            <Loder loading={isloading} />
        </>
    )
}

export default HOC(NewsType)
