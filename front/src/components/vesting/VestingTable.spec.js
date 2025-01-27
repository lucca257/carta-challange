import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import VestingTable from "./VestingTable.vue";

describe("VestingTable.vue", () => {
    it("renders vesting data correctly", () => {
        const vestingData = [
            { date: "2023-01-01", amount: 100, cumulativeAmount: 100 },
            { date: "2023-02-01", amount: 200, cumulativeAmount: 300 },
        ];

        const wrapper = mount(VestingTable, {
            props: { vestingData, vestingManagerName: "John Doe" },
        });

        expect(wrapper.find(".vesting-manager").text()).toBe("Vesting Manager: John Doe");

        const rows = wrapper.findAll("tbody tr");

        expect(rows).toHaveLength(2);

        // Use the same date formatting as the component
        const formatDate = (dateString) =>
            new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });

        expect(rows[0].text()).toContain(formatDate("2023-01-01"));
        expect(rows[0].text()).toContain("100");
        expect(rows[0].text()).toContain("100");

        expect(rows[1].text()).toContain(formatDate("2023-02-01"));
        expect(rows[1].text()).toContain("200");
        expect(rows[1].text()).toContain("300");
    });
});
