import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { verticalScale, moderateScale } from "react-native-size-matters";
import Header from "../../../component/HomeComponent/Header";
import Donut from "../../../component/FoodDatabase/Donut";
import color from "../../../styles/color";
import TextInputField from "../../../component/TextInputField";
import Icon, { Icons } from "../../../component/Icons";
import imagePath from "../../../constants/imagePath";
import { LogMeal, getGoal } from "../../../configs/urls";
import axios from "axios";
import { getMealTime } from "../../../utils/timeOfDay";
import { ShowSuccess } from "../../../utils/flashMessages";
import { fetchGoalProgress } from "../../../store/actions/goalAction";

const FoodView = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const food = route.params;
  const auth = useSelector((state) => state.AuthReducer);
  const [goalData, setGoalData] = useState({});

  const calculateDonutData = () => {
    const TotalNut =
      food.food.nutrients.CHOCDF +
      food.food.nutrients.PROCNT +
      food.food.nutrients.FAT +
      food.food.nutrients.FIBTG;

    return [
      {
        percentage: (food.food.nutrients.PROCNT / TotalNut) * 100,
        color: "green",
        max: 100,
        radius: 50,
        strokewidth: 15,
      },
      {
        percentage: (food.food.nutrients.CHOCDF / TotalNut) * 100,
        color: "#FFBE61",
        max: 100,
        radius: 50,
        strokewidth: 15,
      },
      {
        percentage: (food.food.nutrients.FAT / TotalNut) * 100,
        color: "red",
        max: 100,
        radius: 50,
        strokewidth: 15,
      },
    ];
  };

  const [donutData, setDonutData] = useState(calculateDonutData());
  const [mealLog, setMealLog] = useState({
    kcal: 0,
    protein: 0,
    carb: 0,
    fat: 0,
  });

  const calculateNutrient = (amount) => {
    setMealLog({
      kcal: (food.food.nutrients.ENERC_KCAL * (amount / 100)).toFixed(1),
      protein: (food.food.nutrients.PROCNT * (amount / 100)).toFixed(1),
      carb: (food.food.nutrients.CHOCDF * (amount / 100)).toFixed(1),
      fat: (food.food.nutrients.FAT * (amount / 100)).toFixed(1),
    });
  };

  //Component
  const NutrientTable = ({ label, color, value }) => {
    return (
      <View style={styles.cell}>
        <Text style={styles.cellLabel}>{label}</Text>
        <View style={styles.valueContainer}>
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={styles.cellValue}>{value}</Text>
        </View>
      </View>
    );
  };

  const AddMeal = async () => {
    try {
      const payload = {
        goal: goalData._id,
        timeOfDay: getMealTime(),
        calories: mealLog.kcal,
        protein: mealLog.protein,
        fats: mealLog.fat,
        carbs: mealLog.carb,
        foods: [food.food],
      };
      const { data } = await axios.post(`${LogMeal}`, payload);
      ShowSuccess('Meal added successfully');
      dispatch(fetchGoalProgress(auth?.userData?.goalId));

    } catch (error) {

    }
  };

  useEffect(() => {
    setDonutData(calculateDonutData());
  }, [food]);

  const getGoals = async () => {
    try {
      const { data } = await axios.get(`${getGoal}/${auth.userData.id}`);
      // dispatch({type: 'SET_GOAL_DATA', payload: data.goal});
      setGoalData(data.goal);
    } catch (error) {}
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Image
            source={
              food.food.image ? { uri: food.food.image } : imagePath.placeHolder
            }
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{food.food.label}</Text>
            <Text style={[styles.secondryText]}>100g</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.primaryText}>Nutrients Percentage </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            alignItems: "center",
            marginVertical: verticalScale(15),
          }}
        >
          {donutData.map((p, i) => {
            return (
              <Donut
                key={i}
                percentage={p.percentage}
                color={p.color}
                radius={p.radius}
                delay={500 + 100 * i}
                max={p.max}
                strokeWidth={p.strokewidth}
              />
            );
          })}
        </View>
        <View style={styles.divider} />
        <View style={styles.table}>
          <NutrientTable
            label={"Protien"}
            color={"green"}
            value={food.food.nutrients.PROCNT}
          />
          <NutrientTable
            label={"Carb"}
            color={"#FFBE61"}
            value={food.food.nutrients.CHOCDF}
          />
          <NutrientTable
            label={"Fat"}
            color={"red"}
            value={food.food.nutrients.FAT}
          />
        </View>
        <View style={styles.divider} />
        <View style={{ marginVertical: verticalScale(15) }}>
          <Text style={styles.primaryText}>Amount Per Serving</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: verticalScale(15),
            }}
          >
            <Text
              style={[
                styles.primaryText,
                { fontSize: moderateScale(30), fontWeight: "bold" },
              ]}
            >
              Calories
            </Text>
            <Text
              style={[
                styles.primaryText,
                { fontSize: moderateScale(30), fontWeight: "bold" },
              ]}
            >
              {food.food.nutrients.ENERC_KCAL}
            </Text>
          </View>
        </View>
        <View style={styles.AddContainer}>
          <Text style={[styles.primaryText, { color: "black" }]}>Meal Log</Text>
          <View>
            <TextInputField
              placeholder={"Amount"}
              icon_name={"spoon"}
              isNumber={true}
              onChangeText={(amount) => {
                calculateNutrient(amount);
              }}
            />
          </View>
          <View style={styles.table}>
            <NutrientTable
              label={"Kcal"}
              color={color.maincolor}
              value={mealLog.kcal}
            />
            <NutrientTable
              label={"Protein"}
              color={"green"}
              value={mealLog.protein}
            />
            <NutrientTable
              label={"Carb"}
              color={"#FFBE61"}
              value={mealLog.carb}
            />
            <NutrientTable label={"Fat"} color={"red"} value={mealLog.fat} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity style={styles.add} onPress={AddMeal}>
              <Icon
                type={Icons.MaterialCommunityIcons}
                name={"plus"}
                color={color.white}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(15),
  },
  contentContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  AddContainer: {
    marginVertical: verticalScale(15),
    padding: moderateScale(15),
    backgroundColor: color.orange,
    borderRadius: moderateScale(15),
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    flex: 1,
    width: "100%",
    height: verticalScale(200),
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  textContainer: {
    flex: 1,
    padding: moderateScale(10),
  },
  text: {
    // Your text styles here
    fontSize: moderateScale(25),
    color: color.textColor,
    fontWeight: "700",
  },
  primaryText: {
    fontSize: moderateScale(20),
    color: color.textColor,
    fontWeight: "600",
  },
  secondryText: {
    fontSize: moderateScale(15),
    fontWeight: "600",
    color: color.textColor,
  },
  divider: {
    height: verticalScale(3),
    width: "100%",
    backgroundColor: "#E0E0E0",
  },
  table: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    elevation: 1, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginVertical: verticalScale(15),
  },
  cell: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
  },
  cellLabel: {
    fontWeight: "bold",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  cellValue: {
    fontSize: 16,
  },
  add: {
    backgroundColor: "green",
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
  },
});

export default FoodView;
