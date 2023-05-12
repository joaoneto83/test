import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

import Head from '../../../components/Head';
import LoadingInline from "../../../components/loading/loadingInline";
import styles from "./styles";
import Styles from "./styles";
import DownloadPdf from "../../../assets/download-off-line/downloadPdf"
import Modal from 'react-native-modal';
import ButtonSave from '../../../components/buttons/ButtonSave';


import { api } from '../../../services/api_base';


const baseUrlMissio = "Api/Mission/Mobile/"


export default class MissioniDetail extends Component {
    constructor(props) {
        console.log("detalhe", props.route.params)
        super(props);
        this.state = {
            backData: {},
            Authorization: "",
            procedureAssets: [],
            data:[],
            loading: true,
            visibleModal: null,
            item: ""
        }
        if (props.route.params?.offline) {
            this.getDataOff();
        } else {
            this.getData();
        }

    }

    iconControllo = ""
    data = [];
    documents=[];
    asset=[];
    filterData = [];
    procedureAssetsOffline = [];
    offline = false
    getDataOff = () => {
        this.offline = true;
        this.documents = this.props?.route?.params?.data?.documents;
        this.assest = this.props?.route?.params?.data?.procedureAssets;
       
        this.procedureAssetsOffline = this.props?.route?.params?.data.procedureAssets.map(x => {
            let i = {
                procedure: x.procedure.name,
                procedureData:  x.procedure,
                asset: x.asset?.description,
                id: x.asset?.id,
                factory:x.asset?.factory,
                keyNum:x.asset?.keyNum,
                productionYear:x.asset?.productionYear,
                register:x.asset?.register,
                statusId: x.statusId,
                procedureId: x.procedure.id,
                loading: true,
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
        console.log("off", this.documents)
    }

    getData = async () => {
   
        await api.get(baseUrlMissio + this.props.route?.params?.id).then((response) => {
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
                console.log("colore", item)
                this.iconControllo = require('../../../assets/images/settingsErro.png')
                break;

            default:
                this.iconControllo = require('../../../assets/images/settings.png')
        }
        return this.iconControllo
    }
    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <Image
                            style={styles.imagemClose}
                            source={require('../../../assets/images/close.png')}
                          />
        </TouchableOpacity>
      );
      _renderModalContent = () => (
        <View style={styles.modalContentSave}>
          <View style={{flex:0, flexDirection:"row-reverse", justifyContent:"center"}}> 
        {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
        <TouchableOpacity style={{flexDirection:"column", alignItems:"flex-end", paddingTop:30}}  >
          <Text style={Styles.modalHeader}>Il controllo è già stato eseguito con esito { this.state.item?.statusId == 2 ? "negativo" : "positivo" }, sei sicuro di volerlo rieseguire?</Text>
          <ButtonSave  callbackSave= {this.callbackSave}></ButtonSave>
        </TouchableOpacity>
        </View>
      </View>
  
      );

      callbackSave = () =>
      {
        this.setState({ visibleModal: null })
        this.controllo(
            this.state.item, this.state.item?.procedureId, this.state.item?.assetId)
      }
    controllo = (item, procedureId, assetId) => {
        console.log("controllo ", item.id)
        this.props.navigation.navigate('QrcideMissioni', { mission: this.props.route.params?.data?.id || this.props.route.params ,  data:item,  procedureId: procedureId , procedureAssets: item.id,  assetId: assetId, documents: this.documents, offline: this.props.route.params?.offline });
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
            <View >
                <Head prop={this.props} routes="Mission" title="Missioni" search="true" screem="Dettagli" getSearch={this.search} offline={this.offline} />
                {this.state.loading ? <LoadingInline /> : undefined}
                <Modal     isVisible={this.state.visibleModal === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}>
                    {this._renderModalContent()}
                </Modal>
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
                        {/* <TouchableOpacity style={{width:"85%"}} onPress={() => { this.props.navigation.goBack(null) }} >
                            <Image
                                resizeMode="contain"
                                style={styles.iconeArrow}
                                source={require('../../../assets/images/arrow.png')}
                            />
                </TouchableOpacity> */}
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
                                    <View style={styles.DataTableBody} key={item?.id}>
                                        <Text style={[styles.labelHeaderD, { color: "#000", }]}>{item?.procedure}</Text>
                                        <Text style={styles.labelHeaderD}>{item?.asset}</Text>

                                        <TouchableOpacity style={[styles.rowD]} onPress={() => ( item?.statusId ==  2 ||  item?.statusId == 1 ) ?  this.setState ( { visibleModal: 1, item: item}) : this.controllo( item, item?.procedureId, item?.assetId) } >
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


