import styles from "../styles/Home.module.css";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Container, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

export default function top10Page({ top10 }) {
  // for image
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
  };

  //for table header
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: 18,
      fontWeight: 700,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  // for table data

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // Table reorder for later

  return (
    <Container >
      <div className={styles.container}>
        <Head>
          <title>{top10.mainHeading}</title>
          <meta name="description" content={top10.mainHeading} />
        </Head>
        <h1
          style={{
            fontSize: "2.3em",
            textTransform: "capitalize",
            fontWeight: "900",
          }}
        >
          {top10.mainHeading}
        </h1>
        <Image
          src={top10.picture.url}
          loader={myLoader}
          alt="Main Picture"
          width={1200}
          height={500}
          objectFit="cover"
        />

        <br />
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={12}
                  style={{ backgroundColor: "#039be5", color: "white" }}
                >
                  <h2>Table of {top10.mainHeading}</h2>
                </TableCell>
              </TableRow>

              {top10.dataHead.map((header) => (
                <TableRow
                  key={header.Col1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell align="center">
                    {header.Col1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {header.Col2}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {header.Col3}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {header.Col4}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {header.Col5}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {top10.gridData.map((data) => (
                <StyledTableRow
                  key={data.Col1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{data.Col1}</TableCell>
                  <TableCell align="center">{data.Col2}</TableCell>
                  <TableCell align="center">{data.Col3}</TableCell>
                  <TableCell align="center">{data.Col4}</TableCell>
                  <TableCell align="center">{data.Col5}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>

            {/* { top10.gridData.map((data) => (
      
      
      <span key = {data.Rank}>
      <h1>{data.Rank}</h1>
      
        
      </span>
    ))
  } */}
          </Table>
        </TableContainer>

        {documentToReactComponents(top10.description.json)}
        <br />

        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const { top10 } = params;

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
        query GetTop10($slug: String!) {
            top10Collection(where: {
              slug: $slug
            },
            limit:1)
             {
              items{
                mainHeading
                dataHead
                gridData
                slug
                picture{
                  url
                }
                description{
                json
                }
              }}
            }
        `,
        variables: {
          slug: top10,
        },
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();

  const [top10Data] = data.top10Collection.items;

  return {
    props: { top10: top10Data },
  };
}

export async function getStaticPaths() {
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
  const top10Slugs = data.top10Collection.items;
  const paths = top10Slugs.map(({ slug }) => {
    return {
      params: { top10: slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
