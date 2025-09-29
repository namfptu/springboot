#!/usr/bin/env python3
"""
Simple HTTP server for serving static files
Run with: python server.py
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Change to the directory containing this script
os.chdir(Path(__file__).parent)

PORT = 3000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Server running at http://localhost:{PORT}")
        print(f"📁 Serving files from: {os.getcwd()}")
        print("🌐 Opening browser...")
        webbrowser.open(f'http://localhost:{PORT}')
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")

