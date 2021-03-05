import React, { Fragment } from 'react';
import {
    CircularProgress,
    IconButton,
    Popover,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import SignalCellularConnectedNoInternet0BarIcon from '@material-ui/icons/SignalCellularConnectedNoInternet0Bar';

import { ping } from '../../api/requestHandler.js';

const styles = (theme) => ({
    loader: {
        marginRight: theme.spacing(1),
    },
    popover: {
        padding: theme.spacing(1),
    },
});

class NavStatus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serverStatus: null,
            popoverAnchor: null,
            popoverText: null,
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen(event, text) {
        this.setState({
            popoverAnchor: event.currentTarget,
            popoverText: text,
        });
    }

    handleClose() {
        this.setState({
            popoverText: null,
        });
    }

    async componentDidMount() {
        this.setState({
            serverStatus: await ping(),
        });
    }

    render() {
        return (
            <Fragment>
                {this.state.serverStatus === null ? (
                    <CircularProgress
                        size="32px"
                        className={this.props.classes.loader}
                    />
                ) : (
                    <Fragment>
                        {this.state.serverStatus === true ? (
                            <IconButton
                                onClick={(event) =>
                                    this.handleOpen(event, 'Service Available')
                                }
                            >
                                <DoneAllIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={(event) =>
                                    this.handleOpen(
                                        event,
                                        'Service Down'
                                    )
                                }
                            >
                                <SignalCellularConnectedNoInternet0BarIcon />
                            </IconButton>
                        )}

                        <Popover
                            anchorEl={this.state.popoverAnchor}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            onClose={this.handleClose}
                            open={Boolean(this.state.popoverText)}
                            transformOrigin={{
                                horizontal: 'right',
                            }}
                        >
                            <Typography className={this.props.classes.popover}>
                                {this.state.popoverText}
                            </Typography>
                        </Popover>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

export default withStyles(styles)(NavStatus);
