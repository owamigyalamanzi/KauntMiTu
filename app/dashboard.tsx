import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addPerson,
  getPersons,
  updatePerson,
  deletePerson,
  initializeDB,
  Person,
} from "@/database"; // Import initializeDB
import { Image } from "react-native-reanimated/lib/typescript/Animated";

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [locality, setlocality] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [censusType, setCensusType] = useState("");
  const [ward, setWard] = useState("");
  const [section, setSection] = useState("");
  const [lot, setLot] = useState("");
  const [relation, setRelation] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [date, setDate] = useState(new Date());
  const [householdNo, setHouseholdNo] = useState("");
  const [total, setTotal] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null); // Track if updating a person
  const [age, setAge] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("Select Marital Status");
  const [citizenship, setCitizenship] = useState("Select Gender");

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const fetchPersons = async () => {
    const allPersons = await getPersons();
    setPersons(allPersons);
  };

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDB();
      fetchPersons();
    };

    setupDatabase();
  }, []);

  const handleSubmit = async () => {
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !province ||
      !district ||
      !ward ||
      !locality ||
      !censusType ||
      !section ||
      !lot ||
      !total ||
      !householdNo ||
      !relation ||
      !age ||
      gender === "Select Gender" ||
      maritalStatus === "Select Marital Status" ||
      citizenship === "Select Citizenship"

    ) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    try {
      if (editingPersonId) {
        // Update existing person
        await updatePerson(
          editingPersonId,
          firstName,
          lastName,
          phone,
          email,
          province,
          district,
          ward,
          date.toISOString(),
          gender,
          censusType,
          locality,
          section,
          lot,
          householdNo,
          total,
          relation,
          age,
          maritalStatus,
          citizenship
        );
        
        console.log("Person updated successfully");
      } else {
        // Add new person
        const id = await addPerson(
          firstName,
          lastName,
          phone,
          email,
          province,
          district,
          ward,
          date.toISOString(),
          gender,
          censusType,
          locality,
          section,
          lot,
          householdNo,
          total,
          relation,
          age,
          maritalStatus,
          citizenship
        );
        console.log("Person created successfully with ID:", id);
      }
      resetForm();
      fetchPersons(); // Refresh the list
    } catch (error) {
      console.error("Error submitting person:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePerson(id);
      console.log("Person deleted successfully");
      fetchPersons(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  const handleUpdateClick = (person: Person) => {
    // Populate the form with the selected person's data
    setFirstName(person.firstName);
    setLastName(person.lastName);
    setPhone(person.phone);
    setEmail(person.email);
    setProvince(person.province);
    setDistrict(person.district);
    setWard(person.ward);
    setGender(person.gender);
    setSection(person.section);
    setLot(person.lot);
    setCensusType(person.censusType);
    setDate(new Date(person.date)); // Assuming dateOfBirth is a string
    setEditingPersonId(person.id); // Set the ID for updating
    setlocality(person.locality);
    setlocality(person.total);
    setRelation(person.relation);
    setAge(person.age);
    setHouseholdNo(person.householdNo.toString());
    setMaritalStatus(person.maritalStatus);
    setCitizenship(person.citizenship);
 
  };

  const resetForm = () => {
    // Clear the form after submission or update
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setProvince("");
    setDistrict("");
    setWard("");
    setCensusType("");
    setGender("Select Gender");
    setDate(new Date());
    setEditingPersonId(null); // Reset ID for creating new entries
    setlocality("");
    setSection("");
    setLot("");
    setHouseholdNo("");  
    setTotal("");
    setRelation("");
    setAge("");
    setMaritalStatus("Select Marital Status");
    setCitizenship("Select Citizenship");
  };

  return (
    <ScrollView>
      <View style={styles.container}>           
        <Text style={styles.header}>Indicative Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Province"
          value={province}
          onChangeText={setProvince}
          keyboardType="default"
          autoCapitalize="words"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="District"
          value={district}
          onChangeText={setDistrict}
          keyboardType="default"
          autoCapitalize="words"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Ward"
          value={ward}
          onChangeText={setWard}
          keyboardType="default"
          autoCapitalize="none"
          placeholderTextColor="#888"
        /> 

        <TextInput
          style={styles.input}
          placeholder="Census Type"
          value={censusType}
          onChangeText={setCensusType}
          keyboardType="default"
          autoCapitalize="words"
          placeholderTextColor="#888"
        />  

        <TextInput
          style={styles.input}
          placeholder="Locality"
          value={locality}
          onChangeText={setlocality}
          keyboardType="default"
          autoCapitalize="words"
          placeholderTextColor="#888"
        /> 
        
        <TextInput
          style={styles.input}
          placeholder="Lot"
          value={lot}
          onChangeText={setLot}
          keyboardType="numeric"
          autoCapitalize="none"
          placeholderTextColor="#888"
        /> 

          <TextInput
          style={styles.input}
          placeholder="Section"
          value={section}
          onChangeText={setSection}
          keyboardType="numeric"
          autoCapitalize="words"
          placeholderTextColor="#888"
        /> 

         <TextInput
          style={styles.input}
          placeholder="Household No"
          value={householdNo}
          onChangeText={setHouseholdNo}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

          <TextInput
          style={styles.input}
          placeholder="No. of people living at the house at current date"
          value={total}
          onChangeText={setTotal}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <Text style={styles.header}>Personal Information</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#888"
        /> 

        <TextInput
          style={styles.input}
          placeholder="Last Name" 
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Relation to the Head of Family"
          value={relation}
          onChangeText={setRelation}
          keyboardType="default"
          placeholderTextColor="#888"
        />


        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label={"Select Gender"} value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>

       
        <View>
          <Button
            title="Select Date of Birth"
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <Text style={styles.dateText}>
            Date of Birth: {date.toDateString()}
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

         <Picker
          selectedValue={maritalStatus}
          onValueChange={(itemValue) => setMaritalStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label={"Select Marital Status"} value="" />
          <Picker.Item label="Married" value="married" />
          <Picker.Item label="Single" value="single" />
          <Picker.Item label="Widowed" value="widowed" />
        </Picker>

        <Picker
          selectedValue={citizenship}
          onValueChange={(itemValue) => setCitizenship(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label={"Select Citizenship"} value="" />
          <Picker.Item label="Papua New Guinean" value="Papua New Guinean" />
          <Picker.Item label="Non-Papua New Guinean" value="non-Papua New Guinean" />
        </Picker>

        <Button
          title={selectedPerson ? "Update" : "Submit"}
          onPress={handleSubmit}
        />
        {/* Table to display records */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>First Name</Text>
            <Text style={styles.tableHeaderText}>Last Name</Text>
            <Text style={styles.tableHeaderText}>Phone</Text>
            <Text style={styles.tableHeaderText}>Email</Text>
            <Text style={styles.tableHeaderText}>Province</Text>
            <Text style={styles.tableHeaderText}>District</Text>
            <Text style={styles.tableHeaderText}>Ward</Text>
            <Text style={styles.tableHeaderText}>Gender</Text>
            <Text style={styles.tableHeaderText}>Marital Status</Text>
            <Text style={styles.tableHeaderText}>Census Type</Text>
            <Text style={styles.tableHeaderText}>Date of Birth</Text>
            <Text style={styles.tableHeaderText}>Actions</Text>
            <Text style={styles.tableHeaderText}>Locality</Text>          
            <Text style={styles.tableHeaderText}>Lot</Text>
            <Text style={styles.tableHeaderText}>Section</Text>   
            <Text style={styles.tableHeaderText}>Household No</Text>  
            <Text style={styles.tableHeaderText}>No. of people living at the house at current date</Text>
            <Text style={styles.tableHeaderText}>Relation to Head of Family</Text>
            <Text style={styles.tableHeaderText}>Age</Text>
            <Text style={styles.tableHeaderText}>Citizenship</Text>
          </View>
          {persons.map((person) => (
            <View key={person.id} style={styles.tableRow}>
              <Text style={styles.tableRowText}>{person.firstName}</Text>
              <Text style={styles.tableRowText}>{person.lastName}</Text>
              <Text style={styles.tableRowText}>{person.phone}</Text>
              <Text style={styles.tableRowText}>{person.email}</Text>
              <Text style={styles.tableRowText}>{person.province}</Text>
              <Text style={styles.tableRowText}>{person.district}</Text>
              <Text style={styles.tableRowText}>{person.ward}</Text>
              <Text style={styles.tableRowText}>{person.censusType}</Text>
              <Text style={styles.tableRowText}>{person.gender}</Text>
              <Text style={styles.tableRowText}>{person.maritalStatus}</Text>
              <Text style={styles.tableRowText}>{person.locality}</Text>
              <Text style={styles.tableRowText}>{person.lot}</Text>
              <Text style={styles.tableRowText}>{person.section}</Text>
              <Text style={styles.tableRowText}>{person.relation}</Text>
              <Text style={styles.tableRowText}>{person.householdNo}</Text>
              <Text style={styles.tableRowText}>{person.age}</Text>
              <Text style={styles.tableRowText}>{person.citizenship}</Text>
              <Text style={styles.tableRowText}>
                {new Date(person.date).toDateString()}
              </Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.updateButton}   
                  onPress={() => handleUpdateClick(person)}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(person.id)} 
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
              </View> 
                      
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  dateText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#666",
  },
  personContainer: {
    marginBottom: 20,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableRowText: {
    flex: 1,
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: { backgroundColor: "#F44336", padding: 5, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default Dashboard;
