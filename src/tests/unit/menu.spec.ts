import { setActivePinia, createPinia } from "pinia";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { useMenuStore } from "@/stores/menu";
import axios from "axios";
import { Icon } from "@/utils/GeneralConstants";
import type { MenuItem } from "@/utils/GeneralInterfaces";

vi.mock("axios");

describe("Menu Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("fetches menu items from external API and updates the state", async () => {
    // Set up mock menuStore and mock data
    const menuStore = useMenuStore();
    const mockMenu = [
      {
        label: "Inbox",
        items: [
          {
            label: "Example menu item",
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

    (axios.get as unknown as vi.Mock).mockResolvedValue({ data: mockMenu });

    // Menu state check before the function is called
    expect(menuStore.menu).toEqual([]);

    // Calling the function
    await menuStore.fetchMenu();

    // Menu state check after the function is called
    expect(menuStore.menu).toEqual(mockMenu);
  });

  it("handles API error with grace", async () => {
    // Set up mock menuStore
    const menuStore = useMenuStore();

    (axios.get as unknown as vi.Mock).mockRejectedValue(new Error("Connection error"));

    const consoleError = vi.spyOn(console, "error");

    // Calling the function
    await menuStore.fetchMenu();

    // Console check after the function is called and it fails
    expect(consoleError).toHaveBeenCalledWith("Failed to fetch the data", expect.any(Error));

    // Menu state check after the function is called and it fails
    expect(menuStore.menu).toEqual(undefined);
  });

  it("add new menu item to items array of specific submenu", async () => {
    // Set up mock menuStore and mock data
    const menuStore = useMenuStore();
    const mockMenu = [
      {
        label: "Inbox",
        items: [
          {
            label: "Example menu item",
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

    // Fetching mock data to use it in the test
    (axios.get as unknown as vi.Mock).mockResolvedValue({ data: mockMenu });
    await menuStore.fetchMenu();
    const submenuId = "1";
    const subMenuIndex = menuStore.submenuIndex(submenuId);

    // Length check of the items array of a given submenu before the function is called
    expect(menuStore.menu[subMenuIndex].items).toHaveLength(1);

    // Calling the function
    menuStore.addMenuItem(submenuId, "New item");
    const newItem: MenuItem = {
      label: "New item",
      icon: Icon.DEFAULT,
    };
    // Length check of the items array of a given submenu after the function is called
    expect(menuStore.menu[subMenuIndex].items).toHaveLength(2);
    // Content check of the items array of a given submenu after the function is called
    expect(menuStore.menu[subMenuIndex].items).toContainEqual(newItem);
  });

  it("add remove specific menu item from items array of specific submenu", async () => {
    // Set up mock menuStore and mock data
    const menuStore = useMenuStore();
    const mockMenu = [
      {
        label: "Inbox",
        items: [
          {
            label: "Example menu item",
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

    // Fetching mock data to use it in the test
    (axios.get as unknown as vi.Mock).mockResolvedValue({ data: mockMenu });
    await menuStore.fetchMenu();
    const submenuId = "4";
    const subMenuIndex = menuStore.submenuIndex(submenuId);

    // Length check of the items array of a given submenu before the function is called
    expect(menuStore.menu[subMenuIndex].items).toHaveLength(4);

    // Calling the function
    menuStore.deleteMenuItem(submenuId, 0);

    // Length check of the items array of a given submenu after the function is called
    expect(menuStore.menu[subMenuIndex].items).toHaveLength(3);
  });
});
