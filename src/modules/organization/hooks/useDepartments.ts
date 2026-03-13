import { useGetDepartmentsQuery } from "../api/organizationApi";

export const useDepartments = () => {
    return useGetDepartmentsQuery();
};
