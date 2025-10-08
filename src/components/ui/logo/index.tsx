import { Icon } from "@iconify-icon/react/dist/iconify.js";

export const Logo = () => {
  return (
    <div className="flex items-center justify-start gap-1">
      <Icon icon="mdi:github" width={24} height={24} />
      <h1 className='font-semibold'>Repo Explorer</h1>
    </div>
  )
}