import {
  Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography, Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface Props {
  drawerWidth: number;
  mobileOpen: boolean;
  onClose: () => void;
}

// Add new pages here — role: null means any logged-in user can see it
const NAV_ITEMS = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', role: null },
  { label: 'Projects',  icon: <FolderIcon />,    path: '/projects',  role: null },
  { label: 'Users',     icon: <PeopleIcon />,     path: '/users',     role: 'Admin' },
  { label: 'Admin',     icon: <AdminPanelSettingsIcon />, path: '/admin', role: 'Admin' },
];

export default function Sidebar({ drawerWidth, mobileOpen, onClose }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  const content = (
    <Box>
      <Toolbar>
        <Typography variant="h6" fontWeight="bold" color="primary">
          DIFC
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        {NAV_ITEMS
          .filter(item => !item.role || user?.roles.includes(item.role))
          .map(item => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname.startsWith(item.path)}
                onClick={() => { navigate(item.path); onClose(); }}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root': { color: 'white' },
                    '&:hover': { backgroundColor: 'primary.dark' },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* Mobile: temporary drawer (slides in/out) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }} // better mobile performance
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            bgcolor: 'background.paper',
            color: 'text.primary',
          },
        }}
      >
        {content}
      </Drawer>

      {/* Desktop: permanent drawer (always visible) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          },
        }}
        open
      >
        {content}
      </Drawer>
    </Box>
  );
}
