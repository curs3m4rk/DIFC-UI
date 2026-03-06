import { Box, Typography, Paper, Grid } from '@mui/material';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <Box>
      <Typography variant="h4" mb={0.5}>Dashboard</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Welcome back, {user?.fullName}
      </Typography>

      <Grid container spacing={3}>
        {[
          { label: 'Total Projects', value: 0 },
          { label: 'In Progress',    value: 0 },
          { label: 'Completed',      value: 0 },
          { label: 'Overdue',        value: 0 },
        ].map(({ label, value }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h3" fontWeight="bold" color="primary">
                {value}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}