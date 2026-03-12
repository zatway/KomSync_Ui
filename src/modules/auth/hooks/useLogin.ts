import {useState} from "react";
import {LoginRequest} from "@/types/dto/auth/LoginRequest";

export const useLogin = () => {
    const [loginData, setLoginData] = useState<LoginRequest>({email: '', password: ''});
    const [errorValidation, setErrorValidation] = useState<string | null>();

    const onChangeData = (changedData: Partial<LoginRequest>) => {
        setLoginData({...loginData, ...changedData});
    }

    const validateData = (): boolean => {
        if(loginData.email.trim().length <= 0) {
            setErrorValidation('Необходимо ввести логин');
            return false;
        }
        if(loginData.password.trim().length <= 0) {
            setErrorValidation('Необходимо ввести пароль');
            return false;
        }
        setErrorValidation(null);
        return true;
    }

    return {
        loginData,
        onChangeData,
        validateData,
        errorValidation,
    }
}
