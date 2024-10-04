# CodeCache 🌟

CodeCache is a web application designed for developers to efficiently manage and access code snippets. With features like authentication, a responsive design, and a user-friendly interface, CodeCache aims to streamline code snippet management and enhance developer productivity. 🚀

## Features 📋

- **Code Snippet Management**: Save, view, and organize code snippets with metadata including language, tags, and descriptions. 🗂️
- **Authentication**: Secure user authentication with Clerk. 🔒
- **Responsive Design**: Built with TailwindCSS for a modern and adaptable layout. 📱
- **User-Friendly Interface**: Intuitive design for easy interaction with code snippets. 🎨

## Technologies Used 🔧

- **Frontend**: Next.js with TailwindCSS
- **Backend**: MongoDB with Mongoose
- **Authentication**: Clerk
- **Build & Deployment**: Bun

## Getting Started 🚀

To get started with CodeCache, follow these steps:

### Prerequisites 🛠️

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **Bun**: Install Bun if you haven't already. [Install Bun](https://bun.sh/)

### Setup 📝

1. **Clone the Repository**

   ```bash
   git clone https://github.com/notsoocool/codecache.git
   cd codecache
   ```

2. **Install Dependencies**

   ```bash
   bun install
   ```

3. **Create Environment Variables**

   Create a `.env` file from the `.env.sample` file provided:

   ```bash
   cp .env.sample .env
   ```

   Update the `.env` file with your MongoDB connection string and other necessary environment variables.

4. **Run the Development Server**

   ```bash
   bun dev
   ```

   Open your browser and go to `http://localhost:3000` to view the application. 🌐

### Usage 📖

- **Homepage**: Provides an introduction to CodeCache and features a header and footer for navigation. 🏠
- **Authentication**: Sign in using Clerk to access personalized features. 🔑
- **Snippet Management**: Add, view, and organize code snippets through the provided interface. 📝

### Contributing 🤝

We welcome contributions to CodeCache! To contribute:

1. Fork the repository 🍴
2. Create a new branch (`git checkout -b feature/your-feature`) 🌱
3. Make your changes ✨
4. Commit and push your changes 🚀
5. Create a pull request 🔄

### License 📝

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contact 📬

For any questions or support, please reach out to [vyasyajush@gmail.com](mailto:vyasyajush@gmail.com).

---

**Join us in building CodeCache with notsoocool!** 🌟

Explore the project on [GitHub](https://github.com/notsoocool/codecache) and join our community to contribute, provide feedback, or stay updated with our latest developments. 💬
