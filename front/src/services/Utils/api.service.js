export class ApiService {
    /**
     * Fetch data from an API endpoint.
     * @param {string} url - API endpoint
     * @returns {Promise<any>}
     */
    static async get(url) {
        try {
            console.log(`Fetching from: ${url}`);
            return await new Promise(resolve => setTimeout(() => resolve(MOCK_API_RESPONSE), 1000));
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    }
}

// Mock API Response
export const MOCK_API_RESPONSE = [
    {
        label: "ES-204",
        issue_date: "12/22/2017",
        vesting_manager_name: "1/16, quarterly, 1yr cliff",
        vesting_schedule: [
            { vesting_date: "12/22/2018", amount: "400.000", cumulative_amount: "400.000" },
            { vesting_date: "03/22/2019", amount: "100.000", cumulative_amount: "500.000" },
            { vesting_date: "06/22/2019", amount: "100.000", cumulative_amount: "600.000" },
            { vesting_date: "09/22/2019", amount: "100.000", cumulative_amount: "700.000" },
            { vesting_date: "12/22/2019", amount: "100.000", cumulative_amount: "800.000" },
            { vesting_date: "03/22/2020", amount: "100.000", cumulative_amount: "900.000" },
            { vesting_date: "06/22/2020", amount: "100.000", cumulative_amount: "1000.000" },
            { vesting_date: "09/22/2020", amount: "100.000", cumulative_amount: "1100.000" },
            { vesting_date: "12/22/2020", amount: "100.000", cumulative_amount: "1200.000" },
            { vesting_date: "03/22/2021", amount: "100.000", cumulative_amount: "1300.000" },
            { vesting_date: "06/22/2021", amount: "100.000", cumulative_amount: "1400.000" },
            { vesting_date: "09/22/2021", amount: "100.000", cumulative_amount: "1500.000" },
            { vesting_date: "12/22/2021", amount: "100.000", cumulative_amount: "1600.000" }
        ]
    }
];
