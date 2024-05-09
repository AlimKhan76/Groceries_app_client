import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const NumberPad = ({ onPress }) => {
    return (
        <View className="flex-1 items-center gap-y-3 my-2 ">

            <View className="flex-row justify-evenly w-full">
                <TouchableOpacity
                    className="bg-[#eeedf3] rounded-full py-4 px-6 justify-center"
                    onPress={() => onPress("1")}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        1
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    className="bg-[#eeedf1] rounded-full py-4 px-6 justify-center"
                    onPress={() => onPress("2")}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        2
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-[#eeedf3] rounded-full py-4 px-6 justify-center"
                    onPress={() => onPress("3")}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        3
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-evenly w-full">
                <TouchableOpacity
                    className="bg-[#eeedf3] rounded-full py-4 px-6  justify-center"
                    onPress={() => onPress("4")}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        4
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    className="bg-[#eeedf1] rounded-full py-4 px-6  justify-center"
                    onPress={() => onPress("5")}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        5
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-[#eeedf3] rounded-full py-4 px-6 justify-center"
                    onPress={() => onPress("6")}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        6
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-evenly w-full">
                <TouchableOpacity
                    className="bg-[#eeedf3] rounded-full py-4 px-6 justify-center"
                    onPress={() => onPress('7')}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        7
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    className="bg-[#eeedf1] rounded-full py-4 px-6 justify-center"
                    onPress={() => onPress('8')}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        8
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-[#eeedf3] rounded-full py-4 px-6 justify-center"
                    onPress={() => onPress('9')}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        9
                    </Text>
                </TouchableOpacity>
            </View>



            <View className="flex-row justify-evenly w-full">
                {/*  <TouchableOpacity
                    className="bg-[#eeedf3] rounded-full py-5 px-6 justify-center"
                    onPress={() => onPress('1')}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        1
                    </Text> 
                </TouchableOpacity> */}


                <TouchableOpacity
                    className="bg-[#eeedf1] rounded-full py-5 px-6 justify-center"
                    onPress={() => onPress('0')}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        0
                    </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    className="bg-[#eeedf3] rounded-full py-5 px-6 justify-center"
                    onPress={() => onPress('1')}>
                    <Text
                        className="text-black font-mulish-bold"
                        style={{
                            fontSize: responsiveFontSize(3)
                        }}>
                        X
                    </Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#eee',
        borderRadius: 5,
        padding: 20,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 24,
    },
});

export default NumberPad;
