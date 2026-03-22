import { useState } from "react";
import { UserRole } from "@/types/dto/enums/UserRole";

interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    departmentId?: string;
    positionId?: string;
    role: UserRole;
    agree: boolean;
}

const emptyRegisterData: RegisterData = {
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    departmentId: undefined,
    positionId: undefined,
    role: UserRole.Employee,
    agree: false,
};

export const useRegister = () => {
    const [registerData, setRegisterData] = useState<RegisterData>(emptyRegisterData);
    const [errorValidation, setErrorValidation] = useState<string | null>(null);

    const onChangeData = (changedData: Partial<RegisterData>) => {
        setRegisterData((prev) => ({ ...prev, ...changedData }));
    };

    const validateData = (): boolean => {
        if (!registerData.fullName.trim()) {
            setErrorValidation("Введите ФИО");
            return false;
        }

        if (!registerData.email.trim()) {
            setErrorValidation("Введите почту");
            return false;
        }

        if (!registerData.password) {
            setErrorValidation("Введите пароль");
            return false;
        }

        if (registerData.password.length < 6) {
            setErrorValidation("Пароль должен быть не менее 6 символов");
            return false;
        }

        if (registerData.password !== registerData.confirmPassword) {
            setErrorValidation("Пароли не совпадают");
            return false;
        }

        if (!registerData.agree) {
            setErrorValidation("Необходимо согласиться с пользовательским соглашением");
            return false;
        }

        setErrorValidation(null);
        return true;
    };

    return {
        registerData,
        onChangeData,
        validateData,
        errorValidation,
    };
};
