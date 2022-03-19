import { Container } from "@mui/material";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import MultiActionAreaCard from "./component/MultiActionAreaCard";


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
          
       
          <MultiActionAreaCard props={test} />
       
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

  let { data } = await result.json();
  const test = data.top10Collection.items;

  return {
    props: {
      test,
    },
    
  };
  
 
}
