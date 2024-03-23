/**
 * @openapi
 * /user/get-all:
 *   get:
 *     tags: [User]
 *     summary: Obtiene todos los usuarios
 *     description: Devuelve una lista de todos los usuarios. Requiere permisos de 'readAny' para el recurso 'USER'.
 *     security:
 *      - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID del usuario.
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: El correo electrónico del usuario.
 *                   document:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         description: El tipo de documento del usuario.
 *                       value:
 *                         type: string
 *                         description: El valor del documento del usuario.
 *                   name:
 *                     type: string
 *                     description: El nombre del usuario.
 *                   last_name:
 *                     type: string
 *                     description: El apellido del usuario.
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Los roles del usuario (ADMIN, USUARIO).
 */

/**
 * @openapi
 * /user/get-one/{id}:
 *   get:
 *     tags: [User]
 *     summary: Obtiene un usuario por su ID
 *     description: Devuelve los detalles de un usuario específico. Requiere permisos de 'readOwn' para el recurso 'USER'.
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del usuario.
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: El correo electrónico del usuario.
 *                 document:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: El tipo de documento del usuario.
 *                     value:
 *                       type: string
 *                       description: El valor del documento del usuario.
 *                 name:
 *                   type: string
 *                   description: El nombre del usuario.
 *                 last_name:
 *                   type: string
 *                   description: El apellido del usuario.
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Los roles del usuario (ADMIN, USUARIO).
 */

/**
 * @openapi
 * /user/update/{id}:
 *   put:
 *     tags: [User]
 *     summary: Actualiza un usuario
 *     description: Actualiza los detalles de un usuario existente. Requiere permisos de 'updateOwn' para el recurso 'USER'.
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del usuario
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
 *                 description: La contraseña del usuario (solo para actualización).
 *               roles:
 *                 type: string
 *                 description: Los roles del usuario (ADMIN, USUARIO).
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       400:
 *         description: Datos de entrada inválidos.
 *       404:
 *         description: Usuario no encontrado.
 */