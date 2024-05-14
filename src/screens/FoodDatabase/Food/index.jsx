import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {verticalScale, moderateScale} from 'react-native-size-matters'
import SubmitButton from '../../../component/ButtonSubmit';
import { GetFood } from '../../../configs/urls';
import color from '../../../styles/color';
import Header from '../../../component/HomeComponent/Header';
import TextInputField from '../../../component/TextInputField';
import CategoryList from '../../../component/FoodDatabase/Category';
import FoodList from '../../../component/FoodDatabase/FoodList';

const Food = ({navigation}) => {
    
    const [search, setSearch] = useState('Meat');
    const [food, setFood] = useState([]);
    const [categoryItem, setCategoryItem] = useState(['MEAT', 'DAIRY', 'VEGETABLE', 'FRUIT']);

    // Function to fetch food data
    const getFood = async () => {
        try {
            const response = await axios.get(`${GetFood}/${search}`);
            setFood(response.data.hints);
        } catch (error) {
            console.error("Error fetching food data:", error);
        }
    };

    // Effect for debouncing search input
    useEffect(() => {
        const timerId = setTimeout(() => {
            getFood();
        }, 800);  // Delay in ms, adjust as needed

        return () => clearTimeout(timerId);  // Clean up the timer
    }, [search]); 

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation}/>
            <View>
                <TextInputField 
                    placeholder={'Search Food'}
                    icon_name={'search'}
                    value={search}
                    onChangeText={(text) => {
                        setSearch(text)
                    }}
                />
            </View>
            <CategoryList categoryItems={categoryItem} name={'khuzema'} setSearch={setSearch}/>
            <FlatList 
             columnWrapperStyle = {{justifyContent: 'space-between'}}
             numColumns={2}
             showsVerticalScrollIndicator = {false}
             contentContainerStyle = {{
                marginTop: moderateScale(10),
                paddingBottom: moderateScale(50)
             }}
             data={food}
             renderItem={({item}) => <FoodList food = {item} navigation = {navigation}/>}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(15),
    }
})

export default Food;