import { createContext, useState, useContext, useEffect } from 'react';
import {authAPI} from '../api/auth.api';
import {toast} from 'react-toastify';
import { success } from 'zod';

const AuthContext=createContext(null);
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        //user login check
        const token = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('user');
        
        if(token && savedUser){
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (Credentials) => {
        try{
            const response = await authAPI.login(Credentials);
            const {token, ...userData} = response.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            toast.success('Login successful!');
            return {success:true};
        }catch(error){
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            return {success: false, error:message};
        }
    };

    const register = async (data, isOrganizer=false)=>{
        try{
            const response = isOrganizer?await authAPI.registerOrganizer(data):await authAPI.registerAttendee(data);

            const {token, ...userData}= response.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            toast.success('Registration successful!');
            return {success:true};
        }catch(error){
            const message  =error.response?.data?.message || 'Registration failed';
            toast.error(message);
            return {success: false, error: message};
        }
    };

    const logout = () =>{
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        toast.info('Logged out successfully');
    };

    const isOrganizer =() =>{
        return user?.role== 'ORGANIZER' || user?.role == 'ADMIN';
    };

    return (<AuthContext.Provider value={{
        user,
        login, 
        register,
        logout,
        isOrganizer,
        isAuthenticated: !!user,
        loading,
    }}>
        {children}</AuthContext.Provider>);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};