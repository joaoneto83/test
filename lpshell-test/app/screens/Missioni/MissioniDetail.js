import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

import Head from '../../../components/Head';
import LoadingInline from "../../../components/loading/loadingInline";
import styles from "./styles";
import Styles from "./styles";
import DownloadPdf from "../../../assets/download-off-line/downloadPdf"
const baseUrlMissio = "http://192.168.248.20:8090/Api/Mission/Mobile/"

export default class MissioniDetail extends Component {
    constructor(props) {
        console.log("detalhe", props.route.params)
        super(props);
        this.state = {
            backData: {},
            Authorization: "",
            procedureAssets: [],
            data:[],
            loading: true
        }
        if (props.route.params?.data) {
            this.getDataOff();
        } else {
            this.getData();
        }

    }

    iconControllo = require('../../../assets/images/settings.png')
    data = [];
    filterData = [];
    procedureAssetsOffline = [];
    offline = false
    getDataOff = () => {
        this.offline = true
        this.procedureAssetsOffline = this.props?.route?.params?.data.procedureAssets.map(x => {
            let i = {
                procedure: x.procedure.name,
                asset: x.asset?.description,
                statusId: x.statusId,
                procedureId: x.procedure.id,
                loading: true
            }
            return i
        }

        )
        this.state = {
            backData: this.props?.route?.params?.data,
            Authorization: "",
            procedureAssets: [...this.procedureAssetsOffline],

            loading: false
        }
        console.log("off", this.state)
    }

    getData = async () => {
        console.log("state", this.state)
        this.state = {
            Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
        }

        await axios.get(baseUrlMissio + this.props.route?.params?.id, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this.state.Authorization.replace(/"/g, '')}`,
            }
        }
        ).then((response) => {

            console.log("response", response.data)
        
            this.setState({
                backData: response.data,
                data: [...response.data.procedureAssets],
                procedureAssets: [...response.data.procedureAssets],
                loading: false
            })
            console.log("tess", this.state?.backData?.procedureAssets)
        }).catch((erro) => {
            console.log("erro", erro)
        }
        )
    }

    getIconControllo = (item) => {
        switch (item) {
            case 1:
                this.iconControllo = require('../../../assets/images/settingsPending.png')
                break;
            case 2:
                this.iconControllo = require('../../../assets/images/settingsErro.png')
                break;
            default:
                this.iconControllo
        }
        return this.iconControllo
    }

    controllo = (item) => {
        this.props.navigation.navigate('QrcideMissioni', { procedureId: item });
    }
    search = (value) => {
        console.log("this.data", this.data.procedureAssets)
        this.setState(
            {
                loading: true
            }
        )
      if(this.props.route.params?.data){
        this.filterData = [...this.procedureAssetsOffline];
      }else{
        this.filterData = [...this.state.data];
      }
        
      
        this.setState({
            procedureAssets: this.filterData.filter(x => {
                return x.procedure.toLowerCase().indexOf(value.toLowerCase()) > -1 || x.asset.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            ),
            loading: false
        })
    }
    render() {
        return (
            <View>
                <Head prop={this.props} routes="Mission" title="Missioni" search="true" screem="Dettagli" getSearch={this.search} offline={this.offline} />
                {this.state.loading ? <LoadingInline /> : undefined}
            
                <View style={[styles.container,]} >
                <DownloadPdf></DownloadPdf>
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
                        <TouchableOpacity style={{width:"85%"}} onPress={() => { this.props.navigation.goBack(null) }} >
                            <Image
                                resizeMode="contain"
                                style={styles.iconeArrow}
                                source={require('../../../assets/images/arrow.png')}
                            />
                </TouchableOpacity>
                    </View>
                    <View style={styles.boxRigth}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 70, height: 3, backgroundColor: "#787777", marginHorizontal: 10 }}></View>
                                <Text style={{ color: "#787777", fontSize: 15 }}>Da completare</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 70, height: 3, backgroundColor: "#86F330", marginHorizontal: 10 }}></View>
                                <Text style={{ color: "#787777", fontSize: 15 }}>Completato</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 70, height: 3, backgroundColor: "#F35330", marginHorizontal: 10 }}></View>
                                <Text style={{ color: "#787777", fontSize: 15 }}>Errore</Text>
                            </View>
                        </View>

                        <View style={styles.DataTableHeader}>
                            <Text style={[styles.labelHeaderD, { color: "#000", fontSize: 23 }]}>Procedura</Text>
                            <Text style={[styles.labelHeaderD, { fontSize: 23 }]}>Asset</Text>
                            <Text style={[styles.labelHeaderI, { fontSize: 23 }]}>Controllo</Text>
                            <Text style={[styles.labelHeaderI, { fontSize: 23 }]}>Mappa</Text>
                            <Text style={[styles.labelHeaderI, { fontSize: 23 }]}>Carica</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <ScrollView >
                                {!this.state?.procedureAssets ? undefined : this.state?.procedureAssets.map((item) => (
                                    <View style={styles.DataTableBody}>
                                        <Text style={[styles.labelHeaderD, { color: "#000", }]}>{item?.procedure}</Text>
                                        <Text style={styles.labelHeaderD}>{item?.asset}</Text>

                                        <TouchableOpacity style={[styles.rowD]} onPress={() => this.controllo(item?.procedureId)} >
                                            <Image
                                                resizeMode="contain"
                                                style={[Styles.iconRow]}
                                                source={this.getIconControllo(item?.statusId)}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.rowD}>
                                            <Image
                                                resizeMode="contain"
                                                style={Styles.iconRow}
                                                source={require('../../../assets/images/map.png')}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.rowD}>
                                            <Image
                                                resizeMode="contain"
                                                style={Styles.iconRow}
                                                source={require('../../../assets/images/upload.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                                )
                                }
                            </ScrollView>
                        </View>

                    </View>
                </View>

            </View>
        )
    }
}


