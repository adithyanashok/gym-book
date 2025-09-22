import { View, Text, TextInput } from "react-native";
import React from "react";
import SafeScreen from "@/components/SafeArea";
import { AppColor } from "@/constants/colors";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import CustomInput from "@/components/CustomInput";
import PlanInput from "./components/PlanInput";

const CreateGym = () => {
  return (
    <SafeScreen>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Create your gym
        </Text>
        <View
          style={{
            padding: 14,
            gap: 12,
            backgroundColor: "#ffffffff",
            elevation: 1,
            margin: 12,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Your Details
          </Text>
          <CustomInput
            label="Your Name"
            placeholder="John"
            onChange={(value) => console.log(value)}
            icon={<Ionicons name="person" size={22} color={AppColor.grey} />}
          />

          <CustomInput
            label="Your Phone"
            placeholder="+91 984535XXXX"
            onChange={(value) => console.log(value)}
            icon={<Feather name="phone" size={22} color={AppColor.grey} />}
          />

          <CustomInput
            label="Your Email"
            placeholder="john.doe@gmail.com"
            onChange={(value) => console.log(value)}
            icon={<Feather name="mail" size={22} color={AppColor.grey} />}
          />

          <CustomInput
            label="Gym Name"
            placeholder="Fit Hub"
            onChange={(value) => console.log(value)}
            icon={
              <FontAwesome name="building-o" size={22} color={AppColor.grey} />
            }
          />
        </View>

        <View
          style={{
            padding: 14,
            gap: 12,
            backgroundColor: "#ffffffff",
            elevation: 1,
            margin: 12,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Gym Details
          </Text>

          <CustomInput
            label="Gym Name"
            placeholder="Fit Hub"
            onChange={(value) => console.log(value)}
            icon={
              <FontAwesome name="building-o" size={22} color={AppColor.grey} />
            }
          />
          <PlanInput
            label="Plan Name"
            placeholder="Monthly"
            onChange={(value) => console.log(value)}
            onDelete={() => console.log("value")}
            icon={
              <FontAwesome6
                name="money-check"
                size={22}
                color={AppColor.grey}
              />
            }
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default CreateGym;
