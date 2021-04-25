import axios from 'axios'
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { Box } from '@material-ui/core';

import { ALL_ARTICLE_PATH } from "../../constants/constant";
import AllProgramsTable from './AllProgramsTable';
import SearchBarAllPrograms from './SearchBarAllPrograms';

export default function AllPosts(props) {
    const [result, setResult] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            const result = await axios(ALL_ARTICLE_PATH);
            if (!ignore)
                setResult(result.data);
        }
        fetchData();
        return () => {
            ignore = true;
        }
    }, []);

    function handleSearchTextChange(filterText) {
        setSearchText(filterText)
    }

    return (
        <Box mr={1}>
            <Fragment >
                <Helmet>
                    <title>ProgramsOnline - Список онлайн сервисов</title>
                    <meta name="description" content="Список всех онлайн сервисов" />
                </Helmet>
                <SearchBarAllPrograms
                    searchText={searchText}
                    onSearchTextChange={handleSearchTextChange}
                />
                <AllProgramsTable
                    searchText={searchText}
                    programs_list={result}
                />
            </Fragment>
        </Box>
    )
}