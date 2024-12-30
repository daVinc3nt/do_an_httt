import { motion, useCycle } from 'framer-motion';
// import { useTheme } from "next-themes";

const MenuToggle = ({ toggle1, toggle2 }: { toggle1: any, toggle2: any}) => {
  const handleClick = () => {
    toggle1();
    toggle2();
  };
  // const {systemTheme, theme, setTheme } = useTheme();
  // const currentTheme = theme === "system" ? systemTheme : theme ;
  // let IconColor: string = currentTheme ==="dark"? "white" : "black"
  return (
    <button
      onClick={handleClick}
      className="pointer-events-auto z-50 pl-3 pt-2.5"
    >
      <svg width="28" height="28" viewBox="0 0 24 24">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
          color={"white"}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
          color={"white"}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
          color={"white"}
        />
      </svg>
    </button>

  );
}
  const Path = (props: any) => (
    <motion.path
      fill="transparent"
      strokeWidth="2"
      stroke={props.color}
      strokeLinecap="round"
      {...props}
    />
  );
export default MenuToggle;