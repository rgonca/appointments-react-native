import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {formatDate} from '../helpers';

const Patient = ({
  item,
  setModalVisible,
  setPatient,
  editPatient,
  deletePatient,
  setModalPatient,
}: {
  item: any;
  setModalVisible: any;
  setPatient: any;
  editPatient: any;
  deletePatient: any;
  setModalPatient: any;
}) => {
  const {patient, date, id} = item;

  return (
    <Pressable
      onLongPress={() => {
        setModalPatient(true);
        setPatient(item);
      }}>
      <View style={styles.container}>
        <Text style={styles.label}>Patient:</Text>
        <Text style={styles.text}>{patient}</Text>
        <Text style={styles.date}>{formatDate(date)}</Text>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.editButton]}
            onLongPress={() => {
              setModalVisible(true);
              editPatient(id);
            }}>
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.deleteButton]}
            onLongPress={() => deletePatient(id)}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94a3B8',
    borderBottomWidth: 1,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: '#6D28D9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  date: {
    color: '#374151',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#F59E0B',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },
});

export default Patient;
