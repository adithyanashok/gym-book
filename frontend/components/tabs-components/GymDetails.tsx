import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import InfoCard from "@/components/InfoCard";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { Gym } from "@/types/gym.type";
import { AppColor } from "@/constants/colors";
import PrimaryButton from "../PrimaryButton";
import { useToast } from "@/hooks/useToasts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { editGym, selectGym } from "@/store/slices/gymSlice";
import LogoutButton from "../LogoutButton";

const GymDetails = ({ gym }: { gym: Gym | null }) => {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const gymSelector = useSelector(selectGym);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [name, setName] = useState<string>(gymSelector?.gym_name ?? "");
  const [email, setEmail] = useState<string>(gymSelector?.user_email ?? "");
  const [username, setusername] = useState<string>(gymSelector?.username ?? "");

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);

  const handleSubmit = async () => {
    console.log("Name: " + name + " email: " + email + " user: " + username);
    if (name === "" || !name) {
      return setNameError(true);
    }
    if (email === "" || !email) {
      return setEmailError(true);
    }
    if (username === "" || !username) {
      return setUsernameError(true);
    }
    try {
      await dispatch(
        editGym({
          gym_name: name!,
          user_email: email!,
          username: username!,
        })
      ).unwrap();
      setIsEditMode(false);
      setEmailError(false);
      setNameError(false);
      setUsernameError(false);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <View style={styles.detailsContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.containerHeading}>Gym Details</Text>
        <Feather
          onPress={() => setIsEditMode(!isEditMode)}
          name="edit"
          size={22}
          color={AppColor.primary}
        />
      </View>
      {!isEditMode && (
        <InfoCard
          icon={<FontAwesome5 name="building" size={20} color="#6B7280" />}
          label="Gym Name"
          value={gymSelector?.gym_name}
        />
      )}
      {isEditMode && (
        <View>
          <Text style={styles.infoLabel}>Gym Name</Text>
          <TextInput
            onChangeText={setName}
            style={[styles.inputBox, nameError && styles.errorInputBox]}
            defaultValue={gymSelector?.gym_name}
          />
          {nameError && (
            <Text style={styles.errorLabel}>This field is required</Text>
          )}
        </View>
      )}
      {!isEditMode && (
        <InfoCard
          icon={<Ionicons name="person-sharp" size={20} color="#6B7280" />}
          label="User Name"
          value={gymSelector?.username}
        />
      )}

      {/* USER NAME INPUT BOX */}
      {isEditMode && (
        <View>
          <Text style={styles.infoLabel}>User Name</Text>
          <TextInput
            onChangeText={setusername}
            style={[styles.inputBox, usernameError && styles.errorInputBox]}
            defaultValue={gymSelector?.username}
          />
          {usernameError && (
            <Text style={styles.errorLabel}>This field is required</Text>
          )}
        </View>
      )}
      {!isEditMode && (
        <InfoCard
          icon={<Entypo name="phone" size={20} color="#6B7280" />}
          label="Phone"
          value={gymSelector?.user_phone}
        />
      )}

      {/* EMAIL INPUT BOX */}
      {isEditMode && (
        <View>
          <Text style={styles.infoLabel}>Email</Text>
          <TextInput
            onChangeText={setEmail}
            style={[styles.inputBox, emailError && styles.errorInputBox]}
            defaultValue={gymSelector?.user_email}
          />
          {emailError && (
            <Text style={styles.errorLabel}>This field is required</Text>
          )}
        </View>
      )}
      {!isEditMode && (
        <InfoCard
          icon={<AntDesign name="mail" size={20} color="#6B7280" />}
          label="Email"
          value={gymSelector?.user_email}
        />
      )}
      {isEditMode && (
        <PrimaryButton notFilled={false} onClick={handleSubmit} text="Edit" />
      )}
      {!isEditMode && <LogoutButton />}
    </View>
  );
};

export default GymDetails;

const styles = StyleSheet.create({
  detailsContainer: {
    elevation: 2,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    marginTop: 20,
  },
  containerHeading: { fontWeight: "bold", fontSize: 20, marginVertical: 10 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: AppColor.grey,
    borderWidth: 0.2,
    borderRadius: 8,
    outlineColor: AppColor.grey,
    outlineWidth: 0.2,
    height: 54,
    marginTop: 2,
    paddingLeft: 12,
    width: "100%",
  },

  errorInputBox: {
    borderColor: "red",
    borderWidth: 1,
  },
  infoLabel: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
  },
  errorLabel: {
    fontSize: 12,
    color: "red",
  },
});
