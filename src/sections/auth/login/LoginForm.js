import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MuiAlert from '@mui/material/Alert';
// components
import Iconify from '../../../components/iconify';
import { userContext } from '../../../userContext/userContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [context, setContext] = useContext(userContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRemember, setIsRemember] = useState(localStorage.getItem('isRemember') || false);

  const isDisabled = !context.email || !context.password;

  const handleLogin = () => {
    localStorage.setItem('token', 'user_have_token');
    navigate('/dashboard', { replace: true });
  };

  const CheckIsRememberMe = () =>
    isRemember
      ? (localStorage.setItem('loginState', JSON.stringify(context)),
        localStorage.setItem('isRemember', true),
        handleLogin())
      : (localStorage.removeItem('loginState'), localStorage.removeItem('isRemember'), handleLogin());

  const handleClick = () =>
    context.email === 'abc@gmail.com' && context.password === '123456' ? CheckIsRememberMe() : setIsError(true);

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          value={context.email}
          onChange={(e) => setContext({ ...context, email: e.target.value })}
          label="Email address"
        />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setContext({ ...context, password: e.target.value })}
          value={context.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox
          name="remember"
          label="Remember me"
          checked={isRemember}
          onChange={(e) => setIsRemember(!isRemember)}
        />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={isDisabled}
        onClick={handleClick}
      >
        Login
      </LoadingButton>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        open={isError}
        onClose={() => setIsError(false)}
      >
        <MuiAlert variant="filled" elevation={6} severity="error">
          Error in login, please check your password and email
        </MuiAlert>
      </Snackbar>
    </>
  );
}
