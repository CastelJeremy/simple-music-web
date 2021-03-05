import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = (theme) => ({
    appIcon: {
        marginRight: theme.spacing(2.5),
    },
    title: {
        flexGrow: 1,
    },
});

class AlbumsNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <LibraryMusicIcon className={this.props.classes.appIcon} />

                    <Typography
                        variant="h6"
                        className={this.props.classes.title}
                    >
                        SimpleMusic
                    </Typography>

                    <IconButton onClick={this.props.onLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(AlbumsNav);
