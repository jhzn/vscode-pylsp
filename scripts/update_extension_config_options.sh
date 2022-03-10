#!/bin/bash

# This scripts fetches the configuration from the pylsp's github repo and updates package.json with this configuration

set -euo pipefail

latest_pylsp_config=$(curl -s "https://raw.githubusercontent.com/python-lsp/python-lsp-server/develop/pylsp/config/schema.json" | jq .properties)

# Object key in package.json to update
prop_key=".contributes.configuration.properties"
echo "$(jq "$prop_key = $latest_pylsp_config" package.json)" > package.json

# Insert additional key
extra=$(cat << EOF
{
	"pylsp.executable": {
		"type": "string",
		"default": "pylsp",
		"description": "Language server executable"
	}
}
EOF
)
echo "$(jq "$prop_key"' += '"$extra" package.json)" > package.json
