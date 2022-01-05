import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import WFMHome from '../../WFM/Home';

export default connect(
    (state:any)=>{
        return {
           userData:{username:state.loginData.username,token:state.loginData.token},
           wfmData:state.wfmData.wfmData
        }
    },
    (dispatch)=>{
        return bindActionCreators({
            getWfmData:(userData)=>{
                return {type:"WFM_ACTION",data:userData}
            },
            acceptRequest:(requestInfo)=>{
                return {type:"ACCEPT_REQUEST_ACTION",data:requestInfo}
            }
        },dispatch)
    }
)(WFMHome)