import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { StoreMallDirectoryOutlined } from '@material-ui/icons';
import StorageIcon from '@material-ui/icons/Storage';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import { Link } from 'react-router-dom';

const drawerWidth = "2000";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginLeft: 1,
    },
    drawer: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: "2%",
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    }
}));
interface AdminSidebarProps {
    open: boolean,
    handleDrawer: () => void
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, handleDrawer }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <CssBaseline />

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >

                {open
                    ?
                    <IconButton onClick={handleDrawer} style={{ marginTop: "60px" }}>
                        <ChevronLeftIcon />
                    </IconButton>
                    :
                    <IconButton
                        style={{ marginTop: "60px" }}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        edge="start"
                        className={clsx(classes.menuButton)}
                    >
                        <MenuIcon />
                    </IconButton>

                }
                <Divider />
                <List>
                    <Link to="/adminPanel/products">
                        <ListItem  >
                            <ListItemIcon>
                                <StoreMallDirectoryOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Prodotti" />
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link to="/adminPanel/orders">
                        <ListItem  >
                            <ListItemIcon>
                                <StorageIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ordini" />
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link to="/adminPanel/users">
                        <ListItem  >
                            <ListItemIcon>
                                <PeopleAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Utenti" />
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link to="/adminPanel/products">
                        <ListItem  >
                            <ListItemIcon>
                                <PeopleAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Prodotti" />
                        </ListItem>
                    </Link>
                    <Divider />
                </List>


            </Drawer>

        </div>
    );
}
