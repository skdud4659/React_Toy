import React from 'react';
import Upload from '../components/Upload';
import preview from '../img/IMG_2250 2.JPG'

import {Grid, Button, Image, Input, Text} from '../elements'

const WriteEdit = (props) => {

  const comment = React.useRef();

  const cmtBtn = () => {
    console.log(comment)
  }

  return (
    <React.Fragment>
      <Grid>
        <Upload />
        <Grid border="2px solid #E7E7E7">
          <Image src={preview} width="100%"/>
        </Grid>
        <Grid>
          <Input
            multiline
            margin="10% 0%;"
            padding="5%;"
            ref={comment}/>
        </Grid>
        <Grid>
            <Button
              width="84px"
              height="36px"
              margin="5% auto"
              _onClick={cmtBtn}>
              <Text color={"white"} bold>글 남기기</Text>
            </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default WriteEdit;