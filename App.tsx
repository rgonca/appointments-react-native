import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import Form from './src/components/Form';
import InformacionPaciente from './src/components/PatientInformation';
import Patient from './src/components/Patient';
import {PatientInterface} from './src/interfaces/patient';

function App(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [patients, setPatients] = useState<PatientInterface[]>([]);
  const [patient, setPatient] = useState<Partial<PatientInterface> | null>({});
  const [modalPatient, setModalPatient] = useState(false);

  const editPatient = (id: string): void => {
    const patientToEdit: PatientInterface[] = patients.filter(
      elm => elm.id === id,
    );
    setPatient(patientToEdit[0]);
  };

  const deletePatient = (id: string): void => {
    Alert.alert(
      'Do you wish to delete this patient?',
      'A deleted patient cannot be recovered',
      [
        {text: 'Cancel'},
        {
          text: 'Yes, Delete',
          onPress: () => {
            const updatedPatients = patients.filter(
              patientState => patientState.id !== id,
            );
            setPatients(updatedPatients);
          },
        },
      ],
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      {patients.length === 0 ? (
        <Text style={styles.noPacientes}>No hay patients aún</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={patients}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Patient
                item={item}
                setModalVisible={setModalVisible}
                setPatient={setPatient}
                editPatient={editPatient}
                deletePatient={deletePatient}
                setModalPatient={setModalPatient}
              />
            );
          }}
        />
      )}

      {modalVisible && (
        <Form
          closeModal={closeModal}
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
      )}

      <Modal visible={modalPatient} animationType="slide">
        <InformacionPaciente
          patient={patient}
          setPatient={setPatient}
          setModalPatient={setModalPatient}
        />
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
