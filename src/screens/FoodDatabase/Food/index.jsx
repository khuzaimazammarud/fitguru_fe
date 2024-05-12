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
    
    const [search, setSearch] = useState('chicken');
    const [food, setFood] = useState([]);
    const [categoryItem, seCategoryItem] = useState(['MEAT', 'DAIRY', 'VEGETABLE', 'FRUIT'])

    const getFood = async() => {
        // console.log("🚀 ~ file: index.jsx:14 ~ getFood ~ GetFood:", GetFood)
        try{
            const response = await axios.get(`${GetFood}/${search}`);
            setFood(response.data.hints)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=> {
        getFood();
    },[])

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
            <CategoryList categoryItems={categoryItem} name={'khuzema'}/>
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