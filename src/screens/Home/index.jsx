import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { CreateGoal } from "../../configs/urls";
import { ShowSuccess } from "../../utils/flashMessages";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../component/HomeComponent/Header";
import DailyGoals, { Banner } from "../../component/HomeComponent/DailyGoals";
import FeaturedVideos from "../../component/HomeComponent/FeaturedVideos";
import imagePath from "../../constants/imagePath";
import { moderateScale } from "react-native-size-matters";

const Home = ({ navigation }) => {
  const data = {
    dailygoal: 400,
  };

  const createGoal = async () => {
    try {
      const response = await axios.post(CreateGoal, data);
      ShowSuccess(response.data.success);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} screen={"Home"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <DailyGoals navigation={navigation} />

          {/* <FeaturedVideos /> */}
          <Banner text={"CONNECT"} image={imagePath.watchBanner} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItem: "center",
    padding: moderateScale(15),
  },
  screen: {
    marginBottom: moderateScale(70),
  },
});

export default Home;
