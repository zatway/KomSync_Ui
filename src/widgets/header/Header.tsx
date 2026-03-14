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

const Header = () => {

    const [logout] = useLogoutMutation();

    const user = {
        name: "Иван Иванов",
        email: "ivan@example.com",
    };

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
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-3"
                    >

                        <Avatar>
                            <AvatarFallback>
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>

                        <div className="text-left hidden md:block">
                            <div className="text-sm font-medium">
                                {user.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {user.email}
                            </div>
                        </div>

                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className={"bg-primary"}>

                    <DropdownMenuItem>
                        Профиль
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => ({})}
                    >
                        Выйти
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

        </header>
    );
};

export default Header;
