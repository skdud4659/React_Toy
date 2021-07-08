import React from "react";
//쓰로틀 사용 임포트
import _ from "lodash";
import Spinner from "../shared/Spinner";

const InfinityScroll = (props) => {

    const {children, callNext, is_next, loading} = props;

    //쓰로틀 적용
    const _handleScroll = _.throttle(() => {

        if(loading){
            return;
        }

        //화면 크기 계산해서 스크롤이 아래에 닿았을 때 불러오기
        const {innerHeight} = window;
        const {scrollHeight} = document.body;

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        
        if(scrollHeight - innerHeight - scrollTop < 200) {
            callNext();
        }
    }, 300);

    const handleScroll = React.useCallback(_handleScroll, [loading]);

    React.useEffect(() => {
        
        if(loading){
            return;
        }

        //다음 게시글이 있으면 addevent, 없으면 삭제
        if(is_next){
            window.addEventListener("scroll", handleScroll);
        }else{
            window.removeEventListener("scroll", handleScroll);
        }
        
        //클린업
        return () => window.removeEventListener("scroll", handleScroll);
    }, [is_next, loading]);

    return (
        <React.Fragment>
            {props.children}
            {is_next && (<Spinner/>)}
        </React.Fragment>
    )
}

InfinityScroll.defaultProps = {
    children: null,
    callNext: () => {},
    is_next: false,
    loading: false,
}

export default InfinityScroll;