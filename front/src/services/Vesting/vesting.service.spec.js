import { describe, it, expect, vi } from 'vitest';
import { VestingService } from './vesting.service.js';
import { ApiService } from '../Utils/api.service.js';

vi.mock('../Utils/api.service.js');

describe('VestingService', () => {
    it('fetches and processes vesting schedules correctly', async () => {
        ApiService.get.mockResolvedValue([
            {
                label: 'Grant 1',
                issue_date: '2023-01-01',
                vesting_manager_name: 'John Doe',
                vesting_schedule: [
                    { vesting_date: '2023-01-01', amount: '100', cumulative_amount: '100' },
                    { vesting_date: '2023-02-01', amount: '200', cumulative_amount: '300' }
                ]
            }
        ]);

        const data = await VestingService.getVestingSchedules();
        expect(data).toHaveLength(1);
        expect(data[0].label).toBe('Grant 1');
        expect(data[0].vestingSchedule).toHaveLength(2);
        expect(data[0].vestingSchedule[0].amount).toBe(100);
        expect(data[0].vestingSchedule[1].cumulativeAmount).toBe(300);
    });
});