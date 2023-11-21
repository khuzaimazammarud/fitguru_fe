import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Signout } from "../../store/actions/auth";
import axios from "axios";
import { CreateGoal } from "../../configs/urls";
import { ShowSuccess } from "../../utils/flashMessages";
import { SafeAreaView } from "react-native-safe-area-context";

import NameBar from "../../component/HomeComponent/NameBar";
import DailyGoals from "../../component/HomeComponent/DailyGoals";
import FeaturedVideos from "../../component/HomeComponent/FeaturedVideos";

const Home = () => {
  const dispatch = useDispatch();
  const data = {
    dailygoal: 400,
  };

  const onLogout = () => {
    dispatch(Signout());
  };

  const createGoal = async () => {
    try {
      const response = await axios.post(CreateGoal, data);
      ShowSuccess(response.data.success);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <NameBar />
        <DailyGoals />
        <FeaturedVideos />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  screen: { margin: "3%" },
});

export default Home;
