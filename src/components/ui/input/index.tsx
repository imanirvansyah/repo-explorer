import * as React from "react"
import { cn } from "../../../lib/utils"
import { Icon } from "@iconify-icon/react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-4 top-2 text-gray-400 pointer-events-none">
          <Icon icon={icon} width={20} height={20} />
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "bg-gray-100 w-full px-12 py-1 rounded-full focus:border focus:border-gray-600 outline-none",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
