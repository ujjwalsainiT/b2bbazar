import React, { useState, useEffect } from 'react'
import { Card } from '@material-ui/core';
import "./AddEmployee.css";

//common header
import HOC from "../../../Common/HOC";

//------------------------table-------------------------
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { withStyles, makeStyles } from "@material-ui/core/styles";

//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import Loder from '../../../Loder/Loder';
import { showNotificationMsz } from "../../../utils/Validation";

function EmployeeList(props) {

    //local state
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [EmployeeListArr, setEmployeeListArr] = useState([])
    const [isloading, setisloading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        //to get data of News type
        const getNewstypeData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "getEmployee";
                axios
                    .get(url)
                    .then(
                        (res) => {
                            setisloading(false)
                            setEmployeeListArr(res.data)
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
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <div className="content_padding">
                <div className="mb-3 page_heading">Employee List</div>
                <Card className="p-3 Card_shadow">
                    <div className="text-right">
                        <span className="addEmployee_font" onClick={() => props.history.push("/add-employee", { pageType: "Add" })}> <i className="fa fa-plus-circle mr-1"></i> Add Employee</span>
                    </div>
                    {/* --------------------list of users-------------- */}
                    <div className="table_foramtitng mt-2">
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>

                                        <StyledTableCell align="left" className="table_header">
                                            Name
                                        </StyledTableCell>
                                        <StyledTableCell align="left" className="table_header">
                                            Email
                                        </StyledTableCell>
                                        <StyledTableCell align="left" className="table_header">
                                            Date of birth
                                        </StyledTableCell>
                                        <StyledTableCell align="left" className="table_header">
                                            Action
                                        </StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? EmployeeListArr.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        : EmployeeListArr
                                    ).map((row) => (
                                        <StyledTableRow>
                                            <StyledTableCell align="left">
                                                {row.firstname + " " + row.lastname}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                {row.email}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                {row.dob}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <div className="d-flex">
                                                    <span className="text-info "><i className="fa fa-edit hover_cursor" onClick={() => props.history.push("/add-employee", { pageType: "Edit", row })} /></span>
                                                    <span className="text-info ml-3"><i className="fa fa-trash hover_cursor" /></span>
                                                    <span className="text-info ml-3 hover_cursor">Asign Task</span>
                                                </div>
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                true
                                rowsPerPageOptions={false}
                                component="div"
                                count={EmployeeListArr.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </div>
                    {/* -------------------------list of users---------------------- */}
                </Card>
            </div>

            <Loder loading={isloading} />
        </>
    )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default HOC(EmployeeList)
