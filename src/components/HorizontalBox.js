import React from 'react';
import { Box } from '@material-ui/core';

export default function HorizontalBox(props) {
    return (
        <Box
            {...props}
            display={props.hidden ? 'none' : 'flex'}
            flexDirection="row"
            position="relative"
        >
            {props.children}
        </Box>
    );
}

