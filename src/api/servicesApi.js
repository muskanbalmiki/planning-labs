const API_URL = "http://localhost:5000/api";

export const getServices = async () => {
    try {
        const response = await fetch(`${API_URL}/services`);

        if (!response.ok) {
            throw new Error("Failed to fetch services");
        }

        return await response.json();
    } catch (error) {
        console.error("Services API Error:", error);
        throw error;
    }
};