import {create} from "zustand";
import {axiosInstance} from "../libs/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,
    isLoggingOut: false,

    checkAuth: async () => {
        set({isCheckingAuth: true});

        try {
            const res = await axiosInstance.get("/auth/profile");
            set({authUser: res.data.user});

            return true;
        } catch (error) {
            console.error("Error checking auth: ", error);
            set({authUser: null});

            return false;
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});

        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({authUser: res.data.user});
            
            return true
        } catch (error) {
            console.error("Error registering user: ", error);
            set({authUser: null});

            return false;
        } finally {
            set({isSigningUp: false})
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});

        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data.user});
            
            return true;
        } catch (error) {
            console.error("Error in logging in ", error)
            
            return false;
        } finally {
            set({isLoggingIn: false});
        }
    },

    logout: async () => {
        set({isLoggingOut: true});

        try {
            const res = await axiosInstance.get("/user/logout");
            set({authUser:null});
            
            return true;
        } catch (error) {
            console.error("Error logging out", error)
            
            return false;
        } finally {
            set({isLoggingOut: false});
        }
    },
}))