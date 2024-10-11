import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import type { Submenu, MenuItem } from "@/utils/GeneralInterfaces";
import { getRandomIcon } from "@/utils/GeneralFunctions";

interface MenuState {
  menu: Submenu[];
}

export const useMenuStore = defineStore("menu", {
  state: (): MenuState => ({
    menu: [],
  }),
  getters: {
    submenuIndex: (state) => (submenuId: string) => {
      return state.menu.map((submenu) => submenu.id).indexOf(submenuId);
    },
    submenuItems: (state) => (submenuId: string) => {
      return state.menu.find((submenu) => submenu.id === submenuId)?.items as MenuItem[];
    },
    submenuItemType: (state) => (submenuId: string) => {
      return state.menu.find((submenu) => submenu.id === submenuId)?.itemType;
    },
  },
  actions: {
    /**
     * Function to fetch menu configuration data from the external source
     */
    fetchMenu: async function () {
      const baseURL = import.meta.env.VITE_BASE_URL || window.location.origin;

      this.menu = await axios
        .get(`${baseURL}/src/data/menuData.json`)
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .catch((error: AxiosError) => {
          // throw error?.response?.data;
          console.error("Failed to fetch the data", error);
        });
    },
    /**
     * Function to add a new menu item to a specified submenu
     * @param submenuId
     * @param itemLabel
     */
    addMenuItem: function (submenuId: string, itemLabel: string) {
      if (!submenuId || !itemLabel) {
        console.error("Incorrect input data");
      }

      const newItem: MenuItem = {
        label: itemLabel,
        icon: getRandomIcon(),
      };
      const submenuIndex = this.submenuIndex(submenuId);

      if (this.menu && this.menu[submenuIndex]) {
        if (this.menu[submenuIndex]?.items) {
          this.menu[submenuIndex].items.push(newItem);
        } else {
          this.menu[submenuIndex].items = [newItem];
        }
      }
    },
    /**
     * Function to update the items of a given submenu with provided array of MenuItem
     * @param submenuId
     * @param items
     */
    updateSubmenuItems: function (submenuId: string, items: MenuItem[]) {
      const submenuToUpdate = this.menu.find((submenu) => submenu.id === submenuId);
      if (submenuToUpdate) {
        submenuToUpdate.items = items;
      }
    },
  },
});
