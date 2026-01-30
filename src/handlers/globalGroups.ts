import { GlobalGroupsClient } from "../clients/globalGroups.js";

export function createGlobalGroupsHandlers(client: GlobalGroupsClient) {
  return {
    global_groups_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
  };
}
