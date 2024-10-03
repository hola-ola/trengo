export interface MenuItem {
  label: string;
  icon: string;
}

export interface Submenu {
  id: string;
  label: string;
  items: MenuItem[];
  itemType?: string;
}
