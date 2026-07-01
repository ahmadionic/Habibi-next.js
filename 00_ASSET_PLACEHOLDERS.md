# 00_ASSET_PLACEHOLDERS.md

> **Placement:** Save at project ROOT as `/00_ASSET_PLACEHOLDERS.md`.
> **Purpose:** Before any design prompt runs, you must place real or placeholder image files into the exact folders below, using the exact numbered filenames. Every prompt in this kit references images **by these numbers**, so the AI never has to guess paths.

---

## Folder location

```
/public/assets/
  /logo/
  /portraits/
  /education/
  /workshops/
  /shop/
  /about/
  /icons/
```

## Required files (create empty/placeholder PNGs first if you don't have final art yet — see "Quick Placeholder Setup" below)

### `/public/assets/logo/`
| Filename | Description |
|---|---|
| `logo-primary.png` | Full circular badge logo (woman + cat + dog), transparent background |
| `logo-wordmark.png` | "CLAIRE OLIVIER / ART & WELLBEING" text-only lockup |
| `logo-icon.png` | Small icon/favicon version of the badge |
| `logo-white.png` | White/reversed version for dark backgrounds (footer, dark nav) |

### `/public/assets/icons/`
| Filename | Description |
|---|---|
| `icon-art.svg` | Palette icon (Fine Art & Creativity) |
| `icon-animal.svg` | Paw print icon (Animal Connection) |
| `icon-wellbeing.svg` | Heart icon (Well-being & Healing) |
| `icon-education.svg` | Open book icon (Education & Growth) |

### `/public/assets/portraits/` (Feature 2 — `/portraits` page)
| Filename | Used for |
|---|---|
| `hero-portraits.jpg` | Page hero background |
| `case-henry.jpg` | "Henry" case study |
| `case-grisette.jpg` | "Grisette" case study |
| `case-blackwhite.jpg` | "Black and White" case study |
| `case-sophie.jpg` | "Sophie" case study (Something Special package) |
| `case-closestfriend.jpg` | "Closest Friend" falcon case study |
| `case-daddysgirl.jpg` | "Daddy's Girl" case study |
| `case-carlos.jpg` | "Carlos" remembrance case study |
| `case-leen.jpg` | "Leen" remembrance case study |
| `case-stevie.jpg` | "Stevie" remembrance case study |

### `/public/assets/education/` (Feature 3 — `/education` page)
| Filename | Used for |
|---|---|
| `hero-education.jpg` | Page hero — Miss Claire with therapy quails |
| `claire-portrait.jpg` | Claire headshot/credential block |
| `program-math.jpg` | Math & Literacy program card |
| `program-reading.jpg` | Reading & Writing program card |
| `program-art.jpg` | Art & Crafts program card |
| `program-movingup.jpg` | Moving Up transition program card |

### `/public/assets/workshops/` (Feature 4 — `/workshops` page)
| Filename | Used for |
|---|---|
| `hero-workshops.jpg` | Page hero |
| `workshop-watercolour.jpg` | Seeds of Change workshop |
| `workshop-animalportrait.jpg` | Animal Portraits workshop |

### `/public/assets/shop/` (Feature 5 — `/shop`)
| Filename | Used for |
|---|---|
| `product-tote.jpg` | Tote bag mockup |
| `product-mug.jpg` | Mug mockup |
| `product-journal.jpg` | Planner/journal mockup |
| `product-cards.jpg` | Greeting cards mockup |
| `product-heritage.jpg` | Qatar Heritage Collection hero/mockup |
| `product-home.jpg` | Home essentials mockup |

### `/public/assets/about/` (Feature 6 — `/about`)
| Filename | Used for |
|---|---|
| `claire-bio.jpg` | Main about-page portrait |
| `claire-falcon.jpg` | Falcon illustration/photo |
| `claire-cat-collage.jpg` | Cat collage from brand book page 2 |

---

## Quick Placeholder Setup (run this in your terminal before Prompt 0.3)

If you don't yet have final photography/art, generate simple cream-colored placeholder rectangles so every `<Image>` component has something to render without breaking the build:

```bash
mkdir -p public/assets/{logo,icons,portraits,education,workshops,shop,about}
# Then drop any placeholder JPG/PNG/SVG into each folder using the exact filenames above.
# A simple option: use https://placehold.co (e.g., placehold.co/800x600/F7F3EC/334B3A?text=Coming+Soon)
# and save each result with the correct filename.
```

**This step is mandatory before Prompt Group 3+** — every component prompt assumes these files exist at these exact paths. If a path is missing, the AI should be told to use a `placehold.co` URL inline instead of breaking the build.
