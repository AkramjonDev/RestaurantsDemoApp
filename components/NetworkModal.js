// import React, { useEffect, useState } from 'react';
// import { Modal, View, Text, StyleSheet, Button } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

// export default function NetworkModal() {
//   const [isConnected, setIsConnected] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => { 
//     // Subscribe to network status updates
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });

//     return () => {
//       // Unsubscribe from network updates when the component is unmounted
//       unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     if (!isConnected) {
//       setShowModal(true);
//     } else {
//       setShowModal(false);
//     }
//   }, [isConnected]);

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={showModal}
//       onRequestClose={() => setShowModal(false)}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalText}>No Internet Connection</Text>
//           <Button title="Retry" onPress={() => setShowModal(!isConnected)} />
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: 300,
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalText: {
//     marginBottom: 20,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
