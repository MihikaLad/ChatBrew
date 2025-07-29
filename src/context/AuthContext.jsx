import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext()
export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);

    //signup func
    const signUpNewUser = async(email, password) =>{
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if(error){
            console.log("Error");
            return{success:false, error};
        }
        return {success:true, data};
    }

    //Sign In
    const signInUser = async(email, password) => {
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if(error){
                console.error('Sign In Error Occured');
                return{success: false, error:error.message}
            }
            console.log("SignIn success");
            return{success: true, data}
        }catch(error){
            console.log("Error");
        }
    }
    useEffect(()=>{
        supabase.auth.getSession().then(({data: {session}}) =>{
            setSession(session);
        });
        supabase.auth.onAuthStateChange((_event, session)=>{
            setSession(session);
        })
    }, [])


    //Signout
    const signOut = () =>{
        const {error} = supabase.auth.signOut();
        if(error){
            console.log("Error");
        }
    }
    return (
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}
export const UserAuth = () =>useContext(AuthContext);


