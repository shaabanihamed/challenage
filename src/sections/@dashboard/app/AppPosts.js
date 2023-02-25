import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  CircularProgress,
  Skeleton,
  Modal,
  TextField,
  Button,
} from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';

const API = 'https://jsonplaceholder.typicode.com/posts';
export const AppPosts = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [loadings, setLoadings] = useState({
    isLoading: false,
    isUpdating: null,
    isRemoving: null,
  });

  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    setLoadings({ ...loadings, isLoading: true });
    fetch(API)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoadings({ ...loadings, isLoading: false });
          setItems(result.slice(0, 20));
        },
        () => {
          setLoadings({ ...loadings, isLoading: false });
        }
      );
  }, []);

  const handelOnClick = useCallback(
    (postId) => {
      setOpen(true);
      setEdit(items.find(({ id }) => id === postId));
    },
    [items]
  );

  const deletePost = (postId) => {
    setLoadings({ ...loadings, isRemoving: postId });
    fetch(`${API}/${postId}`, { method: 'DELETE' }).then((res) =>
      res.status === 200
        ? (setItems(items.filter(({ id }) => id !== postId)), setLoadings({ ...loadings, isRemoving: false }))
        : console.log('res', res.statusText)
    );
  };

  const handleEdit = () => {
    setLoadings({ ...loadings, isUpdating: edit.id });
    fetch(`${API}/${edit.id}`, { method: 'PUT', body: JSON.stringify(edit) }).then((res) =>
      res.status === 200
        ? (setItems(items.map((item) => (item.id === edit.id ? edit : item))),
          setLoadings({ ...loadings, isUpdating: false }),
          setOpen(false))
        : console.log('res', res.statusText)
    );
  };

  return loadings.isLoading ? (
    <Box display="flex" flexDirection="column" gap=".5rem">
      {[...Array(5).keys()].map((_, i) => (
        <Skeleton key={i} animation="wave" variant="rectangular" width="100%" height={60} />
      ))}
    </Box>
  ) : (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Body</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(({ id, title, body }, index) => (
              <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {title}
                </TableCell>
                <TableCell align="left">{body}</TableCell>
                <TableCell>
                  <Box display="flex">
                    <IconButton color="primary" aria-label="remove" component="label" onClick={() => deletePost(id)}>
                      {loadings.isRemoving === id ? (
                        <CircularProgress size={24} />
                      ) : (
                        <Icon icon="material-symbols:delete-outline" />
                      )}
                    </IconButton>
                    <IconButton color="primary" aria-label="edit" component="label" onClick={() => handelOnClick(id)}>
                      <Icon icon="material-symbols:edit" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            multiline
            id="outlined-basic"
            fullWidth
            label="title"
            variant="outlined"
            value={edit?.title}
            onChange={(e) => setEdit({ ...edit, title: e.target.value })}
          />
          <TextField
            multiline
            minRows={6}
            sx={{ mt: 2 }}
            fullWidth
            label="body"
            variant="outlined"
            value={edit?.body}
            onChange={(e) => setEdit({ ...edit, body: e.target.value })}
          />

          <Box display="flex" gap="8px" mt={2}>
            <Button variant="text" color="error" onClick={handleClose}>
              Cancel
            </Button>

            <Button variant="contained" onClick={handleEdit} disabled={loadings.isUpdating}>
              {loadings.isUpdating ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  '@media (max-width: 780px)': {
    width: 320,
  },
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
