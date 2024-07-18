import { USER_TYPES } from "@constant/index";

export interface Session {
    "id": string;
    "name": string;
    "email": string;
    "phoneNumber": number;
    "userType": USER_TYPES;
    "token": string;
}

export interface UserLoginData {
    "password": string;
    "email": string;
}

export interface UserLoggedData {
    "id": string;
    "name": string;
    "email": string;
    "phoneNumber": number;
    "userType": USER_TYPES;
    "token": string;
}

export interface UserSigupData {
    "name": string,
    "email": string,
    "phoneNumber": string,
    "password": string,
    "userType": USER_TYPES
}

export interface AddTrashBin {
    "Image": string,
    "Latitude": number,
    "Longitude": number,
    "Organic": boolean,
    "Paper": boolean
    "Plastic": boolean,
    "Glass": boolean,
    "UserId": string
}

export interface FindTrashBin {
    "name": string,
    "email": string,
    "phoneNumber": string,
    "password": string,
    "userType": USER_TYPES
}



