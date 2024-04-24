# Next.js with Supabase Auth and Google OAuth

This is a basic setup for Next.js with Supabase authentication using Google OAuth.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- npm or yarn

## Getting Started

1. Clone the repository:

  ```bash
  git clone https://github.com/your-username/your-app.git
  ```

2. Install dependencies:

  ```bash
  cd your-app
  npm install
  ```

3. Set up Supabase:

  - Create a Supabase account at [https://supabase.io](https://supabase.io).
  - Create a new project and obtain the Supabase URL and API Key.

4. Set up Google OAuth:

  - Go to the Google Cloud Console at [https://console.cloud.google.com](https://console.cloud.google.com).
  - Create a new project and enable the Google OAuth API.
  - Obtain the Google OAuth Client ID and Client Secret.

5. Configure environment variables:

  - Create a `.env.local` file in the root of your project.
  - Add the following environment variables:

    ```plaintext
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-api-key
    ```

6. Start the development server:

  ```bash
  npm run dev
  ```

7. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage

- The application will display a login button.
- Click the login button to authenticate with Google using Supabase.
- Once authenticated, you will be redirected to the home page and show authenticated components

## Contributing

Contributions are welcome! If you have any improvements or bug fixes, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
