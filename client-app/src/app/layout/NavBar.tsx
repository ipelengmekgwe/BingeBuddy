import { NavLink } from 'react-router-dom';
import { Container, Menu, Input } from 'semantic-ui-react';

const Navbar = () => {

  const handleSearch = () => {
    console.log('Search triggered.');
    //return to homepage passing the search string to the load method
  };

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src='bingebuddy-hr.png' alt='logo' style={{marginRight: '1em'}} />
          Binge Buddy
        </Menu.Item>

        <Menu.Item as={NavLink} to='/'>Home</Menu.Item>
        <Menu.Item as={NavLink} to='/my-shows'>My Shows</Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Input action={{icon: 'search', onClick: handleSearch}}  placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;