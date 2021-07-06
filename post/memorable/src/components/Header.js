import React from 'react';
import { Grid, Text, Button } from '../elements';

const Header = (props) => {
  return (
    <Grid>
      <Grid is_flex padding="3% 3%;">
        <Grid>
        <Text color={"#EE6705"} bold size="20px">Memorable</Text>
        </Grid>
        <Grid is_flex width="auto">
          <Button width="66px" height="28px" margin="0px 3% 0px 0px">
            <Text bold color="white">회원가입</Text>
          </Button>
          <Button width="66px" height="28px">
            <Text bold color="white">로그인</Text>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}


export default Header;