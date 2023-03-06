import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import AuthorApi from "../../Services/admin.author.services";
import { useTable } from "react-table";
import { Link } from 'react-router-dom';

const AuthorTable = (props) => {
    const [tutorials, setTutorials] = useState([]);
    const [error, setSetError] = useState('');
    const [searchTitle, setSearchTitle] = useState("");

    const tutorialsRef = useRef();
    tutorialsRef.current = tutorials;

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const pageSizes = [3, 6, 9];



    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const getRequestParams = (searchTitle, page, pageSize) => {
        let params = {};

        if (searchTitle) {
            params["title"] = searchTitle;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    const retrieveTutorials = () => {
        const params = getRequestParams(searchTitle, page, pageSize);

        AuthorApi.getAllAuthors().then(authors => {
            // var PageCount = Math.ceil(((authors.data.TotalAuthors) / (params.size)))
            console.log("authors", authors)
            setTutorials(authors.data.Result);
            // setCount(PageCount);
        }).catch(err => console.log("error", err.response.data.message))
    };

    useEffect(retrieveTutorials, [page, pageSize]);

    const refreshList = () => {
        retrieveTutorials();
    };

    // const removeAllTutorials = () => {
    //     AuthorApi.removeAll()
    //         .then((response) => {
    //             console.log(response.data);
    //             refreshList();
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // };

    const findByTitle = () => {
        setPage(1);
        retrieveTutorials();
    };

    const openTutorial = (rowIndex) => {
        const id = tutorialsRef.current[rowIndex].id;

        props.history.push("/users/" + id);
    };

    const deleteTutorial = (rowIndex) => {
        const id = tutorialsRef.current[rowIndex]._id;

        AuthorApi.softDeleteAuthor(id).then((response) => {
            // props.history.push("/tutorials");
            // console.log("delete", response);
            window.location.reload();
        })
            .catch((e) => {
                console.log(e);
            });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    const columns = useMemo(
        () => [
            {
                Header: "Author Name",
                accessor: "name",
            },
            {
                Header: "UserName",
                accessor: "username",
            },
            {
                Header: "Status",
                accessor: "isActive",
                Cell: (props) => {
                    return props.value ? "Active" : "Inactive";
                },
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <Link to={`/authors/editauthor/${tutorialsRef.current[rowIdx]._id}`}>
                                <i className="mdi mdi-lead-pencil action mr-2">Edit</i>
                            </Link>
                            {/* <i className="fas fa-edit"></i>
                            <span onClick={() => deleteTutorial(rowIdx)} style={{ cursor: "pointer" }}>
                                <i className="fas fa-trash action">Remove</i>
                                <i className="mdi mdi-delete action">Remove</i>
                            </span> */}
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: tutorials,
    });

    return (
        <div className="list row">
            {/* <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div> */}

            {tutorials.length > 0 ?
                (<div className="col-md-12 list">
                    <div className="mt-3">
                        {"Items per Page: "}
                        <select onChange={handlePageSizeChange} value={pageSize}>
                            {pageSizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>

                        <Pagination
                            className="my-3"
                            count={count}
                            page={page}
                            siblingCount={1}
                            boundaryCount={1}
                            variant="outlined"
                            shape="rounded"
                            onChange={handlePageChange}
                        />
                    </div>
                    <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">All Authors</h4>
                                    <div className="table-responsive">
                                        <table
                                            className="table table-striped table-bordered"
                                            {...getTableProps()}
                                        >
                                            <thead>
                                                {headerGroups.map((headerGroup) => (
                                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                                        {headerGroup.headers.map((column) => (
                                                            <th {...column.getHeaderProps()}>
                                                                {column.render("Header")}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </thead>
                                            <tbody {...getTableBodyProps()}>
                                                {rows.map((row, i) => {
                                                    prepareRow(row);
                                                    return (
                                                        <tr {...row.getRowProps()}>
                                                            {row.cells.map((cell) => {
                                                                return (
                                                                    <>
                                                                        {cell.column.Header == 'Status' ?
                                                                            <>
                                                                                {cell.value === true ?
                                                                                    <td {...cell.getCellProps()}>
                                                                                        <label className="badge badge-gradient-success">Active</label>
                                                                                    </td>
                                                                                    :
                                                                                    <>
                                                                                        <td {...cell.getCellProps()}>
                                                                                            <label className="badge badge-gradient-danger">Inactive</label>
                                                                                        </td>
                                                                                    </>}
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                                            </>
                                                                        }
                                                                    </>
                                                                );
                                                            })}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
                :
                (<>
                    No Authors Avalibles
                </>)}

            {/* <div className="col-md-8">
                <button className="btn btn-sm btn-danger" onClick={removeAllTutorials}>
                    Remove All
                </button>
            </div> */}
        </div>
    );
};

export default AuthorTable;
