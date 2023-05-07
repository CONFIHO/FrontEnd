import { Toast } from '../utils/constants';

export function controllerExceptions(error: any) {
  console.log(error);
  switch (error.code) {
    case 'auth/user-not-found':
      Toast.fire({
        icon: 'error',
        title: 'Usuario y/o contraseña inválida',
      });
      break;
    case 'auth/network-request-failed':
      Toast.fire({
        icon: 'question',
        title:
          'conexión con el servidor interrumpida, verifica tu conexión a internet',
      });
      break;
    case 'auth/wrong-password':
      Toast.fire({
        icon: 'error',
        title: 'Usuario y/o contraseña inválida',
      });
      break;
  }
}
