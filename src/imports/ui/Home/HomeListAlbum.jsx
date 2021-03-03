import React from 'react';
import HomeItemAlbum from './HomeItemAlbum.jsx';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(1),
        width: '100%',
    },
});

class HomeListAlbum extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.classes.root}>
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
