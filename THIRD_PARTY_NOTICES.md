# Third-party materials and licenses

This inventory records evidence, not blanket permission. On 2026-11-05 the owner selected
MIT for code, documentation and design owned by AVstudio-Inc and confirmed ownership or
permission to redistribute that first-party material, without customer ownership or
contractual restrictions preventing publication. See LICENSE. Third-party materials are
excluded from that MIT grant. No editor/runtime binaries or custom plugin bundles are included.

## Fonts

The following metadata was read directly from the included binaries; no font was modified:

| File under AVstudio UI/theme/ | Embedded identity/version | Embedded license/copyright |
|---|---|---|
| audiowide_regular_d0232764ae.ttf | Audiowide Regular 1.003 | SIL OFL 1.1; Copyright (c) 2012 Brian J. Bonislawsky DBA Astigmatic (AOETI), Reserved Font Name Audiowide |
| poppins-thin-dthrt1kc.otf | Poppins Thin 3.200 | SIL OFL 1.1; Copyright 2014–2017 Indian Type Foundry; authors Ninad Kale and Jonny Pinhorn |
| sofia-dnih4rzx.ttf | Sofia Sans Extra Condensed Regular 4.100 | SIL OFL 1.1; Copyright 2019 The Sofia Sans Project Authors; lettersoup; Botio Nikoltchev and Ani Petrova |

[Official SIL OFL 1.1 terms](https://openfontlicense.org/open-font-license-official-text/)
allow bundling under their conditions; preserve copyright, license notices and reserved
names. The complete official license text is included in
[OFL-1.1.txt](AVstudio%20UI/theme/licenses/OFL-1.1.txt), and the copyright/author notices
transcribed from these binaries are in
[FONT-NOTICES.txt](AVstudio%20UI/theme/licenses/FONT-NOTICES.txt).
The font binaries remain unchanged and are not relicensed under MIT.

## SVG sprites — verified 2026-11-05

| File under AVstudio UI/assets/icons/ | Verified source via react-icons 5.6.0 | Artwork license |
|---|---|---|
| fa.svg | Font Awesome Free 5, reported 5.15.4-3-gafecf2a | CC BY 4.0, Fonticons, Inc. |
| fa6.svg | Font Awesome Free 6, reported 6.5.2 | CC BY 4.0, Fonticons, Inc. |
| ai.svg | Ant Design Icons, reported 4.4.2 | MIT, Copyright (c) 2018-present Ant UED |

All three sprites matched the NG-distributed files and were reproduced byte-for-byte
from published react-icons 5.6.0 data.
See [ICON-PROVENANCE.md](docs/ICON-PROVENANCE.md) for source commits, hashes and method.
The actual symbol counts are 1611, 2058 and 831 respectively.

Full attribution, conversion/modification disclosure and license texts are included in
[the icon notice directory](AVstudio%20UI/assets/licenses/icons/NOTICE.txt).
Font Awesome SVGs retain [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), which
requires attribution, a license link and change indications. The separate Ant Design
MIT notice is preserved. The react-icons MIT license does not relicense upstream artwork.
Trademarks remain with their respective owners; no endorsement or trademark license is implied.
Keep these notices with redistributed source and generated exports, including inlined SVGs.

## Photography — sources checked 2026-11-05

The following matches were checked by downloading public source previews and visually
comparing them with the existing local images. Local files are resized/cropped derivatives;
this is visual identification, not a byte-identical original-file claim. No template image
was uploaded to a reverse-image service. Presentation and camera backgrounds are visual source matches; the microphone image
is a direct download from its credited source.

| Local file under AVstudio UI/assets/images/ | Identified source / photographer | License and status |
|---|---|---|
| presentation_bg.jpg | [Pexels photo 8761513](https://www.pexels.com/photo/a-woman-in-white-long-sleeves-talking-while-holding-a-microphone-8761513/) — Pavel Danilyuk | Visual match confirmed; Pexels License, not MIT |
| camera_bg.jpg | [Unsplash photo lq87UxGSiEQ](https://unsplash.com/photos/black-and-silver-speaker-on-white-table-lq87UxGSiEQ) — Emiliano Cicero | Visual match confirmed; Unsplash License, not MIT |
| audio_bg.jpg | [Pexels photo 194985](https://www.pexels.com/photo/silver-condenser-microphone-194985/) — revac film's&photography | Verified source download; Pexels License, not MIT |

[Pexels License](https://www.pexels.com/license/) permits use in websites/apps and explicitly
mentions templates. It restricts standalone unaltered-image sales, stock/wallpaper
redistribution, offensive use of identifiable people and implied endorsement.
The presentation photograph is included as part of the designed UI, not sold as standalone
stock. Credit: Photo by Pavel Danilyuk on Pexels.

[Unsplash License](https://unsplash.com/license) permits copying, modification, distribution
and commercial use subject to its conditions, including restrictions on unmodified-image
sales and competing image services. The camera page identifies Emiliano Cicero and the
Unsplash License. Credit: Photo by Emiliano Cicero on Unsplash. The visible Logitech mark
does not imply sponsorship or endorsement, and no trademark license is asserted.

Keep both photographers' credits and source/license links when distributing this project.
These credits do not relicense the photos under MIT.
Credit: Photo by revac film's&photography on Pexels.
Download used: https://images.pexels.com/photos/194985/pexels-photo-194985.jpeg?auto=compress&cs=tinysrgb&w=900
It was supplied by the source CDN at 900 × 600 pixels; the JPEG is included unchanged. The Home screenshot
also reproduces these images and follows the same underlying rights status.

## Photo identification record

| File | Local SHA-256 |
|---|---|
| presentation_bg.jpg | 5a2b61358c8027ccd68db9a5e379f4cf396cd0a67c2ccd494fb167177c4ef3cd |
| camera_bg.jpg | 1867262b7527daad2e558bab1f1c40bd68697fc2018a45cf177de7d16c099cf1 |
| audio_bg.jpg | 4eb345fcaa73fd7c5b77996aac4172e89afaf64183299164e4218956580293a6 |

The microphone image is a direct download from the credited Pexels source. The other two source matches were
verified visually. Matching secondary-site use alone was not accepted as license evidence.

## Other dependencies

AVstudio editor/runtime and Crestron platform licenses are separate. No assurance is made
that a template license licenses those products. There are no video files, vendored custom
component bundles or npm dependency manifests in the source distribution. The owner has confirmed ownership or redistribution permission for the first-party theme
and project-specific JavaScript.

## Preview screenshots

`docs/screenshots/*.png` are unedited captures of this template's local preview on
2026-11-05. They reproduce the included UI, icons, fonts and (on Home) photography;
those underlying materials retain their respective rights; the source and license records above apply. Capturing an image does not supply missing redistribution permission.

## Trademarks

Crestron® and Crestron ONE® are trademarks or registered trademarks of Crestron
Electronics, Inc. This template is not affiliated with, endorsed by, or sponsored by
Crestron Electronics, Inc. Other product and company names belong to their respective
owners. No trademark rights are granted by the template license.
