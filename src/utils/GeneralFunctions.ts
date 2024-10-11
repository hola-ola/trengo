import { DefaultIcons } from "@/utils/GeneralConstants";

export const getRandomIcon = function (icons: string[] = DefaultIcons) {
  const iconsArray: string[] = icons?.length ? icons : DefaultIcons;
  const amountIcons: number = icons?.length;

  if (amountIcons === 1) {
    return iconsArray[0];
  } else {
    const index = Math.floor(Math.random() * amountIcons);
    return iconsArray[index];
  }
};
