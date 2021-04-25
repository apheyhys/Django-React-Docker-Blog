import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    categoryRow: {
        backgroundColor: "#f5f5f5"
    }
}));

export default function ProgramsCategoryRow(props) {
    const classes = useStyles();

    const category = props.category;


    return (
        <TableRow
            key={props.id}
            className={classes.categoryRow}
        >
            <TableCell
                component="th"
                scope="row"
                align="center"
                variant="head"
                colSpan={2}
            >
                <Typography variant="body2" gutterBottom>
                    {category}
                </Typography>
            </TableCell>
        </TableRow>
    )
}