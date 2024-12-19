import { BIN_APPROVE_STATUS, USER_TYPES } from "@constant/index";

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
    "suggestedBin": boolean
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
    suggestedBin: boolean
};

export interface FindTrashBin {
    "name": string,
    "email": string,
    "phoneNumber": string,
    "password": string,
    "userType": USER_TYPES
}

export interface LocationData {
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

export interface UserDetail {
    createdAt: string;
    userType: number;
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string | null;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: string | null;
    lockoutEnabled: boolean;
    accessFailedCount: number;
}

export interface UpdateTrashBin {
    id: number;
    status: BIN_APPROVE_STATUS
}

export interface FeedbackRes {
    id: number;
    comment: string;
    ratings: number;
    createdDate: string;
    updatedDate: string | null;
    userId: string;
    trashBinId: number;
    trashBin: any | null;
    latestFeedback: number;
}

export interface InferenceResult {
    inference_id: string;
    time: number;
    image: {
        width: number;
        height: number;
    };
    predictions: Prediction[];
}

interface Prediction {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
    class: string;
    class_id: number;
    detection_id: string;
}




