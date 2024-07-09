import React from 'react';
import {Text, SafeAreaView, View, Pressable, StyleSheet} from 'react-native';

import {formatDate} from '../helpers';

const PatientInformation = ({
  patient,
  setPatient,
  setModalPatient,
}: {
  patient: any;
  setPatient: React.Dispatch<React.SetStateAction<any>>;
  setModalPatient: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Patient {''}
        <Text style={styles.titleBold}>Information</Text>
      </Text>

      <View>
        <Pressable
          style={styles.closeButton}
          onLongPress={() => {
            setModalPatient(false);
            setPatient({});
          }}>
          <Text style={styles.closeButtonText}>X Close</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{patient.patient}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Owner:</Text>
          <Text style={styles.value}>{patient.owner}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{patient.email}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{patient.phone}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Registration Date:</Text>
          <Text style={styles.value}>{formatDate(patient.date)}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Symptoms:</Text>
          <Text style={styles.value}>{patient.symptoms}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F59E0B',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  titleBold: {
    fontWeight: '900',
  },
  closeButton: {
    marginVertical: 30,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  content: {
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  field: {
    marginBottom: 10,
  },
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12,
  },
  value: {
    fontWeight: '700',
    fontSize: 20,
    color: '#334155',
  },
});

export default PatientInformation;
