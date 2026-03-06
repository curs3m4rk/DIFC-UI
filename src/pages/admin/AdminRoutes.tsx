import { Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h4">Admin Panel</Typography>
      <Typography color="text.secondary" mt={1}>
        Admin pages will go here.
      </Typography>
    </Box>
  );
}

// Add more admin sub-routes here as the app grows
export default function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
    </Routes>
  );
}