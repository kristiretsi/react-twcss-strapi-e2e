import axios from "axios";

const SyncButton = () => {
    const handleSync = async () => {
        try {
            const response = await axios.post(
                // "http://localhost:1337/api/artists/sync",
                `${import.meta.env.VITE_API_URL}/artists/sync`
            );

            console.log(response.data);

            alert(" sync completed!");
        } catch (error) {
            console.error(error);

            alert("Sync failed");
        }
    };

    return (
        <button
            onClick={handleSync}
            className="bg-green-500 text-white px-4 py-2 rounded"
        >
            Sync
        </button>
    );
};

export default SyncButton;