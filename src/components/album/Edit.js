import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addAlbumColor: {
  backgroundColor: green[400],
  color: "white"
 },

});

const Edit = () => {
 const classes = useStyles();
 const { id } = useParams();
 const history = useHistory();
 const [album, setalbum] = useState({
  userId: "",
  title: ""
 });
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
 }, [id]);

 function onTextFieldChange(e) {
  setalbum({
   ...album,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.put(`http://localhost:3333/albums/${id}`, album)
   history.push("/")
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 function handleClick() {
  history.push("/")
 }
 return (
    <>
     <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
      <Typography variant="h2">React CRUD with API Call</Typography>
     </Box>
     <Grid container justify="center" spacing={4}>
      <Grid item md={6} xs={12}>
       <Box textAlign="center" p={2} className={classes.addAlbumColor} mb={2}>
        <Typography variant="h4">Edit Album</Typography>
       </Box>
       <form noValidate>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="id" name="id"
              variant="outlined" required fullWidth id="id" Label="ID" autoFocus value="1" disabled/>

            
            </Grid>

        </Grid>
        <Grid container spacing={2}>
         <Grid item xs={12}>
          <TextField autoComplete="userId" name="userId" variant="outlined" required fullWidth id="userId" label="Album UserId" value={album.userId} onChange={e => onTextFieldChange(e)}
          />
         </Grid>
         <Grid item xs={12}>
          <TextField autoComplete="title" name="title" variant="outlined" required fullWidth id="title" label="album title" value={album.title} onChange={e => onTextFieldChange(e)} />
         </Grid>
        </Grid>
        <Box m={3}>
         <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Edit</Button>
        </Box>
        <Box m={3} textAlign="center">
    <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
   </Box>
       </form>
      </Grid>
  
      
     </Grid>
    </>
   )
}

export default Edit
