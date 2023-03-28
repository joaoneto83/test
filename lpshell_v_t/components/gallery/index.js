import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";

import styles from "./styles";

function Gallery(props) {
    const arrayImagem = [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Carro_a_quattro_ruote_a_trazione_animale.jpg'  },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Carro_a_quattro_ruote_a_trazione_animale.jpg'  },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fotothek_df_pk_0000144_003.jpg'},
    { url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Carro_a_quattro_ruote_a_trazione_animale.jpg'  },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fotothek_df_pk_0000144_003.jpg'},
    { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fotothek_df_pk_0000144_003.jpg'},
    { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fotothek_df_pk_0000144_003.jpg'},

    ]
    const [imagem, getImagem] = useState(arrayImagem[0].url);
    useEffect(() => {
    }, [imagem]
    )
    return (

        <View style={styles.container} >
            <View >
                <Image
                    style={styles.ImageFull}
                    source={{ uri: imagem }}
                />
            </View>
            <View style={styles.ImageBOX}>
            <ScrollView style={{width:100}}>
            {arrayImagem.map((item) => (
                    <TouchableOpacity onPress={() => getImagem(item?.url)}>
                    <Image
                        style={styles.Image}
                        source={{ uri: item?.url }}
                    />
                    </TouchableOpacity>
               ))
                }
            </ScrollView>
              
            </View>

        </View>

    );
};

export default Gallery;