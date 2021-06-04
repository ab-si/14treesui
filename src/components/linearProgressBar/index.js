import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" style={{ width: "396px", backgroundColor: "#C7C7C7"}}>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" style={{ height: "7px", backgroundColor: "#C7C7C7"}} {...props} />
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;