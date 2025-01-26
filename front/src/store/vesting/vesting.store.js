import { reactive } from "vue";
import { VestingService } from "../../services/Vesting/vesting.service.js";

export const vestingStore = reactive({
    vestingData: [],
    loading: false,
    error: null,

    async fetchVestingData() {
        try {
            this.loading = true;
            this.error = null;
            const data = await VestingService.getVestingSchedules();
            this.vestingData = data;
        } catch (error) {
            this.error = "Failed to fetch vesting data";
            console.error(error);
        } finally {
            this.loading = false;
        }
    },

    getVestingDataByLabel(label) {
        return this.vestingData.find(item => item.label === label)?.vestingSchedule || [];
    }
});