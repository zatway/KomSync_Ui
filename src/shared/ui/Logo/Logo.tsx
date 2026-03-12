import logo from "@/shared/assets/icons/logo.png";
import {FC} from "react";

interface LogoProps {
    width?: number;
    height?: number;
}

export const Logo: FC<LogoProps> = ({width, height}) => {
    return (
        <img
            style={{width: width, height: height}}
            src={logo}
            alt="KomSync Logo"
            className="h-10 w-auto"
        />
    );
};
