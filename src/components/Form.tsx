import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {PatientInterface} from '../interfaces/patient';

interface FormProps {
  modalVisible: boolean;
  closeModal: () => void;
  patients: PatientInterface[];
  setPatients: (patients: PatientInterface[]) => void;
  patient: PatientInterface;
  setPatient: (patient: PatientInterface | {}) => void;
}

const Form: React.FC<FormProps> = ({
  modalVisible,
  closeModal,
  patients,
  setPatients,
  patient: objPatient,
  setPatient: setPacienteApp,
}): React.JSX.Element => {
  const [id, setId] = useState('');
  const [patient, setPatient] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState('');

  useEffect(() => {
    if (Object.keys(objPatient).length > 0) {
      setId(objPatient.id);
      setPatient(objPatient.patient);
      setOwner(objPatient.owner);
      setEmail(objPatient.email);
      setPhone(objPatient.phone);
      setDate(objPatient.date);
      setSymptoms(objPatient.symptoms);
    }
  }, [objPatient]);

  const handleCita = () => {
    // Validar
    if ([patient, owner, email, date, symptoms].includes('')) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    // Revisar si es un registro nuevo o edición
    const nuevoPaciente: PatientInterface = {
      id,
      patient,
      owner,
      email,
      phone,
      date,
      symptoms,
    };

    if (id) {
      // Editando
      nuevoPaciente.id = id;

      const pacientesActualizados = patients.map(pacienteState =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState,
      );
      setPatients(pacientesActualizados);
      setPacienteApp({});
    } else {
      // Nuevo Registro
      nuevoPaciente.id = Date.now().toString();
      setPatients([...patients, nuevoPaciente]);
    }
    closeModal();
    setId('');
    setPatient('');
    setOwner('');
    setEmail('');
    setPhone('');
    setDate(new Date());
    setSymptoms('');
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {objPatient.id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCancelar}
            onLongPress={() => {
              closeModal();
              setPacienteApp({});
              setId('');
              setPatient('');
              setOwner('');
              setEmail('');
              setPhone('');
              setDate(new Date());
              setSymptoms('');
            }}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre PatientInterface</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre PatientInterface"
              placeholderTextColor={'#666'}
              value={patient}
              onChangeText={setPatient}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Propietario"
              placeholderTextColor={'#666'}
              value={owner}
              onChangeText={setOwner}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Propietario"
              placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono Propietario"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>

            <View style={styles.fechaContenedor}>
              <DatePicker
                date={date}
                locale="es"
                onDateChange={newDate => setDate(newDate)}
              />
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholderTextColor={'#666'}
              value={symptoms}
              onChangeText={setSymptoms}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>
              {objPatient.id ? 'Editar' : 'Agregar'} PatientInterface
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Form;
