import React from 'react';
import { ButtonBase, IconButton, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    fill: {
        marginBottom: theme.spacing(1),
        width: '100%',
        textAlign: 'left',
    },
    container: {
        width: '100%',
        padding: theme.spacing(1, 2),
    },
});

class SongsItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ButtonBase
                className={this.props.classes.fill}
                onClick={() => this.props.onClick(this.props.song)}
            >
                <Paper className={this.props.classes.container}>
                    <Typography variant="h6">
                        {this.props.song.getName()}
                    </Typography>
                    <Typography variant="subtitle2">
                        {this.props.song.getLengthFormated()}
                    </Typography>
                </Paper>
            </ButtonBase>
        );
    }
}

export default withStyles(styles)(SongsItem);