import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import api from '@/api/axiosInstance';

interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState<string[]>([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!userName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and confirm password must match.');
      return;
    }

    setError('');
    setErrorList([]);
    setSuccess('');
    setLoading(true);

    try {
      const payload: RegisterPayload = { userName, email, password, confirmPassword };
      const response = await api.post('/User/register', payload);
      const message = response.data?.message ?? 'Registration successful.';
      setSuccess(message);
      setTimeout(() => navigate('/login'), 800);
    } catch (err: any) {
      const apiMessage = err.response?.data?.message;
      const errors = err.response?.data?.errors;

      if (Array.isArray(errors) && errors.length > 0) {
        setErrorList(errors);
      } else if (errors && typeof errors === 'object') {
        const firstKey = Object.keys(errors)[0];
        const firstError = errors[firstKey]?.[0];
        setError(firstError ?? 'Registration failed.');
      } else {
        setError(apiMessage ?? 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleRegister();
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={6} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" fontWeight={700}>
              Sign up
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5} mb={2}>
              Create your DIFC account
            </Typography>
          </Box>

          {errorList.length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorList.map((msg, index) => (
                <Box key={`${index}-${msg}`}>{msg}</Box>
              ))}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoComplete="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm((p) => !p)} edge="end">
                      {showConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 1.5, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>

            <Stack direction="row" justifyContent="space-between" flexWrap="wrap" spacing={1}>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
