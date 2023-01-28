import React from 'react';
import { Box } from '@material-ui/core';

export default function VerticalBox(props) {
  return (
    <Box
      {...props}
      display={props.hidden ? 'none' : 'flex'}
      flexDirection="column"
      position="relative"
    >
      {props.children}
    </Box>
  );
}

