import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ManagerHome from '../../Managers/Home';

export default connect(
    (state:any)=>{
        return {
           userData:{username:state.loginData.username,token:state.loginData.token},
           employeeData:state.employeeData.employeeData,
           showRequestModal:false
        }
    },
    (dispatch)=>{
        return bindActionCreators({
            getEmployee:(userData)=>{
                return {type:"Action",data:userData}
            }
            ,
            sendRequest:(requestData)=>{
                return {type:"SEND_REQUEST_ACTION",data:requestData}
            }
        },dispatch)
    }
)(ManagerHome)