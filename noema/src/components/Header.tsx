import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* App Name */}
        <Typography variant="h6" component={Link}
  to="/"
  sx={{
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  }}>
          Noema
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/create">
            Create Request
          </Button>
          <Button color="inherit" component={Link} to="/requests">
            Requests
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;