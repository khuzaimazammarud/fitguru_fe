import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../component/HomeComponent/Header";
import DailyGoals, { Banner } from "../../component/HomeComponent/DailyGoals";
import FeaturedVideos from "../../component/HomeComponent/FeaturedVideos";
import imagePath from "../../constants/imagePath";
import { moderateScale } from "react-native-size-matters";
import { getGoal } from "../../configs/urls";
import { fetchGoalProgress } from "../../store/actions/goalAction";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const [goalData, setGoalData] = useState({});

  const getGoals = async () => {
    try {
      const { data } = await axios.get(`${getGoal}/${auth.userData.id}`);
      setGoalData(data.goal);
      dispatch(fetchGoalProgress(data?.goal?._id));
    } catch (error) {
      console.log("🚀 ~ getGoals ~ error:", error);
    }
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} screen={"Home"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <DailyGoals navigation={navigation} goalData={goalData}/>
          <FeaturedVideos />
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
