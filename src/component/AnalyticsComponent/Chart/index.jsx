import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView, View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { verticalScale } from 'react-native-size-matters';

const screenWidth = Dimensions.get('window').width;

const ChartComponent = ({ analyticsData }) => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    const labels = analyticsData.map(entry => entry.date);
    const data = analyticsData.map(entry => entry.calories);

    setBarChartData({
      labels: labels,
      datasets: [{ data: data }],
    });
  }, [analyticsData]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  // Adjust chartWidth based on the number of data entries
  const chartWidth = barChartData.labels.length * 60; // 60 pixels per bar

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 6 }}>
        Daily Caloric Intake
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <BarChart
          style={{ borderRadius: 5, marginVertical: verticalScale(5) }}
          data={barChartData}
          width={chartWidth > screenWidth ? chartWidth : screenWidth} // Ensure the chart stretches
          height={300}
          yAxisLabel=""
          yAxisSuffix=" kcal"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero
          yAxisInterval={1} // Set interval to 1 to scale up to the max of 3000
          segments={3} // Optionally add segments to better visualize the scale
        />
      </ScrollView>
    </View>
  );
};

export default ChartComponent;
