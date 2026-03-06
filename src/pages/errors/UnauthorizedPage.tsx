import { Box, Typography, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" alignItems="center"
         justifyContent="center" minHeight="100vh" gap={2}>
      <LockIcon sx={{ fontSize: 64, color: 'error.main' }} />
      <Typography variant="h5">Access Denied</Typography>
      <Typography color="text.secondary">
        You don't have permission to view this page.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
    </Box>
  );
}