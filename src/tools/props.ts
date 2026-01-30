// Props tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const propsTools: Tool[] = [
  {
    name: "props_get_all",
    description: "Get all props in the library",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "props_get",
    description: "Get details of a specific prop",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the prop",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "props_set",
    description: "Update a specific prop",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the prop",
        },
        prop: {
          type: "object",
          description: "The prop data to set",
        },
      },
      required: ["id", "prop"],
    },
  },
  {
    name: "props_delete",
    description: "Delete a specific prop",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the prop to delete",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "props_trigger",
    description: "Trigger a specific prop to display",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the prop to trigger",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "props_clear",
    description: "Clear a specific prop from display",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the prop to clear",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "props_pause_auto_clear",
    description: "Pause auto-clear for a specific prop",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the prop",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "props_resume_auto_clear",
    description: "Resume auto-clear for a specific prop",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the prop",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "props_get_thumbnail",
    description: "Get thumbnail for a specific prop",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the prop",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "props_get_collections",
    description: "Get all prop collections",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "props_create_collection",
    description: "Create a new prop collection",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the new collection",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "props_get_collection",
    description: "Get details of a specific prop collection",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the collection",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "props_set_collection",
    description: "Update a specific prop collection",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the collection",
        },
        collection: {
          type: "object",
          description: "The collection data to set",
        },
      },
      required: ["id", "collection"],
    },
  },
  {
    name: "props_delete_collection",
    description: "Delete a specific prop collection",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the collection to delete",
        },
      },
      required: ["id"],
    },
  },
];
