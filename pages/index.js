import { Container } from "@mui/material";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Grid } from "@mui/material";

export default function Home({ test }) {
  return (
    <>
    <Container>
      <Head>
        <title>Welcome to FactsMantra</title>
        <meta
          name="description"
          content="Welcome to FactsMantra. see various stats world wide"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Facts Mantra</h1>

        <p className={styles.description}>
          Facts mantra help you to know various things and facts
        </p>
          
       
        <Grid container >
      
      {test.map((currentElement) => (
      <Card  key={currentElement.slug} sx={{ maxWidth: "310px",margin:"7px",height:"400px" }}>
        
          
              <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={currentElement.picture?.url}
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
        
        
        </Card>
    ))}
  
    </Grid>
       
      </main>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_TOKEN}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `
        query {
          top10Collection{
           items{
             slug
              picture{
             url
           }
            mainHeading
            shortDescription
            
           }
         }
         }
          `,
      }),
    }
  );
  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const test = data.top10Collection.items;

  return {
    props: {
      test,
    },
    
  };
  
 
}
