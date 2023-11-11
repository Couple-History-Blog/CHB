// third-party
import firebase from 'firebase/compat/app';

// project imports
import { UserProfile } from 'types/user-profile';
import {Dispatch, SetStateAction} from "react";
import {StringColorProps} from "./index";
import {FormikErrors, FormikTouched} from "formik";
import {Theme} from "@mui/material/styles";

export type FirebaseContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => Promise<void>;
    login: () => void;
    firebaseRegister: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
    firebaseEmailPasswordSignIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
    firebaseGoogleSignIn: () => Promise<firebase.auth.UserCredential>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: VoidFunction;
};

export type Auth0ContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => void;
    login: () => void;
    resetPassword: (email: string) => void;
    updateProfile: VoidFunction;
};

export interface JWTDataProps {
    userId: string;
}

export type JWTContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => void;
    login: (email: string, password: string) => Promise<void>;
    register: (isAvailableId: boolean, userId:string, sexType: string, birthDate: string, email: string, password: string, firstName: string, lastName: string, nickName: string) => Promise<void>;
    resetPassword: (email: string) => void;
    updateProfile: VoidFunction;
    userInfoData?: UserInfoType | null;
};

export type AWSCognitoContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => void;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<unknown>;
    resetPassword: (email: string) => void;
};

export interface InitialLoginContextProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    userInfoData?: UserInfoType | null;
}

export interface UserInfoType {
    userId: string | null;
    userNickName: string | null;
    userName: string | null;
    userEmail: string | null;
    userBirthDate: string | null;
    updateProfile: boolean;
    beCoupleYn: boolean;
    appliedCoupleAccount: boolean;
    ownUserAcceptYn: boolean;
}