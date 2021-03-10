import React from 'react';
import { ButtonBase, IconButton, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';

const styles = (theme) => ({
    container: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1, 2),
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    },
    text: {
        width: '100%',
    },
});

class AlbumsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper className={this.props.classes.container}>
                <ButtonBase
                    className={this.props.classes.content}
                    onClick={() =>
                        navigate(`/albums/${this.props.album.getId()}`)
                    }
                >
                    <Typography
                        variant="h6"
                        className={this.props.classes.text}
                    >
                        {this.props.album.getName()}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        className={this.props.classes.text}
                    >
                        {this.props.album.getAuthor()}
                    </Typography>
                </ButtonBase>

                <div>
                    <IconButton
                        onClick={() => this.props.onEdit(this.props.album)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => this.props.onDelete(this.props.album)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(AlbumsListItem);
