import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DRAWER_WIDTH = 240;

/**
 * Shell layout rendered for all protected pages.
 *
 * ┌─────────────────────────────────┐
 * │           Topbar                │
 * ├──────────┬──────────────────────┤
 * │          │                      │
 * │ Sidebar  │  <Outlet />          │
 * │          │  (current page)      │
 * │          │                      │
 * └──────────┴──────────────────────┘
 */
export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Topbar
        drawerWidth={DRAWER_WIDTH}
        onMenuClick={() => setMobileOpen(!mobileOpen)}
      />

      <Sidebar
        drawerWidth={DRAWER_WIDTH}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        {/* Spacer so content clears the fixed Topbar */}
        <Toolbar />

        {/* Active page renders here via React Router */}
        <Outlet />
      </Box>
    </Box>
  );
}