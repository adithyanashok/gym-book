import Constants from "expo-constants";
const { apiUrl } = Constants.expoConfig?.extra ?? {};

export default {
    API_URL: apiUrl
}