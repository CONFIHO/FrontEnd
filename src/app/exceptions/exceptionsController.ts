export function controllerExceptions(error: any) {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'Usuario y/o contraseña inválida'
    case 'auth/network-request-failed':
      return 'conexión con el servidor interrumpida, verifica tu conexión a internet'
    case 'auth/wrong-password':
      return 'Usuario y/o contraseña inválida'
  }
  switch (error) {
    case 'database connection':
      return 'Conexión fallida con la base de datos'
  }
  return 'Ha ocurrido un error inesperado, lamentamos los inconvenientes'
}
