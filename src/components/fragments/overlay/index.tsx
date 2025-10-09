import { Icon } from "@iconify-icon/react";

export const Overlay: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
}> = ({ onClose, children }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-30 flex items-end backdrop-blur-sm">
      <div className="bg-background border border-muted rounded-t-2xl p-4 pt-16 h-[80vh] w-full overflow-y-hidden relative container mx-auto flex flex-col overflow-hidden">
        <Icon icon="material-symbols:close" width={16} height={16} className="absolute top-4 right-4 p-2 rounded-full cursor-pointer" onClick={() => onClose()} />
        {children}
      </div>
    </div>
  )
}