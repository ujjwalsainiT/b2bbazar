import React, { useState, useEffect } from 'react'
import { Card } from '@material-ui/core';

//common header
import HOC from "../../../Common/HOC";


function Statistics(props) {
    const [Statistics] = useState([
        { name: "Delar" },
        { name: "Buyer" },
        { name: "Distributor" },
        { name: "Wholeshaler" },
    ]);

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [])





    return (
        <>
            <div className="content_padding">

                <div className="mb-3 page_heading">Statistics</div>
                <Card className="pt-3 pb-4 Card_shadow">


                    <div className="card_admissiondetails_height mt-4">
                        <div className="textfiled_margin cardheight_overflow">

                            <hr />
                            {Statistics.length > 0 ?
                                (Statistics.map((item, index) => (
                                    <Card className="Card_shadow mb-2 mt-2">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <div className="d-flex justify-content-between">

                                                    <div className=" p-2">
                                                        {item.name}
                                                    </div>

                                                    {" "}
                                                    <div className="d-flex p-2">
                                                        <span className="action_icon ml-2">
                                                            View User
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

        </>
    )
}

export default HOC(Statistics)
