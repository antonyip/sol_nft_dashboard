import styles from '../styles/Home.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//import AlarmIcon from '@mui/icons-material';
//import Facebook from '@mui/icons-material';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

function Pages(props) {

  if(props.pageNumber === 0) {return (<div>Solana NFT Dashboard - https://flipsidecrypto.xyz/drops/3adspO7EM1pL89AKI5hbTD</div>);}
  if(props.pageNumber === 1) {return (<div><RipOffFlipside /></div>);}

  return (
    <Typography paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
      enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
      imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
      Convallis convallis tellus id interdum velit laoreet id donec ultrices.
      Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
      adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
      nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
      leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
      feugiat vivamus at augue. At augue eget arcu dictum varius duis at
      consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
      sapien faucibus et molestie ac.
    </Typography>
  );
}

const Mgai = '<iframe src="https://velocity-app.flipsidecrypto.com/velocity/visuals/bac22296-7b96-4122-8b4c-3e00e74543ab/1d3eb78f-f38c-45dd-85f3-7c81dca56138" width="100%" height="600"></iframe>';

function RipOffFlipside() {
  return <div dangerouslySetInnerHTML={{__html: Mgai}} />;
}

function PermanentDrawerLeft() {
  const [page, setPage] = useState(0);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Solana Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
            <ListItem button key={'About'} onClick={() => setPage(0)}>
              <ListItemIcon>
              <IconButton color="secondary" aria-label="add an alarm">
                
              </IconButton>
              </ListItemIcon>
              <ListItemText primary={'About'} />
            </ListItem>
        </List>
        <Divider />
        <List>
          {/* {['MagicEden', 'SolSea', 'Solanart'].map((text, index) => ( */}
            <ListItem button key={'MagicEden'} onClick={() => setPage(1)}>
              <ListItemIcon>
                
              </ListItemIcon>
              <ListItemText primary={'MagicEden'} />
            </ListItem>
            <ListItem button key={'SolSea'} onClick={() => setPage(2)}>
              <ListItemIcon>
                I
              </ListItemIcon>
              <ListItemText primary={'SolSea'} />
            </ListItem>
            <ListItem button key={'MagicEden'} onClick={() => setPage(3)}>
              <ListItemIcon>
                I
              </ListItemIcon>
              <ListItemText primary={'MagicEden'} />
            </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Pages pageNumber={page}></Pages>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <PermanentDrawerLeft />
    </div>
  )
}
