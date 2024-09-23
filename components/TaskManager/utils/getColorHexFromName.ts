import { yellow } from "@mui/material/colors";

const getColorHexFromName = (colorName: string) => {
    const BG_COLOR = {
       black: 'bg-[#30CFCF]',
       blue: 'bg-[#42B3F3]',
       red: 'bg-[#5868F8]',
       green: 'bg-[#872CE3]',
       yellow:'bg-[#872CE3]'
    } as any;
    return BG_COLOR[colorName];
 };
 export default getColorHexFromName;
 