import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  /*Contenedor principal */
  container: {
    flex: 1,
    backgroundColor: '#06BA06',
    alignItems: 'center',
  },

  /* Contenedores secundarios */
  headerContainer: {
    flex: 2,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    height: undefined,
  },
  pairingFormContainer: {
    flex: 3,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#090B0C',
    width: '90%',
    borderRadius: 20,
  },
  bottomSpacer: {
    flex: 1,
  },

  /* Elementos del contenedor de cabecera */
  logoImage: {
    flex: 1,
    width: '40%',
    height: undefined,
    resizeMode: 'contain',
  },

  /* Elementos del contenedor de controles */
  pairStatusContainer: {
    flex: 2,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#0F1416',
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  codeFieldsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    flex: 2,
    paddingTop: 30,
    paddingBottom: 20,
    width: '80%',
  },

  /* Elementos de mensajes del contenedor de controles */
  connectImage: {
    width: 28,
    height: 28,
    marginBottom: 10,
  },
  connectMessage: {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'System',
    color: '#FFFFFF',
    width: '50%',
    fontSize: 16,
  },
  ventilatorName: {
    color: '#20AFFF',
  },

  /* Campos para el ingreso en el contenedor de controles */
  pairCodeInput: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'System',
    borderColor: '#06BA06',
    borderWidth: 1,
    borderRadius: 4,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 4,
    width: '22%',
    height: 53,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  pairCodeInputWithValue: {
    backgroundColor: '#16AB1F',
  },

  /* Botones del contenedor de controles */
  submitButton: {
    width: '100%',
    backgroundColor: '#06BA06',
    height: 54,
    borderRadius: 10,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonProcessing: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 54,
    fontSize: 19,
    fontWeight: 'bold',
  },
  submitButtonTextDisabled: {
    opacity: 0.7,
  },
  submitButtonTextProcessing: {
    opacity: 0,
  },

  /* Animación de proceso en marcha */
  dotsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  dotsContainerProcessing: {
    opacity: 1,
  },
  loadingDot: {
    backgroundColor: '#FFFFFF',
    height: 10,
    width: 10,
    margin: 10,
    borderRadius: 5,
  },
});
