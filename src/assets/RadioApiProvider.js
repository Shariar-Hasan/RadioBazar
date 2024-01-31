import { RadioBrowserApi } from "radio-browser-api";

const api = new RadioBrowserApi(fetch.bind(window), "Radio Bazar");
export default api;
