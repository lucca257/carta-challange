import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import VestingNav from './VestingNav.vue';
import { vestingStore } from '../../store/vesting/vesting.store.js';

describe('VestingNav.vue', () => {
    it('renders vesting schedules and handles selection', async () => {
        vestingStore.vestingData = [
            { label: 'Schedule 1', vesting_manager_name: 'Manager 1' },
            { label: 'Schedule 2', vesting_manager_name: 'Manager 2' }
        ];
        vestingStore.selectedVestingSchedule = vestingStore.vestingData[0];

        const wrapper = mount(VestingNav);

        const items = wrapper.findAll('li');
        expect(items).toHaveLength(2);
        expect(items[0].text()).toBe('Schedule 1');
        expect(items[1].text()).toBe('Schedule 2');

        await items[1].trigger('click');
        expect(wrapper.emitted('load-data')[0]).toEqual(['Schedule 2']);
    });
});