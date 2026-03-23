import {Avatar, AvatarFallback} from "@/shared/ui_shadcn/avatar";
import {Button} from "@/shared/ui_shadcn/button";
import {useLogoutMutation} from "@/modules/auth/api/authApi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/ui_shadcn/dropdown-menu";
import {ThemeToggle} from "@/shared/ui";
import {ProfileInfo} from "@/modules/profile";

const Header = () => {

    const [logout] = useLogoutMutation();

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
                        Профиль
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
