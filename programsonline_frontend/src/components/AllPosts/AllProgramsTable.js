import React from "react";

import { Box } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from '@material-ui/core/styles';

import ProgramsCategoryRow from './ProgramsCategoryRow';
import ProgramsRow from './ProgramsRow';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: "600px",
        [theme.breakpoints.down('md')]: {
            minWidth: 0
        },
    }
}));

export default function AllProgramsTable(props) {
    const classes = useStyles();

    const searchText = props.searchText;
    let searchTextPruning = searchText.charAt(0).toUpperCase() + searchText.substr(1);
    const rows = [];
    let lastCategory = null;

    props.programs_list.forEach((program) => {
        if (program.title.indexOf(searchTextPruning) === -1) {
            return;
        }
        if (program.tag !== lastCategory) {
            rows.push(
                <ProgramsCategoryRow
                    category={program.tag}
                    key={program.id}
                />
            );
        }
        rows.push(
            <ProgramsRow
                program={program}
                key={program.title}
            />
        );
        lastCategory = program.tag;
    })

    return (
        <Box >
            <Paper className={classes.paper} >
                <Table className={classes.table}>
                    <TableBody >
                        {rows}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    )
}