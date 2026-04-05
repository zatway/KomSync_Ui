import { useId, useRef } from "react";
import { Paperclip } from "lucide-react";
import { Button } from "@/shared/ui_shadcn/button";
import { cn } from "@/shared/lib/ui_shadcn/utils";

type Props = {
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    onFiles: (files: File[]) => void;
    label?: string;
    className?: string;
    variant?: React.ComponentProps<typeof Button>["variant"];
    size?: React.ComponentProps<typeof Button>["size"];
};

/** Скрытый `input[type=file]` + кнопка выбора файлов. */
export function FilePickerButton({
    accept,
    multiple,
    disabled,
    onFiles,
    label = "Выбрать файлы",
    className,
    variant = "outline",
    size = "sm",
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();

    return (
        <div className={cn("inline-flex flex-wrap items-center gap-2", className)}>
            <input
                id={id}
                ref={inputRef}
                type="file"
                className="sr-only"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={(e) => {
                    onFiles(Array.from(e.target.files ?? []));
                    e.target.value = "";
                }}
            />
            <Button
                type="button"
                variant={variant}
                size={size}
                disabled={disabled}
                onClick={() => inputRef.current?.click()}
            >
                <Paperclip className="mr-2 h-4 w-4" />
                {label}
            </Button>
        </div>
    );
}
