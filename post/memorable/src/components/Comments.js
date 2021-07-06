import React from 'react';
import { Grid, Text, Image } from '../elements';
import postEx from '../img/main.jpg'

import styled from 'styled-components';

const Comments = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid height="10%" margin="5% 0px 0px 0px">
          <Grid is_flex bg={"#FFE3C1"} top="true" border_top="#D58A32" padding="4px 6px;">
            <Text bold>{props.user_info.user_name}</Text>
            <Text>({props.insert_dt})</Text>
          </Grid>
            <Grid height="8%" is_flex border="1px solid #D58A32">
              <Grid>
                <Image shape="profile" src={postEx}/>
              </Grid>
              <Grid>
                <Text>{props.comment}</Text>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Comments.defaultProps = {
  user_info: {
    user_name: 'mane_kim',
    user_profile: '',
  },
  insert_dt: "2021.07.06 14:00",
  comment: "안녕 가을아!",
}

const Icon = styled.div`
`;


export default Comments;