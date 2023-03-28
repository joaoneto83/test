import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

import Head from '../../../components/Head';
import styles from "./styles";
import Styles from "./styles";

const baseUrlMissio = "http://192.168.248.20:8090/Api/Mission/"

export default class MissioniDetail extends Component {

    data=[[
        {
          "id": "6739d643-20f5-494b-8873-0007a0010e36",
          "description": "GoodMissione",
          "creationTime": "2023-03-27T09:41:19.3825809",
          "creationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
          "modificationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
          "modificationTime": "2023-03-27T09:41:19.3826843",
          "statusId": 2,
          "errors": 0,
          "assignedUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
          "assignedUser": "ADMIN@LOGICAPRO",
          "lastExecutionUserId": "b8101b01-95a2-43fd-9be2-002ec0382658",
          "lastExecutionTime": "2023-03-27T12:52:40.554922",
          "totalTasks": 1,
          "completedTasks": 1
        },
        {
          "id": "d81401cd-9ff8-4fde-8f18-9dca8f8b5ff8",
          "description": "PerJoao",
          "creationTime": "2023-03-24T07:57:01.6845391",
          "creationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
          "modificationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
          "modificationTime": "2023-03-24T07:57:01.6845691",
          "statusId": 2,
          "errors": 1,
          "assignedUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
          "assignedUser": "ADMIN@LOGICAPRO",
          "lastExecutionUserId": "b8101b01-95a2-43fd-9be2-002ec0382658",
          "lastExecutionTime": "2023-03-27T12:53:22.4917673",
          "totalTasks": 3,
          "completedTasks": 2
        },
        {
          "id": "4aba92fb-7d84-4f29-9ae0-fed0a0ecf2f7",
          "description": "BadMission",
          "creationTime": "2023-03-27T08:44:06.5554182",
          "creationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
          "modificationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
          "modificationTime": "2023-03-27T08:44:06.5555447",
          "statusId": 1,
          "errors": 1,
          "assignedUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
          "assignedUser": "ADMIN@LOGICAPRO",
          "lastExecutionUserId": "b8101b01-95a2-43fd-9be2-002ec0382658",
          "lastExecutionTime": "2023-03-27T12:53:52.9524054",
          "totalTasks": 2,
          "completedTasks": 0
        }
      ]]

    constructor(props) {
        super(props);
        this.state = {
            backData: {},
            Authorization: "",
            procedureAssets: [...this.data]
        }
        this.getData();
    }
   // data = [];

    getData = async () => {
        console.log("state", this.state)
        this.state = {
            Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
        }
        console.log("tst", baseUrlMissio + this.props.route?.params?.id);
        await axios.get(baseUrlMissio + this.props.route?.params?.id, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this.state.Authorization.replace(/"/g, '')}`,
            }
        }
        ).then((response) => {

            console.log("response", response.data)

        //  this.data = response.data.procedureAssets
            this.setState({
                backData: response.data,
                procedureAssets:[...this.data]
            })
            console.log("tes", this.state?.backData?.procedureAssets)
        }).catch((erro) => {
            console.log("erro", erro)
        }

        )
    }

    search = (value) => {
        let filterData = [...this.data];
        console.log("", filterData)
        this.setState({
            procedureAssets: filterData.filter(x => {
                return x.assetId.toLowerCase().indexOf(value.toLowerCase()) > -1 || x.executionUserId.toLowerCase().indexOf(value.toLowerCase()) > -1
            })
        })
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <Head prop={this.props} routes="Missioni" title="Missioni" screem="Dettagli" search={this.search} />
                <ScrollView >
                    <View style={styles.container} >
                        <View style={styles.boxLeft}>
                            <Text style={styles.Title}>{this.state.backData.description}</Text>
                            <View style={styles.container}>
                                <View >
                                    <Text style={styles.label}>Totale</Text>
                                    <Text style={styles.label}>Controllati</Text>
                                    <Text style={styles.label}>Da controllare</Text>
                                </View>
                                <View >
                                    <Text style={styles.label}>{this.state.backData.totalTasks}</Text>
                                    <Text style={styles.label}>{this.state.backData.completedTasks}</Text>
                                    <Text style={styles.label}>{this.state.backData.totalTasks - this.state.backData.completedTasks}</Text>
                                </View>
                            </View>




                            <TouchableOpacity style={styles.boxImage}>
                                <Image
                                    style={Styles.buttonImage}
                                    source={require('../../../assets/images/qrcode.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.boxRigth}>
                            <View style={styles.DataTableHeader}>
                                <Text style={styles.labelHeaderD}>Asset</Text>
                                <Text style={styles.labelHeaderI}>Controllo</Text>
                                <Text style={styles.labelHeaderI}>Mappa</Text>
                                <Text style={styles.labelHeaderI}>Carica</Text>
                            </View>
                         { !this.state?.procedureAssets ? undefined : this.state?.procedureAssets.map((item) => (
                                <View style={styles.DatacTableRow}>
                                    <Text style={styles.labelRow}></Text>
                                    <TouchableOpacity style={styles.rowD} >
                                        <Image
                                            style={Styles.iconRow}
                                            source={require('../../../assets/images/settings.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.rowD}>
                                        <Image
                                            style={Styles.iconRow}
                                            source={require('../../../assets/images/map.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.rowD} >
                                        <Image
                                            style={Styles.iconRow}
                                            source={require('../../../assets/images/upload.png')}
                                        />
                                    </TouchableOpacity>
                                </View>

                            )

                            )
                            } 

                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


