import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import { getCurrentUser } from '../../logic/api';
import { logOut } from '../../logic/auth';

import { useUser, useSetUser } from '../UserProvider/UserProvider';

import Style from '../Style/Style';

const HideOnScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const NavigationBarAndDrawer = (props) => {
  const { container } = props;
  const history = useHistory();
  const style = Style();

  const user = useUser();
  const setUser = useSetUser();

  useEffect(() => {
    getCurrentUser()
      .then(data => setUser(data.user))
      .catch(error => console.log(error));
  }, [setUser]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    user ? (
      <Fragment>
        <List>
          <ListItem button onClick={() => {
            history.push(`/users/${user._id}`);
            handleDrawerToggle();
          }}>
            <ListItemAvatar>
              <Avatar alt={`${user.name}'s avatar`} src={user.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
            />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => {
            history.push('/');
            handleDrawerToggle();
          }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Home"
            />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => {
            history.push('/events/new');
            handleDrawerToggle();
          }}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              primary="New event"
            />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => {
            history.push(`/users/${user._id}`);
            handleDrawerToggle();
          }}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
            />
          </ListItem>
          <ListItem button onClick={() => {
            logOut();
            history.push('/welcome');
          }}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              primary="Log out"
            />
          </ListItem>
        </List>
      </Fragment>
    ) : (
      <CircularProgress />
    )
  );

  return (
    <Fragment>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Link
              variant="h4"
              color="inherit"
              underline="none"
              href="/"
            >
              Tisn
            </Link>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <SwipeableDrawer
        anchor="left"
        container={container}
        open={drawerOpen}
        onOpen={handleDrawerToggle}
        onClose={handleDrawerToggle}
        classes={{
          paper: style.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        {drawer}
      </SwipeableDrawer>
    </Fragment>
  );
};

export default NavigationBarAndDrawer;