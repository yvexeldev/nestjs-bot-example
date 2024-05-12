# NestJS Telegram Bot Example

This is a simple example of a Telegram bot built with NestJS. The bot responds to commands and messages sent by users in a Telegram chat.

## Features

- Responds to `/start, hi, hello, hey, scene` command with a welcome message.
- Admin middleware
- Example working with scenes

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yvexeldev/nestjs-bot-example.git
   ```

2. Install dependencies:

   ```bash
   cd nestjs-bot-example
   npm install
   ```

3. Set environment variables:

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
   ```

   Replace `your_telegram_bot_token_here` with your actual Telegram bot token.

4. Start the bot:

   ```bash
   npm run start:dev
   ```


## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README file according to your bot's specific features and requirements.
