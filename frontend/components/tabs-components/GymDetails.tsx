// import { View, Text, StyleSheet, TextInput } from "react-native";
// import React, { useState } from "react";
// import InfoCard from "@/components/InfoCard";
// import {
//   AntDesign,
//   Entypo,
//   Feather,
//   FontAwesome5,
//   Ionicons,
// } from "@expo/vector-icons";
// import { Gym } from "@/types/gym.type";
// import { AppColor } from "@/constants/colors";
// import PrimaryButton from "../PrimaryButton";
// import { useToast } from "@/hooks/useToasts";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/store/store";
// import { editGym, selectGym } from "@/store/slices/gymSlice";
// import LogoutButton from "../LogoutButton";

// const GymDetails = ({ gym }: { gym: Gym | null }) => {
//   const toast = useToast();
//   const dispatch = useDispatch<AppDispatch>();

//   const gymSelector = useSelector(selectGym);

//   const [isEditMode, setIsEditMode] = useState<boolean>(false);
//   const [name, setName] = useState<string>(gymSelector?.gym_name ?? "");
//   const [email, setEmail] = useState<string>(gymSelector?.user_email ?? "");
//   const [username, setusername] = useState<string>(gymSelector?.username ?? "");

//   const [nameError, setNameError] = useState<boolean>(false);
//   const [emailError, setEmailError] = useState<boolean>(false);
//   const [usernameError, setUsernameError] = useState<boolean>(false);

//   const handleSubmit = async () => {
//     console.log("Name: " + name + " email: " + email + " user: " + username);
//     if (name === "" || !name) {
//       return setNameError(true);
//     }
//     if (email === "" || !email) {
//       return setEmailError(true);
//     }
//     if (username === "" || !username) {
//       return setUsernameError(true);
//     }
//     try {
//       await dispatch(
//         editGym({
//           gym_name: name!,
//           user_email: email!,
//           username: username!,
//         })
//       ).unwrap();
//       setIsEditMode(false);
//       setEmailError(false);
//       setNameError(false);
//       setUsernameError(false);
//     } catch (error) {
//       toast.error(error);
//     }
//   };
//   return (
//     <View style={styles.detailsContainer}>
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Text style={styles.containerHeading}>Gym Details</Text>
//         <Feather
//           onPress={() => setIsEditMode(!isEditMode)}
//           name="edit"
//           size={22}
//           color={AppColor.primary}
//         />
//       </View>
//       {!isEditMode && (
//         <InfoCard
//           icon={<FontAwesome5 name="building" size={20} color="#6B7280" />}
//           label="Gym Name"
//           value={gymSelector?.gym_name}
//         />
//       )}
//       {isEditMode && (
//         <View>
//           <Text style={styles.infoLabel}>Gym Name</Text>
//           <TextInput
//             onChangeText={setName}
//             style={[styles.inputBox, nameError && styles.errorInputBox]}
//             defaultValue={gymSelector?.gym_name}
//           />
//           {nameError && (
//             <Text style={styles.errorLabel}>This field is required</Text>
//           )}
//         </View>
//       )}
//       {!isEditMode && (
//         <InfoCard
//           icon={<Ionicons name="person-sharp" size={20} color="#6B7280" />}
//           label="User Name"
//           value={gymSelector?.username}
//         />
//       )}

//       {/* USER NAME INPUT BOX */}
//       {isEditMode && (
//         <View>
//           <Text style={styles.infoLabel}>User Name</Text>
//           <TextInput
//             onChangeText={setusername}
//             style={[styles.inputBox, usernameError && styles.errorInputBox]}
//             defaultValue={gymSelector?.username}
//           />
//           {usernameError && (
//             <Text style={styles.errorLabel}>This field is required</Text>
//           )}
//         </View>
//       )}
//       {!isEditMode && (
//         <InfoCard
//           icon={<Entypo name="phone" size={20} color="#6B7280" />}
//           label="Phone"
//           value={gymSelector?.user_phone}
//         />
//       )}

//       {/* EMAIL INPUT BOX */}
//       {isEditMode && (
//         <View>
//           <Text style={styles.infoLabel}>Email</Text>
//           <TextInput
//             onChangeText={setEmail}
//             style={[styles.inputBox, emailError && styles.errorInputBox]}
//             defaultValue={gymSelector?.user_email}
//           />
//           {emailError && (
//             <Text style={styles.errorLabel}>This field is required</Text>
//           )}
//         </View>
//       )}
//       {!isEditMode && (
//         <InfoCard
//           icon={<AntDesign name="mail" size={20} color="#6B7280" />}
//           label="Email"
//           value={gymSelector?.user_email}
//         />
//       )}
//       {isEditMode && (
//         <PrimaryButton notFilled={false} onClick={handleSubmit} text="Edit" />
//       )}
//       {!isEditMode && <LogoutButton />}
//     </View>
//   );
// };

// export default GymDetails;

// const styles = StyleSheet.create({
//   detailsContainer: {
//     elevation: 2,
//     backgroundColor: "#ffffff",
//     borderRadius: 10,
//     padding: 20,
//     margin: 10,
//     marginTop: 20,
//   },
//   containerHeading: { fontWeight: "bold", fontSize: 20, marginVertical: 10 },
//   inputBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     borderColor: AppColor.grey,
//     borderWidth: 0.2,
//     borderRadius: 8,
//     outlineColor: AppColor.grey,
//     outlineWidth: 0.2,
//     height: 54,
//     marginTop: 2,
//     paddingLeft: 12,
//     width: "100%",
//   },

//   errorInputBox: {
//     borderColor: "red",
//     borderWidth: 1,
//   },
//   infoLabel: {
//     marginTop: 10,
//     fontSize: 14,
//     color: "#6B7280",
//   },
//   errorLabel: {
//     fontSize: 12,
//     color: "red",
//   },
// });
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import InfoCard from "@/components/InfoCard";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
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
  const [username, setUsername] = useState<string>(gymSelector?.username ?? "");

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);

  const handleSubmit = async () => {
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
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialIcons
            name="fitness-center"
            size={24}
            color={AppColor.primary}
          />
          <Text style={styles.containerHeading}>Gym Details</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditMode(!isEditMode)}
        >
          <Feather name="edit" size={20} color={AppColor.primary} />
          <Text style={styles.editButtonText}>
            {isEditMode ? "Cancel" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Gym Name */}
        {!isEditMode ? (
          <InfoCard
            icon={
              <FontAwesome5
                name="building"
                size={20}
                color={AppColor.primary}
              />
            }
            label="Gym Name"
            value={gymSelector?.gym_name}
          />
        ) : (
          <View style={styles.inputContainer}>
            <Text style={styles.infoLabel}>Gym Name</Text>
            <TextInput
              onChangeText={setName}
              style={[styles.inputBox, nameError && styles.errorInputBox]}
              defaultValue={gymSelector?.gym_name}
              placeholder="Enter gym name"
              placeholderTextColor="#9CA3AF"
            />
            {nameError && (
              <Text style={styles.errorLabel}>This field is required</Text>
            )}
          </View>
        )}

        {/* User Name */}
        {!isEditMode ? (
          <InfoCard
            icon={
              <Ionicons
                name="person-sharp"
                size={20}
                color={AppColor.primary}
              />
            }
            label="User Name"
            value={gymSelector?.username}
          />
        ) : (
          <View style={styles.inputContainer}>
            <Text style={styles.infoLabel}>User Name</Text>
            <TextInput
              onChangeText={setUsername}
              style={[styles.inputBox, usernameError && styles.errorInputBox]}
              defaultValue={gymSelector?.username}
              placeholder="Enter username"
              placeholderTextColor="#9CA3AF"
            />
            {usernameError && (
              <Text style={styles.errorLabel}>This field is required</Text>
            )}
          </View>
        )}

        {/* Phone */}
        {!isEditMode && (
          <InfoCard
            icon={<Entypo name="phone" size={20} color={AppColor.primary} />}
            label="Phone"
            value={gymSelector?.user_phone}
          />
        )}

        {/* Email */}
        {!isEditMode ? (
          <InfoCard
            icon={<AntDesign name="mail" size={20} color={AppColor.primary} />}
            label="Email"
            value={gymSelector?.user_email}
          />
        ) : (
          <View style={styles.inputContainer}>
            <Text style={styles.infoLabel}>Email</Text>
            <TextInput
              onChangeText={setEmail}
              style={[styles.inputBox, emailError && styles.errorInputBox]}
              defaultValue={gymSelector?.user_email}
              placeholder="Enter email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError && (
              <Text style={styles.errorLabel}>This field is required</Text>
            )}
          </View>
        )}

        {isEditMode && (
          <View style={styles.buttonContainer}>
            <PrimaryButton
              notFilled={false}
              onClick={handleSubmit}
              text="Save Changes"
            />
          </View>
        )}

        {!isEditMode && <LogoutButton />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    margin: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  containerHeading: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#1F2937",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
  },
  editButtonText: {
    color: AppColor.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputBox: {
    borderColor: "#E5E7EB",
    borderWidth: 1.5,
    borderRadius: 12,
    height: 56,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
  },
  errorInputBox: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  errorLabel: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 8,
  },
});

export default GymDetails;
