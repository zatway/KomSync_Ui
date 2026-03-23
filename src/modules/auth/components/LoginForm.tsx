import {Label} from "@/shared/ui_shadcn/label"
import {Input} from "@/shared/ui_shadcn/input"
import {useLoginMutation} from "@/modules/auth/api/authApi";
import {useLogin} from "@/modules/auth/hooks/useLogin";
import {Button} from "@/shared/ui_shadcn/button";
import {Logo} from "@/shared/ui/Logo/Logo";
import {useNavigate} from "react-router-dom";
import {AppRoutes} from "@/app/routes/AppRoutes";
import {FormEvent} from "react";

const LoginForm = () => {
    const [login, {isLoading}] = useLoginMutation();
    const {loginData, validateData, onChangeData} = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateData()) return;

        try {
            console.log({  email: loginData.email,
                password: loginData.password,})
            const result = await login({
                email: loginData.email,
                password: loginData.password,
            }).unwrap();

            console.log("Успешный логин:", result);
            navigate(AppRoutes.PROJECTS)
        } catch (err) {
            console.error("Ошибка авторизации:", err);
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg border">

            <div className="flex justify-center mb-6">
                <Logo height={70}/>
            </div>

            <div className="text-center mb-6">
                <h2 className={"font-bold"}>
                    Войдите в систему
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="grid gap-2">
                    <Label htmlFor="email">Почта</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={loginData.email}
                        onChange={(e) => onChangeData({email: e.target.value})}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Пароль</Label>
                    <Input
                        title="Пароль"
                        type="password"
                        required
                        value={loginData.password}
                        onChange={(e) =>
                            onChangeData({password: e.target.value})
                        }
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2"
                >
                    {isLoading ? "Вход..." : "Войти"}
                </Button>
                <div className="grid gap-2">
                    <Label onClick={() => navigate(AppRoutes.REGISTER)} >
                        Нет аккаунта? Создать
                    </Label>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
