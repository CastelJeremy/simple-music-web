import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { navigate } from '@reach/router';

const styles = (theme) => ({
    nav: {
        paddingLeft: theme.spacing(1.5),
    },
    backIcon: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
});

class SongsNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar position="fixed" color="secondary">
                <Toolbar className={this.props.classes.nav}>
                    <IconButton
                        className={this.props.classes.backIcon}
                        onClick={() => navigate('/albums')}
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    {this.props.album ? (
                        <Typography
                            variant="h6"
                            className={this.props.classes.title}
                        >
                            {this.props.album.getName()}
                        </Typography>
                    ) : (
                        <div className={this.props.classes.title}></div>
                    )}

                    <IconButton onClick={this.props.onLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(SongsNav);
