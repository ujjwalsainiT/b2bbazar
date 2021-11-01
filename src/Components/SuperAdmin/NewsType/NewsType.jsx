import React, { useState, useEffect } from 'react'
import { Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";


// //for backend call
// import axios from "axios";
// import { getBaseUrl } from "../../../utils";
// import Loder from '../../../Loder/Loder';
// import { blankValidator, showNotificationMsz } from "../../../utils/Validation";

function NewsType(props) {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [name, setname] = useState("");
    const [NewtypeArr, setNewtypeArr] = useState([])
    const [NameEdit, setNameEdit] = useState([])
    const [EditDailogOpen, setEditDailogOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [])


    const OpenEditDailog = () => {
        // setNameEdit(data.name);
        // setEditCategoryId(data._id);
        setEditDailogOpen(!EditDailogOpen)
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
                                                                setname(e.target.value);
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={() => {
                                                            NewtypeArr.push({
                                                                name: name
                                                            })
                                                            setNewtypeArr([...NewtypeArr])
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
                                                                onClick={() => OpenEditDailog}
                                                            ></i>
                                                        </span>
                                                        <span className="action_icon ml-2">
                                                            <i
                                                                className="fa fa-trash "

                                                            ></i>
                                                        </span>
                                                        <span className="action_icon ml-2" >
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
                                setNameEdit(e.target.value);
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

export default HOC(NewsType)
