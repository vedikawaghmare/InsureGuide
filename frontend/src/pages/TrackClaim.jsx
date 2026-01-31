function TrackClaim() {
    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Track Existing Claim</h2>

            <input
                placeholder="Enter your Claim ID (e.g. CLM2024001234)"
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                }}
            />

            <button
                style={{
                    width: "100%",
                    marginTop: "15px",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "#999",
                    color: "#fff",
                    border: "none"
                }}
            >
                Track Claim
            </button>
        </div>
    );
}

export default TrackClaim;
