import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import {useSelector,useDispatch} from "react-redux";
import { showLoading } from '../redux/features/alertSlice';
import { hideLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';
function ProtectedRoutes({children}) {
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)
    const getUser = async()=>{
        try{
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/getUserData',
            {token:localStorage.getItem("token")},
            {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                dispatch(setUser(res.data.data));
            }
            else{
                <Navigate to="/login"/>
                localStorage.clear();
            }
            }
        catch(error){
            dispatch(hideLoading());
            localStorage.clear();
             console.log(error)
        }
    };
    useEffect(()=> {
        if(!user){
            getUser();
        }
    },[user,getUser]);
    if(localStorage.getItem("token")){
        return children;
    }
    else{
        return <Navigate to="/login"/>;

    }

}
//module.exports={getUser}

export default ProtectedRoutes;
/*import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

function ProtectedRoutes({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const getUser = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                '/api/v1/user/getUserData',
                { token: localStorage.getItem("token") },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            dispatch(hideLoading());

            if (res.data.success) {
                dispatch(setUser(res.data.data));
            } else {
                // Use Navigate here instead of returning it
                dispatch(setUser(null)); // Assuming you have a setUser(null) action
                localStorage.clear();
            }
        } catch (error) {
            dispatch(hideLoading());
            localStorage.clear();
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                await getUser();
            }
        };

        fetchData();
    }, [user]); // Removed getUser from the dependency array

    if (localStorage.getItem("token")) {
        return children;
    } else {
        // Use Navigate here instead of returning it
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoutes;*/