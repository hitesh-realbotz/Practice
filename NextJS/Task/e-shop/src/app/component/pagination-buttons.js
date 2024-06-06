import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationButtons = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      {/* <Stack spacing={2} > */}
        <Pagination count={props.count} showFirstButton showLastButton />
      {/* </Stack> */}
    </div>
  );
}
export default PaginationButtons;
