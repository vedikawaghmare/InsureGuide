import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
    const { t, i18n } = useTranslation();

    return (
        <div style={{ padding: "30px" }}>

            <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
            </select>

            <h1>{t("title")}</h1>
            <h3>{t("tagline")}</h3>
            <p>{t("description")}</p>

            <Link to="/survey">
                <button>{t("survey.title")}</button> {/* ✅ FIX */}
            </Link>

            <Link to="/dashboard">
                <button>{t("dashboard.title")}</button>
            </Link>

        </div>
    );
}

export default Home;
