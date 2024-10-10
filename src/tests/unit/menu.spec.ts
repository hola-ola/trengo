import { setActivePinia, createPinia } from "pinia";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { useMenuStore } from "@/stores/menu";
import axios from "axios";
import type { AxiosError } from "axios";

import { Icon } from "@/utils/GeneralConstants";
import type { MenuItem, Submenu } from "@/utils/GeneralInterfaces";

vi.mock("axios");

const mockMenu: Submenu[] = [
  {
    label: "Inbox",
    items: [
      {
        label: "Example menu item",
        icon: "fa-envelope",
      },
    ],
    id: "1",
  },
  {
    label: "Channels",
    items: [
      {
        label: "support@trengo.com",
        icon: "fa-envelope",
      },
      {
        label: "team@trengo.com",
        icon: "fa-envelope",
      },
      {
        label: "Call center 010",
        icon: "fa-phone",
      },
      {
        label: "Whatsapp Business NL",
        icon: "fa-brands fa-whatsapp",
      },
    ],
    itemType: "channel",
    id: "4",
  },
];
const newItem: MenuItem = {
  label: "New item",
  icon: Icon.DEFAULT,
};

describe("Menu Store", () => {
  let menuStore: ReturnType<typeof useMenuStore>;

  const mockFetchMenu = (reject: boolean = false): void => {
    if (reject) {
      const error: Partial<AxiosError> = { message: "Connection error" };
      (axios.get as vi.Mock).mockRejectedValue(new Error(error));
    } else {
      (axios.get as vi.Mock).mockResolvedValue({ data: mockMenu });
    }
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    menuStore = useMenuStore();
  });

  it("fetches menu items from external API and updates the state", async () => {
    mockFetchMenu();
    expect(menuStore.menu).toEqual([]);
    await menuStore.fetchMenu();
    expect(menuStore.menu).toEqual(mockMenu);
  });

  it("handles API error with grace", async () => {
    mockFetchMenu(true);
    const consoleError = vi.spyOn(console, "error");
    await menuStore.fetchMenu();

    expect(consoleError).toHaveBeenCalledWith("Failed to fetch the data", expect.any(Error));
    expect(menuStore.menu).toEqual(undefined);
  });

  it("add new menu item to items array of specific submenu", async () => {
    mockFetchMenu();
    await menuStore.fetchMenu();
    const submenuId: string = "1";
    const subMenuIndex: number = menuStore.submenuIndex(submenuId);

    expect(menuStore.menu[subMenuIndex].items).toHaveLength(1);
    menuStore.addMenuItem(submenuId, "New item");

    expect(menuStore.menu[subMenuIndex].items).toHaveLength(2);
    expect(menuStore.menu[subMenuIndex].items).toContainEqual(newItem);
  });

  it("removes a specific menu item from items array of specific submenu", async () => {
    mockFetchMenu();
    await menuStore.fetchMenu();
    const submenuId: string = "4";
    const subMenuIndex: number = menuStore.submenuIndex(submenuId);

    expect(menuStore.menu[subMenuIndex].items).toHaveLength(4);
    menuStore.deleteMenuItem(submenuId, 0);
    expect(menuStore.menu[subMenuIndex].items).toHaveLength(3);
  });
});
