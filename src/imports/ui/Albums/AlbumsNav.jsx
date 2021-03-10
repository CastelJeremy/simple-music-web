import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
                <Toolbar>
                    <LibraryMusicIcon className={this.props.classes.appIcon} />

                    <Typography
                        variant="h6"
                        className={this.props.classes.title}
                    >
                        SimpleMusic
                    </Typography>

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
                                <ListItemText>Add Album</ListItemText>
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

export default withStyles(styles)(AlbumsNav);
