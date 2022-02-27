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
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

var colors = [
  '#F63E36',
  '#D42F6B',
  '#EB3FD3',
  '#B32FD4',
  '#9B36F6',
  '#F6532C',
  '#D46126',
  '#EB8D36',
  '#D49126',
  '#F6BD2C',
  '#F6D32C',
  '#D4C726',
  '#D8EB37',
  '#86D426',
  '#55F62C',
  '#2CF684',
  '#26D4A3',
  '#35EAEB',
  '#26A6D4',
  '#2C8CF6',
  '#2F58F6',
]

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

function AboutPage()
{
  return (<div><Card><CardHeader title="Solana NFT Dashboard"></CardHeader>
    <CardContent>
      <p>Bounty Description - <a target="_blank" rel="noreferrer" href='https://flipsidecrypto.xyz/drops/3adspO7EM1pL89AKI5hbTD'>https://flipsidecrypto.xyz/drops/3adspO7EM1pL89AKI5hbTD</a></p>
      <p>This dashboard shows the Sales of the NFT projects on the various Solana NFT Marketplaces. Feel free to explore the data!</p>
      
      <a target="_blank" rel="noreferrer" href='https://flipsidecrypto.xyz'><Image alt="" height={40} width={264} src="/powered.png"></Image></a>
    </CardContent>
    </Card></div>);
}

function Pages(props) {

  if(props.pageNumber === 0) {return (<div><AboutPage /></div>);}
  if(props.pageNumber === 1) {return (<div><MagicEdenPage /></div>);}
  if(props.pageNumber === 2) {return (<div><SolSeaPage /></div>);}
  if(props.pageNumber === 3) {return (<div><SolartPage /></div>);}
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


  function generateChartOptions(myVar) {
    return {
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
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
          text: myVar,
        },
      },
    };
  }

  function generatePieOptions(myVar) {
    return {
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'right',
        },
        title: {
          display: true,
          text: myVar,
        },
      },
    };
  }

  // manipulating the data -- start

  var projectDatabase = {}
  var latestDate = undefined
  var latestDateMonth = undefined
  var latestDateMonthCalc = undefined

  

  var uniqueDate = {}
  var last7DaysSorted_i = [0,0,0,0,0,0,0];

  data.data.forEach( row => {
    var dateParsed = new Date(row.DAY_DATE)

    if (latestDate === undefined || date.subtract(dateParsed,latestDate).toSeconds > 0)
    {
      latestDate = dateParsed;
    }

    uniqueDate[dateParsed.getTime()] = 1;


    if (projectDatabase[row.PROJECT_NAME] === undefined)
    {
      projectDatabase[row.PROJECT_NAME] = {}
    }

    projectDatabase[row.PROJECT_NAME][dateParsed] = row.SUM_SALES_PRICE
    projectDatabase[row.PROJECT_NAME][dateParsed.getTime()] = row.SUM_SALES_PRICE
    projectDatabase[row.PROJECT_NAME]['c' + dateParsed] = row.COUNT_NFT_SALES
    projectDatabase[row.PROJECT_NAME]['c' + dateParsed.getTime()] = row.COUNT_NFT_SALES
    
    
    var dateMonth = dateParsed.getFullYear() + '-' + dateParsed.getMonth().toString().padStart(2,'0')
    var dateMonthCalc = dateParsed.getFullYear() * 12 + dateParsed.getMonth()
    
    if (latestDateMonthCalc === undefined || dateMonthCalc > latestDateMonthCalc)
    {
      latestDateMonth = dateMonth;
      latestDateMonthCalc = dateMonthCalc
    }

    if( projectDatabase[row.PROJECT_NAME]['ts'] === undefined )
    {
      projectDatabase[row.PROJECT_NAME]['ts'] = 0
      projectDatabase[row.PROJECT_NAME]['tc'] = 0
    }

    if (projectDatabase[row.PROJECT_NAME][dateMonth] === undefined)
    {
      projectDatabase[row.PROJECT_NAME][dateMonth] = 0;
      projectDatabase[row.PROJECT_NAME]['c' + dateMonth] = 0;
    }
    projectDatabase[row.PROJECT_NAME][dateMonth] += row.SUM_SALES_PRICE;
    projectDatabase[row.PROJECT_NAME]['c' + dateMonth] += row.COUNT_NFT_SALES;
    projectDatabase[row.PROJECT_NAME]['ts'] += row.SUM_SALES_PRICE;
    projectDatabase[row.PROJECT_NAME]['tc'] += row.COUNT_NFT_SALES;
    
  })

  for (var key in uniqueDate) {
    var minTime = last7DaysSorted_i[0]
    var minTimeIndex = 0;

    last7DaysSorted_i.forEach((element,index) =>{
      if (minTime > element)
      {
        minTime = element
        minTimeIndex = index
      }
    })
    //console.log(key);
    var ldate = new Date(key / 1000);
    if (ldate.getTime() > minTime)
    {
      last7DaysSorted_i[minTimeIndex] = ldate.getTime()
    }
  }



  //console.log(latestDate);
  //console.log(last7DaysSorted_i);
  //console.log(projectDatabase);

  var dailyRows = []
  var minValues = [0,0,0,0,0,0,0,0,0,0];
  var projectNames = ["","","","","","","","","","",];
  
  for (var element in projectDatabase) {
    var daily = projectDatabase[element][latestDate] === undefined ? 0 : Math.round(projectDatabase[element][latestDate]*100) / 100;
    var dailyCount = projectDatabase[element]['c' + latestDate] === undefined ? 0 : Math.round(projectDatabase[element]['c' + latestDate]*100) / 100;
    var monthlyCount = projectDatabase[element]['c' + latestDateMonth] === undefined ? 0 : projectDatabase[element]['c' + latestDateMonth];
    var monthly = projectDatabase[element][latestDateMonth] === undefined ? 0 : Math.round(projectDatabase[element][latestDateMonth]*100) / 100
    var quartlyCount = projectDatabase[element]['tc'] === undefined ? 0 : projectDatabase[element]['tc'];
    var quartly = projectDatabase[element]['ts'] === undefined ? 0 : Math.round(projectDatabase[element]['ts']*100) / 100

    var currentMin = 99999999
    var minIndex = -1
    // get the minimum from the minValues
    minValues.forEach((element, index, array) => {
      if ( element < currentMin )
      {
        currentMin = element;
        minIndex = index;
      }
    })

    if (projectDatabase[element][latestDate] > currentMin)
    {
      if (element != 'others')
      {
        minValues[minIndex] = projectDatabase[element][latestDate];
        projectNames[minIndex] = element;
      }
    }

    dailyRows.push({
      PROJECT_NAME:displayNiceTitle(element),
      DAILY_SALES:daily,
      DAILY_COUNT:dailyCount,
      MONTHLY_SALES:monthly,
      MONTHLY_COUNT:monthlyCount,
      QUARTLY_SALES:quartly,
      QUARTLY_COUNT:quartlyCount,
    })
  }
  
  //console.log(minValues);
  //console.log(projectNames);

  //console.log(dailyRows);

  // manipulating the data -- end

  const gridColDef = [
    { field: 'PROJECT_NAME', headerName: 'NFT Collection', width: 250 },
    { field: 'DAILY_SALES', headerName: '24h Sales (SOL)', width: 200 },
    { field: 'DAILY_COUNT', headerName: '24h Sales (#)', width: 200 },
    { field: 'MONTHLY_SALES', headerName: '30d Sales (SOL)', width: 200 },
    { field: 'MONTHLY_COUNT', headerName: '30d Sales (#)', width: 200 },
    { field: 'QUARTLY_SALES', headerName: '90d Sales (SOL)', width: 200 },
    { field: 'QUARTLY_COUNT', headerName: '90d Sales (#)', width: 200 },
  ];

  const chartOptions1 = generateChartOptions("Daily Sales");
  const chartOptions2 = generatePieOptions("Total Volume Exchanged Today");
  const chartOptions3 = generatePieOptions("90 Day Highest Volume");
  const chartOptions4 = generateChartOptions("Best Sellers");
  const chartOptions5 = generatePieOptions("Number of NFTs Traded Over the last 90 days");

  var last7DaysSorted = last7DaysSorted_i.sort()
  //console.log(last7DaysSorted_i);
  //console.log(last7DaysSorted);
  const chartData1 = generateDailyChartData(projectNames, projectDatabase, last7DaysSorted);
  const chartData2 = generatePieData(projectDatabase,1,latestDate);
  const chartData3 = generatePieData(projectDatabase,2);
  const chartData4 = generateChartData(projectDatabase);
  const chartData5 = generatePieData(projectDatabase,3);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (<div style={{ height: 600, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Item><h2>MagicEden Marketplace</h2></Item>
              </Grid>
              <Grid item md={6}>
                <Item><Bar options={chartOptions4} data={chartData4} height={null}/></Item>
              </Grid>
              <Grid item md={6}>
                <Item><Bar options={chartOptions1} data={chartData1} height={null}/></Item>
              </Grid>
              <Grid item md={4}>
                <Item><Doughnut options={chartOptions2} data={chartData2} height={null}/></Item>
              </Grid>
              <Grid item md={4}>
                <Item><Doughnut options={chartOptions3} data={chartData3} height={null}/></Item>
              </Grid>
              <Grid item md={4}>
                <Item><Doughnut options={chartOptions5} data={chartData5} height={null}/></Item>
              </Grid>
          </Grid>
          <br></br>
          <DataGrid autoPageSize components={{ Toolbar: GridToolbar }} rowHeight={25} getRowId={(row) => row.PROJECT_NAME + row.DAILY_SALES} rows={dailyRows} columns={gridColDef}></DataGrid>
          </div>
    );


  function generateDailyChartData(projectNames, projectDatabase, last7DaysSorted)
  {
    var dataa = [[],[],[],[],[],[],[],[],[],[]]
    var others = []
    var datees = [];
    
    last7DaysSorted.forEach((element, index) => {
      datees.push(new Date(element*1000).toISOString().substr(0,10));
      var negativeSum = 0
      for (let i = 0; i < 10; i++) {

        if (projectNames[i] === "") continue;

        const interestedDate = last7DaysSorted[index]*1000;
        const projectStats = projectDatabase[projectNames[i]];

        if (projectStats[interestedDate] !== undefined)
        {
          dataa[i].push(projectStats[interestedDate]);
          negativeSum += projectStats[interestedDate]
        }
        else
        {
          dataa[i].push(0);
        }
      }

      var sumAll = 0;
      for (var key in projectDatabase)
      {
        sumAll += isNaN(projectDatabase[key][interestedDate]) ? 0 : projectDatabase[key][interestedDate];
      }
      sumAll -= negativeSum
      others.push(sumAll);
    })

    //console.log(last7DaysSorted)
    //console.log(dataa)
    //console.log(others);
    return {
      labels: datees,
      datasets: [
        {
          label: displayNiceTitle(projectNames[0]),
          data: dataa[0],
          backgroundColor: colors[0],
        },
        {
          label: displayNiceTitle(projectNames[1]),
          data: dataa[1],
          backgroundColor: colors[1],
        },
        {
          label: displayNiceTitle(projectNames[2]),
          data: dataa[2],
          backgroundColor: colors[2],
        },
        {
          label: displayNiceTitle(projectNames[3]),
          data: dataa[3],
          backgroundColor: colors[3],
        },
        {
          label: displayNiceTitle(projectNames[4]),
          data: dataa[4],
          backgroundColor: colors[4],
        },
        {
          label: displayNiceTitle(projectNames[5]),
          data: dataa[5],
          backgroundColor: colors[5],
        },
        {
          label: displayNiceTitle(projectNames[6]),
          data: dataa[6],
          backgroundColor: colors[6],
        },
        {
          label: displayNiceTitle(projectNames[7]),
          data: dataa[7],
          backgroundColor: colors[7],
        },
        {
          label: displayNiceTitle(projectNames[8]),
          data: dataa[8],
          backgroundColor: colors[8],
        },
        {
          label: displayNiceTitle(projectNames[9]),
          data: dataa[9],
          backgroundColor: colors[9],
        },
        {
          label: displayNiceTitle("Others"),
          data: others,
          backgroundColor: colors[10],
        },
        
      ],
    };
  }

  function generateChartData(projectDB) {

    var biggest = [0,0,0,0,0,0]
    var biggestNames = ["","","","","",""]
    var Sum = 0;
    for ( var element in projectDB )
    {
      var minElement = biggest[0]
      var minElementIndex = 0
      biggest.forEach((m,i) => {
        if (m < minElement)
        {
          minElement = m;
          minElementIndex = i;
        }
      })

      if (projectDB[element]['ts'] > minElement)
      {
        if (element != 'others')
        {
          biggest[minElementIndex] = projectDB[element]['ts'];
          biggestNames[minElementIndex] = displayNiceTitle(element);
        }
      }

      Sum += projectDB[element]['ts'];
      
    }

    return {
      labels: biggestNames,
      datasets: [
        {
          //label: 'Dataset 1',
          data: biggest,
          //backgroundColor: '#E68AC5',
          backgroundColor: colors
        },
      ],
    };
  }

  function generatePieData(projectDatabase, index, latestDate) {

    var xAxis = [1,2,3,4,5,6,7];
    var yAxis = [1,2,3,4,5,6,7,8,9,10];

    if (index === 1)
    {
      //Total Volume Exchanged Today
      var limit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
      var limitNames = ["","","","","","","","","","","","","","","","","","","","",]
      var sum = 0;
      for (element in projectDatabase)
      {
        sum += isNaN(projectDatabase[element][latestDate]) ? 0 : projectDatabase[element][latestDate]

        var minLimit = limit[0];
        var minLimitIndex = 0;
        limit.forEach((e,i) => {
          if (e < minLimit)
          {
            minLimit = e;
            minLimitIndex = i;
          }
        })

        if (projectDatabase[element][latestDate] > minLimit)
        {
          if (element != 'others')
          {
            limit[minLimitIndex] = projectDatabase[element][latestDate];
            limitNames[minLimitIndex] = displayNiceTitle(element);
          }
        }
      }

      limit.forEach(e => {
        sum -= e
      })
      //console.log(sum);
      limit.push(sum)
      limitNames.push("Others")

      xAxis = limitNames;
      yAxis = limit;
    }

    if (index === 2)
    {
      // 90 Day Volume
      var limit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
      var limitNames = ["","","","","","","","","","","","","","","","","","","","",]
      var sum = 0;
      for (element in projectDatabase)
      {
        sum += projectDatabase[element]['ts']

        var minLimit = limit[0];
        var minLimitIndex = 0;
        limit.forEach((e,i) => {
          if (e < minLimit)
          {
            minLimit = e;
            minLimitIndex = i;
          }
        })

        if (projectDatabase[element]['ts'] > minLimit)
        {
          if (element != 'others')
          {
            limit[minLimitIndex] = projectDatabase[element]['ts'];
            limitNames[minLimitIndex] = displayNiceTitle(element);
          }
        }
      }

      limit.forEach(e => {
        sum -= e;
      })

      limit.push(sum)
      limitNames.push("Others")

      xAxis = limitNames;
      yAxis = limit;
    }

    if (index === 3)
    {
      // Number of NFTs Traded
      var limit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
      var limitNames = ["","","","","","","","","","","","","","","","","","","","",]
      var sum = 0;
      for (element in projectDatabase)
      {
        sum += projectDatabase[element]['tc']

        var minLimit = limit[0];
        var minLimitIndex = 0;
        limit.forEach((e,i) => {
          if (e < minLimit)
          {
            minLimit = e;
            minLimitIndex = i;
          }
        })

        if (projectDatabase[element]['tc'] > minLimit)
        {
          if (element != 'others')
          {
            limit[minLimitIndex] = projectDatabase[element]['tc'];
            limitNames[minLimitIndex] = displayNiceTitle(element);
          }
        }
      }

      limit.forEach(e => {
        sum -= e;
      })

      limit.push(sum)
      limitNames.push("Others")

      xAxis = limitNames;
      yAxis = limit;
    }

    return {
      labels: xAxis,
      datasets: [
        {
          label: 'Dataset 1',
          data: yAxis,
          backgroundColor: colors,
        },
      ],
    };
  }
}

function SolSeaPage()
{
  const [data,setData] = useState("")
  React.useEffect(() => {
    axios.get("/api/getSolSeaSales").then (response => {
      setData(response);
    }).catch (error => {
      console.log(error);
    })
  },[])

  if (data === "") return (<div><CircularProgress /></div>);


  function generateChartOptions(myVar) {
    return {
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
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
          text: myVar,
        },
      },
    };
  }

  function generatePieOptions(myVar) {
    return {
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'right',
        },
        title: {
          display: true,
          text: myVar,
        },
      },
    };
  }

  // manipulating the data -- start

  var projectDatabase = {}
  var latestDate = undefined
  var latestDateMonth = undefined
  var latestDateMonthCalc = undefined

  

  var uniqueDate = {}
  var last7DaysSorted_i = [0,0,0,0,0,0,0];

  data.data.forEach( row => {
    var dateParsed = new Date(row.DAY_DATE)

    if (latestDate === undefined || date.subtract(dateParsed,latestDate).toSeconds > 0)
    {
      latestDate = dateParsed;
    }

    uniqueDate[dateParsed.getTime()] = 1;


    if (projectDatabase[row.PROJECT_NAME] === undefined)
    {
      projectDatabase[row.PROJECT_NAME] = {}
    }

    projectDatabase[row.PROJECT_NAME][dateParsed] = row.SUM_SALES_PRICE
    projectDatabase[row.PROJECT_NAME][dateParsed.getTime()] = row.SUM_SALES_PRICE
    projectDatabase[row.PROJECT_NAME]['c' + dateParsed] = row.COUNT_NFT_SALES
    projectDatabase[row.PROJECT_NAME]['c' + dateParsed.getTime()] = row.COUNT_NFT_SALES
    
    
    var dateMonth = dateParsed.getFullYear() + '-' + dateParsed.getMonth().toString().padStart(2,'0')
    var dateMonthCalc = dateParsed.getFullYear() * 12 + dateParsed.getMonth()
    
    if (latestDateMonthCalc === undefined || dateMonthCalc > latestDateMonthCalc)
    {
      latestDateMonth = dateMonth;
      latestDateMonthCalc = dateMonthCalc
    }

    if( projectDatabase[row.PROJECT_NAME]['ts'] === undefined )
    {
      projectDatabase[row.PROJECT_NAME]['ts'] = 0
      projectDatabase[row.PROJECT_NAME]['tc'] = 0
    }

    if (projectDatabase[row.PROJECT_NAME][dateMonth] === undefined)
    {
      projectDatabase[row.PROJECT_NAME][dateMonth] = 0;
      projectDatabase[row.PROJECT_NAME]['c' + dateMonth] = 0;
    }
    projectDatabase[row.PROJECT_NAME][dateMonth] += row.SUM_SALES_PRICE;
    projectDatabase[row.PROJECT_NAME]['c' + dateMonth] += row.COUNT_NFT_SALES;
    projectDatabase[row.PROJECT_NAME]['ts'] += row.SUM_SALES_PRICE;
    projectDatabase[row.PROJECT_NAME]['tc'] += row.COUNT_NFT_SALES;
    
  })

  

  for (var key in uniqueDate) {
    var minTime = last7DaysSorted_i[0]
    var minTimeIndex = 0;

    last7DaysSorted_i.forEach((element,index) =>{
      if (minTime > element)
      {
        minTime = element
        minTimeIndex = index
      }
    })
    //console.log(key);
    var ldate = new Date(key / 1000);
    if (ldate.getTime() > minTime)
    {
      last7DaysSorted_i[minTimeIndex] = ldate.getTime()
    }
  }



  //console.log(latestDate);
  //console.log(uniqueDate);
  //console.log(projectDatabase);

  var dailyRows = []
  var minValues = [0,0,0,0,0,0,0,0,0,0];
  var projectNames = ["","","","","","","","","","",];
  
  for (var element in projectDatabase) {
    var daily = projectDatabase[element][latestDate] === undefined ? 0 : Math.round(projectDatabase[element][latestDate]*100) / 100;
    var dailyCount = projectDatabase[element]['c' + latestDate] === undefined ? 0 : Math.round(projectDatabase[element]['c' + latestDate]*100) / 100;
    var monthlyCount = projectDatabase[element]['c' + latestDateMonth] === undefined ? 0 : projectDatabase[element]['c' + latestDateMonth];
    var monthly = projectDatabase[element][latestDateMonth] === undefined ? 0 : Math.round(projectDatabase[element][latestDateMonth]*100) / 100
    var quartlyCount = projectDatabase[element]['tc'] === undefined ? 0 : projectDatabase[element]['tc'];
    var quartly = projectDatabase[element]['ts'] === undefined ? 0 : Math.round(projectDatabase[element]['ts']*100) / 100

    var currentMin = 99999999
    var minIndex = -1
    // get the minimum from the minValues
    minValues.forEach((element, index, array) => {
      if ( element < currentMin )
      {
        currentMin = element;
        minIndex = index;
      }
    })

    if (projectDatabase[element][latestDate] > currentMin)
    {
      if (element != 'others')
      {
        minValues[minIndex] = projectDatabase[element][latestDate];
        projectNames[minIndex] = element;
      }
    }

    dailyRows.push({
      PROJECT_NAME:displayNiceTitle(element),
      DAILY_SALES:daily,
      DAILY_COUNT:dailyCount,
      MONTHLY_SALES:monthly,
      MONTHLY_COUNT:monthlyCount,
      QUARTLY_SALES:quartly,
      QUARTLY_COUNT:quartlyCount,
    })
  }
  
  //console.log(minValues);
  //console.log(projectNames);

  //console.log(dailyRows);

  // manipulating the data -- end

  const gridColDef = [
    { field: 'PROJECT_NAME', headerName: 'NFT Collection', width: 250 },
    { field: 'DAILY_SALES', headerName: '24h Sales (SOL)', width: 200 },
    { field: 'DAILY_COUNT', headerName: '24h Sales (#)', width: 200 },
    { field: 'MONTHLY_SALES', headerName: '30d Sales (SOL)', width: 200 },
    { field: 'MONTHLY_COUNT', headerName: '30d Sales (#)', width: 200 },
    { field: 'QUARTLY_SALES', headerName: '90d Sales (SOL)', width: 200 },
    { field: 'QUARTLY_COUNT', headerName: '90d Sales (#)', width: 200 },
  ];

  const chartOptions1 = generateChartOptions("Daily Sales");
  const chartOptions2 = generatePieOptions("Total Volume Exchanged Today");
  const chartOptions3 = generatePieOptions("90 Day Highest Volume");
  const chartOptions4 = generateChartOptions("Best Sellers");
  const chartOptions5 = generatePieOptions("Number of NFTs Traded Over the last 90 days");

  var last7DaysSorted = last7DaysSorted_i.sort()
  //console.log(last7DaysSorted_i);
  //console.log(last7DaysSorted);
  const chartData1 = generateDailyChartData(projectNames, projectDatabase, last7DaysSorted);
  const chartData2 = generatePieData(projectDatabase,1,latestDate);
  const chartData3 = generatePieData(projectDatabase,2);
  const chartData4 = generateChartData(projectDatabase);
  const chartData5 = generatePieData(projectDatabase,3);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (<div style={{ height: 600, width: '100%' }}>
            <Grid container spacing={2}>
            <Grid item md={12}>
                <Item><h2>SolSea Marketplace</h2></Item>
              </Grid>
              <Grid item md={6}>
                <Item><Bar options={chartOptions4} data={chartData4} height={null}/></Item>
              </Grid>
              <Grid item md={6}>
                <Item><Bar options={chartOptions1} data={chartData1} height={null}/></Item>
              </Grid>
              <Grid item md={4}>
                <Item><Doughnut options={chartOptions2} data={chartData2} height={null}/></Item>
              </Grid>
              <Grid item md={4}>
                <Item><Doughnut options={chartOptions3} data={chartData3} height={null}/></Item>
              </Grid>
              <Grid item md={4}>
                <Item><Doughnut options={chartOptions5} data={chartData5} height={null}/></Item>
              </Grid>
          </Grid>
          <br></br>
          <DataGrid autoPageSize components={{ Toolbar: GridToolbar }} rowHeight={25} getRowId={(row) => row.PROJECT_NAME + row.DAILY_SALES} rows={dailyRows} columns={gridColDef}></DataGrid>
          </div>
    );


    function generateDailyChartData(projectNames, projectDatabase, last7DaysSorted)
    {
      var dataa = [[],[],[],[],[],[],[],[],[],[]]
      var others = []
      var datees = [];
      
      last7DaysSorted.forEach((element, index) => {
        datees.push(new Date(element*1000).toISOString().substr(0,10));
        var negativeSum = 0
        for (let i = 0; i < 10; i++) {
  
          if (projectNames[i] === "") continue;
  
          const interestedDate = last7DaysSorted[index]*1000;
          const projectStats = projectDatabase[projectNames[i]];
  
          if (projectStats[interestedDate] !== undefined)
          {
            dataa[i].push(projectStats[interestedDate]);
            negativeSum += projectStats[interestedDate]
          }
          else
          {
            dataa[i].push(0);
          }
        }
  
        var sumAll = 0;
        for (var key in projectDatabase)
        {
          sumAll += isNaN(projectDatabase[key][interestedDate]) ? 0 : projectDatabase[key][interestedDate];
        }
        sumAll -= negativeSum
        others.push(sumAll);
      })
  
      //console.log(last7DaysSorted)
      //console.log(dataa)
      //console.log(others);
      return {
        labels: datees,
        datasets: [
          {
            label: displayNiceTitle(projectNames[0]),
            data: dataa[0],
            backgroundColor: colors[0],
          },
          {
            label: displayNiceTitle(projectNames[1]),
            data: dataa[1],
            backgroundColor: colors[1],
          },
          {
            label: displayNiceTitle(projectNames[2]),
            data: dataa[2],
            backgroundColor: colors[2],
          },
          {
            label: displayNiceTitle(projectNames[3]),
            data: dataa[3],
            backgroundColor: colors[3],
          },
          {
            label: displayNiceTitle(projectNames[4]),
            data: dataa[4],
            backgroundColor: colors[4],
          },
          {
            label: displayNiceTitle(projectNames[5]),
            data: dataa[5],
            backgroundColor: colors[5],
          },
          {
            label: displayNiceTitle(projectNames[6]),
            data: dataa[6],
            backgroundColor: colors[6],
          },
          {
            label: displayNiceTitle(projectNames[7]),
            data: dataa[7],
            backgroundColor: colors[7],
          },
          {
            label: displayNiceTitle(projectNames[8]),
            data: dataa[8],
            backgroundColor: colors[8],
          },
          {
            label: displayNiceTitle(projectNames[9]),
            data: dataa[9],
            backgroundColor: colors[9],
          },
          {
            label: displayNiceTitle("Others"),
            data: others,
            backgroundColor: colors[10],
          },
          
        ],
      };
    }

  function generateChartData(projectDB) {

    var biggest = [0,0,0,0,0,0]
    var biggestNames = ["","","","","",""]
    var Sum = 0;
    for ( var element in projectDB )
    {
      var minElement = biggest[0]
      var minElementIndex = 0
      biggest.forEach((m,i) => {
        if (m < minElement)
        {
          minElement = m;
          minElementIndex = i;
        }
      })

      if (projectDB[element]['ts'] > minElement)
      {
        if (element != 'others')
        {
          biggest[minElementIndex] = projectDB[element]['ts'];
          biggestNames[minElementIndex] = displayNiceTitle(element);
        }
      }

      Sum += projectDB[element]['ts'];
      
    }

    return {
      labels: biggestNames,
      datasets: [
        {
          //label: 'Dataset 1',
          data: biggest,
          backgroundColor: colors,
        },
      ],
    };
  }

  function generatePieData(projectDatabase, index, latestDate) {

    var xAxis = [1,2,3,4,5,6,7];
    var yAxis = [1,2,3,4,5,6,7,8,9,10];

    if (index === 1)
    {
      //Total Volume Exchanged Today
      var limit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
      var limitNames = ["","","","","","","","","","","","","","","","","","","","",]
      var sum = 0;
      for (element in projectDatabase)
      {
        sum += isNaN(projectDatabase[element][latestDate]) ? 0 : projectDatabase[element][latestDate]

        var minLimit = limit[0];
        var minLimitIndex = 0;
        limit.forEach((e,i) => {
          if (e < minLimit)
          {
            minLimit = e;
            minLimitIndex = i;
          }
        })

        if (projectDatabase[element][latestDate] > minLimit)
        {
          if (element != 'others')
          {
            limit[minLimitIndex] = projectDatabase[element][latestDate];
            limitNames[minLimitIndex] = displayNiceTitle(element);
          }
        }
      }

      limit.forEach(e => {
        sum -= e
      })
      //console.log(sum);
      limit.push(sum)
      limitNames.push("Others")

      xAxis = limitNames;
      yAxis = limit;
    }

    if (index === 2)
    {
      // 90 Day Volume
      var limit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
      var limitNames = ["","","","","","","","","","","","","","","","","","","","",]
      var sum = 0;
      for (element in projectDatabase)
      {
        sum += projectDatabase[element]['ts']

        var minLimit = limit[0];
        var minLimitIndex = 0;
        limit.forEach((e,i) => {
          if (e < minLimit)
          {
            minLimit = e;
            minLimitIndex = i;
          }
        })

        if (projectDatabase[element]['ts'] > minLimit)
        {
          if (element != 'others')
          {
            limit[minLimitIndex] = projectDatabase[element]['ts'];
            limitNames[minLimitIndex] = displayNiceTitle(element);
          }
        }
      }

      limit.forEach(e => {
        sum -= e;
      })

      limit.push(sum)
      limitNames.push("Others")

      xAxis = limitNames;
      yAxis = limit;
    }

    if (index === 3)
    {
      // Number of NFTs Traded
      var limit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
      var limitNames = ["","","","","","","","","","","","","","","","","","","","",]
      var sum = 0;
      for (element in projectDatabase)
      {
        sum += projectDatabase[element]['tc']

        var minLimit = limit[0];
        var minLimitIndex = 0;
        limit.forEach((e,i) => {
          if (e < minLimit)
          {
            minLimit = e;
            minLimitIndex = i;
          }
        })

        if (projectDatabase[element]['tc'] > minLimit)
        {
          if (element != 'others')
          {
            limit[minLimitIndex] = projectDatabase[element]['tc'];
            limitNames[minLimitIndex] = displayNiceTitle(element);
          }
        }
      }

      limit.forEach(e => {
        sum -= e;
      })

      limit.push(sum)
      limitNames.push("Others")

      xAxis = limitNames;
      yAxis = limit;
    }

    return {
      labels: xAxis,
      datasets: [
        {
          label: 'Dataset 1',
          data: yAxis,
          backgroundColor: colors,
        },
      ],
    };
  }
}

function SolartPage()
{
  const [data,setData] = useState("")
  React.useEffect(() => {
    axios.get("/api/getSolanartSales").then (response => {
      setData(response);
    }).catch (error => {
      console.log(error);
    })
  },[])

  if (data === "") return (<div><CircularProgress /></div>);


  function generateChartOptions(myVar) {
    return {
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
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
          text: myVar,
        },
      },
    };
  }

  function generatePieOptions(myVar) {
    return {
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'right',
        },
        title: {
          display: true,
          text: myVar,
        },
      },
    };
  }

  // manipulating the data -- start

  var projectDatabase = {}
  var latestDate = undefined
  var latestDateMonth = undefined
  var latestDateMonthCalc = undefined

  

  var uniqueDate = {}
  var last7DaysSorted_i = [0,0,0,0,0,0,0];

  data.data.forEach( row => {
    var dateParsed = new Date(row.DAY_DATE)

    if (latestDate === undefined || date.subtract(dateParsed,latestDate).toSeconds > 0)
    {
      latestDate = dateParsed;
    }

    uniqueDate[dateParsed.getTime()] = 1;


    if (projectDatabase[row.PROJECT_NAME] === undefined)
    {
      projectDatabase[row.PROJECT_NAME] = {}
    }

    projectDatabase[row.PROJECT_NAME][dateParsed] = row.SUM_SALES_PRICE
    projectDatabase[row.PROJECT_NAME][dateParsed.getTime()] = row.SUM_SALES_PRICE
    projectDatabase[row.PROJECT_NAME]['c' + dateParsed] = row.COUNT_NFT_SALES
    projectDatabase[row.PROJECT_NAME]['c' + dateParsed.getTime()] = row.COUNT_NFT_SALES
    
    
    var dateMonth = dateParsed.getFullYear() + '-' + dateParsed.getMonth().toString().padStart(2,'0')
    var dateMonthCalc = dateParsed.getFullYear() * 12 + dateParsed.getMonth()
    
    if (latestDateMonthCalc === undefined || dateMonthCalc > latestDateMonthCalc)
    {
      latestDateMonth = dateMonth;
      latestDateMonthCalc = dateMonthCalc
    }

    if( projectDatabase[row.PROJECT_NAME]['ts'] === undefined )
    {
      projectDatabase[row.PROJECT_NAME]['ts'] = 0
      projectDatabase[row.PROJECT_NAME]['tc'] = 0
    }

    if (projectDatabase[row.PROJECT_NAME][dateMonth] === undefined)
    {
      projectDatabase[row.PROJECT_NAME][dateMonth] = 0;
      projectDatabase[row.PROJECT_NAME]['c' + dateMonth] = 0;
    }
    projectDatabase[row.PROJECT_NAME][dateMonth] += row.SUM_SALES_PRICE;
    projectDatabase[row.PROJECT_NAME]['c' + dateMonth] += row.COUNT_NFT_SALES;
    projectDatabase[row.PROJECT_NAME]['ts'] += row.SUM_SALES_PRICE;
    projectDatabase[row.PROJECT_NAME]['tc'] += row.COUNT_NFT_SALES;
    
  })

  

  for (var key in uniqueDate) {
    var minTime = last7DaysSorted_i[0]
    var minTimeIndex = 0;

    last7DaysSorted_i.forEach((element,index) =>{
      if (minTime > element)
      {
        minTime = element
        minTimeIndex = index
      }
    })
    //console.log(key);
    var ldate = new Date(key / 1000);
    if (ldate.getTime() > minTime)
    {
      last7DaysSorted_i[minTimeIndex] = ldate.getTime()
    }
  }



  //console.log(latestDate);
  //console.log(projectDatabase);

  var dailyRows = []
  var minValues = [0,0,0,0,0,0,0,0,0,0];
  var projectNames = ["","","","","","","","","","",];
  
  for (var element in projectDatabase) {
    var daily = projectDatabase[element][latestDate] === undefined ? 0 : Math.round(projectDatabase[element][latestDate]*100) / 100;
    var dailyCount = projectDatabase[element]['c' + latestDate] === undefined ? 0 : Math.round(projectDatabase[element]['c' + latestDate]*100) / 100;
    var monthlyCount = projectDatabase[element]['c' + latestDateMonth] === undefined ? 0 : projectDatabase[element]['c' + latestDateMonth];
    var monthly = projectDatabase[element][latestDateMonth] === undefined ? 0 : Math.round(projectDatabase[element][latestDateMonth]*100) / 100
    var quartlyCount = projectDatabase[element]['tc'] === undefined ? 0 : projectDatabase[element]['tc'];
    var quartly = projectDatabase[element]['ts'] === undefined ? 0 : Math.round(projectDatabase[element]['ts']*100) / 100

    var currentMin = 99999999
    var minIndex = -1
    // get the minimum from the minValues
    minValues.forEach((element, index, array) => {
      if ( element < currentMin )
      {
        currentMin = element;
        minIndex = index;
      }
    })

    if (projectDatabase[element][latestDate] > currentMin)
    {
      if (element != 'others')
      {
        minValues[minIndex] = projectDatabase[element][latestDate];
        projectNames[minIndex] = element;
      }
    }

    dailyRows.push({
      PROJECT_NAME:displayNiceTitle(element),
      DAILY_SALES:daily,
      DAILY_COUNT:dailyCount,
      MONTHLY_SALES:monthly,
      MONTHLY_COUNT:monthlyCount,
      QUARTLY_SALES:quartly,
      QUARTLY_COUNT:quartlyCount,
    })
  }
  
  //console.log(minValues);
  //console.log(projectNames);

  //console.log(dailyRows);

  // manipulating the data -- end

  const gridColDef = [
    { field: 'PROJECT_NAME', headerName: 'NFT Collection', width: 250 },
    { field: 'DAILY_SALES', headerName: '24h Sales (SOL)', width: 200 },
    { field: 'DAILY_COUNT', headerName: '24h Sales (#)', width: 200 },
    { field: 'MONTHLY_SALES', headerName: '30d Sales (SOL)', width: 200 },
    { field: 'MONTHLY_COUNT', headerName: '30d Sales (#)', width: 200 },
    { field: 'QUARTLY_SALES', headerName: '90d Sales (SOL)', width: 200 },
    { field: 'QUARTLY_COUNT', headerName: '90d Sales (#)', width: 200 },
  ];

  const chartOptions1 = generateChartOptions("Daily Sales");
  const chartOptions2 = generatePieOptions("Total Volume Exchanged Today");
  const chartOptions3 = generatePieOptions("90 Day Highest Volume");
  const chartOptions4 = generateChartOptions("Best Sellers");
  const chartOptions5 = generatePieOptions("Number of NFTs Traded Over the last 90 days");

  var last7DaysSorted = last7DaysSorted_i.sort()
  //console.log(last7DaysSorted_i);
  //console.log(last7DaysSorted);
  const chartData1 = generateDailyChartData(projectNames, projectDatabase, last7DaysSorted);
  const chartData2 = generatePieData(projectDatabase,1,latestDate);
  const chartData3 = generatePieData(projectDatabase,2);
  const chartData4 = generateChartData(projectDatabase);
  const chartData5 = generatePieData(projectDatabase,3);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (<div style={{ height: 600, width: '100%' }}>
            <Grid container spacing={2}>
            <Grid item md={12}>
                <Item><h2>Solanart Marketplace</h2></Item>
              </Grid>
              <Grid item md={6}>
                <Item><Bar options={chartOptions4} data={chartData4} height={null}/></Item>
              </Grid>
              <Grid item md={6}>
                <Item><Bar options={chartOptions1} data={chartData1} height={null}/></Item>
              </Grid>
              <Grid item md={4}>
                <Item><Doughnut options={chartOptions2} data={chartData2} height={null}/></Item>
              </Grid>
              <Grid item md={4}>
                <Item><Doughnut options={chartOptions3} data={chartData3} height={null}/></Item>
              </Grid>
              <Grid item md={4}>
                <Item><Doughnut options={chartOptions5} data={chartData5} height={null}/></Item>
              </Grid>
          </Grid>
          <br></br>
          <DataGrid autoPageSize components={{ Toolbar: GridToolbar }} rowHeight={25} getRowId={(row) => row.PROJECT_NAME + row.DAILY_SALES} rows={dailyRows} columns={gridColDef}></DataGrid>
          </div>
    );


    function generateDailyChartData(projectNames, projectDatabase, last7DaysSorted)
  {
    var dataa = [[],[],[],[],[],[],[],[],[],[]]
    var others = []
    var datees = [];
    
    last7DaysSorted.forEach((element, index) => {
      datees.push(new Date(element*1000).toISOString().substr(0,10));
      var negativeSum = 0
      for (let i = 0; i < 10; i++) {

        if (projectNames[i] === "") continue;

        const interestedDate = last7DaysSorted[index]*1000;
        const projectStats = projectDatabase[projectNames[i]];

        if (projectStats[interestedDate] !== undefined)
        {
          dataa[i].push(projectStats[interestedDate]);
          negativeSum += projectStats[interestedDate]
        }
        else
        {
          dataa[i].push(0);
        }
      }

      var sumAll = 0;
      for (var key in projectDatabase)
      {
        sumAll += isNaN(projectDatabase[key][interestedDate]) ? 0 : projectDatabase[key][interestedDate];
      }
      sumAll -= negativeSum
      others.push(sumAll);
    })

    //console.log(last7DaysSorted)
    //console.log(dataa)
    //console.log(others);
    return {
      labels: datees,
      datasets: [
        {
          label: displayNiceTitle(projectNames[0]),
          data: dataa[0],
          backgroundColor: colors[0],
        },
        {
          label: displayNiceTitle(projectNames[1]),
          data: dataa[1],
          backgroundColor: colors[1],
        },
        {
          label: displayNiceTitle(projectNames[2]),
          data: dataa[2],
          backgroundColor: colors[2],
        },
        {
          label: displayNiceTitle(projectNames[3]),
          data: dataa[3],
          backgroundColor: colors[3],
        },
        {
          label: displayNiceTitle(projectNames[4]),
          data: dataa[4],
          backgroundColor: colors[4],
        },
        {
          label: displayNiceTitle(projectNames[5]),
          data: dataa[5],
          backgroundColor: colors[5],
        },
        {
          label: displayNiceTitle(projectNames[6]),
          data: dataa[6],
          backgroundColor: colors[6],
        },
        {
          label: displayNiceTitle(projectNames[7]),
          data: dataa[7],
          backgroundColor: colors[7],
        },
        {
          label: displayNiceTitle(projectNames[8]),
          data: dataa[8],
          backgroundColor: colors[8],
        },
        {
          label: displayNiceTitle(projectNames[9]),
          data: dataa[9],
          backgroundColor: colors[9],
        },
        {
          label: displayNiceTitle("Others"),
          data: others,
          backgroundColor: colors[10],
        },
        
      ],
    };
  }

  function generateChartData(projectDB) {

    var biggest = [0,0,0,0,0,0]
    var biggestNames = ["","","","","",""]
    var Sum = 0;
    for ( var element in projectDB )
    {
      var minElement = biggest[0]
      var minElementIndex = 0
      biggest.forEach((m,i) => {
        if (m < minElement)
        {
          minElement = m;
          minElementIndex = i;
        }
      })

      if (projectDB[element]['ts'] > minElement)
      {
        if (element != 'others')
        {
          biggest[minElementIndex] = projectDB[element]['ts'];
          biggestNames[minElementIndex] = displayNiceTitle(element);
        }
      }

      Sum += projectDB[element]['ts'];
      
    }

    return {
      labels: biggestNames,
      datasets: [
        {
          //label: 'Dataset 1',
          data: biggest,
          backgroundColor: colors,
        },
      ],
    };
  }

  function generatePieData(projectDatabase, index, latestDate) {

    var xAxis = [1,2,3,4,5,6,7];
    var yAxis = [1,2,3,4,5,6,7,8,9,10];

    if (index === 1)
    {
      //Total Volume Exchanged Today
      var limit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
      var limitNames = ["","","","","","","","","","","","","","","","","","","","",]
      var sum = 0;
      for (element in projectDatabase)
      {
        sum += isNaN(projectDatabase[element][latestDate]) ? 0 : projectDatabase[element][latestDate]

        var minLimit = limit[0];
        var minLimitIndex = 0;
        limit.forEach((e,i) => {
          if (e < minLimit)
          {
            minLimit = e;
            minLimitIndex = i;
          }
        })

        if (projectDatabase[element][latestDate] > minLimit)
        {
          if (element != 'others')
          {
            limit[minLimitIndex] = projectDatabase[element][latestDate];
            limitNames[minLimitIndex] = displayNiceTitle(element);
          }
        }
      }

      limit.forEach(e => {
        sum -= e
      })
      //console.log(sum);
      limit.push(sum)
      limitNames.push("Others")

      xAxis = limitNames;
      yAxis = limit;
    }

    if (index === 2)
    {
      // 90 Day Volume
      var limit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
      var limitNames = ["","","","","","","","","","","","","","","","","","","","",]
      var sum = 0;
      for (element in projectDatabase)
      {
        sum += projectDatabase[element]['ts']

        var minLimit = limit[0];
        var minLimitIndex = 0;
        limit.forEach((e,i) => {
          if (e < minLimit)
          {
            minLimit = e;
            minLimitIndex = i;
          }
        })

        if (projectDatabase[element]['ts'] > minLimit)
        {
          if (element != 'others')
          {
            limit[minLimitIndex] = projectDatabase[element]['ts'];
            limitNames[minLimitIndex] = displayNiceTitle(element);
          }
        }
      }

      limit.forEach(e => {
        sum -= e;
      })

      limit.push(sum)
      limitNames.push("Others")

      xAxis = limitNames;
      yAxis = limit;
    }

    if (index === 3)
    {
      // Number of NFTs Traded
      var limit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
      var limitNames = ["","","","","","","","","","","","","","","","","","","","",]
      var sum = 0;
      for (element in projectDatabase)
      {
        sum += projectDatabase[element]['tc']

        var minLimit = limit[0];
        var minLimitIndex = 0;
        limit.forEach((e,i) => {
          if (e < minLimit)
          {
            minLimit = e;
            minLimitIndex = i;
          }
        })

        if (projectDatabase[element]['tc'] > minLimit)
        {
          if (element != 'others')
          {
            limit[minLimitIndex] = projectDatabase[element]['tc'];
            limitNames[minLimitIndex] = displayNiceTitle(element);
          }
        }
      }

      limit.forEach(e => {
        sum -= e;
      })

      limit.push(sum)
      limitNames.push("Others")

      xAxis = limitNames;
      yAxis = limit;
    }

    return {
      labels: xAxis,
      datasets: [
        {
          label: 'Dataset 1',
          data: yAxis,
          backgroundColor: colors,
        },
      ],
    };
  }
}

function PermanentDrawerLeft() {
  const [page, setPage] = useState(0);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        //sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
                <Image alt="" src='/meLogo.png' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'MagicEden'} />
            </ListItem>
            <ListItem button key={'SolSea'} onClick={() => setPage(2)}>
              <ListItemIcon>
              <Image alt="" src='/solsea.jpg' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'SolSea'} />
            </ListItem>
            <ListItem button key={'Solanart'} onClick={() => setPage(3)}>
              <ListItemIcon>
              <Image alt="" src='/solanart.jpeg' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'Solanart'} />
            </ListItem>
            <ListItem button key={'The Next Project'} onClick={() => setPage(4)}>
              <ListItemIcon>
              <Image alt="" src='/opensea.png' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'The Next Project'} />
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
