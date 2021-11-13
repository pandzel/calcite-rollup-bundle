import assetLookup from "./assetLookup";

const originalFetch = window.fetch;

window.fetch = async function fetch(input, init) {
  if (typeof input === "string" && input.includes("/assets/calcite-")) {
    const assetPathStartIndex = input.indexOf("/assets/calcite-") + 1;
    const key = input.slice(assetPathStartIndex);
    return new Response(assetLookup[key]);
  }

  return originalFetch(input, init);
}

