import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements'

const LayInner = (props) => {
  const {children} = props

  return (
    <React.Fragment>
      <Grid width="94%" margin="-3% 3%" height="92.5%" border="2px solid #C1B8B8"
        shadow="0px 4px 4px rgba(0, 0, 0, 0.25);" padding="8px 12px;">
          {children}
      </Grid>
    </React.Fragment>
  );
}

LayInner.defaultProps = {
  children:null,
}

export default LayInner;