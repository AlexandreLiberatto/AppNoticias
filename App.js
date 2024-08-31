import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { db } from './firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

function HomeScreen({ navigation }) {
  const [noticias, setarNoticias] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'noticias'), orderBy('data', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setarNoticias(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainCard}>
          {noticias.length > 0 && (
            <TouchableOpacity onPress={() => navigation.navigate('Noticia', { ...noticias[0] })}>
              <Image source={{ uri: noticias[0].imagem }} style={styles.mainImage} />
              <View style={styles.mainTextContainer}>
                <Text style={styles.mainTitle}>{noticias[0].titulo}</Text>
                <Text style={styles.mainContent}>{noticias[0].conteudo}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.moreNewsContainer}>
          <Text style={styles.headerText}>Mais Notícias</Text>
          {noticias.slice(1).map((val) => (
            <TouchableOpacity key={val.id} style={styles.newsItem} onPress={() => navigation.navigate('Noticia', { ...val })}>
              <Image source={{ uri: val.imagem }} style={styles.newsImage} />
              <Text style={styles.newsTitle}>{val.titulo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function NoticiaScreen({ route }) {
  const { titulo, conteudo, imagem } = route.params || {};

  return (
    <View style={styles.noticiaContainer}>
      <ScrollView>
        <Image source={{ uri: imagem }} style={styles.noticiaImage} />
        <Text style={styles.noticiaTitle}>{titulo}</Text>
        <Text style={styles.noticiaContent}>{conteudo}</Text>
      </ScrollView>
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
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mainCard: {
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  mainImage: {
    width: '100%',
    height: 200,
  },
  mainTextContainer: {
    padding: 15,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#212529',
  },
  mainContent: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 22,
  },
  moreNewsContainer: {
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#212529',
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  newsImage: {
    width: 100,
    height: 100,
  },
  newsTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    padding: 10,
    alignSelf: 'center',
  },
  noticiaContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  noticiaImage: {
    width: '100%',
    height: 300,
  },
  noticiaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
    color: '#212529',
  },
  noticiaContent: {
    fontSize: 18,
    lineHeight: 24,
    color: '#495057',
    marginHorizontal: 15,
  },
});
