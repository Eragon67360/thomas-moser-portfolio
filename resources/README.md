# resources

Sources for files that are generated once and committed, not built by the site.

## CV (`cv/cv.html`)

One template, three languages. It renders `public/pdf/CV_Thomas_Moser_{EN,FR,DE}.pdf`.

1. Edit the facts in `cv/cv.html`. Keep them consistent with `content/about.ts`.
2. Open the file in Chrome or Chromium with `#en`, `#fr` or `#de` appended to the URL.
3. Print to PDF: paper **A4**, margins **None**, **Background graphics** on. Each language must stay on one page.
4. Save it over the matching file in `public/pdf/`.

## LinkedIn banner (`branding/linkedin-banner.html`)

Rendered at 1584x396, LinkedIn's banner size, to `branding/linkedin-banner.png`. Keep the lower-left corner free of
text: LinkedIn places the profile photo there.
