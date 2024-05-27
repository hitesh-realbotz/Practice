import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationButtons = (props) => {
  return (
    <Stack spacing={2}>
      <Pagination count={props.count} showFirstButton showLastButton />
    </Stack>
  );
}
export default PaginationButtons;
