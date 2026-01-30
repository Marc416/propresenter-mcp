// Themes tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const themesTools: Tool[] = [
  {
    name: "themes_get_all",
    description: "Get all themes in the library",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "themes_get",
    description: "Get details of a specific theme",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the theme",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "themes_get_slide",
    description: "Get a specific slide from a theme",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the theme",
        },
        themeSlide: {
          type: "string",
          description: "The slide identifier within the theme",
        },
      },
      required: ["id", "themeSlide"],
    },
  },
  {
    name: "themes_set_slide",
    description: "Update a specific slide in a theme",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the theme",
        },
        themeSlide: {
          type: "string",
          description: "The slide identifier within the theme",
        },
        slideData: {
          type: "object",
          description: "The slide data to set",
        },
      },
      required: ["id", "themeSlide", "slideData"],
    },
  },
  {
    name: "themes_get_slide_thumbnail",
    description: "Get thumbnail for a specific theme slide",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the theme",
        },
        themeSlide: {
          type: "string",
          description: "The slide identifier within the theme",
        },
      },
      required: ["id", "themeSlide"],
    },
  },
];
