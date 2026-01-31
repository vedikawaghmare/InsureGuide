import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const fetchSurveys = () => API.get("/survey");
export const submitSurvey = (data) => API.post("/survey", data);

// NEW 🔥
export const fetchRecommendations = (surveyId) =>
    API.get(`/recommendation/${surveyId}`);
