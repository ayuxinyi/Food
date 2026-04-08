import ClearCompletedButton from "@/components/insights/clear-completed-button";
import InsightsCategorySection from "@/components/insights/insights-category-section";
import InsightsPrioritySection from "@/components/insights/insights-priority-section";
import InsightsStatsSection from "@/components/insights/insights-stats-section";
import UserProfile from "@/components/insights/user-profile";
import SentryFeedBackButton from "@/components/ui/sentry-feed-back-button";
import TabScreenBackground from "@/components/ui/tab-screen-background";
import { ScrollView } from "react-native";

const Insights = () => {
  return (
    <>
      <ScrollView
        className="flex-1 bg-background py-4"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          gap: 14,
        }}
      >
        <TabScreenBackground />
        <UserProfile />
        <InsightsStatsSection />
        <InsightsCategorySection />
        <InsightsPrioritySection />
        <ClearCompletedButton />
      </ScrollView>
      <SentryFeedBackButton />
    </>
  );
};
export default Insights;
