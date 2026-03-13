import {useGetPositionQuery} from "../api/organizationApi";

export const usePositions = () => {
    return useGetPositionQuery();
};
