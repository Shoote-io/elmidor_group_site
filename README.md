
# Elmidor Group Official Site

This ZIP includes a complete multi-page site that matches your UI/UX:
- Shared header/footer, sticky nav with glass, responsive mobile menu
- Page-specific hover colors via `body` class
- Loader with rotating logo
- IntersectionObserver scroll-reveal
- CTA buttons to https://www.elmidorgroup.com
- Contact info and Team page with CEO

## Edit safely
- Colors: change per-page theme by editing the `body` class (`about`, `services`, `blog`, `follow`, `support`, `contact`, `team`). Hover color is defined in CSS (`body.about { --hover:#7C5CFF }` etc.).
- Content: edit only inside `<main> ... </main>` blocks on each page.
- Images: replace URLs with your own images or local files in `assets/images/`.
- Buttons: search for `https://www.elmidorgroup.com` if you want to point CTAs elsewhere.

## Add a blog post
- Duplicate `blog-post.html`, update the content, then link to it from `blog.html`.

## Add team members
- Duplicate a `.card` block in `team.html` and change name/role/image.

