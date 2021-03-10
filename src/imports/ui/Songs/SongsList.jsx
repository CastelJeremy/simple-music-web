import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

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
                        onEdit={this.props.onEdit}
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
