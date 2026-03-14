import { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box,
  Avatar, Menu, MenuItem, Divider, Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '@/theme/themeMode';

interface Props {
  drawerWidth: number;
  onMenuClick: () => void;
}

export default function Topbar({ drawerWidth, onMenuClick }: Props) {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = async () => {
    setAnchorEl(null);
    await logout();
    navigate('/login');
  };

  // "John Doe" → "JD"
  const initials = user?.userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() ?? '?';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="default"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        {/* Hamburger icon — mobile only */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} />

        {/* Theme toggle + user section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={mode === 'dark' ? 'Switch to light' : 'Switch to dark'}>
            <IconButton color="inherit" onClick={toggleMode} sx={{ p: 0.5 }}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user?.userName}
          </Typography>

          <Tooltip title="Account settings">
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 34, height: 34, fontSize: 14 }}>
                {initials}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{ sx: { minWidth: 200 } }}
        >
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
          </MenuItem>

          <Divider />

          <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile'); }}>
            <PersonIcon fontSize="small" sx={{ mr: 1 }} />
            Profile
          </MenuItem>

          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
