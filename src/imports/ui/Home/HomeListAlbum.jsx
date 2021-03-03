import React from 'react';
import HomeItemAlbum from './HomeItemAlbum.jsx';

class HomeListAlbum extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
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

export default HomeListAlbum;
