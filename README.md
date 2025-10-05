Elmidor Group – Official Multi-Page Website

This repository contains the official multi-page website for Elmidor Group, built with a consistent UI/UX, responsive design, and automation-ready structure.

Features

✅ Shared header/footer with sticky glass navigation

✅ Responsive mobile menu with smooth toggle

✅ Loader with rotating Elmidor Group logo

✅ Scroll-reveal animations powered by IntersectionObserver

✅ Page-specific hover colors via body classes

✅ SEO-friendly <meta> structure and accessibility tags

✅ Easy content editing: only update inside <main> ... </main> blocks

Structure

index.html – Homepage

about.html – About Elmidor Group

services.html – Services overview

blog.html – Blog listing

blog-post.html – Single blog post (duplicate to add new ones)

support.html – Docs, Tickets, SLA, FAQ

contact.html – Contact & CTA

team.html – Team showcase (duplicate .card to add members)

license.html – MIT License

assets/css/style.css – Main stylesheet

assets/images/ – Replace with your own images and logos

Customization
Colors

Each page has its own hover color defined in CSS:

body.about   { --hover:#7C5CFF; }
body.services{ --hover:#FF6B6B; }
body.blog    { --hover:#00C897; }
body.support { --hover:#FFB020; }


Update the values to fit your brand palette.

Content

Edit text and media only inside <main> ... </main>.

Replace image URLs with your own assets in assets/images/.

Search for https://www.elmidorgroup.com to update CTA links.

Adding Blog Posts

Duplicate blog-post.html.

Update the title, content, and date.

Link it from blog.html.

Adding Team Members

Open team.html.

Duplicate a .card block.

Replace name, role, and image.

Requirements

Static hosting (GitHub Pages, Netlify, Vercel, or your own server).

Modern browser support (Chrome, Firefox, Edge, Safari).

Security & SEO Notes

All forms should point to trusted endpoints (avoid exposing raw APIs).

Use HTTPS on hosting for secure data transfer.

Maintain <title> and <meta description> unique per page for SEO.

Use descriptive alt text for all images.

License

Distributed under the MIT License. See license.html for details.

Credits

Elmidor Group UI/UX design.

Icons and fonts (if applicable) credited per vendor license.

Built with pure HTML, CSS, and vanilla JS (no heavy frameworks).

🌍 Official Website: https://www.elmidorgroup.com
