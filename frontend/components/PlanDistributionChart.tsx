import { PlanDistribution } from "@/types/planDistribution.type";
import { useMemo } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import * as Progress from "react-native-progress";

interface Props {
  data: PlanDistribution[];
  title: string;
}
const PlanDistributionChart = ({
  data,
  title = "Plan Distribution",
}: Props) => {
  const { width } = useWindowDimensions();

  type PlanType = "Monthly" | "Quarterly" | "Yearly";
  const plansWithColors = useMemo(() => {
    const colors: Record<PlanType, string> = {
      Monthly: "#4264FB",
      Quarterly: "#FF6B6B",
      Yearly: "#66BB6A",
    };
    return data.map((item) => ({
      ...item,
      color: colors[item.plan as PlanType],
    }));
  }, [data]);

  return (
    <View style={styles.chartContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      {data.length === 0 ? (
        <Text style={{ textAlign: "center" }}>No data</Text>
      ) : (
        <View style={styles.distributionContainer}>
          {plansWithColors.map((item, index) => (
            <View key={index} style={styles.distributionItem}>
              <View style={styles.distributionHeader}>
                <View
                  style={[
                    styles.colorIndicator,
                    { backgroundColor: item.color },
                  ]}
                />
                <Text style={styles.distributionName}>{item.plan}</Text>
                <Text style={styles.distributionPercentage}>
                  {item.percentage}%
                </Text>
              </View>
              <Progress.Bar
                progress={parseFloat(item.percentage) / 100}
                width={width - 64}
                height={8}
                color={item.color}
                unfilledColor="#F3F4F6"
                borderWidth={0}
                borderRadius={4}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
export default PlanDistributionChart;
const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  chartBarContainer: {
    alignItems: "center",
    flex: 1,
  },
  chartBarBackground: {
    height: "70%",
    width: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  chartBar: {
    width: 16,
    borderRadius: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
  },
  chartValue: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 4,
  },
  distributionContainer: {
    marginTop: 8,
  },
  distributionItem: {
    marginBottom: 16,
  },
  distributionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  distributionName: {
    fontSize: 14,
    color: "#4B5563",
    marginRight: "auto",
  },
  distributionPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
});
