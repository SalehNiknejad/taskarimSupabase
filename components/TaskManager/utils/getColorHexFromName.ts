const getColorHexFromName = (colorName: string) => {
    const BG_COLOR = {
       black: '',
       blue: 'dark:bg-[#272757] bg-[#b3ebf2]',
       red: 'dark:bg-[#660033] bg-[#ffb5c0]',
       green: 'dark:bg-[#06402b] bg-[#adebb3]',
       yellow:'dark:bg-[#2b2402] bg-[#ffffc5]'
    } as any;
    return BG_COLOR[colorName];
 };
 export default getColorHexFromName;
 