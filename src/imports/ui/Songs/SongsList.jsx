import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SongsListItem from './SongsListItem.jsx';

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(1),
    },
});

class SongsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                {this.props.songs.map((song) => (
                    <SongsListItem
                        onDelete={this.props.onDelete}
                        song={song}
                        key={song.getId()}
                    />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(SongsList);
