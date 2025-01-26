import { ref, onMounted } from "vue";
import { VestingService } from "../../services/Vesting/vesting.service.js";

export default function useVestingData() {
    const vestingData = ref([]);

    onMounted(async () => {
        try {
            const data = await VestingService.getVestingSchedules();
            vestingData.value = data[0]?.vestingSchedule || [];
        } catch (error) {
            console.error("Error fetching vesting data:", error);
        }
    });

    return { vestingData };
}
