import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AlbumsItem from './AlbumsItem.jsx';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(1),
        width: '100%',
    },
});

class AlbumsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.classes.root}>
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
