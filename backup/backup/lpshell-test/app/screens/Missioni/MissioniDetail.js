import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

import Head from '../../../assets/utils/Head';
import styles from "./styles";
import Styles from "./styles";

const baseUrlMissio = "http://192.168.248.20:8090/Api/Mission/"

export default class MissioniDetail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            backData: {},
            Authorization: "",
            procedureAssets: []
        }
        this.getData();
    }
    data = [];

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

          this.data = response.data.procedureAssets
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


