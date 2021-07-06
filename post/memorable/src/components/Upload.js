import React from 'react';
import { Input, Grid} from '../elements';


const Upload = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Input is_file/>
      </Grid>
    </React.Fragment>
  );
}

export default Upload;