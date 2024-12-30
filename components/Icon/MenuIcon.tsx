interface IconProps {
    height: number,
    width: number,
    color?: string
}

const MenuIcon: React.FC<IconProps> = (props) => {
    const IconStyle = {
        height: `${props.height * 4}px`,
        width: `${props.width * 4}px`,
        color: `${props.color}`
    }
    return (
        <svg style={IconStyle} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
        </svg>



    )
}

export default MenuIcon