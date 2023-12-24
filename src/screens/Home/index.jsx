import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { CreateGoal } from "../../configs/urls";
import { ShowSuccess } from "../../utils/flashMessages";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../component/HomeComponent/Header";
import DailyGoals from "../../component/HomeComponent/DailyGoals";
import FeaturedVideos from "../../component/HomeComponent/FeaturedVideos";

const Home = ({navigation}) => {
    
    const data = {
        dailygoal: 400,
    };

    const createGoal = async () => {
        try {
            const response = await axios.post(CreateGoal, data);
            ShowSuccess(response.data.success);
        } catch (error) { }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.screen}>
                <Header navigation={navigation}/>
                <DailyGoals navigation={navigation}/>
                {/* <FeaturedVideos /> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    screen: { margin: "3%" },
});

export default Home;
