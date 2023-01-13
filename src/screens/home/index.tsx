import {Text, View, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import React, {useState} from 'react';

import { Participant } from '../../components/Participants';

import {styles} from './styles';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd(){
    if(participants.includes(participantName)){
      return Alert.alert("Participante existente!", "Dica: Acrescente mais um sobrenome.")
    }
    
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover participante", `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Quarta-feira, 11 de janeiro de 2023.</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="nome e sobrenome do participante"
          placeholderTextColor='#6B6B6B'
          onChangeText={setParticipantName}
          value={participantName}
          />
        <TouchableOpacity 
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant
          key={item} 
          name={item} 
          onRemove={() => handleParticipantRemove(item)} 

        />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Adicione participantes no evento.
          </Text>
        )}
      />
    </View>
  );
}
