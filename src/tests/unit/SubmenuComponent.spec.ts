import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SubmenuComponent from "@/components/menu/SubmenuComponent.vue";

describe("SubmenuComponents", () => {
    it("renders el-sub-menu", () => {
        const componentWrapper = shallowMount(SubmenuComponent);

        const submenu = componentWrapper.find("el-sub-menu");
        expect(submenu.exists()).toBe(true);
    })
})