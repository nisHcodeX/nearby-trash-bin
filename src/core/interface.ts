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

export interface TrashBinRes {
    id: number;
    latitude: number;
    longitude: number;
    imageUrl: string;
    organic: boolean;
    paper: boolean;
    plastic: boolean;
    glass: boolean;
    createdDate: any
    trashBinStatus: number;
    appUserId: string;
    appUser: any
    feedbacks: any
};

export interface FindTrashBin {
    "name": string,
    "email": string,
    "phoneNumber": string,
    "password": string,
    "userType": USER_TYPES
}

export interface  LocationData {
    address: string;
    lat: number,
    lng: number
}

export interface SearchBin {
    radius: number;
    lat: number,
    lng: number
}

export interface Feedback {
    comment: string;
    ratings: number;
    latestFeedback: number;
    trashBinId: number;
    userId: string;
  }
  




