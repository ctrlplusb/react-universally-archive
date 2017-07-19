import { createNetworkInterface } from "react-apollo";
import merge from "lodash.merge";
import config from "../../config";
import { createHybridNetworkInterface } from "./hybridNetworkInterface";

function createSimpleNetworkInterface(opts = {}, headers = {}) {
  const richerOpts = merge(
    {},
    {
      uri: config("graphqlUri"),
      opts: {
        headers
      }
    },
    opts
  );

  return createNetworkInterface(richerOpts);
}

function getNetworkInterface(opts = {}, headers = {}) {
  // Enable or disable query batching within your config file.
  return config("graphqlBatch")
    ? createHybridNetworkInterface(opts, headers)
    : createSimpleNetworkInterface(opts, headers);
}

export default getNetworkInterface;
