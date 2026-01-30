# ProPresenter MCP Server

A Model Context Protocol (MCP) server that provides tools for controlling ProPresenter presentations via the ProPresenter API.

## Features

This MCP server exposes the following capabilities:

### Status & Information
- **get_propresenter_version** - Get ProPresenter version and build information
- **get_screen_status** - Get current status of all screens
- **list_presentations** - List all available presentations in the library

### Presentation Controls
- **trigger_presentation** - Trigger a specific presentation by path, optionally starting at a specific slide
- **focus_presentation** - Focus a presentation without triggering it

### Slide Controls
- **trigger_next_slide** - Advance to the next slide
- **trigger_previous_slide** - Go back to the previous slide
- **trigger_slide_by_index** - Jump to a specific slide by index

### Layer Controls
- **clear_all** - Clear all layers (video, audio, props, announcements)
- **clear_layer** - Clear a specific layer

### Timer Controls
- **get_timers** - Get all timers and their current states
- **start_timer** - Start a specific timer
- **stop_timer** - Stop a specific timer
- **reset_timer** - Reset a specific timer

### Message Controls
- **show_message** - Display a specific message
- **hide_messages** - Hide all currently displayed messages

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

Once connected, you can ask Claude to:

- "Show me the ProPresenter version"
- "List all available presentations"
- "Trigger the presentation called 'Sunday Service'"
- "Go to the next slide"
- "Start the countdown timer"
- "Clear all layers"

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
