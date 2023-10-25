import React, { useEffect, useState } from 'react';
import { Container, Header, Segment, Card, Image, Grid,
    Pagination, PaginationProps} from 'semantic-ui-react';
import rapidApiAgent from '../../api/rapidApiAgent';
import styles from './Home.module.css';
import LoadingComponents from '../../layout/LoadingComponents';
import { Link } from 'react-router-dom';
import { generate } from 'random-words';

const Home = () => {

    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const searchString: string = generate(1)[0];

    useEffect(() => {
        const loadShows = async () => {
            const savedDate = localStorage.getItem('date');
            const savedShowsJSON = localStorage.getItem('localShows');
            const savedShows: any[] = savedShowsJSON ? JSON.parse(savedShowsJSON) : [];
            const currentDate = new Date();
            const timeDiff = savedDate ? (currentDate.getTime() - new Date(savedDate).getTime()) / (1000 * 60 * 60) : 0;
            
            if (timeDiff > 6 || !savedShows || savedShows.length === 0) {
                rapidApiAgent.Shows.find(searchString).then(response => {
                    setShows(response.results);
                    setLoading(false);
                    localStorage.setItem('localShows', JSON.stringify(response.results));
                    localStorage.setItem('date', currentDate.toISOString());
                });
            } else {
                setShows(savedShows);
                setLoading(false);
            }
        };

        loadShows();
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
                            <Link to={`/details/${show?.id?.replace(/\/(title)*\//g, "")}`}>
                                <Card className={styles.showCard}>
                                    <div className={styles.imageWrapper}>
                                        <Image src={show?.image?.url ?? 'bingebuddy-hr.png'} className={styles.showImage} />
                                    </div>
                                    <Card.Content className={styles.showCardContent}>
                                        <Card.Header>{show?.title}</Card.Header>
                                        <Card.Description>{show?.titleType?.replace(/\b[a-z]/g, (x: any) => x.toUpperCase())}</Card.Description>
                                        <Card.Meta>{show?.year}</Card.Meta>
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