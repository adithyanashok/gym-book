import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import SvgUri from "expo-svg-uri";
import FeatureCard from "./components/FeatureCard";
import Footer from "./components/Footer";
const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const handleGetStarted = () => {
    router.replace("/(auth)");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>GymMaster</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <SvgUri
            width="200"
            height="200"
            source={{
              uri: "https://illustrations.popsy.co/blue/keynote-presentation.svg",
            }}
          />
        </View>

        <Text style={styles.title}>Streamline Your Gym Management</Text>
        {/* 
        

        {/* Features Specific to Gym Owners */}
        <View style={styles.featuresContainer}>
          <FeatureCard
            icon="👥"
            title="Member Management"
            desc="Track members and membership status effortlessly"
          />

          <FeatureCard
            icon="💰"
            title="Payment Tracking"
            desc="Track billing and payments with ease"
          />

          <FeatureCard
            icon="📈"
            title="Business Analytics"
            desc="Get insights into revenue, membership and growth"
          />
        </View>
      </View>

      {/* Footer */}
      <Footer handleGetStarted={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 32,
    marginRight: 12,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  illustrationContainer: {
    height: height * 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  illustration: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 10,
  },
  featuresContainer: {
    marginBottom: 20,
  },
});
