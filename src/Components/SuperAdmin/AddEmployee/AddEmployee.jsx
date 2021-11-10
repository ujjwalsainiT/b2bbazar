import React, { useState } from 'react'
import { Grid, Card, Button } from '@material-ui/core';
import "./AddEmployee.css";

//common header
import HOC from "../../../Common/HOC";

//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import Loder from '../../../Loder/Loder';
import { showNotificationMsz } from "../../../utils/Validation";

function AddEmployee(props) {
    //local state
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [dob, setdob] = useState("");
    const [gender, setgender] = useState("");
    const [mobileno, setmobileno] = useState("");
    const [email, setemail] = useState("");
    const [aadharno, setaadharno] = useState("");
    const [maritalstatus, setmaritalstatus] = useState("");
    const [qualification, setqualification] = useState("");
    const [fatherfirstname, setfatherfirstname] = useState("");
    const [fatherlastname, setfatherlastname] = useState("");
    const [motherfirstname, setmotherfirstname] = useState("");
    const [motherlastname, setmotherlastname] = useState("");
    const [currentaddress, setcurrentaddress] = useState("");
    const [currentcity, setcurrentcity] = useState("");
    const [currentstate, setcurrentstate] = useState("");
    const [currentpincode, setcurrentpincode] = useState("")
    const [permanentaddress, setpermanentaddress] = useState("");
    const [permanentcity, setpermanentcity] = useState("");
    const [permanentstate, setpermanentstate] = useState("");
    const [permanentpincode, setpermanentpincode] = useState("")

    const [isloading, setisloading] = useState(false)

    //to add new NewEmployee
    const AddNewEmployeeData = () => {
        try {
            setisloading(true)

            let url = getBaseUrl() + "addEmployee";
            let temp = {
                firstname,
                lastname,
                dob,
                gender,
                mobileno,
                email,
                aadharno,
                maritalstatus,
                qualification,
                fatherfirstname,
                fatherlastname,
                motherfirstname,
                motherlastname,
                currentaddress,
                currentcity,
                currentstate,
                currentpincode,
                permanentaddress,
                permanentcity,
                permanentstate,
                permanentpincode
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setisloading(false)
                        props.history.goBack();
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
                <div className="mb-3 page_heading">Add Employee</div>
                <Card className="pt-3 pb-4 mb-4 Card_shadow">
                    <div className="textfiled_margin">
                        <Grid className="Component_main_grid mt-2">
                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    First Name
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the First Name"
                                        autoComplete="off"
                                        value={firstname}
                                        onChange={(e) => {
                                            setfirstname(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Last Name
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the Last Name"
                                        autoComplete="off"
                                        value={lastname}
                                        onChange={(e) => {
                                            setlastname(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Date of Birth
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="date"
                                        className="form-control "
                                        autoComplete="off"
                                        value={dob}
                                        onChange={(e) => {
                                            setdob(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>
                        </Grid>


                        <Grid className="Component_main_grid mt-2">
                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Gender
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <select
                                        class="form-control"
                                        value={gender}
                                        onChange={(e) => {
                                            setgender(e.target.value)
                                        }}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Contact Number
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the Contact Number"
                                        autoComplete="off"
                                        value={mobileno}
                                        onChange={(e) => {
                                            setmobileno(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Email Address
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        autoComplete="off"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => {
                                            setemail(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>
                        </Grid>

                        <Grid className="Component_main_grid mt-2">
                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Aaddhar Card Number
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the Aaddhar Card Number"
                                        autoComplete="off"
                                        value={aadharno}
                                        onChange={(e) => {
                                            setaadharno(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Marital Status
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <select
                                        class="form-control"
                                        value={maritalstatus}
                                        onChange={(e) => {
                                            setmaritalstatus(e.target.value)
                                        }}
                                    >
                                        <option value="">Marital Status</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                    </select>
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Qualification
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <select
                                        class="form-control"
                                        value={qualification}
                                        onChange={(e) => {
                                            setqualification(e.target.value)
                                        }}
                                    >
                                        <option value="">Select the Qualification</option>
                                        <option value="Post Graduation">Post Graduation</option>
                                        <option value="Under Graduation">Under Graduation</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="High School">High School</option>
                                    </select>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid className="Component_main_grid mt-2">
                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Father First Name
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the First Name"
                                        autoComplete="off"
                                        value={fatherfirstname}
                                        onChange={(e) => {
                                            setfatherfirstname(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Father Last Name
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the Last Name"
                                        autoComplete="off"
                                        value={fatherlastname}
                                        onChange={(e) => {
                                            setfatherlastname(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Mother First Name
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        autoComplete="off"
                                        placeholder="Enter the First Name"
                                        value={motherfirstname}
                                        onChange={(e) => {
                                            setmotherfirstname(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>
                        </Grid>


                        <Grid className="Component_main_grid mt-2">
                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Mother Last Name
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the Last Name"
                                        autoComplete="off"
                                        value={motherlastname}
                                        onChange={(e) => {
                                            setmotherlastname(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item md={4}>

                            </Grid>

                            <Grid item md={4}>

                            </Grid>
                        </Grid>


                        <div className="text_filed_heading mt-2">
                            Current Address
                        </div>
                        <div className="input_Margin_right mt-1">
                            <input
                                type="text"
                                className="form-control "
                                placeholder="Enter the Current Address"
                                autoComplete="off"
                                value={currentaddress}
                                onChange={(e) => {
                                    setcurrentaddress(e.target.value)
                                }}
                            />
                        </div>


                        <Grid className="Component_main_grid mt-2">
                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    City
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the City"
                                        autoComplete="off"
                                        value={currentcity}
                                        onChange={(e) => {
                                            setcurrentcity(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    State
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the State"
                                        autoComplete="off"
                                        value={currentstate}
                                        onChange={(e) => {
                                            setcurrentstate(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Pin Code
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        autoComplete="off"
                                        placeholder="Pin code"
                                        value={currentpincode}
                                        onChange={(e) => {
                                            setcurrentpincode(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>
                        </Grid>


                        <div className="text_filed_heading mt-2">
                            Permanent Address
                        </div>
                        <div className="input_Margin_right mt-1">
                            <input
                                type="text"
                                className="form-control "
                                placeholder="Enter the Permanent Address"
                                autoComplete="off"
                                value={permanentaddress}
                                onChange={(e) => {
                                    setpermanentaddress(e.target.value)
                                }}
                            />
                        </div>


                        <Grid className="Component_main_grid mt-2">
                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    City
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the City"
                                        autoComplete="off"
                                        value={permanentcity}
                                        onChange={(e) => {
                                            setpermanentcity(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    State
                                </div>
                                <div className="input_Margin_right mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the State"
                                        autoComplete="off"
                                        value={permanentstate}
                                        onChange={(e) => {
                                            setpermanentstate(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>

                            <Grid item md={4}>
                                <div className="text_filed_heading">
                                    Pin Code
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        className="form-control "
                                        autoComplete="off"
                                        placeholder="Pin code"
                                        value={permanentpincode}
                                        onChange={(e) => {
                                            setpermanentpincode(e.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>
                        </Grid>


                        <div className="mt-4 mb-3 text-right">
                            <Button
                                variant="contained"
                                className="button_formatting"
                                onClick={AddNewEmployeeData}
                            >
                                Add Employee
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            <Loder loading={isloading} />
        </>
    )
}

export default HOC(AddEmployee)
