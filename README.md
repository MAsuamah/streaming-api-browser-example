# AssemblyAI Streaming Transcription Browser Example

## Description
This open-source repo provided by AssemblyAI displays how to use our Streaming API in the browser!

In this app, we grab an audio stream from the user's computer and then send that over a WebSocket to AssemblyAI for real-time transcription. Once AssemblyAI begins transcribing, we display the text in the browser. This is accomplished using Express for our backend and Vanilla JavaScript with the npm package [recordrtc](https://www.npmjs.com/package/recordrtc) for our frontend.

## How To Install and Run the Project

##### ❗Important❗

- Before running this app, you need to upgrade your AssemblyAI account. The Streaming API is only available to upgraded accounts.
- To upgrade your account you need to add a card. You can do that in your dashboard [here](https://app.assemblyai.com/)!

##### Instructions

1. Clone the repo to your local machine.
2. Open a terminal in the main directory housing the project. In this case `streaming-api-browser-example`.
3. Run `npm install` to ensure all dependencies are installed.
4. Create a `.env` files in the root of the project. Add your AssemblyAI key add `ASSEMBLYAI_KEY="your-key-here"` to the file.
5. Start the server with the command `npm run server` (will run on port 8000).
7. Open a second terminal in the main directory of the project and start the client side with `npm run client` (will run on port 3000).
8. Vist `http://localhost:3000/` in the browser and click "Start" as you speak the live transcription will appear in the webpage!

## Further Documentation
- [AssemblyAI Real-Time Documention](https://docs.assemblyai.com/overview/real-time-transcription)
- [recordrtc](https://www.npmjs.com/package/recordrtc)
- [Express](https://expressjs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
