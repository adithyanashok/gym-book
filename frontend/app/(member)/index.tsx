import { Ionicons } from "@expo/vector-icons";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import PersonalInformation from "./components/PersonalInformation";
import addMemberStyle from "./styles/add-member.styles";
import MembershipPlan from "./components/MembershipPlan";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store/store";
import {
  addMemberImage,
  createMember,
  editMember,
  selectMemberCreateLoading,
} from "@/store/slices/membersSlice";
import { ApiResponse, Member, MemberData } from "@/types/member.types";
import { useToast } from "@/hooks/useToasts";
import Loading from "@/components/Loading";
import { selectedPlans } from "@/store/slices/plansSlice";
type SelectedImage = {
  uri: string;
  type: string;
  fileName: string;
};
export default function AddMember() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null
  );

  const plans = useSelector(selectedPlans);

  const [showImageOptions, setShowImageOptions] = useState(false);

  const isLoading = useSelector(selectMemberCreateLoading);

  const router = useRouter();

  const params = useLocalSearchParams();

  const toast = useToast();

  const memberParam = params.member
    ? JSON.parse(params.member as string)
    : null;

  const [formData, setFormData] = useState<MemberData>({
    name: memberParam?.name ?? "",
    email: memberParam?.email ?? "",
    phone: memberParam?.phone ?? "",
    address: memberParam?.address ?? "",
    planId: memberParam?.planId ?? plans[0].id,
    startDate: memberParam?.startDate
      ? new Date(memberParam?.startDate)
      : new Date(),
    image: null,
  });

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      handleInputChange("startDate", selectedDate);
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.phone || !formData.address) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Prepare member data
    const memberData = {
      ...formData,
    };
    const id = memberParam?.id;

    try {
      if (memberParam) {
        // Use unwrap() to properly handle the promise

        await dispatch(editMember({ id, memberData })).unwrap();
        toast.success("Success, Member Updated successfully!");

        router.back();
      } else {
        console.log(memberData);
        const fileData = new FormData();
        fileData.append("file", {
          uri: selectedImage?.uri,
          type: "image/jpeg",
          name: selectedImage?.fileName || `image_${Date.now()}.jpg`,
        } as any);
        const response = await dispatch(
          createMember({ memberData: formData, fileData })
        ).unwrap();

        await dispatch(
          addMemberImage({
            id: response.data.id,
            formData: fileData,
          })
        ).unwrap();

        toast.success("Success, Member created successfully!");
        // router.back();
      }
    } catch (error: unknown) {
      toast.error(error as string);
    }
  };

  // Request camera permissions when component mounts
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      setShowImageOptions(false);

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        setFormData((prev) => ({
          ...prev,
          image: asset.uri,
        }));

        setSelectedImage({
          uri: asset.uri,
          type: asset.type || "image/jpeg",
          name: asset.fileName || `image_${Date.now()}.jpg`,
        } as any);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const removePhoto = () => {
    setFormData({
      ...formData,
      image: null,
    });
    setShowImageOptions(false);
  };

  // Determine which image to display
  const imageSource = formData.image
    ? { uri: formData.image }
    : {
        uri: "https://img.myloview.de/sticker/default-profile-picture-avatar-photo-placeholder-vector-illustration-700-205664584.jpg",
      };

  if (isLoading) {
    return <Loading loadingText="Member adding" />;
  }

  return (
    <SafeAreaView style={addMemberStyle.container} edges={["top", "bottom"]}>
      <ScrollView
        style={addMemberStyle.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={addMemberStyle.header}>
          <TouchableOpacity
            style={addMemberStyle.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#4264FB" />
          </TouchableOpacity>
          <Text style={addMemberStyle.headerTitle}>
            {memberParam ? "Edit Member" : "Add New Member"}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Personal Information Section */}
        <PersonalInformation
          formData={formData}
          onInputChange={handleInputChange}
          imageSource={imageSource}
          onProfilePress={() => setShowImageOptions(true)}
        />

        {/* Membership Plan Section */}
        <MembershipPlan
          formData={formData}
          handleDateChange={handleDateChange}
          handleInputChange={handleInputChange}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={addMemberStyle.submitButton}
          onPress={handleSubmit}
        >
          <Text style={addMemberStyle.submitButtonText}>Add Member</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Image Selection Modal */}
      <Modal
        visible={showImageOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <View style={addMemberStyle.modalContainer}>
          <View style={addMemberStyle.modalContent}>
            <Text style={addMemberStyle.modalTitle}>Select Profile Photo</Text>

            <TouchableOpacity
              style={addMemberStyle.modalOption}
              onPress={takePhoto}
            >
              <Ionicons name="camera" size={24} color="#4264FB" />
              <Text style={addMemberStyle.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>

            {formData.image && (
              <TouchableOpacity
                style={[
                  addMemberStyle.modalOption,
                  addMemberStyle.removeOption,
                ]}
                onPress={removePhoto}
              >
                <Ionicons name="trash" size={24} color="#FF3B30" />
                <Text
                  style={[addMemberStyle.modalOptionText, { color: "#FF3B30" }]}
                >
                  Remove Photo
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={addMemberStyle.modalCancel}
              onPress={() => setShowImageOptions(false)}
            >
              <Text style={addMemberStyle.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
