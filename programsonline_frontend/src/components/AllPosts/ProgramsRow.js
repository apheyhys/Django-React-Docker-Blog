import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Link as SideLink } from "@material-ui/core/";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    span: {
        float: "right",
    }
}));

export default function ProgramsRow(props) {
    const program = props.program;
    const classes = useStyles();
    const truncateUrl = require('truncate-url');

    return (
        <TableRow key={program.title} hover={true} >
            <TableCell>
                <Typography variant="body2" gutterBottom>
                    <SideLink href={program.url} target="_blank">
                        {truncateUrl(program.url, 30)}
                    </SideLink>
                    {"  -  "}{program.title}
                    <span className={classes.span} >
                    <RouterLink to={`/${program.slug}`}>
                            Подробнее...
                    </RouterLink>
                    </span>
                </Typography>
            </TableCell>
        </TableRow>
    )
}