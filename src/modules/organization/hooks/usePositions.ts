import { useGetPositionsQuery } from "../api/organizationApi";

export const usePositions = (departmentId?: string) => {
    return useGetPositionsQuery(departmentId);
};
