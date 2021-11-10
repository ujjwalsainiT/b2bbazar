import React, { useState, useEffect } from 'react'
import { Grid, Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import Loder from '../../../Loder/Loder';
import { blankValidator, showNotificationMsz } from "../../../utils/Validation";

function PostNews(props) {

    //Newstype id
    let NewsTypeId = props.location.state.item._id

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [name, setname] = useState("");
    const [profile, setprofile] = useState("")
    const [NewsDataArr, setNewsDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editname, setEditname] = useState("");
    const [EditPhoto, setEditPhoto] = useState("");
    const [EditProfile, setEditProfile] = useState("")
    const [EditId, setEditId] = useState("")
    const [isloading, setisloading] = useState(false)
    const [isUpdated, setisUpdated] = useState(false)

    //errors
    const [nameError, setnameError] = useState(false);
    const [profileError, setprofileError] = useState(false);
    const [EditNameError, setEditNameError] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        //to get data of News type
        const getNewstypeData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + `getNewsContent/${NewsTypeId}`;
                axios
                    .get(url)
                    .then(
                        (res) => {
                            setisloading(false)
                            setNewsDataArr(res.data)
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
    }, [isUpdated, NewsTypeId])

    const OpenEditDailog = (data) => {
        setEditname(data.newsTitle);
        setEditPhoto(data.image)
        console.log("Image", data.image)
        setEditId(data._id)
        setEditDailogOpen(!EditDailogOpen)
    }

    //to add new News
    const AddNewsData = () => {
        try {
            if (!blankValidator(name)) {
                setnameError(true)
                return;
            }
            if (!blankValidator(profile)) {
                setprofileError(true)
                return;
            }

            setisloading(true)

            let url = getBaseUrl() + `addNewsContent/${NewsTypeId}`;
            const fd = new FormData();
            fd.append('newsTypeId', NewsTypeId)
            fd.append('newsTitle', name)
            fd.append('myField', profile, profile.name)
            axios
                .post(url, fd)
                .then(
                    (res) => {

                        showNotificationMsz(res.data.msg, "success")
                        setaddMangeopen(!addMangeopen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setname("");
                        setprofile("")
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




    //To Update the data of News Data

    const updateNewsdata = (ID) => {
        //News id
        let id = ID
        try {
            if (!blankValidator(Editname)) {
                setEditNameError(true)
                return;
            }
            setisloading(true)
            let url = getBaseUrl() + `updateNewsContent/${id}`;
            const fd = new FormData();
            //fd.append('newsTypeId', NewsTypeId)
            fd.append('newsTitle', Editname)
            if (EditProfile) {
                fd.append('myField', EditProfile)
            } else
                fd.append('currentImage', EditPhoto)
            axios
                .post(url, fd)
                .then(
                    (res) => {

                        showNotificationMsz(res.data.msg, "success")
                        setEditDailogOpen(!EditDailogOpen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setEditname("");
                        setEditPhoto("")
                        setEditProfile("")
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
            let url = getBaseUrl() + `deleteNewsContent/${id}`;
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

                <div className="mb-3 page_heading">Manage News Data</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    <div className="card_admissiondetails_height">
                        <div className="textfiled_margin">
                            {!addMangeopen ? (
                                <div>
                                    <span className="addmanageuserfont hover_cursor" onClick={() => setaddMangeopen(!addMangeopen)}>
                                        <i className="fa fa-plus-circle icon_color mr-1"></i> <strong> Add New News</strong>
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
                                                            <i className="fa fa-times cursor" onClick={() => setaddMangeopen(!addMangeopen)}></i>
                                                        </span>
                                                    </div>
                                                    <div className="text_filed_heading">
                                                        News Title
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="News Title"
                                                            autoComplete="off"
                                                            value={name}
                                                            onChange={(e) => {
                                                                setnameError(false)
                                                                setname(e.target.value)
                                                            }}
                                                        />
                                                        {nameError && (
                                                            <span className="text-danger">Enter the News Title</span>
                                                        )}
                                                    </div>

                                                    <div className="text_filed_heading">
                                                        News Image
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            onChange={(e) => {
                                                                setprofileError(false)
                                                                setprofile(e.target.files[0])
                                                            }}
                                                        />
                                                        {profileError && (
                                                            <span className="text-danger">Choose the image</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={AddNewsData}
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
                            {NewsDataArr.length > 0 ?
                                (NewsDataArr.map((item, index) => (
                                    <Card className="Card_shadow mb-2 mt-2">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <Grid className="Component_main_grid mt-2">
                                                    <Grid item md={1}>

                                                        <div className=" p-2">
                                                            <img src={`https://secure-plains-62142.herokuapp.com/public/images/${item.image}`} alt="" style={{ width: "60px", height: "40px" }} />
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={3}>

                                                        <div className=" p-2">
                                                            {item.newsTitle}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={4}>

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
                                                                    onClick={() => DeleteNewsType(item)}
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
                    Edit News Data
                    <span
                        className="float-right icon_color"

                    >
                        <i className="fa fa-times hover_cursor" onClick={() => setEditDailogOpen(!EditDailogOpen)}></i>{" "}
                    </span>
                </DialogTitle>
                <DialogContent>
                    <div className="text_filed_heading">
                        News Title
                    </div>
                    <div className=" mt-1">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="News Title"
                            autoComplete="off"
                            value={Editname}
                            onChange={(e) => {
                                setEditNameError(false)
                                setEditname(e.target.value);
                            }}
                        />
                        {EditNameError && (
                            <span className="text-danger">Enter the News Title</span>
                        )}
                    </div>

                    <div className="text_filed_heading">
                        News Image
                    </div>
                    <div className=" mt-1">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-paperclip"></i>
                                </span>
                            </div>
                            <div class="custom-file">
                                <input
                                    type="file"
                                    class="custom-file-input"
                                    onChange={(e) => {
                                        setEditPhoto(e.target.files[0].name)
                                        setEditProfile(e.target.files[0])
                                    }}
                                />
                                <label
                                    class="custom-file-label"
                                    for="inputGroupFile01"
                                >
                                    {EditPhoto}
                                </label>
                            </div>
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
                        onClick={() => updateNewsdata(EditId)}
                    >
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>

            <Loder loading={isloading} />

        </>
    )
}

export default HOC(PostNews)
