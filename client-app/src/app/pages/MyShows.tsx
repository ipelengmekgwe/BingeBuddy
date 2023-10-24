import { Item, Segment } from 'semantic-ui-react'
import { Show } from '../models/show';

const MyShows = () => {
    const latestTVShows: Show[] = [
        { id: 1, title: 'Hello1', description: "This is a movie", imageUrl: 'bingebuddy-hr.png', imdbId: 'tt', titleType: 'tvShow', year: 2014 },
        { id: 2, title: 'Hello2', description: "This is a movie", imageUrl: 'bingebuddy-hr.png', imdbId: 'tt', titleType: 'tvShow', year: 2014 },
        { id: 3, title: 'Hello3', description: "This is a movie", imageUrl: 'bingebuddy-hr.png', imdbId: 'tt', titleType: 'tvShow', year: 2014 },
        { id: 4, title: 'Hello4', description: "This is a movie", imageUrl: 'bingebuddy-hr.png', imdbId: 'tt', titleType: 'tvShow', year: 2014 },
        { id: 5, title: 'Hello5', description: "This is a movie", imageUrl: 'bingebuddy-hr.png', imdbId: 'tt', titleType: 'tvShow', year: 2014 },
        { id: 6, title: 'Hello6', description: "This is a movie", imageUrl: 'bingebuddy-hr.png', imdbId: 'tt', titleType: 'tvShow', year: 2014 },
        { id: 7, title: 'Hello7', description: "This is a movie", imageUrl: 'bingebuddy-hr.png', imdbId: 'tt', titleType: 'tvShow', year: 2014 }
    ];
    
  return (
    <Segment>
        <Item.Group divided>
            {latestTVShows.map(show => (
                <Item key={show.id}>
                    <Item.Content>
                        <Item.Header as='a'>{show.title}</Item.Header>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>
  )
}

export default MyShows