import React, { Fragment } from "react";

import TextField from "@material-ui/core/TextField";

export default function SearchBarAllPrograms(props) {
    function handleSearchTextChange(e) {
        props.onSearchTextChange(e.target.value)
    }

    return (
        <Fragment>
            <form noValidate autoComplete="off">
                <TextField
                    fullWidth
                    id="outlined-search"
                    label="Поиск"
                    type="search"
                    margin="normal"
                    variant="outlined"
                    value={props.searchText}
                    onChange={handleSearchTextChange}
                />
            </form>
        </Fragment>
    )
}