import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { usePositions, useDepartments } from "@/modules/organization";
import { useRegister } from "@/modules/auth/hooks/useRegister";
import { useRegisterMutation } from "@/modules/auth/api/authApi";

import { Logo } from "@/shared/ui/Logo/Logo";
import { Label } from "@/shared/ui_shadcn/label";
import { Input } from "@/shared/ui_shadcn/input";
import { Button } from "@/shared/ui_shadcn/button";

import { UserRole } from "@/types/dto/enums/UserRole";
import {Checkbox} from "@/shared/ui_shadcn/checkbox";

const RegisterForm = () => {
    const navigate = useNavigate();

    const [showSuccess, setShowSuccess] = useState(false);

    const [register, { isLoading }] = useRegisterMutation();

    const { data: departments } = useDepartments();
    const { data: positions } = usePositions();

    const { registerData, onChangeData, validateData, errorValidation } = useRegister();

    const roleMap = new Map<UserRole, string>([
        [UserRole.Admin, "Администратор"],
        [UserRole.Employee, "Пользователь"],
        [UserRole.Manager, "Менеджер"],
        [UserRole.ReadOnly, "Наблюдатель"],
    ])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateData()) return;

        try {
            await register({
                fullName: registerData.fullName,
                email: registerData.email,
                password: registerData.password,
                role: registerData.role,
                departmentId: registerData.departmentId!,
                positionId: registerData.positionId!,
            }).unwrap();

            setShowSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 4000);

        } catch (err) {
            console.error("Ошибка регистрации:", err);
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg border">

            <div className="flex justify-center mb-6">
                <Logo height={70} />
            </div>

            <div className="text-center mb-6">
                <h2 className="font-bold text-lg">Регистрация</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="grid gap-2">
                    <Label>ФИО</Label>
                    <Input
                        value={registerData.fullName}
                        onChange={(e) => onChangeData({ fullName: e.target.value })}
                    />
                </div>

                <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={registerData.email}
                        onChange={(e) => onChangeData({ email: e.target.value })}
                    />
                </div>

                <div className="grid gap-2">
                    <Label>Пароль</Label>
                    <Input
                        type="password"
                        value={registerData.password}
                        onChange={(e) => onChangeData({ password: e.target.value })}
                    />
                </div>

                <div className="grid gap-2">
                    <Label>Повторите пароль</Label>
                    <Input
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => onChangeData({ confirmPassword: e.target.value })}
                    />
                </div>

                <div className="grid gap-2">
                    <Label>Подразделение</Label>
                    <select
                        className="border rounded-md p-2 bg-background"
                        value={registerData.departmentId ?? ""}
                        onChange={(e) => onChangeData({ departmentId: e.target.value })}
                    >
                        <option value="">Выберите подразделение</option>
                        {departments?.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid gap-2">
                    <Label>Должность</Label>
                    <select
                        className="border rounded-md p-2 bg-background"
                        value={registerData.positionId ?? ""}
                        onChange={(e) => onChangeData({ positionId: e.target.value })}
                    >
                        <option value="">Выберите должность</option>
                        {positions?.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid gap-2">
                    <Label>Роль</Label>
                    <select
                        className="border rounded-md p-2 bg-background"
                        value={registerData.role}
                        onChange={(e) => onChangeData({ role: e.target.value as UserRole })}
                    >
                        {Object.values(UserRole).map((role) => (
                            <option key={role} value={role}>
                                {roleMap.get(role)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <Checkbox
                        checked={registerData.agree}
                        onCheckedChange={(v: boolean) => onChangeData({ agree: v })}
                    />
                    <span className="text-sm">
            Я согласен с пользовательским соглашением
          </span>
                </div>

                {errorValidation && (
                    <div className="text-sm text-destructive">
                        {errorValidation}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2"
                >
                    {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </Button>

            </form>

            {showSuccess && (
                <div className="mt-6 rounded-lg border p-4 bg-green-50 text-sm text-center">
                    Регистрация прошла успешно.
                    Ожидайте письмо на почту после подтверждения администратором.
                </div>
            )}

        </div>
    );
};

export default RegisterForm;
