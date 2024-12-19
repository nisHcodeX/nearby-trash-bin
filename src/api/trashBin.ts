import { AddTrashBin, Feedback, SearchBin, TrashBinRes } from '@core/interface'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseCustomQuery } from './interceptorSlice';

const base64ToBlob = (base64: string, contentType = 'image/png') => {
    const byteCharacters = atob(base64.split(',')[1]); // Remove the Base64 prefix (e.g., `data:image/png;base64,`)
    const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
};

export const nearByTrashBinAPI = createApi({
    reducerPath: 'trashBinAPI',
    baseQuery: baseCustomQuery,
    endpoints: (builder) => ({
        addTrashBin: builder.mutation<TrashBinRes, AddTrashBin>({
            query: (data) => {
                const formData = new FormData();
                if (data.Image.startsWith("data:image")) {
                    const contentType = data.Image.substring(data.Image.indexOf(":") + 1, data.Image.indexOf(";"));
                    const imageBlob = base64ToBlob(data.Image, contentType);
                    formData.append("Image", imageBlob, "image.png"); 
                } else {
                    console.error("Invalid image format");
                }
                formData.append("Latitude", data.Latitude.toString());
                formData.append("Longitude", data.Longitude.toString());
                formData.append("Organic", data.Organic.toString());
                formData.append("Paper", data.Paper.toString());
                formData.append("Plastic", data.Plastic.toString());
                formData.append("Glass", data.Glass.toString());
                formData.append("UserId", data.UserId);
        
                return {
                    url: `TrashBin/add`,
                    body: formData,
                    method: "POST",
                };
            },
        }),     
        findTrashBin: builder.mutation<TrashBinRes[], SearchBin>({
            query: (data) => ({
                url: `TrashBin/search?lat=${data.lat}&lon=${data.lng}&radius=${data.radius}`,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        addReviewTrashBin: builder.mutation<any, Feedback>({
            query: (data) => ({
                url: `Feedback/add`,
                method: "POST",
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
    }),
});

export const { useAddTrashBinMutation, useFindTrashBinMutation, useAddReviewTrashBinMutation } = nearByTrashBinAPI;