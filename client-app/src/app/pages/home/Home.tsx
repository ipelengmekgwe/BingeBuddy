import React, { useEffect, useState } from 'react';
import { Container, Header, Segment, Card, Image, Grid,
    Pagination, PaginationProps} from 'semantic-ui-react';
import rapidApiAgent from '../../api/rapidApiAgent';
import styles from './Home.module.css';
import LoadingComponents from '../../layout/LoadingComponents';
import { Link } from 'react-router-dom';

const Home = () => {

    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const year: string = new Date().getFullYear().toString();

    useEffect(() => {
        rapidApiAgent.Shows.search(year).then(response => {
            setShows(response.d);
            setLoading(false);
        })
    }, []);
    
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 6;
    
    const handlePaginationChange = (_event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        setActivePage(data.activePage as number);
    };
    
    const totalPages = Math.ceil(shows.length / itemsPerPage);
    
    const paginatedTVShows = shows.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    );

    if (loading) return <LoadingComponents />

  return (
    <>
        <Segment
            inverted
            textAlign="center"
            vertical
            className="hero"
            style={{ 
                minHeight: "50vh", 
                padding: "10em 0em", 
                backgroundColor: '#1EBBD7' 
            }}
        >
            <Container>
                <div
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                        borderRadius: '8px',
                        display: 'inline-block',
                        padding: '1rem',
                    }}
                >
                    <Header as="h1" inverted>
                        Welcome to Binge Buddy
                    </Header>
                    <Header as="h2" inverted>
                        Discover the latest TV Shows and Movies
                    </Header>
                </div>
            </Container>
        </Segment>
        <Container style={{ marginTop: "2em" }}>
            <Header as="h2">Latest TV Shows</Header>
            <Grid columns={3} doubling stackable>
                {paginatedTVShows.map((show, index) => (
                    <Grid.Column key={index}>
                        <div className={styles.cardWrapper}>
                            <Link to={`/details/${show.id}`}>
                                <Card className={styles.showCard}>
                                    <div className={styles.imageWrapper}>
                                        <Image src={show?.i?.imageUrl ?? 'bingebuddy-hr.png'} className={styles.showImage} />
                                    </div>
                                    <Card.Content className={styles.showCardContent}>
                                        <Card.Header>{show.l}</Card.Header>
                                        <Card.Description>{show.q}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                        </div>
                    </Grid.Column>
                ))}
            </Grid>

            {totalPages > 0 && (
            <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1.5em',
                }}
            >
                <Pagination
                    activePage={activePage}
                    onPageChange={handlePaginationChange}
                    totalPages={totalPages}
                    ellipsisItem={null}
                    boundaryRange={1}
                    size="mini"
                />
            </div>
            )}
        </Container>
    </>
  )
}

export default Home;