import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TranscationScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: "",
            buttonState: "normal"
        }
    }
    getCameraPermissions = async()=>{
        const {status}=await Permissions.askAysnc(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: "clicked",
            scanned: false
        })
    }
    handleBarCodeScan = async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === 'clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner 
                    onBarCodeScanned = {scanned?undefined:this.handleBarCodeScan}
                    style = {StyleSheet.absoluteFillObject}
                />
            )
        } else if(buttonState === 'normal'){

            return(
                <View 
                    style={{
                        flex:1, 
                        justifyContent:'center', 
                        alignItems:'center' }}>
                    <Text styles={styles.displayText}>
                        {hasCameraPermissions === true?this.state.scannedData:"Request Camera Permission"}
                    </Text>
                    <TouchableOpacity 
                        styles = {styles.scanButton} 
                        onPress={this.getCameraPermissions}>
                        <Text styles ={styles.buttonText}>
                            Scan QR Code
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
});