import { type QueryParams } from "sanity";
import { sanityClient } from "sanity:client";

const studioUrl = import.meta.env.PUBLIC_SANITY_STUDIO_URL || "/studio";
const readToken = import.meta.env.SANITY_API_READ_TOKEN;
export const visualEditingEnabled =
  import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";

export async function loadQuery<QueryResponse>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}) {
  if (visualEditingEnabled && !readToken) {
    throw new Error("SANITY_API_READ_TOKEN is required during Visual Editing.");
  }

  const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
    query,
    params ?? {},
    {
      filterResponse: false,
      perspective: visualEditingEnabled ? "drafts" : "published",
      resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
      stega: visualEditingEnabled ? { studioUrl } : false,
      ...(readToken ? { token: readToken } : {}),
      useCdn: !visualEditingEnabled,
    },
  );

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective: visualEditingEnabled ? "drafts" : "published",
  };
}
