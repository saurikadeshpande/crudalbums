import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const useStyles = makeStyles({
 albumListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16
 },
});
const View = () => {
 const classes = useStyles();
 const { id } = useParams();
 const [album, setalbum] = useState([]);
 const history = useHistory();
 useEffect(() => {
  async function getAlbum() {
   try {
    const album = await axios.get(`http://localhost:3333/albums/${id}`)
  
    setalbum(album.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getAlbum();
 }, [id])

 function handleClick() {
  history.push("/")
 }
 return (
  <>
   <Box textAlign="center" p={2} className={classes.albumListColor}>
    <Typography variant="h4">Album Detail</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>User Id</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Title</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      <TableRow>
       <TableCell align="center">{album.id}</TableCell>
       <TableCell align="center">{album.userId}</TableCell>
       <TableCell align="center">{album.title}</TableCell>
      </TableRow>
     </TableBody>
    </Table>
   </TableContainer>
   <Box m={3} textAlign="center">
    <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
   </Box>
  </>
 )
}

export default View
