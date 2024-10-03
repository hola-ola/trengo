import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import type { Submenu, MenuItem } from "@/utils/GeneralInterfaces";
import { Icon } from "@/utils/GeneralConstants";

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
      this.menu = await axios
        .get("http://localhost:5173/src/data/menuData.json", { baseURL: window.location.origin })
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
        icon: Icon.DEFAULT,
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
     * Function to delete a menu item from a specified submenu
     * @param submenuId
     * @param itemIndex
     */
    deleteMenuItem: function (submenuId: string, itemIndex: number) {
      if (!submenuId || (!itemIndex && itemIndex !== 0)) {
        console.error("Incorrect input data");
      }
      const submenuIndex = this.submenuIndex(submenuId);
      if (this.menu && this.menu[submenuIndex]?.items?.length) {
        this.menu[submenuIndex]?.items.splice(itemIndex, 1);
      }
    },
    updateSubmenuItemsOrder: function (submenuId: string, items: MenuItem[]) {
      const submenuToUpdate = this.menu.find((submenu) => submenu.id === submenuId);
      if (submenuToUpdate) {
        submenuToUpdate.items = items;
      }
    }
  },
});
