import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        paddingLeft: '0px',
    },
    appIcon: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(2),
    },
    touchIcon: {
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(0.5),
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
            <AppBar position="fixed" color="secondary">
                <Toolbar className={this.props.classes.root}>
                    {!this.props.album ? (
                        <LibraryMusicIcon
                            className={this.props.classes.appIcon}
                        />
                    ) : (
                        <IconButton
                            className={this.props.classes.touchIcon}
                            onClick={this.props.back}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    )}

                    <Typography
                        variant="h6"
                        className={this.props.classes.title}
                    >
                        {!this.props.album
                            ? 'SimpleMusic'
                            : this.props.album.getName()}
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
