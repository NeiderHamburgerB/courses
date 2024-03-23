/**
 * @openapi
 * /course/create:
 *   post:
 *     tags: [Course]
 *     summary: Crea un nuevo curso
 *     description: Permite a los usuarios con permisos adecuados crear un nuevo curso.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               introductory_video:
 *                 type: string
 *               lessons:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: Identificador único de la lección, opcional.
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     video:
 *                       type: string
 *     responses:
 *       200:
 *         description: Curso creado exitosamente
 *       403:
 *         description: Acceso denegado
 */

/**
 * @openapi
 * /course/join-course:
 *   post:
 *     tags: [Course]
 *     summary: Inscripción a un curso
 *     description: Permite a un usuario inscribirse en un curso existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               course_id:
 *                 type: number
 *     responses:
 *       200:
 *         description: Inscripción exitosa
 *       404:
 *         description: Curso no encontrado
 */

/**
 * @openapi
 * /course/get-all-courses-by-user:
 *   get:
 *     tags: [Course]
 *     summary: Obtiene todos los cursos de un usuario
 *     description: Lista todos los cursos en los que un usuario está inscrito.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida exitosamente
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @openapi
 * /course/get-course-by-id/{id}:
 *   get:
 *     tags: [Course]
 *     summary: Obtiene un curso por su ID
 *     description: Proporciona los detalles de un curso específico por su ID.
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del curso
 *     responses:
 *       200:
 *         description: Detalles del curso
 *       404:
 *         description: Curso no encontrado
 */

/**
 * @openapi
 * /course/update-course-by-id/{id}:
 *   patch:
 *     tags: [Course]
 *     summary: Actualiza un curso por su ID
 *     description: Permite a los usuarios con permisos adecuados actualizar los detalles de un curso específico.
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               introductory_video:
 *                 type: string
 *               lessons:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: Identificador único de la lección, opcional.
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     video:
 *                       type: string
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *       404:
 *         description: Curso no encontrado
 */

/**
 * @openapi
 * /course/delete-lesson-by-id/{course_id}/{lesson_id}:
 *   delete:
 *     tags: [Course]
 *     summary: Elimina una lección de un curso
 *     description: Permite a los usuarios con permisos adecuados eliminar una lección específica de un curso.
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del curso
 *       - in: path
 *         name: lesson_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID de la lección
 *     responses:
 *       200:
 *         description: Lección eliminada exitosamente
 *       404:
 *         description: Curso o lección no encontrados
 */

/**
 * @openapi
 * /course/delete-course-by-id/{id}:
 *   delete:
 *     tags: [Course]
 *     summary: Elimina un curso por su ID
 *     description: Permite a los usuarios con permisos adecuados eliminar un curso específico.
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del curso
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente
 *       404:
 *         description: Curso no encontrado
 */