import React from 'react';
import { Grid } from '../elements'

const Layout = (props) => {
  const {children} = props

  return (
    <React.Fragment>
        <Grid width="100vw" height="100vh">
          <Grid bg={"#60C1DF"} position height="100%">
            <Grid bg={"#ffffff"} width="" height="97%" margin="3%">
              {children}
            </Grid>
          </Grid>
        </Grid>
    </React.Fragment>
  );
}

Layout.defaultProps = {
  children:null,
}

export default Layout;