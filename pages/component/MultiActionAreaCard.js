import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Grid } from "@mui/material";




const MultiActionAreaCard = ({ props }) => {

  return (
    <>
     
      <Grid container >
      
        {props.map((currentElement) => (
        <Card  key="slug" sx={{ maxWidth: "310px",margin:"7px",height:"400px" }}>
          
            <span key="card">
                <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={currentElement.picture.url}
                 alt="Picture Card"
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div" style={{fontSize:"1.4rem",fontWeight:"700"}}>
                    {currentElement.mainHeading}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentElement.shortDescription}
                  </Typography>
                </CardContent>
                
              </CardActionArea>
              <div style={{alignItems:"end",alignSelf:"end"}}>

              <CardActions >
                <Button size="small" color="primary" style={{fontWeight:"900"}}>
                  <Link href={`/${currentElement.slug}`}>
                    <a>Read More</a>
                  </Link>
                </Button>
              </CardActions>
              </div>
            </span>
          
          </Card>
      ))}
    
      </Grid>
    </>
  );
};

export default MultiActionAreaCard