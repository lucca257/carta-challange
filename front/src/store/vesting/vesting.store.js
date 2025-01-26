import { reactive } from "vue";
import { VestingService } from "../../services/Vesting/vesting.service.js";

export const vestingStore = reactive({
    vestingData: [],
    selectedVestingSchedule: null,
    loading: false,
    error: null,

    async fetchVestingData() {
        try {
            this.loading = true;
            this.error = null;
            const data = await VestingService.getVestingSchedules();
            this.vestingData = data;
            if (this.vestingData.length > 0) {
                this.selectedVestingSchedule = this.vestingData[0];
            }
        } catch (error) {
            this.error = "Failed to fetch vesting data";
            console.error(error);
        } finally {
            this.loading = false;
        }
    },

    selectVestingSchedule(label) {
        this.selectedVestingSchedule = this.vestingData.find(item => item.label === label) || null;
    }
});