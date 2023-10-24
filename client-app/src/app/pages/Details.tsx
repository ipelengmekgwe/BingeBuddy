import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container, Grid, Header, Image, Label } from 'semantic-ui-react'
import rapidApiAgent from '../api/rapidApiAgent';
import LoadingComponents from '../layout/LoadingComponents';

const Details = () => {
    const {id} = useParams();
    const [show, setShow] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            rapidApiAgent.Shows.description(id).then(response => {
                setShow(response);
                setLoading(false);
            })
        }
    }, [id]);

    if (loading) return <LoadingComponents />

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Grid columns={2}>
        <Grid.Column width={8}>
          <Image src={show?.title?.image?.url ?? 'bingebuddy-hr.png'} size="large" />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h1">{show?.title?.title}</Header>
          <Header as="h3">{show?.title?.year}</Header>
          <Header as="h4">{show?.title?.titleType?.replace(/\b[a-z]/g, (x: any) => x.toUpperCase())}</Header>
          <Header as="h5">Genres:</Header>
          {show.genres.map((genre: string, index: number) => (
            <Label key={index}>{genre}</Label>
          ))}
          <p style={{marginTop: '1rem'}}>{show?.plotSummary?.text ?? show?.plotOutline?.text}</p>
          <Button primary>Add to my favorites</Button>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default Details