<?php
/**
 * ─────────────────────────────────────────────────────────────
 * Swagger UI API Interactive Documentation
 * File: public_html/api/docs.php
 * Domain: https://datdoc.id.vn/api/docs.php
 * ─────────────────────────────────────────────────────────────
 */
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Documentation - Personal Portfolio & Blog</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <link rel="icon" type="image/png" href="https://unpkg.com/swagger-ui-dist@5/favicon-32x32.png" sizes="32x32" />
  <style>
    html {
      box-sizing: border-box;
      overflow-y: scroll;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      margin: 0;
      background: #0d1117;
      color: #c9d1d9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .swagger-ui {
      filter: invert(88%) hue-rotate(180deg);
    }
    .swagger-ui .topbar {
      display: none;
    }
    .swagger-ui .wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
    }
    .docs-header {
      background: #161b22;
      border-bottom: 1px solid #30363d;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .docs-title {
      font-size: 16px;
      font-weight: 600;
      color: #58a6ff;
    }
    .docs-links a {
      color: #8b949e;
      text-decoration: none;
      font-size: 13px;
      margin-left: 16px;
      transition: color 0.2s;
    }
    .docs-links a:hover {
      color: #58a6ff;
    }
  </style>
</head>
<body>
  <div class="docs-header">
    <div class="docs-title">⚡ Portfolio & Blog REST API Specification (OpenAPI 3.0.3)</div>
    <div class="docs-links">
      <a href="./index.php?endpoint=swagger" target="_blank">raw swagger.json ↗</a>
      <a href="./index.php?endpoint=portfolio" target="_blank">view portfolio data ↗</a>
      <a href="./index.php?endpoint=posts" target="_blank">view blog posts ↗</a>
      <a href="https://datdoc.id.vn" target="_blank">live portfolio ↗</a>
    </div>
  </div>

  <div id="swagger-ui"></div>

  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" charset="UTF-8"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js" charset="UTF-8"></script>
  <script>
    window.onload = function() {
      window.ui = SwaggerUIBundle({
        url: "./index.php?endpoint=swagger",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout",
        defaultModelsExpandDepth: 1,
        docExpansion: "list",
        filter: true,
        showRequestHeaders: true
      });
    };
  </script>
</body>
</html>

