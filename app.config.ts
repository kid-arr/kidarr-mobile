import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "parentgrine",
  name: "Parentrine Falcon",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.podnoms.parentgrine",
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.podnoms.parentgrine",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_KEY,
      },
    },
  },
  extra: {
    eas: {
      projectId: "d677151e-bb56-42c0-8d02-5349f0763cc9",
    },
  },
});
