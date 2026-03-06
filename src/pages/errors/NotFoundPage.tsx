import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" alignItems="center"
         justifyContent="center" minHeight="100vh" gap={2}>
      <Typography variant="h1" fontWeight="bold" color="primary">404</Typography>
      <Typography variant="h5">Page Not Found</Typography>
      <Typography color="text.secondary">
        The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
    </Box>
  );
}