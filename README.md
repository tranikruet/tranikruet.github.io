# Shah Md Tasrifur Rahim — personal academic website

Plain HTML, CSS, and JavaScript. There is nothing to install and no build step: the files in this folder
are the website. It is ready for GitHub Pages at **https://tranikruet.github.io**.

---

## 1. Publish the site (first time)

1. Sign in to GitHub as **tranikruet**.
2. Click **+** (top right) → **New repository**.
3. For **Repository name**, type exactly: `tranikruet.github.io`
4. Choose **Public**. Leave everything else as it is and click **Create repository**.
5. On the new, empty repository page, click the link **uploading an existing file**.
6. Unzip the website zip on your computer. Open the unzipped folder, select **everything inside it**
   (all `.html` files, the `assets` folder, `README.md`, `robots.txt`, `sitemap.xml`, `favicon.ico`),
   and drag it all into the upload area in your browser.
   - Drag the *contents* of the folder, not the folder itself. `index.html` must end up at the top level.
   - Chrome, Edge, and Firefox keep the `assets` sub-folders when you drag them in.
   - There is also a hidden file called `.nojekyll`. If your computer hides it, that's fine; the site works without it.
7. Scroll down and click **Commit changes**. Wait until the upload finishes.
8. Go to **Settings** → **Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**,
   **Branch** to **main**, folder **/ (root)**, then click **Save** (it may already be set).
9. Wait 1–3 minutes, then open **https://tranikruet.github.io**. The **Actions** tab shows progress.

To check it before uploading, you can double-click `index.html` on your computer. Everything works
locally except the automatic CV check, which only runs on the live site.

---

## 2. Add your CV later

1. In the repository, open the `assets` folder, then the `cv` folder.
2. Click **Add file** → **Upload files** and upload your PDF named exactly:
   `Shah_Md_Tasrifur_Rahim_CV.pdf`
3. Commit. Within a few minutes the CV page shows **View CV** and **Download CV** automatically.
   To replace it later, upload a new file with the same name.

---

## 3. Everyday edits

Open a file on GitHub, click the pencil icon (**Edit this file**), make the change, and click **Commit changes**.
Each list in the HTML has a comment above it saying how to add a new item.

| What you want to change | File | What to do |
|---|---|---|
| Add a news item | `index.html` | Find `<!-- NEWS`. Copy one `<li>…</li>` line, paste it at the top of the list, change the date and text. |
| Add a published paper | `publications.html` | Find `<!-- PUBLICATIONS`. Copy one whole `<li class="entry" …>` block and edit it. Upload its image to `assets/research/`. |
| Update a manuscript's status | `research.html` and `index.html` | Change the badge text, e.g. `Manuscript under final revision` → `Accepted`. Only after it is officially accepted. |
| Add a gallery photo | `index.html` | Upload the photo to `assets/gallery/`, then copy one `<li class="slide">` block and change the file names, caption, and alt text. |
| End date of the DHL internship | `experience.html` | Change `Sep 2026 &ndash; Present` to the real end date. Also update the news item if you like. |
| Add a new role | `experience.html` | Find `<!-- EXPERIENCE`, copy one `<li>` block, and edit it. |

Photos: keep them under about 1400 px on the long side. WebP or JPG both work.

"Last updated" in the footer updates itself from GitHub; you don't need to edit it.

---

## 4. Add ORCID (or another profile link) later

The contact links appear in the header of `index.html` and in the footer of every page.
Search each `.html` file for `GitHub</a></li>` and add a new line after it, for example:

```html
<li><a href="https://orcid.org/0000-0000-0000-0000" rel="me noopener" target="_blank">ORCID</a></li>
```

---

## 5. Connect a custom domain later

1. Buy a domain (for example from Namecheap, Cloudflare, or Porkbun).
2. In GitHub: **Settings** → **Pages** → **Custom domain** → type your domain → **Save**.
3. At your domain provider, add these DNS records:
   - Four **A** records for the bare domain (`@`), pointing to:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record for `www`, pointing to `tranikruet.github.io`
4. Wait for GitHub to verify the domain (minutes to a few hours), then tick **Enforce HTTPS**.
5. Replace `https://tranikruet.github.io` with your new address in every `.html` file,
   `sitemap.xml`, and `robots.txt`, so search engines and link previews use the new domain.

---

## Folder structure

```
index.html            About (homepage): intro, gallery, news, selected research
research.html         Research interests, research journey, all research work
publications.html     Published papers with abstracts and BibTeX
experience.html       Education, tools & software, professional experience
awards.html           Best Track Paper Award, University Merit Scholarship
beyond.html           Leadership, public speaking, travel, reading, photography
cv.html               CV page (switches on automatically when the PDF is uploaded)
404.html              Page shown for broken links
assets/css/style.css  All styling (colors and fonts are set at the top)
assets/js/main.js     Menu, gallery, email protection, CV check, small animations
assets/fonts/         Self-hosted fonts (IBM Plex Sans, Source Serif 4)
assets/profile/       Profile photo
assets/gallery/       Homepage gallery photos
assets/research/      Research figures and visual abstracts
assets/experience/    Certificates (BAT, Unilever)
assets/awards/        Best Track Paper certificate
assets/hobbies/       Travel and photography photos
assets/cv/            Put your CV PDF here
assets/img/           Favicon and link-preview image
```
