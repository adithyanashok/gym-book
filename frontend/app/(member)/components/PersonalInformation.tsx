import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import addMemberStyle from "../styles/add-member.styles";
import { Ionicons } from "@expo/vector-icons";

interface PersonalInformationProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    planId: number;
    startDate: Date;
  };
  onInputChange: (field: string, value: string) => void;
  imageSource: any;
  onProfilePress: () => void;
}
const PersonalInformation = ({
  formData,
  onInputChange,
  imageSource,
  onProfilePress,
}: PersonalInformationProps) => {
  return (
    <View style={addMemberStyle.section}>
      <Text style={addMemberStyle.sectionTitle}>Personal Information</Text>
      <View style={addMemberStyle.imageContainer}>
        <TouchableOpacity onPress={() => onProfilePress()}>
          <Image style={addMemberStyle.memberImage} source={imageSource} />
          <View style={addMemberStyle.cameraIcon}>
            <Ionicons name="camera" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={addMemberStyle.nameRow}>
        <View
          style={[addMemberStyle.inputContainer, { flex: 1, marginRight: 8 }]}
        >
          <Text style={addMemberStyle.label}>First Name *</Text>
          <TextInput
            style={addMemberStyle.input}
            placeholder="John"
            value={formData.name}
            onChangeText={(text) => onInputChange("name", text)}
          />
        </View>
      </View>

      <View style={addMemberStyle.inputContainer}>
        <Text style={addMemberStyle.label}>Email Address</Text>
        <TextInput
          style={addMemberStyle.input}
          placeholder="john.doe@example.com"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) => onInputChange("email", text)}
        />
      </View>

      <View style={addMemberStyle.inputContainer}>
        <Text style={addMemberStyle.label}>Phone Number *</Text>
        <TextInput
          style={addMemberStyle.input}
          placeholder="+1 234 567 8900"
          keyboardType="phone-pad"
          inputMode="tel"
          value={formData.phone}
          onChangeText={(text) => onInputChange("phone", text)}
        />
      </View>

      <View style={addMemberStyle.inputContainer}>
        <Text style={addMemberStyle.label}>Address</Text>
        <TextInput
          style={[addMemberStyle.input, { height: 80 }]}
          placeholder="123 Main St, City, State, ZIP"
          multiline={true}
          value={formData.address}
          onChangeText={(text) => onInputChange("address", text)}
        />
      </View>
    </View>
  );
};

export default PersonalInformation;
