import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function App() {
  const [imageURIList, setImageURIList] = useState([]);
  async function pickImageAsync() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (result.canceled) {
      alert("pas d'image chargé");
    } else {
      setImageURIList([...imageURIList, result.assets[0].uri]);
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={s.title}>Mes photos préférées</Text>
        <View style={s.body}>
          <ScrollView>
            {imageURIList.map((imageURI, i) => (
              <Image
                style={{
                  height: 200,
                  marginVertical: 30,
                  width: "100%",
                }}
                key={imageURI + i}
                source={{ uri: imageURI }}
              />
            ))}
          </ScrollView>
        </View>
        <View style={s.footer}>
          <TouchableOpacity style={s.btn} onPress={pickImageAsync}>
            <Text style={s.btnTxt}>Ajouter photo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
