
import { Box, useMediaQuery } from "@mui/material"
import Row1 from "./Row1"
import Row2 from "./Row2"
import Row3 from "./Row3"



const Dashboard = () => {
  const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`

  const isAboveMedScreens = useMediaQuery("(min-width: 1200px)")
  
  return (
    <Box
      width="100%" 
      height="100%" 
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMedScreens ? {
        gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
        gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
        gridTemplateAreas:  gridTemplateLargeScreens,
      } : {
        gridAutoColumns: "1fr",
        gridAutoRows: "80px",
        gridTemplateAreas: gridTemplateSmallScreens
      }
    }
    > 
   
    <Row1/>
    <Row2 />
    <Row3 />


    {/* <Box sx={{bgcolor:'white', gridColumn: 'span 1', gridRow: 'span 4'}}>a 4</Box> 
    <Box sx={{bgcolor:'white', gridRow: 'span 4'}}>b 4</Box> 
    <Box sx={{bgcolor:'white', gridRow: 'span 3'}}>c 3</Box>
    
    <Box sx={{bgcolor:'white', gridRow: 'span 3'}}>d 3</Box> 

    <Box sx={{bgcolor:'white', gridRow: 'span 3'}}>f 3</Box>
    
    <Box sx={{bgcolor:'white', gridRow: 'span 2'}}>e 2</Box>
    
    <Box sx={{bgcolor:'white', gridRow: 'span 4'}}>h 4</Box> 
    
    <Box sx={{bgcolor:'white', gridRow: 'span 2'}}>i 2</Box> 
    
    <Box sx={{bgcolor:'white', gridRow: 'span 3'}}>g 3</Box> 
    <Box sx={{bgcolor:'white', gridRow: 'span 2'}}>j 2</Box>  */}
      
    </Box>
  )
}

export default Dashboard


