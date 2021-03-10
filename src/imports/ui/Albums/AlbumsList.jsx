import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import AlbumsListItem from './AlbumsListItem.jsx';

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(1),
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
                    <AlbumsListItem
                        album={album}
                        key={album.getId()}
                        onEdit={this.props.onEdit}
                        onDelete={this.props.onDelete}
                    />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(AlbumsList);
