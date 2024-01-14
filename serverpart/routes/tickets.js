/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *         - summary
 *         - priority
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: Автогенерируемый id тикета
 *         summary:
 *           type: string
 *           description: Краткая информация о тикете
 *         content:
 *           type: string
 *           description: Основное содержимое тикета
 *         priority:
 *           type: string
 *           description: Приоритет тикета
 *         status:
 *           type: string
 *           description: Статус тикета (Created при создании)
 *         create_date:
 *           type: string
 *           format: date
 *           description: Автоматически генерируемая дата добавления тикета
 *         update_date:
 *           type: string
 *           format: date
 *           description: Автоматически генерируемая дата изменения билета
 *       example:
 *         id: 1
 *         summary: Мой компьютер завис
 *         content: Компьютер завис и не реагирует, памагити!!!!
 *         priority: LOW
 *         status: Created
 *         create_date: 2023-10-24T13:11:20.000Z
 *         update_date: 2023-10-24T14:16:34.000Z
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - login
 *         - password
 *         - full_name
 *       properties:
 *         id:
 *           type: integer
 *           description: Автогенерируемый id пользователя
 *         email:
 *           type: string
 *           description: Электронная почта пользователя
 *         login:
 *           type: string
 *           description: Логин пользователя
 *         password:
 *           type: string
 *           description: Пароль пользователя
 *         full_name:
 *           type: string
 *           description: Полное имя пользователя
 *       example:
 *         id: 1
 *         email: user@example.com
 *         login: user123
 *         password: password123
 *         full_name: John Doe
 * 
 * 
 *    
*/
/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: API управления тикетами
 * /ticket:
 *   post:
 *     summary: Создание нового тикета
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               summary:
 *                 type: string
 *               content:
 *                 type: string
 *               priority:
 *                 type: string
 *             required:
 *               - summary
 *               - priority
 *               - content
 *     responses:
 *       200:
 *         description: Созданный тикет
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       500:
 *         description: Ошибка сервера
   * /ticket/all:
 *   get:
 *     summary: Получить все тикеты
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Ответ в виде массива всех тикетов
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       500:
 *         description: Ошибка сервера
  * /ticket/{id}:
 *   get:
 *     summary: Получить тикет по id
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id тикета
 *     responses:
 *       200:
 *         description: Ответ в виде тикета с выбранным id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Тикет не найден
 *   put:
 *    summary: Обновить тикет по id
 *    tags: [Tickets]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id тикета
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             required:
 *               - status
 *    responses:
 *      200:
 *        description: Тикет успешно обновлен
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ticket'
 *      404:
 *        description: Тикет не найден
 *      500:
 *        description: Что-то пошло не так
 *   delete:
 *     summary: Удалить тикет по id
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id тикета
 *
 *     responses:
 *       200:
 *         description: Тикет успешно удалён
 *       404:
 *         description: Тикет не найден

 *
 */

/**
* @swagger
* tags:
*   name: Users
*   description: API пользователей
* /login:
* post:
*   tags:
*    - "Users"
*  summary: "Login a user"
*  description: "Login with username and password"
*  consumes:
*    - "application/json"
*  produces:
*    - "application/json"
*  parameters:
*    - in: "body"
*      name: "body"
*      description: "User login credentials"
*      required: true
*      schema:
*        $ref: "#/definitions/UserLogin"
*  responses:
*    200:
*      description: "Login successful"
*      schema:
*        $ref: "#/definitions/LoginResponse"
*    401:
*      description: "Invalid credentials"
*
* /user/{id}:
*  put:
*   tags:
*     - "Users"
*   summary: "Update user data"
*   description: "Update user's email, full name, and password"
*   consumes:
*     - "application/json"
*   produces:
*     - "application/json"
*   parameters:
*     - name: "id"
*       in: "path"
*       required: true
*       type: "integer"
*       format: "int64"
*     - in: "body"
*       name: "body"
*       required: true
*       schema:
*        $ref: "#/definitions/UserUpdate"
*   responses:
*    200:
*       description: "User data updated successfully"
*     400:
*       description: "Invalid input"
*     401:
*       description: "Unauthorized"
*     500:
*       description: "Error updating user data"
*/
