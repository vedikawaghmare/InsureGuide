import { useEffect, useState } from "react";
import { fetchSurveys } from "../services/api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FacilitatorDashboard() {
  const { t } = useTranslation();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurveys = async () => {
      try {
        const res = await fetchSurveys();
        setSurveys(res.data.data);
      } catch (err) {
        console.error("Error fetching surveys", err);
      } finally {
        setLoading(false);
      }
    };

    loadSurveys();
  }, []);

  if (loading) return <p>{t("dashboard.loading")}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{t("dashboard.title")}</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>{t("dashboard.name")}</th>
            <th>{t("dashboard.village")}</th>
            <th>{t("dashboard.land")}</th>
            <th>{t("dashboard.crop")}</th>
            <th>{t("dashboard.livestock")}</th>
            <th>{t("dashboard.equipment")}</th>
            <th>{t("dashboard.health")}</th>
            <th>{t("dashboard.action")}</th>
          </tr>
        </thead>

        <tbody>
          {surveys.map((s) => (
            <tr key={s._id}>
              <td>{s.userName}</td>
              <td>{s.village}</td>
              <td>{s.landSize}</td>
              <td>{s.cropType}</td>
              <td>{s.hasLivestock ? t("yes") : t("no")}</td>
              <td>{s.hasEquipment ? t("yes") : t("no")}</td>
              <td>{s.wantsHealthInsurance ? t("yes") : t("no")}</td>
              <td>
                <Link to={`/recommendations/${s._id}`}>
                  {t("dashboard.view")}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FacilitatorDashboard;
