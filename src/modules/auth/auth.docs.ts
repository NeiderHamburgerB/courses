/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Inicia sesión
 *     description: Permite a los usuarios iniciar sesión proporcionando un email y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: El email del usuario.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: La contraseña del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Retorna el token de acceso del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de acceso JWT.
 *       400:
 *         description: Petición inválida debido a entrada incorrecta.
 *       401:
 *         description: Autenticación fallida, email o contraseña incorrectos.
 */
/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registra un nuevo usuario
 *     description: Crea un nuevo usuario con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: El correo electrónico del usuario.
 *               document:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     description: El tipo de documento del usuario.
 *                   value:
 *                     type: string
 *                     description: El valor del documento del usuario.
 *               name:
 *                 type: string
 *                 description: El nombre del usuario.
 *               last_name:
 *                 type: string
 *                 description: El apellido del usuario.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: La contraseña del usuario.
 *               roles:
 *                 type: string
 *                 enum: [ADMIN, USUARIO]
 *                 description: El rol del usuario.
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: Datos inválidos.
 */