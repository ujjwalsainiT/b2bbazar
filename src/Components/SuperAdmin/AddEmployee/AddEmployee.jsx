import React from 'react'
import { Grid, Card, Button } from '@material-ui/core';
import "./AddEmployee.css";

//common header
import HOC from "../../../Common/HOC";

function AddEmployee() {
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
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter the Gender"
                                        autoComplete="off"
                                    />
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
                                    >
                                        <option>Marital Status</option>
                                        <option>Single</option>
                                        <option>Married</option>
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
                                    >
                                        <option>Select the Qualification</option>
                                        <option>Post Graduation</option>
                                        <option>Under Graduation</option>
                                        <option>Diploma</option>
                                        <option>Intermediate</option>
                                        <option>High School</option>
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
                                    />
                                </div>
                            </Grid>
                        </Grid>


                        <div className="mt-4 mb-3 text-right">
                            <Button
                                variant="contained"
                                className="button_formatting"
                            >
                                Add Employee
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default HOC(AddEmployee)
