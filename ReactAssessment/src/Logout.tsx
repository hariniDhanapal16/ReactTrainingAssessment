const Logout=()=>{  
    localStorage.clear()
    return(
        <a href='/login' style={{backgroundColor:"#f00",color:"white",marginTop:"70px"}} className="btn btn-sm logout">
        <span className="fa fa-sign-out"></span> Log out</a>
    )
}

export default Logout;