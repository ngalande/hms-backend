import axios from "axios";
import { createContext, useState } from "react";
// import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import { keys } from "./variables";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../../firebaseConfig";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { API } from "../../keys";


const auth = getAuth(app)
const AuthContext = createContext();
export const LoadingContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies(["token", "user_role"]);
  // const API = "https://api.hotels.samwaku.com/api/v2/"
  useEffect(() => {
    // logout()
    // removeCookie('token', {path: '/', secure: true, sameSite: true})
    
    if(cookies.token){
      console.log('second')
      if(cookies.user_role == 'ADMIN'){
        navigate('/admin/home')
      }else if(cookies.user_role == 'RECEPTIONIST'){
        navigate('/rec/home')
      }else if(cookies.user_role == 'BARATTENDANT'){
        navigate('/bar/home')
      }else if(cookies.user_role == 'RESTAURANTMANAGER'){
        navigate('/res/home')
      }else if(cookies.user_role == 'USER'){
        navigate('/user/home')
      }

    }
  }, [])
  const [loading, setLoading] = useState(false)
 
  const navigate = useNavigate();
 
  const register = async (email, username, password, role) => {
    setLoading(true)
    const payload = {
      "email": email,
      "password": password,
      username: username,
      role: role
    }
    axios.post(API+'user/register', payload)
      .then(res => {
        alert(res.data?.message)
        // console.log(res.data)
        setLoading(false)
        navigate("login");
        // re
      }).catch(e => {
        setLoading(false)
        console.log(e)
      })
  }

  const login = async (email, password, callback) => {
    setLoading(true)
    const payload = {
      "email": email,
      "password": password
    }
    axios.post(API+'user/login', payload).then(async(res) => {
      // console.log(res.headers['set-cookie'])
      console.log(res.data)
      if(String(res.data.message).includes('Incorrect password')){
        setLoading(false)
        alert('Authentication Error, please enter valid credentials')
        return callback('false')
        
      }else if(String(res.data.message).includes('User not found')){
        setLoading(false)
        alert('Authentication Error, User does not exists')
        return callback('false')
      }else{
        setCookies('token', res.data.token, {path: '/', secure: true, sameSite: true})
        setCookies('user_role', res.data.user_role, {path: '/', secure: true, sameSite: true})
        if(res.data.user_role == 'RECEPTIONIST'){
          navigate("rec/home");
          return callback('true')
        }else if(res.data.user_role == 'ADMIN'){
          navigate("admin/home");
          return callback('true')
        }else if(res.data.user_role == 'BARATTENDANT'){
          navigate("bar/home");
          return callback('true')
        }else if(res.data.user_role == 'RESTAURANTMANAGER'){
          navigate("res/home");
          return callback('true')
        }else if(res.data.user_role == 'USER'){
          navigate("user/home");
          return callback('true')
        }
      }
      
    }).catch(e => {
      setLoading(false)
      if(String(e?.response?.data?.message ).includes('Incorrect password, try again')){
        setLoading(false)
        alert('The password you entered is incorrect')
        return callback('false')
      }else if(String(e?.response?.data?.message ).includes('User not found')){
        setLoading(false)
        alert('Account does not exist')
        return callback('false')
      }else {
        setLoading(false)
        alert('Authentication Error, An error ocurred while signing in')
        console.log(e.response.data)
        return callback('false')

      }
    })
    setLoading(false)




      
    };
    const logout = async () => {
      // invoke the logout API call, for our NestJS API no logout API
      signOut(auth)
        .then(res => {
          console.log(res)
          removeCookie('token', {path: '/', secure: true, sameSite: true})
          removeCookie('user_role', {path: '/', secure: true, sameSite: true})
          navigate("/");
        })
        .catch(e => {
          console.log(e)
          alert('Logout Failed, try again')
        })
    };
  return (
    <AuthContext.Provider value={{login, logout, register }}>
        <LoadingContext.Provider value={[loading, setLoading]}>
            {children}

        </LoadingContext.Provider>
    </AuthContext.Provider>
  );
};
 
export default AuthContext;