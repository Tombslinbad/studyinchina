#!/bin/bash
# Convex MCP Server Startup Script

export CONVEX_DEPLOY_KEY="dev:impartial-spoonbill-973|eyJ2MiI6IjJlY2IyZWY1ZWVkMzQ0MzE4NTU4YjZmNWVmZThmMjMzIn0="
export MCP_PORT="${MCP_PORT:-3001}"

echo "🚀 Starting Convex MCP Server..."
echo "📊 Dashboard: http://localhost:$MCP_PORT"
echo ""

npx convex-mcp-visual --http --port "$MCP_PORT"
