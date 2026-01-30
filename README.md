# ProPresenter MCP Server

A comprehensive Model Context Protocol (MCP) server that provides tools for controlling ProPresenter presentations via the ProPresenter API. This server implements the full ProPresenter API with over 80 tools organized into modular categories.

## Features

This MCP server exposes comprehensive control over ProPresenter with the following categories:

### 📊 Status & Information (4 tools)
- Get ProPresenter version and build information
- Get current status of screens (all, audience, stage)
- Get layer status information

### 🎬 Presentation Controls (10 tools)
- Get focused/active presentations
- Get current slide index
- Focus and trigger presentations
- Navigate through slides (next, previous, by index)
- Timeline operations (play, pause, rewind)
- Timeline status monitoring

### 📢 Announcement Controls (9 tools)
- Get active announcements
- Get announcement slide index
- Focus and trigger announcements
- Navigate through announcement cues
- Timeline operations for announcements
- Timeline status monitoring

### 🎵 Audio Playlists (16 tools)
- List all audio playlists
- Get playlist contents with pagination
- Get focused/active playlists
- Focus playlists (next, previous, specific, active)
- Trigger playlists and playlist items
- Navigate through playlist items

### 📹 Capture Controls (4 tools)
- Get capture status and time
- Start/stop capture operations
- Get capture settings
- Get available capture encodings (disk, RTMP, Resi)

### 🧹 Clear Controls (4 tools)
- Clear specific layers (audio, props, messages, announcements, slide, media, video_input)
- List all clear groups
- Get clear group details
- Trigger clear groups

### 📚 Library Controls (4 tools)
- List all configured libraries
- Get library contents
- Trigger presentations from libraries
- Trigger specific cues in library presentations

### 👁️ Looks (Audience Screens) (4 tools)
- List all configured looks
- Get current live look
- Get specific look details
- Trigger looks to make them live

### ⚙️ Macros (3 tools)
- List all configured macros
- Get macro details
- Trigger macros

### 💬 Messages (6 tools)
- List all messages
- Get message details
- Show/hide messages
- Trigger messages
- Clear messages

### ⏱️ Timers (5 tools)
- List all timers
- Get timer details
- Start/stop/reset timers

## Architecture

The codebase is organized into a modular structure for maintainability:

```
src/
├── clients/       # API client classes for each endpoint group
│   ├── announcement.ts
│   ├── audio.ts
│   ├── capture.ts
│   ├── clear.ts
│   ├── library.ts
│   ├── looks.ts
│   ├── macros.ts
│   ├── messages.ts
│   ├── presentation.ts
│   ├── status.ts
│   └── timers.ts
├── tools/         # MCP tool definitions for each group
│   ├── announcement.ts
│   ├── audio.ts
│   ├── capture.ts
│   ├── clear.ts
│   ├── library.ts
│   ├── looks.ts
│   ├── macros.ts
│   ├── messages.ts
│   ├── presentation.ts
│   ├── status.ts
│   └── timers.ts
├── handlers/      # Request handlers for each group
│   ├── announcement.ts
│   ├── audio.ts
│   └── others.ts
└── index.ts       # Main server entry point
```

## Prerequisites

- Node.js 18 or higher
- ProPresenter 7 with API enabled
- ProPresenter running and accessible on your network

## Installation

1. Clone this repository or download the source code

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Configuration

The server connects to ProPresenter using environment variables:

- `PROPRESENTER_URL` - The URL of your ProPresenter instance (default: `http://localhost:50000`)
- `PROPRESENTER_PASSWORD` - The API password (if configured in ProPresenter)

### ProPresenter Setup

1. Open ProPresenter preferences
2. Go to the Network tab
3. Enable "Network" and note the port number (default: 50000)
4. Optionally set a password for API access

## Usage

### With Claude Desktop

Add this to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "propresenter": {
      "command": "node",
      "args": ["/absolute/path/to/mpc-propresenter/build/index.js"],
      "env": {
        "PROPRESENTER_URL": "http://localhost:50000",
        "PROPRESENTER_PASSWORD": "your-password-if-needed"
      }
    }
  }
}
```

Replace `/absolute/path/to/mpc-propresenter` with the actual path to this project.

### With VS Code

This server can be debugged directly in VS Code using the included MCP configuration.

1. Open this project in VS Code
2. The server is automatically configured for debugging via `.vscode/mcp.json`
3. Use the MCP extension to test and debug the server

## Example Commands

Once connected, you can ask Claude to control ProPresenter:

**Status & Information:**
- "What version of ProPresenter is running?"
- "Show me the status of all screens"
- "What layers are currently active?"

**Presentations:**
- "List all available presentations"
- "Trigger the presentation called 'Sunday Service'"
- "What presentation is currently active?"
- "Go to the next slide"
- "Go to slide number 5"
- "Play the presentation timeline"

**Announcements:**
- "What announcement is currently active?"
- "Trigger the next announcement cue"
- "Show me the announcement timeline status"

**Audio:**
- "List all audio playlists"
- "Show me the contents of the 'Worship' playlist"
- "Play the next song in the active playlist"
- "Trigger the focused audio playlist"

**Capture:**
- "What's the current capture status?"
- "Start recording"
- "Stop the capture"
- "Show me the capture settings"

**Clear:**
- "Clear the announcements layer"
- "Show me all clear groups"
- "Trigger the clear group called 'Reset All'"

**Library:**
- "List all my libraries"
- "Show presentations in the 'Sunday Service' library"
- "Trigger 'Amazing Grace' from the hymns library"

**Looks:**
- "Show me all configured looks"
- "What look is currently live?"
- "Switch to the 'Main Screens' look"

**Macros:**
- "List all macros"
- "Trigger the 'Start Service' macro"

**Messages:**
- "Show me all messages"
- "Display the 'Welcome' message"
- "Hide all messages"

**Timers:**
- "List all timers"
- "Start the countdown timer"
- "Reset the sermon timer"

## Development

### Build
```bash
npm run build
```

### Watch Mode
```bash
npm run watch
```

## API Reference

This server uses the ProPresenter API documented at https://openapi.propresenter.com/

## Troubleshooting

**Connection Issues:**
- Verify ProPresenter is running and the API is enabled
- Check that the URL and port are correct
- Ensure no firewall is blocking the connection
- Verify the password if authentication is enabled

**Server Not Starting:**
- Make sure you've built the project with `npm run build`
- Check that Node.js 18+ is installed
- Verify all dependencies are installed with `npm install`

## License

MIT
