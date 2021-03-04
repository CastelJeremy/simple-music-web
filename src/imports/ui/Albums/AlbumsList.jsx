import React from 'react';
import AlbumsItem from './AlbumsItem.jsx';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(1),
        width: '100%',
    },
    title: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
        display: 'inline-block',
    },
});

class AlbumsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Paper className={this.props.classes.title}>
                    <Typography variant="h5">Albums</Typography>
                </Paper>

                {this.props.albums.map((album) => (
                    <AlbumsItem
                        onClick={this.props.onClick}
                        album={album}
                        key={album.getId()}
                    />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(AlbumsList);
