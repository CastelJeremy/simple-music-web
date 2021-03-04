import React from 'react';
import HomeItemAlbum from './HomeItemAlbum.jsx';
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

class HomeListAlbum extends React.Component {
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
                    <HomeItemAlbum
                        onClick={this.props.onClick}
                        album={album}
                        key={album.getId()}
                    />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(HomeListAlbum);
