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
import Image from 'next/image';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'
import { DataGrid } from '@mui/x-data-grid';
import { DateRange } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import date from 'date-and-time';
import Paper from '@mui/material/Paper';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  if(props.pageNumber === 1) {return (<div><MagicEdenPage /></div>);}
  if(props.pageNumber === 2) {return (<div>Solsea - todo </div>);}
  if(props.pageNumber === 3) {return (<div>Solanart - todo </div>);}
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

function displayNiceTitle(myString)
{
  var rv = []
  var toCaps = 1;
  for (let index = 0; index < myString.length; index++) {
    const element = myString[index];
    if (toCaps === 1)
    {
      rv.push(element.toUpperCase());
      toCaps = 0;
    }
    else
    {
      rv.push(element);
    }
    
    if (element === ' ')
    {
      toCaps = 1;
    }
  }
  return rv.join('');
}

function MagicEdenPage()
{
  const [data,setData] = useState("")
  React.useEffect(() => {
    axios.get("/api/getMagicEdenSales").then (response => {
      setData(response);
    }).catch (error => {
      console.log(error);
    })
  },[])

  if (data === "") return (<div><CircularProgress /></div>);

  // manipulating the data -- start

  var projectDatabase = {}
  var latestDate = undefined
  var latestDateMonth = undefined
  var latestDateMonthCalc = undefined

  data.data.forEach( row => {
    var dateParsed = new Date(row.DAY_DATE)

    if (latestDate === undefined || date.subtract(dateParsed,latestDate).toSeconds > 0)
    {
      latestDate = dateParsed;
    }



    if (projectDatabase[row.PROJECT_NAME] === undefined)
    {
      projectDatabase[row.PROJECT_NAME] = {}
    }

    projectDatabase[row.PROJECT_NAME][dateParsed] = row.SUM_SALES_PRICE
    projectDatabase[row.PROJECT_NAME]['c' + dateParsed] = row.COUNT_NFT_SALES
    
    
    var dateMonth = dateParsed.getFullYear() + '-' + dateParsed.getMonth().toString().padStart(2,'0')
    var dateMonthCalc = dateParsed.getFullYear() * 12 + dateParsed.getMonth()
    
    if (latestDateMonthCalc === undefined || dateMonthCalc > latestDateMonthCalc)
    {
      latestDateMonth = dateMonth;
      latestDateMonthCalc = dateMonthCalc
    }

    if (projectDatabase[row.PROJECT_NAME][dateMonth] === undefined)
    {
      projectDatabase[row.PROJECT_NAME][dateMonth] = 0;
      projectDatabase[row.PROJECT_NAME]['c' + dateMonth] = 0;
    }
    projectDatabase[row.PROJECT_NAME][dateMonth] += row.SUM_SALES_PRICE;
    projectDatabase[row.PROJECT_NAME]['c' + dateMonth] += row.COUNT_NFT_SALES
    
  })

  console.log(latestDate);
  console.log(projectDatabase);
  
  var dailyRows = []
  for (var element in projectDatabase) {
    var daily = projectDatabase[element][latestDate] === undefined ? 0 : Math.round(projectDatabase[element][latestDate]*100) / 100;
    var dailyCount = projectDatabase[element]['c' + latestDate] === undefined ? 0 : Math.round(projectDatabase[element]['c' + latestDate]*100) / 100;
    var monthlyCount = projectDatabase[element]['c' + latestDateMonth] === undefined ? 0 : projectDatabase[element]['c' + latestDateMonth];
    var monthly = projectDatabase[element][latestDateMonth] === undefined ? 0 : Math.round(projectDatabase[element][latestDateMonth]*100) / 100
    dailyRows.push({PROJECT_NAME:displayNiceTitle(element), DAILY_SALES:daily, MONTHLY_SALES:monthly, DAILY_COUNT:dailyCount, MONTHLY_COUNT:monthlyCount })
  }

  console.log(dailyRows);

  // manipulating the data -- end

  const gridColDef = [
    { field: 'PROJECT_NAME', headerName: 'NFT Collection', width: 250 },
    { field: 'DAILY_SALES', headerName: '24h Sales (SOL)', width: 150 },
    { field: 'MONTHLY_SALES', headerName: '30d Sales (SOL)', width: 150 },
    { field: 'DAILY_COUNT', headerName: '24h Sales (#)', width: 150 },
    { field: 'MONTHLY_COUNT', headerName: '30d Sales (#)', width: 150 },
  ];

  const chartOptions = {
    //indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'right',
      },
      title: {
        display: true,
        text: 'Daily Sales by Project',
      },
    },
  };

  const chartData = {
    labels: [1,2,3,4,5],
    datasets: [
      {
        label: 'Dataset 1',
        data: [5,5,5,5,5],
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Dataset 2',
        data: [5,5,5,5,5],
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Dataset 3',
        data: [5,5,5,5,5],
        backgroundColor: 'rgb(53, 162, 235)',
      },
    ],
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (<div style={{ height: 600, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Item><Bar options={chartOptions} data={chartData} height={null}/></Item>
              </Grid>
              <Grid item xs={3}>
                <Item><Bar options={chartOptions} data={chartData} height={null}/></Item>
              </Grid>
              <Grid item xs={3}>
                <Item><Bar options={chartOptions} data={chartData} height={null}/></Item>
              </Grid>
              <Grid item xs={3}>
                <Item><Bar options={chartOptions} data={chartData} height={null}/></Item>
              </Grid>
          </Grid>
          <br></br>
          <DataGrid autoPageSize rowHeight={25} getRowId={(row) => row.PROJECT_NAME + row.DAILY_SALES} rows={dailyRows} columns={gridColDef}></DataGrid>
          </div>
    );
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
            Solana NFT Sales
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
            <ListItem button key={'MagicEden'} onClick={() => setPage(1)}>
              <ListItemIcon>
                <Image src='/meLogo.png' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'MagicEden'} />
            </ListItem>
            <ListItem button key={'SolSea'} onClick={() => setPage(2)}>
              <ListItemIcon>
              <Image src='/solsea.jpg' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'SolSea'} />
            </ListItem>
            <ListItem button key={'Solanart'} onClick={() => setPage(3)}>
              <ListItemIcon>
              <Image src='/solanart.jpeg' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'Solanart'} />
            </ListItem>
            <ListItem button key={'Your Next Project'} onClick={() => setPage(4)}>
              <ListItemIcon>
              <Image src='/opensea.png' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'Your Next Project'} />
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
