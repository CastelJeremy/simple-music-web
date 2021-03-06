import React from 'react';
import {
    AppBar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Popover,
    Toolbar,
    Typography,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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

        this.state = {
            open: false,
            anchor: null,
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen(event) {
        this.setState({
            open: true,
            anchor: event.currentTarget,
        });
    }

    handleClose() {
        this.setState({
            open: false,
        });
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

                    <IconButton onClick={this.handleOpen}>
                        <MoreVertIcon />
                    </IconButton>

                    <Popover
                        anchorEl={this.state.anchor}
                        disableRestoreFocus={true}
                        onClose={this.handleClose}
                        open={this.state.open}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <List>
                            <ListItem
                                button
                                onClick={() => {
                                    this.handleClose();
                                    this.props.onCreate();
                                }}
                            >
                                <ListItemText>Add a Song</ListItemText>
                            </ListItem>

                            <ListItem button onClick={this.props.onLogout}>
                                <ListItemText>Log Out</ListItemText>
                            </ListItem>
                        </List>
                    </Popover>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(SongsNav);
