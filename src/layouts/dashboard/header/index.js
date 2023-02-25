import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
  direction: PropTypes.string,
  setDirection: PropTypes.func,
};

export default function Header({ onOpenNav, direction, setDirection }) {
  const handleDirection = (event, newAlignment) => {
    setDirection(newAlignment);
  };

  return (
    <StyledRoot
      sx={{
        left: direction === 'rtl' ? 0 : 'auto',
      }}
    >
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <ToggleButtonGroup
          sx={{ mr: 2, direction: direction === 'rtl' && 'ltr' }}
          value={direction}
          exclusive
          onChange={handleDirection}
          aria-label="text alignment"
        >
          <ToggleButton size="small" value="ltr" aria-label="ltr">
            LTR
          </ToggleButton>
          <ToggleButton size="small" value="rtl" aria-label="rtl">
            RTL
          </ToggleButton>
        </ToggleButtonGroup>

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
