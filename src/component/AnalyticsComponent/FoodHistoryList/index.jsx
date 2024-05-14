import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const FoodHistoryList = ({ time, Fooddata, SelectedDate }) => {
    const filteredData = Fooddata.filter(data => data.date === SelectedDate);

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                {filteredData.length > 0 ? (
                    filteredData.map((entry, index) => (
                        <View key={index} style={styles.foodItem}>
                            {entry.foods.map((food, idx) => (
                                <View key={idx} style={styles.foodDetail}>
                                    <Image source={{ uri: food.image }} style={styles.foodImage} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.foodLabel}>{food.label}</Text>
                                        <Text style={styles.foodCalories}>{food.nutrients.ENERC_KCAL} kcal</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No entries for this date.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        padding: moderateScale(10),

        borderRadius: moderateScale(8),
        marginVertical: moderateScale(5)
    },
    foodItem: {
        flexDirection: 'column',
        marginBottom: moderateScale(10),
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: moderateScale(10),
    },
    foodDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: moderateScale(5)
    },
    foodImage: {
        width: moderateScale(70),
        height: moderateScale(70),
        borderRadius: moderateScale(35),
        marginRight: moderateScale(10)
    },
    textContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    foodLabel: {
        fontSize: moderateScale(15),
        fontWeight: 'bold',
        marginBottom: moderateScale(2)
    },
    foodCalories: {
        fontSize: moderateScale(13),
        color: '#555'
    },
    noDataText: {
        fontSize: moderateScale(16),
        color: 'red',
        textAlign: 'center',
    }
});

export default FoodHistoryList;
