<h2> StreamPlus - Adaptive HTTP Streaming  </h2>

A simple application built with Angular, Node.js, and FFmpeg for implementing HTTP Live Streaming (HLS) and Adaptive Bitrate Streaming. It allows video conversion to HLS format and seamless playback with adaptive quality switching based on network conditions.

<img src="public/page.png" />

## Setup Locally 👩‍🔧

1. Git clone the project repository on your local system
```javascipt
git clone https://github.com/deepeshdm/StreamPlus.git
```

2. Install dependencies in package.json
```javascipt
cd StreamPlus
npm install
```

3. Also clone & setup Backend of this project - <a href='https://github.com/deepeshdm/HLS-Transcoder.git'> link </a>. Once backend server is running, change "environment.ts" to point to your backend server
```javascipt
export const environment = {
    nodeapi : 'http://localhost:3000'
};
```
