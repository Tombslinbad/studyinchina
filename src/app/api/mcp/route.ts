import { NextRequest, NextResponse } from 'next/server';

const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:3001';

/**
 * API route to proxy requests to Convex MCP server
 * This allows the frontend to communicate with the MCP server
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tool = searchParams.get('tool');
  
  if (!tool) {
    return NextResponse.json({ 
      error: 'Tool parameter required',
      availableTools: ['schema', 'dashboard', 'diagram', 'subway', 'table-heatmap', 'schema-drift', 'kanban']
    }, { status: 400 });
  }

  try {
    const response = await fetch(`${MCP_SERVER_URL}/${tool}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`MCP server error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('MCP proxy error:', error);
    return NextResponse.json({ 
      error: 'MCP server not available',
      message: 'Make sure the MCP server is running on port 3001',
      startCommand: 'node scripts/mcp-server.js'
    }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tool, params } = body;

    if (!tool) {
      return NextResponse.json({ error: 'Tool parameter required' }, { status: 400 });
    }

    const response = await fetch(`${MCP_SERVER_URL}/${tool}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(params || {}),
    });

    if (!response.ok) {
      throw new Error(`MCP server error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('MCP proxy error:', error);
    return NextResponse.json({ 
      error: 'MCP server not available',
      message: 'Make sure the MCP server is running'
    }, { status: 503 });
  }
}
