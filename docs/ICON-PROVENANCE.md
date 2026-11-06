# SVG icon provenance — verified 2026-11-05

The three existing sprites are unchanged. They match the icon bundles distributed in
AVstudio NG 27.0.44 and were independently reproduced byte-for-byte from the published
`react-icons@5.6.0` package. This closes the earlier uncertainty about these files' origin;
it is a scoped source/license check, not a full AVstudio dependency compliance audit.

| Sprite | Symbols reproduced | SHA-256 |
|---|---:|---|
| fa.svg | 1611 | `a19e59d7ee83dbbcdeb652e4ff2c9d67ea2df38c52b0b248027d583b8243deac` |
| fa6.svg | 2058 | `cfb6a3360e6ccc49122ee1176a1f723ad8cc81e750ac064e514a4a0690b2b505` |
| ai.svg | 831 | `c22ee1fa6da94242fc09b8d1fd5646a20bcf85d95e70c43b97cea169a301b7ba` |

Source chain:

1. AVstudio uses `react-icons` version 5.6.0 for generating symbol sprites.
2. Its generator reads GenIcon node data, converts attributes to SVG XML, wraps paths
   inside named `<symbol>` entries and writes one `<defs>` sprite per icon pack.
3. All symbols and order were reconstructed with a local data-only parser; no third-party
   installation or build scripts were run. Output bytes match the distributed sprites
   and the current project files exactly.
4. Upstream versions and commits come from react-icons 5.6.0 README and
   [its pinned source definitions](https://github.com/react-icons/react-icons/blob/v5.6.0/packages/react-icons/src/icons/index.ts).
   Reported family versions are labels from that package; pinned commits are the more
   precise upstream reference. Reported README icon totals can differ from the actual
   exported symbols; this table records actual reproduced exports.

Font Awesome Free 5/6 SVG artwork is CC BY 4.0; Ant Design Icons is MIT. The intermediary
react-icons package has its own MIT notice and explicitly defers to icon-family licenses.
A React UI dependency named `@ant-design/icons` elsewhere in the editor is not evidence
for the version used to generate ai.svg; the verified source is the react-icons data.

Full notices, upstream copyright, source links and conversion disclosures are stored in
`AVstudio UI/assets/licenses/icons/`. Font Awesome SVG artwork is excluded from the
first-party MIT grant. Ant Design retains its own upstream MIT copyright notice.
No blanket relicense or trademark permission is asserted.

The reviewed exporter copies assets except icon SVGs, then inlines used sprite data.
The chosen notice location is under assets so it follows the existing copy operation.
A deployment build has been generated, as confirmed by the owner. Its license notices
have not been inspected in this review; verify the
notice files are included in the final export before deployment/distribution.
