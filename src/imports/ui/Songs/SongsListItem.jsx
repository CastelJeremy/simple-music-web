import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    container: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1, 2),
        textAlign: 'left',
        display: 'flex',
    },
    content: {
        flexGrow: 1,
    },
});

class SongsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper className={this.props.classes.container}>
                <div className={this.props.classes.content}>
                    <Typography variant="h6">
                        {this.props.song.getName()}
                    </Typography>

                    <Typography variant="subtitle2">
                        {this.props.song.getLengthFormated()}
                    </Typography>
                </div>

                <div>
                    <IconButton
                        onClick={() => this.props.onEdit(this.props.song)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        onClick={() => this.props.onDelete(this.props.song)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(SongsListItem);
