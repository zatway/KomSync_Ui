import { useLogoutMutation } from "@/modules/auth/api/authApi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/shared/ui_shadcn/dropdown-menu";
import { ThemeToggle } from "@/shared/ui";
import { ProfileInfo } from "@/modules/profile";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/AppRoutes";
import { Button } from "@/shared/ui_shadcn/button";
import { Menu } from "lucide-react";
import { NotificationsBell } from "@/widgets/header/NotificationsBell";
import { HeaderQuickSearches } from "@/widgets/header/HeaderQuickSearches";

type Props = {
    onOpenMobileNav?: () => void;
};

const Header = ({ onOpenMobileNav }: Props) => {
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    return (
        <header className="h-14 sm:h-16 border-b bg-background flex items-center justify-between px-4 sm:px-6 shrink-0 gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="md:hidden shrink-0"
                    onClick={onOpenMobileNav}
                    aria-label="Открыть меню"
                >
                    <Menu className="h-5 w-5" />
                </Button>
                <HeaderQuickSearches />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <NotificationsBell />
                <ThemeToggle />
                <DropdownMenu>
                    <ProfileInfo />
                    <DropdownMenuContent align="end" className={"bg-background"}>
                        <DropdownMenuItem>
                            <button
                                type="button"
                                className="w-full text-left"
                                onClick={() => navigate(AppRoutes.PROFILE)}
                            >
                                Профиль
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => void logout()}>Выйти</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;
