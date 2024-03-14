import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import RightArrow from "../../assets/icons/account/right_arrow.svg"

const AddedToCartPopUp = () => {
    return (
        <Modal transparent={true} animationType='fade'  >
            <View className='bottom-16 absolute px-4'>
                <View className='bg-[#6FAE79] rounded-2xl items-center  px-5 py-5 flex-row justify-between w-full '>
                    <Text className="text-white text-lg font-mulish-medium">
                        Added to Cart
                    </Text>
                    <TouchableOpacity className="flex-row items-center gap-2">
                        <Text className="text-white text-lg font-mulish-medium">
                            Open Cart
                        </Text>
                        <RightArrow color="white" />
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}

export default AddedToCartPopUp