import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";

export default CreateCommunityModal = ({modalVisible, setModalVisible, createCommunity}) => {

    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");

    const clearText = () => {
        console.log("text Cleared");
        setTitle("")
        setCode("")
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>

                    <View style={styles.input_container}>

                      <Text style={styles.title}>Create New Community</Text>
                      
                      <TextInput placeholder='Enter the title' onChangeText={setTitle} value={title} style={styles.input} selectionColor="black" autoCapitalize='none'/>
                      <TextInput placeholder='Enter a secret code' onChangeText={setCode} value={code} style={styles.input} selectionColor="black" autoCapitalize='none'/>
                    </View>

                    <View style={styles.flex}>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={[styles.textStyle, styles.textBlack]}>Close</Text>
                        </Pressable>
                        <Pressable style={[styles.button, styles.buttonSubmit]} onPress={() => createCommunity(code, title, clearText)}>
                          <Text style={styles.textStyle}>Join</Text>
                        </Pressable>
                    </View>
                      
                  </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '80%',
    height: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "flex-end"
  },
  input_container: {
    flex: 1,
    width: '90%',
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "700"
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    borderColor: 'black',
    borderWidth: 1,
    width: 100,
  },
  buttonSubmit: {
    backgroundColor: "black",
  },
  buttonClose: {
    backgroundColor: "white",
    marginRight: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textBlack: {
    color: "black",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});