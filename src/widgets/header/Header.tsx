import {useLogoutMutation} from "@/modules/auth/api/authApi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/shared/ui_shadcn/dropdown-menu";
import {ThemeToggle} from "@/shared/ui";
import {ProfileInfo} from "@/modules/profile";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/AppRoutes";

const Header = () => {

    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    return (
        <header
            className="
            h-16
            border-b
            bg-background
            flex
            items-center
            justify-end
            px-6
        "
        >
            <ThemeToggle/>
            <DropdownMenu>
                    <ProfileInfo/>

                <DropdownMenuContent align="end" className={"bg-background"}>
                    <DropdownMenuItem>
                        <button type="button" className="w-full text-left" onClick={() => navigate(AppRoutes.PROFILE)}>
                            Профиль
                        </button>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => logout()}
                    >
                        Выйти
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

        </header>
    );
};

export default Header;
