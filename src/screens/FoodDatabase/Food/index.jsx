import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import SubmitButton from '../../../component/ButtonSubmit';
import { GetFood } from '../../../configs/urls';

const Food = () => {
    
    const [food, setFood] = useState([]);
    const User = [
        {
            name: "khzuema",
            id: 0
        },
        {
            name: "khzuema",
            id: 1
        },
        {
            name: "khzuema",
            id: 2
        },
        {
            name: "khzuema",
            id: 3
        },
    ]

    const getFood = async() => {
        // console.log("🚀 ~ file: index.jsx:14 ~ getFood ~ GetFood:", GetFood)
        try{
            const response = await axios.get(GetFood);
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
            {console.log(User)}
            <Text>Food database is there</Text>
            <SubmitButton text={'getFood'} onPress={getFood}/>
            <FlatList
                data = {User}
                renderItem={(item) => <Text>{item.name}</Text>}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50'
    }
})

export default Food;