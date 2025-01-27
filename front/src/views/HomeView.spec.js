import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomeView from "../views/HomeView.vue";
import VestingNav from "../components/vesting/VestingNav.vue";
import VestingTable from "../components/vesting/VestingTable.vue";
import { vestingStore } from "../store/vesting/vesting.store.js";
import { nextTick } from "vue";

// Mock API Response
vi.mock("../services/Vesting/vesting.service.js", () => ({
    VestingService: {
        getVestingSchedules: vi.fn().mockResolvedValue([
            {
                label: "ES-1",
                issue_date: "2023-01-01",
                vesting_manager_name: "Quarterly Vesting",
                vesting_schedule: [
                    { vesting_date: "2023-01-01", amount: "100", cumulative_amount: "100" },
                    { vesting_date: "2023-02-01", amount: "200", cumulative_amount: "300" },
                ],
            },
        ]),
    },
}));

describe("HomeView.vue Integration Test", () => {
    let wrapper;

    beforeEach(async () => {
        // Reset store state before each test
        vestingStore.vestingData = [];
        vestingStore.selectedVestingSchedule = null;
        vestingStore.loading = true;
        vestingStore.error = null;

        // Load data into store before mounting component
        await vestingStore.fetchVestingData();
        await flushPromises();
        await nextTick();

        // Now mount the component so it's initialized with data
        wrapper = mount(HomeView, {
            global: {
                components: { VestingNav, VestingTable },
            },
        });
    });

    it("updates vesting schedule when a new schedule is selected", async () => {
        await flushPromises();
        await nextTick();

        // Simulate clicking a different vesting schedule
        vestingStore.selectVestingSchedule("ES-1");
        await flushPromises();
        await nextTick();

        expect(vestingStore.selectedVestingSchedule.label).toBe("ES-1");
        expect(wrapper.find(".vesting-manager").text()).toBe("Quarterly Vesting");
    });

    it("displays 'No data available' if there are no schedules", async () => {
        vestingStore.vestingData = [];
        vestingStore.selectedVestingSchedule = null;
        await flushPromises();
        await nextTick();

        expect(wrapper.text()).toContain("No data available");
    });
});