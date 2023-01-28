import React from "react";

const Hr = (props) => (
    <div
        {...props}
        style={{height: 1, width: '100%', background: '#dddddd', ...props.style}}
    />
)

export default Hr