import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/services";

const ServiceLanding = () => {
    // =====================================================
    // STATE
    // =====================================================

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // GET SERVICES FROM BACKEND
    // =====================================================

    useEffect(() => {
        const loadServices = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(
                        `Server returned ${response.status}`
                    );
                }

                const data = await response.json();

                console.log("Services received from backend:", data);

                /*
                 * Depending on your Express response,
                 * data can be either:
                 *
                 * [
                 *   {...},
                 *   {...}
                 * ]
                 *
                 * OR
                 *
                 * {
                 *   services: [...]
                 * }
                 */

                if (Array.isArray(data)) {
                    setServices(data);
                } else if (Array.isArray(data.services)) {
                    setServices(data.services);
                } else {
                    setServices([]);
                    console.warn(
                        "API response does not contain a services array:",
                        data
                    );
                }
            } catch (err) {
                console.error("Services API Error:", err);

                setError(
                    "Unable to load services. Please make sure the backend server is running."
                );
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "18px",
                }}
            >
                Loading services...
            </div>
        );
    }

    // =====================================================
    // ERROR SCREEN
    // =====================================================

    if (error) {
        return (
            <div
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Arial, sans-serif",
                    textAlign: "center",
                    padding: "30px",
                }}
            >
                <h2>Services could not be loaded</h2>

                <p
                    style={{
                        color: "#666",
                        maxWidth: "600px",
                    }}
                >
                    {error}
                </p>

                <button
                    onClick={() => window.location.reload()}
                    style={{
                        marginTop: "15px",
                        padding: "12px 24px",
                        border: "none",
                        borderRadius: "6px",
                        background: "#111",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    // =====================================================
    // SERVICES PAGE
    // =====================================================

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                background: "#fff",
            }}
        >
            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section
                style={{
                    padding: "80px 8% 50px",
                    background: "#f7f7f7",
                }}
            >
                <p
                    style={{
                        margin: 0,
                        marginBottom: "15px",
                        fontSize: "14px",
                        fontWeight: "600",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "#666",
                    }}
                >
                    Our Services
                </p>

                <h1
                    style={{
                        margin: 0,
                        fontSize: "clamp(40px, 6vw, 80px)",
                        lineHeight: 1,
                        fontWeight: 700,
                        color: "#111",
                    }}
                >
                    What we do
                </h1>

                <p
                    style={{
                        maxWidth: "750px",
                        marginTop: "25px",
                        fontSize: "18px",
                        lineHeight: 1.7,
                        color: "#555",
                    }}
                >
                    We create experiences, campaigns and digital solutions
                    that help brands connect with their audiences and grow.
                </p>
            </section>

            {/* =================================================
                SERVICES
            ================================================= */}

            <section
                style={{
                    padding: "70px 8%",
                }}
            >
                {services.length === 0 ? (
                    <div
                        style={{
                            padding: "50px 20px",
                            textAlign: "center",
                            background: "#f7f7f7",
                            borderRadius: "12px",
                        }}
                    >
                        <h2>No services found</h2>

                        <p style={{ color: "#666" }}>
                            Your backend is connected, but there are no
                            services stored in MongoDB yet.
                        </p>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "25px",
                        }}
                    >
                        {services.map((service, index) => (
                            <div
                                key={
                                    service._id ||
                                    service.slug ||
                                    index
                                }
                                style={{
                                    padding: "30px",
                                    minHeight: "220px",
                                    border: "1px solid #e5e5e5",
                                    borderRadius: "12px",
                                    background: "#fff",
                                    transition:
                                        "transform 0.2s ease, box-shadow 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-5px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 15px 35px rgba(0,0,0,0.08)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                        "none";
                                }}
                            >
                                {/* NUMBER */}

                                <div
                                    style={{
                                        marginBottom: "20px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#888",
                                    }}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                {/* SERVICE NAME */}

                                <h2
                                    style={{
                                        margin: "0 0 15px",
                                        fontSize: "24px",
                                        lineHeight: 1.2,
                                        color: "#111",
                                    }}
                                >
                                    {service.name}
                                </h2>

                                {/* SERVICE SUMMARY */}

                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "16px",
                                        lineHeight: 1.6,
                                        color: "#666",
                                    }}
                                >
                                    {service.summary ||
                                        service.description ||
                                        "Professional service delivered by Planning Labs."}
                                </p>

                                {/* SLUG */}

                                {service.slug && (
                                    <div
                                        style={{
                                            marginTop: "20px",
                                            fontSize: "13px",
                                            color: "#999",
                                        }}
                                    >
                                        /{service.slug}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ServiceLanding;