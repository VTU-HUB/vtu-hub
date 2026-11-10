<?xml version="1.0" encoding="UTF-8"?>
<!-- Renders /sitemap.xml and the per-section sitemaps as readable tables in a browser.
     Search engines ignore this file; they read the XML directly. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>VTUHub sitemap</title>
        <style>
          :root { color-scheme: light dark; --fg:#111827; --muted:#475569; --bg:#fff; --line:#e5e7eb; --brand:#1d4ed8; --soft:#f8fafc; }
          @media (prefers-color-scheme: dark) { :root { --fg:#f8fafc; --muted:#cbd5e1; --bg:#0f172a; --line:#334155; --brand:#60a5fa; --soft:#1e293b; } }
          body { margin:0; background:var(--bg); color:var(--fg); font:15px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; }
          main { max-width:1100px; margin:0 auto; padding:32px 16px 64px; }
          h1 { margin:0 0 4px; font-size:26px; letter-spacing:-.02em; }
          p.lead { margin:0 0 24px; color:var(--muted); }
          a { color:var(--brand); text-decoration:none; word-break:break-all; }
          a:hover { text-decoration:underline; }
          table { width:100%; border-collapse:collapse; border:1px solid var(--line); border-radius:12px; overflow:hidden; }
          th, td { padding:10px 14px; text-align:left; border-bottom:1px solid var(--line); vertical-align:top; }
          th { background:var(--soft); font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); }
          td.n { width:56px; color:var(--muted); font-variant-numeric:tabular-nums; }
          .tag { display:inline-block; margin:2px 4px 0 0; padding:1px 7px; border:1px solid var(--line); border-radius:999px; font-size:12px; color:var(--muted); }
        </style>
      </head>
      <body><main>
        <xsl:choose>
          <xsl:when test="s:sitemapindex">
            <h1>VTUHub sitemap</h1>
            <p class="lead">
              <xsl:value-of select="count(s:sitemapindex/s:sitemap)"/> sections. Open one to see every page in it.
              <a href="/">Back to VTUHub</a>
            </p>
            <table>
              <tr><th>#</th><th>Section sitemap</th><th>Last updated</th></tr>
              <xsl:for-each select="s:sitemapindex/s:sitemap">
                <tr>
                  <td class="n"><xsl:value-of select="position()"/></td>
                  <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                  <td><xsl:value-of select="s:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </table>
          </xsl:when>
          <xsl:otherwise>
            <h1>VTUHub sitemap section</h1>
            <p class="lead">
              <xsl:value-of select="count(s:urlset/s:url)"/> pages. <a href="/sitemap.xml">All sections</a>
            </p>
            <table>
              <tr><th>#</th><th>Page</th><th>Languages</th></tr>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td class="n"><xsl:value-of select="position()"/></td>
                  <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                  <td>
                    <xsl:for-each select="xhtml:link">
                      <a class="tag" href="{@href}"><xsl:value-of select="@hreflang"/></a>
                    </xsl:for-each>
                  </td>
                </tr>
              </xsl:for-each>
            </table>
          </xsl:otherwise>
        </xsl:choose>
      </main></body>
    </html>
  </xsl:template>
</xsl:stylesheet>
