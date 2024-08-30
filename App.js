import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {db} from './firebase';

function HomeScreen({ navigation }) {

  const [noticias, setarNoticias] = useState([]);

  useEffect(() => {
    //
  })

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.3 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={styles.imageWrapper} 
            onPress={() => navigation.navigate('Noticia', {
              titulo: 'Um título de teste',
              conteudo: 'Minha notícia de testes'
            })}
          >
            <ImageBackground 
              source={{ uri: 'https://picsum.photos/800/300' }} 
              style={styles.image}
            >
              <Text style={styles.text}>Notícia 1</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.imageWrapper}
            onPress={() => navigation.navigate('Noticia')}
          >
            <ImageBackground 
              source={{ uri: 'https://picsum.photos/800/300?grayscale' }} 
              style={styles.image}
            >
              <Text style={styles.text}>Notícia 2</Text>
            </ImageBackground>
          </TouchableOpacity>

          {/* Adicione mais TouchableOpacity com ImageBackground aqui para mais slides */}
        </ScrollView>
      </View>

      <View style={{ flex: 0.7, padding: 20 }}>
        <View style={styles.headerLine}></View>
        <Text style={styles.headerText}>Mais Notícias</Text>

        <ScrollView contentContainerStyle={styles.scrollViewContent} style={{ flex: 1 }}>
          <View style={styles.newsItem}>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Noticia', {
              titulo: 'Um título de teste',
              conteudo: 'Minha notícia de testes'
            })}>
              <Image source={{ uri: 'https://picsum.photos/800/300?grayscale' }} style={styles.newsImage} />
              <Text style={styles.newsText}>Minha notícia de teste.</Text>
            </TouchableOpacity>
          </View>
          {/* Adicione mais View aqui para mais notícias */}
        </ScrollView>
      </View>
    </View>
  );
}

function NoticiaScreen({ route, navigation }) {
  const { titulo, conteudo } = route.params || {};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{titulo}</Text>
      <Text style={{ marginTop: 10 }}>{conteudo}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Portal" component={HomeScreen} />
        <Stack.Screen name="Noticia" component={NoticiaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300, // Defina a largura que deseja para cada slide
    height: 300,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente para o texto
    padding: 10,
  },
  imageWrapper: {
    marginRight: 10, // Espaço entre os slides
  },
  headerLine: {
    width: 50,
    height: 2,
    backgroundColor: '#069',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  scrollViewContent: {
    padding: 20,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  newsImage: {
    width: 100,
    height: 100,
  },
  newsText: {
    padding: 10,
    flex: 1,
  }
});
