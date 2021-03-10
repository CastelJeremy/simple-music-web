import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

const styles = (theme) => ({
    appIcon: {
        marginRight: theme.spacing(2.5),
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
                <Toolbar>
                    <LibraryMusicIcon className={this.props.classes.appIcon} />

                    <Typography
                        variant="h6"
                        className={this.props.classes.title}
                    >
                        SimpleMusic
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Nav);
