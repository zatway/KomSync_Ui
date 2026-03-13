import {FC} from "react";
import {usePositions} from "@/modules/organization/hooks/usePositions";

interface PositionSelectProps {
    selectedPositionId?: string;
    onChange: (selectedPositionId?: string) => void;
}

const mockPositions = [
    {id: "pos-1", name: "Frontend разработчик"},
    {id: "pos-2", name: "Backend разработчик"},
    {id: "pos-3", name: "Project Manager"},
];

const PositionSelect: FC<PositionSelectProps> = ({selectedPositionId, onChange}) => {
    const {data: positions = mockPositions} = usePositions();

    return (
        <select
            className="border rounded-md p-2 bg-background"
            value={selectedPositionId ?? ""}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">Выберите должность</option>
            {positions?.map((p) => (
                <option key={p.id} value={p.id}>
                    {p.name}
                </option>
            ))}
        </select>
    );
};

export default PositionSelect;
