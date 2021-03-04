import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SongsItem from './SongsItem.jsx';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(1),
        width: '100%',
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
                    <SongsItem
                        onClick={this.props.onClick}
                        song={song}
                        key={song.getId()}
                    />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(SongsList);
