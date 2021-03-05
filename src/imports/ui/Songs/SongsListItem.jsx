import React from 'react';
import { IconButton, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    container: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1, 2),
        textAlign: 'left',
    },
});

class SongsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper className={this.props.classes.container}>
                <Typography variant="h6">
                    {this.props.song.getName()}
                </Typography>

                <Typography variant="subtitle2">
                    {this.props.song.getLengthFormated()}
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(SongsListItem);
