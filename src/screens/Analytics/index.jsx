import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Button, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import Svg, { G, Circle, Rect } from 'react-native-svg';
import {
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { moderateScale, verticalScale } from 'react-native-size-matters'
import Header from '../../component/HomeComponent/Header';
import color from '../../styles/color';
import TextInputField from '../../component/TextInputField';
import FoodHistoryList from '../../component/AnalyticsComponent/FoodHistoryList';

const screenWidth = Dimensions.get("window").width;

const Analytics = ({ navigation }) => {

    const [selected, setSelected] = useState({});
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showChart, setshowChart] = useState(false);

    //for Chart
    const data = {
        labels: ["carb", "fat", "protien"], // optional
        data: [0.4, 0.6, 0.8]
    };
    const barChartData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    //dataset for food history
    const [foodHistory, setFoodHistory] = useState({
        breakfast: [
            {
                food: 'egg',
                calories: 78
            },
            {
                food: 'bread',
                calories: 56
            },
            {
                food: 'milk',
                calories: 9
            },   
        ],
        lunch: [
            {
                food: 'egg',
                calories: 78
            },
            {
                food: 'bread',
                calories: 56
            },
            {
                food: 'milk',
                calories: 9
            },
        ],
        snack: [
            {
                food: 'egg',
                calories: 78
            },
            {
                food: 'bread',
                calories: 56
            },
            {
                food: 'milk',
                calories: 9
            },
        ],
        dinner: [
            {
                food: 'egg',
                calories: 78
            },
            {
                food: 'bread',
                calories: 56
            },
            {
                food: 'milk',
                calories: 9
            },
        ]
    });

    const onDayPress = (day) => {
        if (startDate && !endDate) {
            if (day.dateString < startDate) {
                setStartDate(day.dateString);
                setSelected({ [day.dateString]: { startingDay: true, color: '#50cebb', textColor: 'white' } });
            } else {
                setEndDate(day.dateString);
                setSelected({
                    ...selected,
                    [day.dateString]: { endingDay: true, color: '#50cebb', textColor: 'white' },
                    [startDate]: { startingDay: true, color: '#70d7c7', textColor: 'white' },
                });
            }
            setshowChart(true);
        } else {
            setStartDate(day.dateString);
            setEndDate('');
            setSelected({
                [day.dateString]: { startingDay: true, color: '#50cebb', textColor: 'white', endingDay: true },
            });
            setshowChart(false)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={styles.card}>
                    <Text style={styles.primaryText}>Goal Weight</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.secondryText}>55.6 KG</Text>
                        <Text style={styles.secondryText}>74.6 KG</Text>
                    </View>
                    <View style={styles.loader}>
                        <View style={styles.loaderPercentage}></View>
                    </View>
                </View>
                <View>
                    <Calendar
                        style={{ borderTopStartRadius: moderateScale(15), borderTopRightRadius: moderateScale(15) }}
                        markingType={'period'}
                        current={Date()}
                        markedDates={selected}
                        onDayPress={onDayPress}
                    />
                    <Button title="Clear Dates" onPress={() => { setStartDate(''); setEndDate(''); setSelected({}); setshowChart(false) }} />
                </View>
                {showChart ?
                    <View style={styles.analyticsCard}>
                        <Text style={styles.primaryText}>Analytics</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>From: {startDate}</Text>
                            <Text>To: {endDate}</Text>
                        </View>
                        <ProgressChart
                            style={{ borderRadius: 5, marginVertical: verticalScale(5) }}
                            data={data}
                            width={screenWidth / 1.17}
                            height={220}
                            strokeWidth={16}
                            radius={32}
                            chartConfig={chartConfig}
                            hideLegend={false}
                        />
                        <BarChart
                            style={{ borderRadius: 5, marginVertical: verticalScale(5) }}
                            data={barChartData}
                            width={screenWidth / 1.17}
                            height={220}
                            yAxisLabel="$"
                            chartConfig={chartConfig}
                            verticalLabelRotation={30}
                        />
                    </View> :
                    null}

                {showChart ? 
                    <View style={[styles.card,{marginBottom: moderateScale(100), padding:moderateScale(15)}]}>
                        <Text style={styles.primaryText}>Food History</Text>
                        <TextInputField placeholder={'Enter Date'} icon_name={'calendar'}/>
                        <View style= {styles.analyticsCard}>
                            <FoodHistoryList time={'BreakFast'} Fooddata={foodHistory.breakfast}/>
                            <FoodHistoryList time={'Lunch'} Fooddata={foodHistory.lunch}/>
                            <FoodHistoryList time={'Snack'} Fooddata={foodHistory.snack}/>
                            <FoodHistoryList time={'Dinner'} Fooddata={foodHistory.dinner}/>
                        </View>
                    </View>:
                null}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(15),
    },
    card: {
        marginVertical: verticalScale(15),
        padding: moderateScale(15),
        backgroundColor: color.orange,
        borderRadius: moderateScale(15),
        shadowColor: 'black',
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
        shadowColor: 'black',
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
        color: 'black',
        fontWeight: '700'
    },
    secondryText: {
        fontSize: moderateScale(15),
        fontWeight: '600',
        color: 'black'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: color.white,
        height: verticalScale(20),
        marginVertical: verticalScale(10),
        borderRadius: moderateScale(12),
        padding: moderateScale(3)
    },
    loaderPercentage: {
        backgroundColor: color.maincolor,
        height: verticalScale(15),
        borderRadius: moderateScale(12),
        width: '67%'
    }
})

export default Analytics;