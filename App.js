import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ImageBackground source={{ uri: 'https://picsum.photos/800/300' }} style={styles.image}>
          <TouchableOpacity onPress={() => navigation.navigate('Noticia', {
            titulo:'Um titúlço de testeas',
            conteudo:'Minha notícia de testes'
          })}>
            <Text style={styles.text}>Noticia 1</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground source={{ uri: 'https://picsum.photos/800/300?grayscale' }} style={styles.image}>
        <TouchableOpacity onPress={() => navigation.navigate('Noticia')}>
            <Text style={styles.text}>Noticia 2</Text>
          </TouchableOpacity>
        </ImageBackground>
        {/* Adicione mais ImageBackground aqui para mais slides */}
      </ScrollView>

      <View style={{flex:0.7, padding:20}}>

      </View>
      
    </View>
    
  );
}

function NoticiaScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{route.params.titulo}</Text>
      <Text>{route.params.conteudo}</Text>
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
    marginRight: 10, // Espaço entre os slides
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente para o texto
    padding: 10,
  }
});
