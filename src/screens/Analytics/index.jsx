import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import axios from "axios";

import Header from "../../component/HomeComponent/Header";
import color from "../../styles/color";
import TextInputField from "../../component/TextInputField";
import FoodHistoryList from "../../component/AnalyticsComponent/FoodHistoryList";
import ChartComponent from "../../component/AnalyticsComponent/Chart";
import { ProgressAnalytics } from "../../configs/urls";
import FilteredFoodList from "../../component/AnalyticsComponent/FoodHistoryList";
import DateDropdown from "../../component/DateDropDown";
// import DateDropdown from "../../component/DateDropDown";


const Analytics = ({ navigation }) => {
  const auth = useSelector((state) => state.AuthReducer);
  const [selected, setSelected] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [SelectedDate, setSelectedDate] = useState("");
  const [showChart, setshowChart] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);

  //dataset for food history
  const [foodHistory, setFoodHistory] = useState({
    breakfast: [
      {
        food: "egg",
        calories: 78,
      },
      {
        food: "bread",
        calories: 56,
      },
      {
        food: "milk",
        calories: 9,
      },
    ],
    lunch: [
      {
        food: "egg",
        calories: 78,
      },
      {
        food: "bread",
        calories: 56,
      },
      {
        food: "milk",
        calories: 9,
      },
    ],
    snack: [
      {
        food: "egg",
        calories: 78,
      },
      {
        food: "bread",
        calories: 56,
      },
      {
        food: "milk",
        calories: 9,
      },
    ],
    dinner: [
      {
        food: "egg",
        calories: 78,
      },
      {
        food: "bread",
        calories: 56,
      },
      {
        food: "milk",
        calories: 9,
      },
    ],
  });

  const onDayPress = (day) => {
    if (startDate && !endDate) {
      if (day.dateString < startDate) {
        setStartDate(day.dateString);
        setSelected({
          [day.dateString]: {
            startingDay: true,
            color: "#50cebb",
            textColor: "white",
          },
        });
      } else {
        setEndDate(day.dateString);
        setSelected({
          ...selected,
          [day.dateString]: {
            endingDay: true,
            color: "#50cebb",
            textColor: "white",
          },
          [startDate]: {
            startingDay: true,
            color: "#70d7c7",
            textColor: "white",
          },
        });
        setshowChart(true);
        fetchAnalytics(day.dateString);
      }
      
    } else {
      setStartDate(day.dateString);
      setEndDate("");
      setSelected({
        [day.dateString]: {
          startingDay: true,
          color: "#50cebb",
          textColor: "white",
          endingDay: true,
        },
      });
      setshowChart(false);
    }
  };


  //I have pass end parameter cause state was gettting set directy after calling the function
  const fetchAnalytics = async(endDate) => {
    try{
      const payload = {
        goal: auth?.userData?.goalId,
        startDate: `${startDate}T00:00:00.00+00:00`,
        endDate: `${endDate}T23:59:59.999Z`,
      }
      console.log("🚀 ~ fetchAnalytics ~ payload:", payload);
      
      const {data} = await axios.post(`${ProgressAnalytics}/report`, payload);
      setAnalyticsData(data.data);

    }catch(error){
    console.log("🚀 ~ fetchAnalytics ~ error:", error)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.primaryText}>Goal Weight</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.secondryText}>55.6 KG</Text>
            <Text style={styles.secondryText}>74.6 KG</Text>
          </View>
          <View style={styles.loader}>
            <View style={styles.loaderPercentage}></View>
          </View>
        </View>
        <View>
          <Calendar
            style={{
              borderTopStartRadius: moderateScale(15),
              borderTopRightRadius: moderateScale(15),
            }}
            markingType={"period"}
            current={Date()}
            markedDates={selected}
            onDayPress={onDayPress}
          />
          <Button
            title="Clear Dates"
            onPress={() => {
              setStartDate("");
              setEndDate("");
              setSelected({});
              setshowChart(false);
            }}
          />
        </View>
        {showChart ? (
          <View style={styles.analyticsCard}>
            <Text style={styles.primaryText}>Analytics</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>From: {startDate}</Text>
              <Text>To: {endDate}</Text>
            </View>
            <ChartComponent analyticsData = {analyticsData}/>
          </View>
        ) : null}

        {showChart ? (
          <View
            style={[
              styles.card,
              { marginBottom: moderateScale(100), padding: moderateScale(15) },
            ]}
          >
            <Text style={styles.primaryText}>Food History</Text>
            <DateDropdown analyticsData={analyticsData} setSelectedDate = {setSelectedDate}/>
            <View style={styles.analyticsCard}>
              <FoodHistoryList
                time={"BreakFast"}
                Fooddata={analyticsData}
                SelectedDate = {SelectedDate}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
  },
  card: {
    marginVertical: verticalScale(15),
    padding: moderateScale(15),
    backgroundColor: color.orange,
    borderRadius: moderateScale(15),
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
  },
  analyticsCard: {
    marginVertical: verticalScale(15),
    padding: moderateScale(15),
    backgroundColor: color.maincolor,
    borderRadius: moderateScale(15),
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
  },
  primaryText: {
    fontSize: moderateScale(20),
    color: "black",
    fontWeight: "700",
  },
  secondryText: {
    fontSize: moderateScale(15),
    fontWeight: "600",
    color: "black",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: color.white,
    height: verticalScale(20),
    marginVertical: verticalScale(10),
    borderRadius: moderateScale(12),
    padding: moderateScale(3),
  },
  loaderPercentage: {
    backgroundColor: color.maincolor,
    height: verticalScale(15),
    borderRadius: moderateScale(12),
    width: "67%",
  },
});

export default Analytics;
