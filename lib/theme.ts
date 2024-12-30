import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../tailwind.config";

const { theme } = resolveConfig(tailwindConfig);
export const themeColors = theme?.colors as any
