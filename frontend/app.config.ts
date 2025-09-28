import { ConfigContext, ExpoConfig } from "expo/config";
const APP_VARIANT = process.env.APP_VARIANT;

const IS_DEV = APP_VARIANT === "development";
const IS_PREVIEW = APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  // if (IS_DEV) return "com.adithyanashokpv.gymapp.dev";
  // if (IS_PREVIEW) return "com.adithyanashokpv.gymapp.preview";
  return "com.adithyanashokpv.gymapp";
};

const getAppName = () => {
  if (IS_DEV) return "GymApp (Dev)";
  if (IS_PREVIEW) return "GymApp (Preview)";
  return "GymApp";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "gym-app-client",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/logo1.png",

  scheme: "gymappclient",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    package: getUniqueIdentifier(),
    adaptiveIcon: {
      foregroundImage: "./assets/images/logo1.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    permissions: [
      "android.permission.CAMERA",
      "android.permission.RECORD_AUDIO",
    ],
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/logo1.png",
        imageWidth: 250,
        outerWidth: 500,
        resizeMode: "contain",
        dark: {
          image: "./assets/images/logo1.png",
          backgroundColor: "#000000",
        },
        backgroundColor: "#ffffff",
      },
    ],
    // [
    //   "expo-splash-screen",
    //   {
    //     image: "./assets/images/logo1.png",
    //     imageWidth: 200,
    //     resizeMode: "contain",
    //     dark: {
    //       image: "./assets/images/logo1.png",
    //       backgroundColor: "#000000",
    //     },
    //     backgroundColor: "#ffffff",
    //   },
    // ],
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
        recordAudioAndroid: true,
      },
    ],
    ["expo-notifications"],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    apiUrl: process.env.BASE_URL,
    eas: {
      projectId: "a85bf164-39cc-493c-840f-5c2f0d452449",
    },
  },
});
