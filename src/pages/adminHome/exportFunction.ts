import { FeedbackRes, TrashBinRes, UserDetail } from "@core/interface";
import { exportToExcel } from "./excellExporter";
import { BIN_STATUS } from "@constant/index";

const binStatusTextRender = (status: BIN_STATUS) => {
    let statusText = "";
    switch (status) {
        case BIN_STATUS.EMPTY:
            statusText = 'EMPTY'
            break;
        case BIN_STATUS.HALF:
            statusText = 'HALF'
            break;
        case BIN_STATUS.QUARTER:
            statusText = 'QUARTER'
            break;
        case BIN_STATUS.FULL:
            statusText = 'FULL'
            break;
        case BIN_STATUS.THREEQUARTER:
            statusText = 'THREEQUARTER'
            break;
        default: statusText = 'EMPTY'
    }
    return statusText;
}

export const onExportUsers = (users: UserDetail[]) => {
    const filteredUsers = users
        ?.filter((user: UserDetail) => user.userType === 1)
        .map((user: UserDetail) => ({
            id: user.id,
            userType: "User",
            userName: user.userName,
            email: user.email,
            createdAt: user.createdAt,
            phoneNumber: user.phoneNumber,
        }));
    exportToExcel(filteredUsers, "Users")
}

export const onExportFeedbacks = (feedbacks: FeedbackRes[]) => {
    const filteredFeedbacks = feedbacks?.map((feedback: FeedbackRes) => ({
        id: feedback.id,
        comment: feedback.comment,
        ratings: feedback.ratings,
        userId: feedback.userId,
        binStatus: binStatusTextRender(feedback.latestFeedback),
        date: feedback.createdDate,
    }));

    exportToExcel(filteredFeedbacks, "Feedbacks");
};

export const onExportTrashBins = (trashBins: TrashBinRes[]) => {
    const filteredTrashbins = trashBins
        ?.filter((trashBin: TrashBinRes) => !trashBin.suggestedBin)
        .map((trashBin: TrashBinRes) => ({
            id: trashBin.id,
            glass: trashBin.glass,
            paper: trashBin.paper,
            organic: trashBin.organic,
            plastic: trashBin.plastic,
            latitude: trashBin.latitude,
            longitude: trashBin.longitude,
            createdDate: trashBin.createdDate
        }));
    exportToExcel(filteredTrashbins, "TrashBins")
};
export const onExportSugestedTrashBins = (trashBins: TrashBinRes[]) => {
    const filteredTrashbins = trashBins
        ?.filter((trashBin: TrashBinRes) => trashBin.suggestedBin)
        .map((trashBin: TrashBinRes) => ({
            id: trashBin.id,
            glass: trashBin.glass,
            paper: trashBin.paper,
            organic: trashBin.organic,
            plastic: trashBin.plastic,
            latitude: trashBin.latitude,
            longitude: trashBin.longitude,
            createdDate: trashBin.createdDate
        }));
    exportToExcel(filteredTrashbins, "SuggestedTrashBins")
};
