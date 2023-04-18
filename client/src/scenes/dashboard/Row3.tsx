import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api"
import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid, GridCellParams } from "@mui/x-data-grid"
import { useMemo } from "react"
import { Bar, BarChart, Cell, LabelList, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"



const Row3 = () => {
  const { palette } = useTheme()
  const pieColors = [palette.primary[800], palette.primary[500], palette.tertiary[500]]
  const { data: kpiData } = useGetKpisQuery()
  const { data: productData } = useGetProductsQuery()
  const { data: transactionData } = useGetTransactionsQuery()

  
  const overallData = useMemo(() => {
    return (
      kpiData &&
      kpiData.map(({totalProfit, totalRevenue, totalExpenses }) => {
        return {
          "Total Profit": totalProfit,
          "Total Revenue": totalRevenue, 
          "Total Expenses": totalExpenses,
        }
      })
    );
  }, [kpiData])

 

  const pieChartData = useMemo(() => {
    if(kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => {
        return [
          {
            name: key,
            value: value
          },
          {
            name: `${key} of Total`,
            value: totalExpenses - value
          }
        ]
      })
    }
  }, [kpiData])

  const productColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1,
    },
    {
      field: 'expense',
      headerName: 'Expense',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ]

  const transactionColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1,
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 0.67,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'productIds',
      headerName: 'Count',
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
    },
  ]

  return (
    <>
      <DashboardBox gridArea='g'>
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box 
          mt='0.5rem'
          p='0 0.5rem'
          height='75%'
          sx={{
            //'& .MuiDataGrid-root' is targetting a class in the child component <DataGrid />
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: 'none',
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: 'hidden'
            }
          }}
        >
        <DataGrid 
          columnHeaderHeight={25}
          rowHeight={35}
          hideFooter={true}
          rows={productData || []}
          columns={productColumns}
        />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea='h'>
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box 
          mt='1rem'
          p='0 0.5rem'
          height='80%'
          sx={{
            //'& .MuiDataGrid-root' is targetting a class in the child component <DataGrid />
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: 'none',
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: 'hidden'
            }
          }}
        >
        <DataGrid 
          columnHeaderHeight={25}
          rowHeight={35}
          hideFooter={true}
          rows={transactionData || []}
          columns={transactionColumns}
        />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea='i'>
        <BoxHeader 
          title="Expense Breakdown By Category" 
          sideText="+4%"
        />
        <FlexBetween mt='0.5rem' gap='0.2rem' p='0 1rem' textAlign='center'>
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart
                width={110} 
                height={100}
                margin={{
                  top: -35,
                  bottom: 0
                }}
                >
                <Pie
                  stroke='none'
                  data={data}
                  innerRadius={15}
                  outerRadius={32}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip labelFormatter={() => { return '' }} formatter={(v) => `$${v.toLocaleString("en-US")}`}  />
                
              </PieChart>
              <Typography mt='-1.5rem' variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea='j'>
        <BoxHeader 
          title="Summary Data" 
          sideText="YTD Data"
        />
       
        <ResponsiveContainer width="99%" height="100%">
        
        <BarChart
            width={500}
            height={500}
            data={overallData}
            margin={{
              top: 2,
              right: 15,
              left: -5,
              bottom: 25,
            }}
          >
{/*           
             <defs>
              <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="2%"
                  stopColor={palette.primary[400]}
                  stopOpacity={0.5}
                />
                <stop 
                  offset="98%"
                  stopColor={palette.primary[400]}
                  stopOpacity={0.15}
                />
              </linearGradient>  
            </defs>
            <defs>
              <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="2%"
                  stopColor={palette.tertiary[500]}
                  stopOpacity={0.5}
                />
                <stop 
                  offset="98%"
                  stopColor={palette.tertiary[500]}
                  stopOpacity={0.15}
                />
              </linearGradient>  
            </defs>
            <defs>
              <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="2%"
                  stopColor={palette.primary[800]}
                  stopOpacity={0.9}
                />
                <stop 
                  offset="98%"
                  stopColor={palette.primary[800]}
                  stopOpacity={0.15}
                />
              </linearGradient>  
            </defs> */}
            {/* <CartesianGrid vertical={false} stroke={palette.grey[800]} /> */}
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              style={{fontSize: '10px'}} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              style={{fontSize: '9px'}} 
            />
            
            <Bar dataKey="Total Expenses" fill={palette.tertiary[500]}>
              <LabelList dataKey="Total Expenses" formatter={(v: number) => `$${v.toLocaleString("en-US")}`} fill={palette.grey[100]} fontSize={12} />
            </Bar>
            <Bar dataKey="Total Revenue" fill={palette.primary[600]}>
              <LabelList dataKey="Total Revenue" formatter={(v: number) => `$${v.toLocaleString("en-US")}`} fill={palette.grey[100]} fontSize={12} />
            </Bar>
            <Bar dataKey="Total Profit" fill={palette.primary[700]}>
              <LabelList dataKey="Total Profit" formatter={(v: number) => `$${v.toLocaleString("en-US")}`} fill={palette.grey[100]} fontSize={12} />
            </Bar>
            <Legend height={20} wrapperStyle={{margin: '0 0 20px 40px', fontSize: '12px'}}/>
          </BarChart>
         
      </ResponsiveContainer>
    
      </DashboardBox>
        
    </>
  )
}

export default Row3