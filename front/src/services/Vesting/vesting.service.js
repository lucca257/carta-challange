import { ApiService } from "../Utils/api.service";

export class VestingService {
    /**
     * Fetch vesting schedules from API.
     * @returns {Promise<Array>}
     */
    static async getVestingSchedules() {
        const data = await ApiService.get("/mock-api/vesting");
        return data.map(schedule => ({
            label: schedule.label,
            issueDate: schedule.issue_date,
            vestingManager: schedule.vesting_manager_name,
            vestingSchedule: schedule.vesting_schedule.map(entry => ({
                date: entry.vesting_date,
                amount: parseFloat(entry.amount),
                cumulativeAmount: parseFloat(entry.cumulative_amount)
            }))
        }));
    }
}
