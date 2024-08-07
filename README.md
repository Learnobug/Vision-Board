# Vision Board

Vision Board is a collaborative drawing board teaching application designed to facilitate real-time audio and video communication alongside collaborative drawing capabilities. Built with modern web technologies, Vision Board is a powerful tool for interactive and engaging learning experiences.

## Features

- **Real-time Audio and Video Communication**: Connect with participants through high-quality audio and video.
- **Collaborative Drawing**: Draw and collaborate on a shared canvas in real-time.
- **User Authentication**: Secure user registration and login.
- **Room Management**: Create, join, and manage multiple rooms for different sessions.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Node.js](https://nodejs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **WebSockets**: [Socket.IO](https://socket.io/)
- **Real-time Communication**: [WebRTC](https://webrtc.org/) with [Mediasoup](https://mediasoup.org/)

## Installation

### Prerequisites

- Node.js v14 or later
- PostgreSQL

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Learnobug/Vision-Board.git
    cd vision-board
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following variables:

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/visionboard"
    NEXT_PUBLIC_API_URL="http://localhost:3000/api"
    SECRET="your_jwt_secret"
    ```

4. **Run database migrations**:

    ```bash
    npx prisma migrate dev --name init
    ```

5. **Start the development server**:

    ```bash
    npm run dev
    ```

6. **Run the WebSocket server**:

    In a separate terminal, navigate to the `server` directory and start the server:

    ```bash
    cd server
    npm install
    node index.js
    ```

## Usage

- Open your browser and navigate to `http://localhost:3000`.
- Register or log in with your credentials.
- Create or join a room to start collaborating.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Node.js](https://nodejs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Socket.IO](https://socket.io/)
- [WebRTC](https://webrtc.org/)
- [Mediasoup](https://mediasoup.org/)

## Contact

For any inquiries or feedback, please contact [yourname@domain.com](mailto:yourname@domain.com).

