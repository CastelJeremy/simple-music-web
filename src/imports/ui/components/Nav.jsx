import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    appIcon: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <LibraryMusicIcon
                        className={this.props.classes.appIcon}
                    />

                    <Typography
                        variant="h6"
                        className={this.props.classes.title}
                    >
                        SimpleMusic
                    </Typography>
                    {this.props.user && (
                        <IconButton
                            color="inherit"
                            onClick={() => this.props.handleLogout()}
                        >
                            <ExitToAppIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Nav);
