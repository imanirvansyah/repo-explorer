import { Icon } from "@iconify-icon/react";

export const IconText: React.FC<{ icon: string; text: string | number }> = ({ icon, text, }) => {
  return (
    <div className="inline-flex items-center justify-between gap-0.5">
      <Icon icon={icon} width={16} height={16} className="text-gray-400" />
      <span className="text-sm text-gray-400">{text}</span>
    </div>
  )
}