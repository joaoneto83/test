import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";

import styles from "./styles";

function Gallery(props) {
    const arrayImagem = [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fire_extinguisher_by_Presto.jpg/330px-Fire_extinguisher_by_Presto.jpg'  },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Estintore_Carrellato_L%27Antincendio.jpg/330px-Estintore_Carrellato_L%27Antincendio.jpg'  },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Estintore_Internet_of_Things_L%27Antincendio.jpg/330px-Estintore_Internet_of_Things_L%27Antincendio.jpg'},
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Estintore_Carrellato_L%27Antincendio.jpg/330px-Estintore_Carrellato_L%27Antincendio.jpg'  },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fire_extinguisher_by_Presto.jpg/330px-Fire_extinguisher_by_Presto.jpg'},
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Estintore.jpg/330px-Estintore.jpg'},
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fire_extinguisher_by_Presto.jpg/330px-Fire_extinguisher_by_Presto.jpg'},

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
            {arrayImagem?.map((item) => (
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