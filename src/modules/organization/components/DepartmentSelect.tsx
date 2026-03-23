import {FC} from "react";
import {useDepartments} from "@/modules/organization/hooks/useDepartments";

interface DepartmentsSelectProps {
    selectedDepartmentId?: string;
    onChange: (selectedDepartmentId?: string) => void;
}

const mockDepartments = [
    {id: "11111111-1111-1111-1111-111111111111", name: "Разработка"},
    {id: "dep-2", name: "Маркетинг"},
    {id: "dep-3", name: "Продажи"},
];

const DepartmentSelect: FC<DepartmentsSelectProps> = ({selectedDepartmentId, onChange}) => {
    const {data: departments = mockDepartments} = useDepartments();

    return (
        <select
            className="border rounded-md p-2 bg-background"
            value={selectedDepartmentId ?? ""}
            onChange={(e) => onChange( e.target.value)}
        >
            <option value="">Выберите подразделение</option>
            {departments?.map((d) => (
                <option key={d.id} value={d.id}>
                    {d.name}
                </option>
            ))}
        </select>
    );
};

export default DepartmentSelect;
