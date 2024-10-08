<div align="center">

# `CodeCache 🌟`

<i>CodeCache is a web application designed for developers to efficiently manage and access code snippets. With features like authentication, a responsive design, and a user-friendly interface, CodeCache aims to streamline code snippet management and enhance developer productivity. 🚀
</i>

</div>

<div align = "center">
<br>

<table align="center">
    <thead align="center">
        <tr border: 1px;>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Close PRs</b></td>
            <td><b>🛠️ Languages</b></td>
            <td><b>👥 Contributors</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/notsoocool/codecache?style=flat&logo=github"/></td>
            <td><img alt="Forks" src="https://img.shields.io/github/forks/notsoocool/codecache?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/notsoocool/codecache?style=flat&logo=github"/></td>
            <td><img alt="Open Pull Requests" src="https://img.shields.io/github/issues-pr/notsoocool/codecache?style=flat&logo=github"/></td>
           <td><img alt="Close Pull Requests" src="https://img.shields.io/github/issues-pr-closed/notsoocool/codecache?style=flat&color=critical&logo=github"/></td>
           <td><img alt="GitHub language count" src="https://img.shields.io/github/languages/count/notsoocool/codecache?style=flat&color=green&logo=github"></td>
         <td><img alt="GitHub Contributors count" src="https://img.shields.io/github/contributors/notsoocool/codecache?style=flat&color=blue&logo=github"/></td>
        </tr>
    </tbody>
</table>
</div>
<br>

## Features 📋

- **Code Snippet Management**: Save, view, and organize code snippets with metadata including language, tags, and descriptions. 🗂️
- **Authentication**: Secure user authentication with Clerk. 🔒
- **Responsive Design**: Built with TailwindCSS for a modern and adaptable layout. 📱
- **User-Friendly Interface**: Intuitive design for easy interaction with code snippets. 🎨

# Technologies Used 🔧

- **Frontend**: 
   - ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) 
   - ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
- **Backend**:
   - ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
   - ![Mongoose](https://img.shields.io/badge/Mongoose-%23880000.svg?style=for-the-badge&logo=mongoose&logoColor=white)
- **Authentication**: 
   - ![Clerk](https://img.shields.io/badge/Clerk-6C47FF.svg?style=for-the-badge&logo=Clerk&logoColor=white)
- **Build & Deployment**: 
   - ![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)

## Getting Started 🚀

To get started with CodeCache, follow these steps:

### Prerequisites 🛠️

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **Bun**: Install Bun if you haven't already. [Install Bun](https://bun.sh/)

### Setup 📝

1. **Clone the Repository**

   First, clone the repository from GitHub to your local machine:

   ```bash
   git clone https://github.com/notsoocool/codecache.git
   cd codecache
   ```

2. **Install Dependencies**

   Use Bun to install the necessary dependencies for the project:

   ```bash
   bun install
   ```

3. **Create Environment Variables**

   Create a `.env.local` file from the `.env.sample` file provided:

   ```bash
   cp .env.sample .env.local
   ```

   Update the `.env.local` file with your MongoDB connection string and other necessary environment variables.

4. **Run the Development Server**

   Start the development server using Bun:

   ```bash
   bun dev
   ```

   ***Open your browser*** and go to `http://localhost:3000` to view the application. 🌐

---

### Usage 📖

- **Homepage**: The homepage serves as the central hub of CodeCache, offering a comprehensive introduction to the application. It features a well-structured header and footer for seamless navigation, ensuring users can easily access different sections of the site. The homepage highlights the core functionalities of CodeCache, providing users with an overview of what they can achieve with the platform. 🏠

- **Authentication**: CodeCache employs Clerk for secure user authentication, ensuring that only authorized users can access personalized features. The authentication process is straightforward, allowing users to sign in quickly and securely. Once authenticated, users can enjoy a tailored experience, with access to their saved snippets and personalized settings. 🔑

- **Snippet Management**: One of the key features of CodeCache is its robust snippet management system. Users can effortlessly add new code snippets, view existing ones, and organize them using various metadata such as language, tags, and descriptions. The intuitive interface makes it easy to manage snippets, ensuring that users can quickly find and utilize their code snippets when needed. 📝

---

3. **Create Environment Variables**

   Create a `.env.local` file from the `.env.sample` file provided:

   ```bash
   cp .env.sample .env.local
   ```

   Update the `.env.local` file with your MongoDB connection string and other necessary environment variables.

4. **Run the Development Server**

   ```bash
   bun dev
   ```

   Open your browser and go to `http://localhost:3000` to view the application. 🌐

### Usage 📖

- **Homepage**: Provides an introduction to CodeCache and features a header and footer for navigation. 🏠
- **Authentication**: Sign in using Clerk to access personalized features. 🔑
- **Snippet Management**: Add, view, and organize code snippets through the provided interface. 📝

## Contributing 🤝

We welcome contributions to CodeCache! To contribute:

1. **Fork the repository** 🍴

   Fork the repository by clicking the [Fork](https://github.com/notsoocool/codecache/fork) button on the top right-corner.

2. **Clone your forked repository** 🖥️

   Clone the forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/codecache.git
   cd codecache
   ```

3. **Create a new branch** 🌱

   Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature
   ```

4. **Make your changes** ✨

   Make the necessary changes to the codebase. Ensure your code follows the project's coding standards and conventions.

5. **Commit your changes** 💾

   Commit your changes with a descriptive commit message:

   ```bash
   git add .
   git commit -m "Add feature: your-feature"
   ```

6. **Push your changes** 🚀

   Push your changes to your forked repository:

   ```bash
   git push origin feature/your-feature
   ```

7. **Create a pull request** 🔄

   Go to the original repository on GitHub and click the "New pull request" button. Select your branch from the "compare" dropdown and submit the pull request.

For more detailed instructions, refer to the [GitHub documentation on creating a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

Thank you for contributing to CodeCache! Your help is greatly appreciated. 🌟

### License 📝

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contact 📬

For any questions or support, please reach out to [vyasyajush@gmail.com](mailto:vyasyajush@gmail.com).

---

**Join us in building CodeCache with notsoocool!** 🌟

Explore the project on [GitHub](https://github.com/notsoocool/codecache) and join our community to contribute, provide feedback, or stay updated with our latest developments. 💬

---

## Contributors
We are immensely grateful to the following amazing individuals who have contributed their time, effort, and expertise to make this project better. Your contributions, whether through code, documentation, bug reports, or feature suggestions, have been invaluable. Thank you for helping us build and improve CodeCache! 🌟✨

Your dedication and hard work are what drive this project forward, and we couldn't have done it without you. Each contribution, no matter how small, plays a crucial role in our journey towards creating a more efficient and user-friendly tool for developers. 🙌💻

We look forward to your continued support and collaboration. Together, we can achieve even greater heights! 🚀🌐

Thank you once again to all our contributors! Your efforts are truly appreciated. 💖👏

<!-- readme: contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/notsoocool">
                    <img src="https://avatars.githubusercontent.com/u/35025375?v=4" width="100;" alt="notsoocool"/>
                    <br />
                    <sub><b>Yajush Vyas</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/shubhagarwal1">
                    <img src="https://avatars.githubusercontent.com/u/105449260?v=4" width="100;" alt="shubhagarwal1"/>
                    <br />
                    <sub><b>Shubh Agarwal</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/samyak-aditya">
                    <img src="https://avatars.githubusercontent.com/u/91079592?v=4" width="100;" alt="samyak-aditya"/>
                    <br />
                    <sub><b>Samyak Aditya</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/yashksaini-coder">
                    <img src="https://avatars.githubusercontent.com/u/115717039?v=4" width="100;" alt="yashksaini-coder"/>
                    <br />
                    <sub><b>Yash Kumar Saini</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: contributors -end -->

---

<!-- 
### &#8627; Stargazers

<div align='center'>

[![Stargazers repo roster for @notsoocool/codecache](https://reporoster.com/stars/notsoocool/codecache)](https://github.com/notsoocool/codecache/stargazers)

</div>

### &#8627; Forkers
<div align='center'>

[![Forkers repo roster for @notsoocool/codecache](https://reporoster.com/forks/notsoocool/codecache)](https://github.com/notsoocool/codecache/network/members)

</div> -->
