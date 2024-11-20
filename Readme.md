## Highway Delight Project

### Project Description

This project is a task from Highway Delite internship selection program. As part of the task, I developed a fully functional website incorporating features such as user signup, login, and signup with OTP verification. For the front end, I utilized Vite.js, TailwindCSS, and TypeScript to create a responsive and efficient user interface. On the back end, I employed Node.js, Express.js, MongoDB, and TypeScript to build a robust server, integrating essential features like email functionality using Nodemailer, authentication with JWT, and password encryption with Bcrypt.js.

Here are the project details:

🔗 Client Repository: [Github Link](https://github.com/akash-Sa19/loginsignup-client-hd)

🔗 Server Repository: [Github Link](https://github.com/akash-Sa19/loginsignup-server-hd)

🌐 Live Website: [visit Here](https://loginsignup-client-hd.vercel.app)

This project demonstrates my ability to design and implement secure, scalable, and user-friendly web applications using modern development frameworks and tools.

**Please note that the first signup attempt may take some time due to the server's cold start on Render.com. I kindly request your patience for a few minutes during this process**

### How to Run project Locally

1. Clone the repository from Github using

```
git clone https://github.com/akash-Sa19/loginsignup-server-hd.git
```

2. Navigate to the project directory using

```
cd loginsignup-server-hd
```

3. Install all the dependencies using

```
npm install
```

4. Creat a .env file on the root directory and add the following variables, with your custom values

```bash
PORT=3003
MONGO_URL="mongodb+srv://<username>:<password>@<clustername>.mongodb.net"
MONGODB_PASSWORD="
ACCESS_TOKEN_SECRET=""
ACCESS_TOKEN_EXPIRY="1d"
OTP_EXPIRY_TIME=5
NODE_ENV="development"
CLIENT_SIDE_URL=""
EMAIL=""
EMAIL_PASSWORD=""
```

to get `EMAIL` and `EMAIL_PASSWORD` you can go to [Gmail](https://myaccount.google.com/lesssecureapps) and turn on less secure apps option Or watch this youtube video
[How to send an Email with nodemailer](https://youtu.be/u-_Ygo2wcrs?si=Rn6noNp_0HWm3tS9)

5. Start the server using

```
npm run dev
```

6 . Open [http://localhost:3003](http://localhost:3003) on your browser

### Project Structure

- `src` folder contains all the source code of the project
- `src/routes` folder contains all the routes of the project
- `src/models` folder contains all the models of the project
- `src/controllers` folder contains all the controllers of the project
- `src/middlewares` folder contains all the middlewares of the project
- `src/utils` folder contains all the utils of the project
- `src/lib` folder contains all the lib of the project

### Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Typescript
- Nodemailer
- JWT
- bcryptjs
