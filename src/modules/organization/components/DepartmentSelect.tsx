import {FC} from "react";
import {useDepartments} from "@/modules/organization/hooks/useDepartments";

interface DepartmentsSelectProps {
    selectedDepartmentId?: string;
    onChange: (selectedDepartmentId?: string) => void;
}

const DepartmentSelect: FC<DepartmentsSelectProps> = ({selectedDepartmentId, onChange}) => {
    const {data: departments, isLoading, isError} = useDepartments();

    return (
        <select
            className="border rounded-md p-2 bg-background"
            value={selectedDepartmentId ?? ""}
            onChange={(e) => onChange( e.target.value)}
            disabled={isLoading || isError}
        >
            <option value="">
                {isLoading ? "Загрузка..." : isError ? "Ошибка загрузки" : "Выберите подразделение"}
            </option>
            {departments?.map((d) => (
                <option key={d.id} value={d.id}>
                    {d.name}
                </option>
            ))}
        </select>
    );
};

export default DepartmentSelect;
