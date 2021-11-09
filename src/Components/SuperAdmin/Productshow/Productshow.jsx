import React, { useState, useEffect } from 'react'
import { Grid, Card } from '@material-ui/core';

//common header
import HOC from "../../../Common/HOC";

function Productshow(props) {



    const [GroupDataArr, setGroupDataArr] = useState([
        { name: "Laptop" },
        { name: "Laptop" },
    ]);


    useEffect(() => {
        window.scrollTo(0, 0);

    }, [])


    return (
        <>
            <div className="content_padding">

                <div className="mb-3 page_heading">Product Review</div>
                <Card className="pt-3 pb-4 Card_shadow">


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
                                                            <img src="https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature.jpg" alt="" style={{ width: "60px", height: "40px" }} />
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={2}>
                                                        <div className="text_filed_heading">Name</div>
                                                        <div className=" p-1">
                                                            {item.name}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <div className="text_filed_heading">Quantity</div>
                                                        <div className=" p-1">
                                                            30
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <div className="text_filed_heading">Warranty</div>
                                                        <div className=" p-1">
                                                            2 years
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <div className="text_filed_heading">Category</div>
                                                        <div className="p-1">
                                                            Laptop
                                                        </div>
                                                    </Grid>

                                                </Grid>
                                                <Grid className="Component_main_grid mt-2">
                                                    <Grid item md={3}>
                                                        <div className="text_filed_heading">SubCategory</div>
                                                        <div className="p-1">
                                                            Hp,dell
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={9}>
                                                        <div className="text_filed_heading">Desciption</div>
                                                        <div className="p-1">
                                                            Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of
                                                            a document or a typeface without relying on meaningful content.
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={2}>

                                                    </Grid>
                                                </Grid>

                                                <Grid className="Component_main_grid mt-2">

                                                    <Grid item md={3}>
                                                        <div className="text_filed_heading">B2B Price</div>
                                                        <div className="p-1">
                                                            Rs.100
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <div className="text_filed_heading">B2C Price</div>
                                                        <div className="p-1">
                                                            Rs.150
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <div className="d-flex p-1">
                                                            <span className="action_icon mr-2 ml-1">
                                                                <i className="fa fa-pencil"></i>
                                                            </span>
                                                            <span className="action_icon ml-2">
                                                                Approved
                                                            </span>
                                                            <span className="action_icon ml-2">
                                                                Disapproved
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

        </>
    )
}

export default HOC(Productshow)
