import moment from "moment";

export default function ({
  name,
  address,
  phone,
  email,
  dueDate,
  date,
  id,
  notes,
  subTotal,
  type,
  vat,
  total,
  items,
  status,
  totalAmountReceived,
  balanceDue,
  company,
}) {
  const today = new Date();
  return `<!DOCTYPE html>
<html class="no-js" lang="en">
  <head>
    <!-- Meta Tags -->
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="Laralink" />
    <!-- Site Title -->
    <title>General Purpose Invoice-4</title>
    <link rel="stylesheet" href="css/style.css" />
    <style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap");
*,
::after,
::before {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}
@page {
  size: A4 !important; /* Standard A4 size */
  margin: 0 !important; /* Remove default margin */
}
html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
}

main {
  display: block;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

hr {
  -webkit-box-sizing: content-box;
          box-sizing: content-box; 
  height: 0; 
  overflow: visible; 
}

pre {
  font-family: monospace, monospace; 
  font-size: 1em; 
}

a {
  background-color: transparent;
}

abbr[title] {
  border-bottom: none; 
  text-decoration: underline; 
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted; 
}

b,
strong {
  font-weight: bolder;
}

code,
kbd,
samp {
  font-family: monospace, monospace; 
  font-size: 1em; 
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

img {
  border-style: none;
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; 
  font-size: 100%; 
  line-height: 1.15; 
  margin: 0; 
}

button,
input {

  overflow: visible;
}

button,
select {

  text-transform: none;
}

button,
[type=button],
[type=reset],
[type=submit] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type=button]::-moz-focus-inner,
[type=reset]::-moz-focus-inner,
[type=submit]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring,
[type=button]:-moz-focusring,
[type=reset]:-moz-focusring,
[type=submit]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

legend {
  -webkit-box-sizing: border-box;
          box-sizing: border-box; 
  color: inherit; 
  display: table; 
  max-width: 100%; 
  padding: 0; 
  white-space: normal; 
}

progress {
  vertical-align: baseline;
}

textarea {
  overflow: auto;
}

[type=checkbox],
[type=radio] {
  -webkit-box-sizing: border-box;
          box-sizing: border-box; 
  padding: 0; 
}

[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

[type=search] {
  -webkit-appearance: textfield; 
  outline-offset: -2px; 
}

[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button; 
  font: inherit; 
}

details {
  display: block;
}

summary {
  display: list-item;
}

template {
  display: none;
}

[hidden] {
  display: none;
}

body,
html {
  color: #666;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6em;
  overflow-x: hidden;
  background-color: #f5f6fa;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  clear: both;
  color: #111;
  padding: 0;
  margin: 0 0 20px 0;
  font-weight: 500;
  line-height: 1.2em;
}

h1 {
  font-size: 60px;
}

h2 {
  font-size: 48px;
}

h3 {
  font-size: 30px;
}

h4 {
  font-size: 24px;
}

h5 {
  font-size: 18px;
}

h6 {
  font-size: 16px;
}

p,
div {
  margin-top: 0;
  line-height: 1.5em;
}

p {
  margin-bottom: 15px;
}

ul {
  margin: 0 0 25px 0;
  padding-left: 20px;
  list-style: disc;
}

ol {
  padding-left: 20px;
  margin-bottom: 25px;
}

dfn,
cite,
em,
i {
  font-style: italic;
}

blockquote {
  margin: 0 15px;
  font-style: italic;
  font-size: 20px;
  line-height: 1.6em;
  margin: 0;
}

address {
  margin: 0 0 15px;
}

img {
  border: 0;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}

a {
  color: inherit;
  text-decoration: none;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
a:hover {
  color: #007aff;
}

button {
  color: inherit;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

a:hover {
  text-decoration: none;
  color: inherit;
}

table {
  width: 100%;
  caption-side: bottom;
  border-collapse: collapse;
}

th {
  text-align: left;
}

td {
  border-top: 1px solid #dbdfea;
}

td {
  padding: 10px 15px;
  line-height: 1.55em;
}

th {
  padding: 10px 15px;
  line-height: 1.55em;
}

dl {
  margin-bottom: 25px;
}
dl dt {
  font-weight: 600;
}

b,
strong {
  font-weight: bold;
}

pre {
  color: #666;
  border: 1px solid #dbdfea;
  font-size: 18px;
  padding: 25px;
  border-radius: 5px;
}

kbd {
  font-size: 100%;
  background-color: #666;
  border-radius: 5px;
}

a:hover {
  color: #007aff;
}

ul {
  padding-left: 15px;
}

.tm_f10 {
  font-size: 10px;
}

.tm_f11 {
  font-size: 11px;
}

.tm_f12 {
  font-size: 12px;
}

.tm_f13 {
  font-size: 13px;
}

.tm_f14 {
  font-size: 14px;
}

.tm_f15 {
  font-size: 15px;
}

.tm_f16 {
  font-size: 16px;
}

.tm_f17 {
  font-size: 17px;
}

.tm_f18 {
  font-size: 18px;
}

.tm_f19 {
  font-size: 19px;
}

.tm_f20 {
  font-size: 20px;
}

.tm_f21 {
  font-size: 21px;
}

.tm_f22 {
  font-size: 22px;
}

.tm_f23 {
  font-size: 23px;
}

.tm_f24 {
  font-size: 24px;
}

.tm_f25 {
  font-size: 25px;
}

.tm_f26 {
  font-size: 26px;
}

.tm_f27 {
  font-size: 27px;
}

.tm_f28 {
  font-size: 28px;
}

.tm_f29 {
  font-size: 29px;
}

.tm_f30 {
  font-size: 30px;
}

.tm_f40 {
  font-size: 40px;
}

.tm_f50 {
  font-size: 50px;
}

.tm_light {
  font-weight: 300;
}

.tm_normal {
  font-weight: 400;
}

.tm_medium {
  font-weight: 500;
}

.tm_semi_bold {
  font-weight: 600;
}

.tm_bold {
  font-weight: 700;
}

.tm_m0 {
  margin: 0px;
}

.tm_mb0 {
  margin-bottom: 0px;
}

.tm_mb1 {
  margin-bottom: 1px;
}

.tm_mb2 {
  margin-bottom: 2px;
}

.tm_mb3 {
  margin-bottom: 3px;
}

.tm_mb4 {
  margin-bottom: 4px;
}

.tm_mb5 {
  margin-bottom: 5px;
}

.tm_mb6 {
  margin-bottom: 6px;
}

.tm_mb7 {
  margin-bottom: 7px;
}

.tm_mb8 {
  margin-bottom: 8px;
}

.tm_mb9 {
  margin-bottom: 9px;
}

.tm_mb10 {
  margin-bottom: 10px;
}

.tm_mb11 {
  margin-bottom: 11px;
}

.tm_mb12 {
  margin-bottom: 12px;
}

.tm_mb13 {
  margin-bottom: 13px;
}

.tm_mb14 {
  margin-bottom: 14px;
}

.tm_mb15 {
  margin-bottom: 15px;
}

.tm_mb16 {
  margin-bottom: 16px;
}

.tm_mb17 {
  margin-bottom: 17px;
}

.tm_mb18 {
  margin-bottom: 18px;
}

.tm_mb19 {
  margin-bottom: 19px;
}

.tm_mb20 {
  margin-bottom: 20px;
}

.tm_mb21 {
  margin-bottom: 21px;
}

.tm_mb22 {
  margin-bottom: 22px;
}

.tm_mb23 {
  margin-bottom: 23px;
}

.tm_mb24 {
  margin-bottom: 24px;
}

.tm_mb25 {
  margin-bottom: 25px;
}

.tm_mb26 {
  margin-bottom: 26px;
}

.tm_mb27 {
  margin-bottom: 27px;
}

.tm_mb28 {
  margin-bottom: 28px;
}

.tm_mb29 {
  margin-bottom: 29px;
}

.tm_mb30 {
  margin-bottom: 30px;
}

.tm_mb40 {
  margin-bottom: 40px;
}

.tm_pt25 {
  padding-top: 25px;
}

.tm_pt0 {
  padding-top: 0;
}

.tm_radius_6_0_0_6 {
  border-radius: 6px 0 0 6px;
}

.tm_radius_0_6_6_0 {
  border-radius: 0 6px 6px 0;
}

.tm_radius_0 {
  border-radius: 0 !important;
}

.tm_width_1 {
  width: 8.33333333%;
}

.tm_width_2 {
  width: 16.66666667%;
}

.tm_width_3 {
  width: 25%;
}

.tm_width_4 {
  width: 33.33333333%;
}

.tm_width_5 {
  width: 41.66666667%;
}

.tm_width_6 {
  width: 50%;
}

.tm_width_7 {
  width: 58.33333333%;
}

.tm_width_8 {
  width: 66.66666667%;
}

.tm_width_9 {
  width: 75%;
}

.tm_width_10 {
  width: 83.33333333%;
}

.tm_width_11 {
  width: 91.66666667%;
}

.tm_width_12 {
  width: 100%;
}

.tm_border {
  border: 1px solid #dbdfea;
}

.tm_border_bottom {
  border-bottom: 1px solid #dbdfea;
}

.tm_border_top {
  border-top: 1px solid #dbdfea;
}

.tm_border_left {
  border-left: 1px solid #dbdfea;
}

.tm_border_right {
  border-right: 1px solid #dbdfea;
}

.tm_round_border {
  border: 1px solid #dbdfea;
  overflow: hidden;
  border-radius: 6px;
}

.tm_accent_color,
.tm_accent_color_hover:hover {
  color: #007aff;
}

.tm_accent_bg,
.tm_accent_bg_hover:hover {
  background-color: #007aff;
}

.tm_accent_bg_10 {
  background-color: rgba(0, 122, 255, 0.1);
}

.tm_accent_bg_20 {
  background-color: rgba(0, 122, 255, 0.15);
}

.tm_green_bg {
  background-color: #34c759;
}

.tm_green_bg_15 {
  background-color: rgba(52, 199, 89, 0.1);
}

.tm_primary_bg,
.tm_primary_bg_hover:hover {
  background-color: #111;
}

.tm_primary_bg_2 {
  background-color: #000036;
}

.tm_danger_color {
  color: red;
}

.tm_primary_color {
  color: #111;
}

.tm_secondary_color {
  color: #666;
}

.tm_ternary_color {
  color: #b5b5b5;
}

.tm_white_color {
  color: #fff;
}

.tm_white_color_60 {
  color: rgba(255, 255, 255, 0.6);
}

.tm_gray_bg {
  background: #f5f6fa;
}

.tm_ternary_bg {
  background-color: #b5b5b5;
}

.tm_accent_10_bg {
  background-color: rgba(0, 122, 255, 0.1);
}

.tm_accent_border {
  border-color: #007aff;
}

.tm_accent_border_10 {
  border-color: rgba(0, 122, 255, 0.1);
}

.tm_accent_border_20 {
  border-color: rgba(0, 122, 255, 0.2);
}

.tm_accent_border_30 {
  border-color: rgba(0, 122, 255, 0.3);
}

.tm_accent_border_40 {
  border-color: rgba(0, 122, 255, 0.4);
}

.tm_accent_border_50 {
  border-color: rgba(0, 122, 255, 0.5);
}

.tm_primary_border {
  border-color: #111;
}

.tm_gray_border {
  border-color: #f5f6fa;
}

.tm_primary_border_2 {
  border-color: #000036;
}

.tm_secondary_border {
  border-color: #666;
}

.tm_ternary_border {
  border-color: #b5b5b5;
}

.tm_border_color {
  border-color: #dbdfea;
}

.tm_border_1 {
  border-style: solid;
  border-width: 1px;
}

.tm_body_lineheight {
  line-height: 1.5em;
}

.tm_invoice_in {
  position: relative;
  z-index: 100;
}

.tm_container {

  padding: 30px 15px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.tm_text_center {
  text-align: center;
}

.tm_text_uppercase {
  text-transform: uppercase;
}

.tm_text_right {
  text-align: right;
}

.tm_align_center {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

.tm_border_bottom_0 {
  border-bottom: 0;
}

.tm_border_top_0 {
  border-top: 0;
}

.tm_table_baseline {
  vertical-align: baseline;
}

.tm_border_none {
  border: none !important;
}

.tm_flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_justify_between {
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}

.tm__align_center {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

.tm_border_left_none {
  border-left-width: 0;
}

.tm_border_right_none {
  border-right-width: 0;
}

.tm_table_responsive {
  overflow-x: auto;
}
.tm_table_responsive > table {
  min-width: 600px;
}

.tm_50_col > * {
  width: 50%;
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
}

.tm_no_border {
  border: none !important;
}

.tm_grid_row {
  display: grid;
  grid-gap: 10px 20px;
  list-style: none;
  padding: 0;
}

.tm_col_2 {
  grid-template-columns: repeat(2, 1fr);
}

.tm_col_3 {
  grid-template-columns: repeat(3, 1fr);
}

.tm_col_4 {
  grid-template-columns: repeat(4, 1fr);
}

.tm_max_w_150 {
  max-width: 150px;
}

.tm_left_auto {
  margin-left: auto;
}

hr {
  background: #dbdfea;
  height: 1px;
  border: none;
  margin: 0;
}

.tm_invoice {
  background: #fff;
  border-radius: 10px;
  padding: 50px;
}

.tm_invoice_footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.tm_invoice_footer table {
  margin-top: -1px;
}
.tm_invoice_footer .tm_left_footer {
  width: 58%;
  padding: 10px 15px;
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
}
.tm_invoice_footer .tm_right_footer {
  width: 42%;
}

.tm_note {
  margin-top: 30px;
  font-style: italic;
}

.tm_font_style_normal {
  font-style: normal;
}

.tm_sign img {
  max-height: 45px;
}

.tm_coffee_shop_img {
  position: absolute;
  height: 200px;
  opacity: 0.04;
  top: 40px;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
}
.tm_coffee_shop_img img {
  max-height: 100%;
}

.tm_invoice.tm_style1 .tm_invoice_right {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
  width: 60%;
}
.tm_invoice.tm_style1 .tm_invoice_table {
  grid-gap: 1px;
}
.tm_invoice.tm_style1 .tm_invoice_table > * {
  border: 1px solid #dbdfea;
  margin: -1px;
  padding: 8px 15px 10px;
}
.tm_invoice.tm_style1 .tm_invoice_head {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
.tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_right div {
  line-height: 1em;
}
.tm_invoice.tm_style1 .tm_invoice_info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
.tm_invoice.tm_style1 .tm_invoice_info_2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  border-top: 1px solid #dbdfea;
  border-bottom: 1px solid #dbdfea;
  padding: 11px 0;
}
.tm_invoice.tm_style1 .tm_invoice_seperator {
  min-height: 18px;
  border-radius: 1.6em;
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
  margin-right: 20px;
}
.tm_invoice.tm_style1 .tm_invoice_info_list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.tm_invoice.tm_style1 .tm_invoice_info_list > *:not(:last-child) {
  margin-right: 20px;
}
.tm_invoice.tm_style1 .tm_logo img {
  max-height: 50px;
}
.tm_invoice.tm_style1 .tm_logo.tm_size1 img {
  max-height: 60px;
}
.tm_invoice.tm_style1 .tm_logo.tm_size2 img {
  max-height: 70px;
}
.tm_invoice.tm_style1 .tm_grand_total {
  padding: 8px 15px;
}
.tm_invoice.tm_style1 .tm_box_3 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.tm_invoice.tm_style1 .tm_box_3 > * {
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
}
.tm_invoice.tm_style1 .tm_box_3 ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.tm_invoice.tm_style1 .tm_box_3 ul li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.tm_invoice.tm_style1 .tm_box_3 ul li:not(:last-child) {
  margin-bottom: 5px;
}
.tm_invoice.tm_style1 .tm_box_3 ul span {
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
}
.tm_invoice.tm_style1 .tm_box_3 ul span:first-child {
  margin-right: 5px;
}
.tm_invoice.tm_style1 .tm_box_3 ul span:last-child {
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
}

.tm_invoice.tm_style2 .tm_invoice_head {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  border-bottom: 1px solid #dbdfea;
  padding-bottom: 15px;
  position: relative;
}
.tm_invoice.tm_style2 .tm_invoice_left {
  width: 30%;
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
}
.tm_invoice.tm_style2 .tm_invoice_right {
  width: 70%;
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
}
.tm_invoice.tm_style2 .tm_invoice_info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.tm_invoice.tm_style2 .tm_invoice_info_left {
  width: 30%;
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
}
.tm_invoice.tm_style2 .tm_invoice_info_right {
  width: 70%;
  -webkit-box-flex: 0;
      -ms-flex: none;
          flex: none;
}
.tm_invoice.tm_style2 .tm_logo img {
  max-height: 60px;
}
.tm_invoice.tm_style2 .tm_invoice_title {
  line-height: 0.8em;
}
.tm_invoice.tm_style2 .tm_invoice_info_in {
  padding: 12px 20px;
  border-radius: 10px;
}
.tm_invoice.tm_style2 .tm_card_note {
  display: inline-block;
  padding: 6px 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  margin-top: 5px;
}
.tm_invoice.tm_style2 .tm_invoice_footer .tm_left_footer {
  padding-left: 0;
}

.tm_invoice.tm_style1.tm_type1 {
  padding: 0px 50px 30px;
  position: relative;
  overflow: hidden;
  border-radius: 0;
}
.tm_invoice.tm_style1.tm_type1 .tm_invoice_head {
  height: 110px;
  position: relative;
}
.tm_invoice.tm_style1.tm_type1 .tm_shape_bg {
  position: absolute;
  height: 100%;
  width: 70%;
  -webkit-transform: skewX(35deg);
          transform: skewX(35deg);
  top: 0px;
  right: -100px;
  overflow: hidden;
}
.tm_invoice.tm_style1.tm_type1 .tm_shape_bg img {
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
     object-fit: cover;
  -webkit-transform: skewX(-35deg) translateX(-45px);
          transform: skewX(-35deg) translateX(-45px);
}
.tm_invoice.tm_style1.tm_type1 .tm_invoice_right {
  position: relative;
  z-index: 2;
}
.tm_invoice.tm_style1.tm_type1 .tm_logo img {
  max-height: 70px;
}
.tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
  margin-right: 0;
  border-radius: 0;
  -webkit-transform: skewX(35deg);
          transform: skewX(35deg);
  position: absolute;
  height: 100%;
  width: 57.5%;
  right: -60px;
  overflow: hidden;
  border: none;
}
.tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator img {
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
     object-fit: cover;
  -webkit-transform: skewX(-35deg);
          transform: skewX(-35deg);
  -webkit-transform: skewX(-35deg) translateX(-10px);
          transform: skewX(-35deg) translateX(-10px);
}
.tm_invoice.tm_style1.tm_type1 .tm_invoice_info {
  position: relative;
  padding: 4px 0;
}
.tm_invoice.tm_style1.tm_type1 .tm_card_note,
.tm_invoice.tm_style1.tm_type1 .tm_invoice_info_list {
  position: relative;
  z-index: 1;
}

.tm_invoice.tm_style3 {
  padding: 0;
}
.tm_invoice.tm_style3 .tm_invoice_head {
  padding: 60px 50px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  border-radius: 10px 10px 0 0;
}
.tm_invoice.tm_style3 .tm_head_address {
  border-left: 2px solid;
  padding: 0px 0 0px 15px;
}
.tm_invoice.tm_style3 .tm_invoice_left,
.tm_invoice.tm_style3 .tm_invoice_right {
  position: relative;
  z-index: 1;
}
.tm_invoice.tm_style3 .tm_watermark_title {
  position: absolute;
  left: 0;
  top: 0;
  line-height: 1em;
  font-size: 165px;
  font-weight: bold;
  padding: 20px 30px 20px 30px;
  letter-spacing: 18px;
  opacity: 0.08;
}
.tm_invoice.tm_style3 .tm_invoice_info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: end;
      -ms-flex-align: end;
          align-items: flex-end;
  padding: 0 50px;
  margin-top: -25px;
  padding-bottom: 40px;
}
.tm_invoice.tm_style3 .tm_invoice_info_left {
  padding: 20px 30px;
  position: relative;
  z-index: 2;
}
.tm_invoice.tm_style3 .tm_invoice_details {
  padding: 0 50px 50px 50px;
}
.tm_invoice.tm_style3 .tm_table.tm_style1 th {
  border-color: rgba(255, 255, 255, 0.231372549);
}
.tm_invoice.tm_style3 .tm_invoice_footer .tm_left_footer {
  padding: 20px 15px;
}

@media (min-width: 500px) {
  .tm_invoice.tm_style1.tm_type2 {
    position: relative;
    overflow: hidden;
    border-radius: 0;
  }
  .tm_invoice.tm_style1.tm_type2 td {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_pt0 {
    padding-top: 0;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_bars {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 0px;
    left: 50%;
    -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
    overflow: hidden;
    padding: 0 15px;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_bars span {
    height: 100px;
    width: 5px;
    display: block;
    margin: -15px 20px 0;
    -webkit-transform: rotate(-40deg);
            transform: rotate(-40deg);
  }
  .tm_invoice.tm_style1.tm_type2 .tm_bars.tm_type1 {
    top: initial;
    bottom: 0;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_bars.tm_type1 span {
    margin: 0 20px 0;
    position: relative;
    bottom: -15px;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_shape {
    height: 230px;
    width: 250px;
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_shape .tm_shape_in {
    position: absolute;
    height: 350px;
    width: 350px;
    -webkit-transform: rotate(40deg);
            transform: rotate(40deg);
    top: -199px;
    left: 67px;
    overflow: hidden;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_shape.tm_type1 {
    top: initial;
    bottom: 0;
    right: initial;
    left: 0;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_shape.tm_type1 .tm_shape_in {
    top: 135px;
    left: -153px;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_shape_2 {
    height: 120px;
    width: 120px;
    border: 5px solid currentColor;
    padding: 20px;
    position: absolute;
    bottom: -30px;
    right: 77px;
    -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
  }
  .tm_invoice.tm_style1.tm_type2 .tm_shape_2 .tm_shape_2_in {
    height: 100%;
    width: 100%;
    border: 20px solid currentColor;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_shape_2.tm_type1 {
    left: -76px;
    right: initial;
    bottom: 245px;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_shape_2.tm_type1 .tm_shape_2_in {
    border-width: 6px;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_invoice_right {
    width: 40%;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_logo img {
    max-height: 65px;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_invoice_footer {
    margin-bottom: 120px;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_right_footer {
    position: relative;
    padding: 6px 0;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_right_footer table {
    position: relative;
    z-index: 2;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_left_footer {
    padding: 30px 15px;
  }
  .tm_invoice.tm_style1.tm_type2 .tm_shape_3 {
    position: absolute;
    top: 0;
    left: -40px;
    height: 100%;
    width: calc(100% + 150px);
    -webkit-transform: skewX(35deg);
            transform: skewX(35deg);
  }
  .tm_invoice.tm_style1.tm_type2 .tm_shape_4 {
    position: absolute;
    bottom: 200px;
    left: 0;
    height: 200px;
    width: 200px;
  }
}
.tm_invoice.tm_style1.tm_type3 {
  position: relative;
  overflow: hidden;
  border-radius: 0;
}
.tm_invoice.tm_style1.tm_type3 .tm_shape_1 {
  position: absolute;
  top: -1px;
  left: 0;
}
.tm_invoice.tm_style1.tm_type3 .tm_shape_2 {
  position: absolute;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.tm_invoice.tm_style1.tm_type3 .tm_logo img {
  max-height: 60px;
}
.tm_invoice.tm_style1.tm_type3 .tm_invoice_head.tm_mb20 {
  margin-bottom: 65px;
}
.tm_invoice.tm_style1.tm_type3 .tm_invoice_info_list {
  position: relative;
  padding: 10px 0 10px 40px;
}
.tm_invoice.tm_style1.tm_type3 .tm_invoice_info_list_bg {
  position: absolute;
  height: 100%;
  width: calc(100% + 100px);
  top: 0;
  left: 0;
  border-radius: 20px 0 0 0px;
  -webkit-transform: skewX(-35deg);
          transform: skewX(-35deg);
}

.tm_invoice.tm_style2.tm_type1 {
  padding-top: 0;
  padding-bottom: 0;
  border-width: 40px 0 0;
  border-style: solid;
  position: relative;
  overflow: hidden;
}
.tm_invoice.tm_style2.tm_type1.tm_small_border {
  border-width: 7px 0 0;
}
.tm_invoice.tm_style2.tm_type1 .tm_shape_bg {
  position: absolute;
  height: 100%;
  width: 42%;
  -webkit-transform: skewX(-35deg);
          transform: skewX(-35deg);
  top: 0px;
  left: -100px;
}
.tm_invoice.tm_style2.tm_type1 .tm_invoice_head {
  padding-top: 15px;
  border-bottom: none;
}
.tm_invoice.tm_style2.tm_type1 .tm_logo {
  position: relative;
  z-index: 2;
}
.tm_invoice.tm_style2.tm_type1 .tm_bottom_invoice {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 15px 50px 20px;
  border-top: 1px solid #dbdfea;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  margin: 30px -50px 0;
}

.tm_invoice_content {
  position: relative;
  z-index: 10;
}

.tm_invoice_wrap {
  position: relative;
}

.tm_note_list li:not(:last-child) {
  margin-bottom: 5px;
}

.tm_list.tm_style1 {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tm_list.tm_style1 svg {
  width: 16px;
  height: initial;
}
.tm_list.tm_style1 .tm_list_icon {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  left: 0;
  top: 3px;
}
.tm_list.tm_style1 li {
  padding-left: 25px;
  position: relative;
}
.tm_list.tm_style1 li:not(:last-child) {
  margin-bottom: 5px;
}
.tm_list.tm_style1.tm_text_right li {
  padding-left: 0;
  padding-right: 25px;
}
.tm_list.tm_style1.tm_text_right .tm_list_icon {
  left: initial;
  right: 0;
}

.tm_section_heading {
  border-width: 0 0 1px 0;
  border-style: solid;
}
.tm_section_heading > span {
  display: inline-block;
  padding: 8px 15px;
  border-radius: 7px 7px 0 0;
}
.tm_section_heading .tm_curve_35 {
  margin-left: 12px;
  margin-right: 0;
}
.tm_section_heading .tm_curve_35 span {
  display: inline-block;
}

.tm_padd_15_20 {
  padding: 15px 20px;
}

.tm_padd_8_20 {
  padding: 8px 20px;
}

.tm_padd_20 {
  padding: 20px;
}

.tm_padd_15 {
  padding: 15px;
}

.tm_padd_10 {
  padding: 10px;
}

.tm_padd_5 {
  padding: 5px;
}

.tm_curve_35 {
  -webkit-transform: skewX(-35deg);
          transform: skewX(-35deg);
  padding: 12px 20px 12px 30px;
  margin-left: 22px;
  margin-right: 22px;
}
.tm_curve_35 > * {
  -webkit-transform: skewX(35deg);
          transform: skewX(35deg);
}

.tm_dark_invoice_body {
  background-color: #18191a;
}

.tm_dark_invoice {
  background: #252526;
  color: rgba(255, 255, 255, 0.65);
}
.tm_dark_invoice .tm_primary_color {
  color: rgba(255, 255, 255, 0.9);
}
.tm_dark_invoice .tm_secondary_color {
  color: rgba(255, 255, 255, 0.65);
}
.tm_dark_invoice .tm_ternary_color {
  color: rgba(255, 255, 255, 0.4);
}
.tm_dark_invoice .tm_gray_bg {
  background: rgba(255, 255, 255, 0.08);
}
.tm_dark_invoice .tm_border_color,
.tm_dark_invoice .tm_round_border,
.tm_dark_invoice td,
.tm_dark_invoice th,
.tm_dark_invoice .tm_border_top,
.tm_dark_invoice .tm_border_bottom {
  border-color: rgba(255, 255, 255, 0.1);
}
.tm_dark_invoice + .tm_invoice_btns {
  background: #252526;
  border-color: #252526;
}

@media (min-width: 1000px) {
  .tm_invoice_btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin-top: 0px;
    margin-left: 20px;
    position: absolute;
    left: 100%;
    top: 0;
    -webkit-box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
            box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
    border: 3px solid #fff;
    border-radius: 6px;
    background-color: #fff;
  }
  .tm_invoice_btn {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    border: none;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    position: relative;
  }
  .tm_invoice_btn svg {
    width: 24px;
  }
  .tm_invoice_btn .tm_btn_icon {
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 42px;
    width: 42px;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
  }
  .tm_invoice_btn .tm_btn_text {
    position: absolute;
    left: 100%;
    background-color: #111;
    color: #fff;
    padding: 3px 12px;
    display: inline-block;
    margin-left: 10px;
    border-radius: 5px;
    top: 50%;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
    font-weight: 500;
    min-height: 28px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    opacity: 0;
    visibility: hidden;
  }
  .tm_invoice_btn .tm_btn_text:before {
    content: "";
    height: 10px;
    width: 10px;
    position: absolute;
    background-color: #111;
    -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
    left: -3px;
    top: 50%;
    margin-top: -6px;
    border-radius: 2px;
  }
  .tm_invoice_btn:hover .tm_btn_text {
    opacity: 1;
    visibility: visible;
  }
  .tm_invoice_btn:not(:last-child) {
    margin-bottom: 3px;
  }
  .tm_invoice_btn.tm_color1 {
    background-color: rgba(0, 122, 255, 0.1);
    color: #007aff;
    border-radius: 5px 5px 0 0;
  }
  .tm_invoice_btn.tm_color1:hover {
    background-color: rgba(0, 122, 255, 0.2);
  }
  .tm_invoice_btn.tm_color2 {
    background-color: rgba(52, 199, 89, 0.1);
    color: #34c759;
    border-radius: 0 0 5px 5px;
  }
  .tm_invoice_btn.tm_color2:hover {
    background-color: rgba(52, 199, 89, 0.2);
  }
}
@media (max-width: 999px) {
  .tm_invoice_btns {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin-top: 0px;
    margin-top: 20px;
    -webkit-box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
            box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
    border: 3px solid #fff;
    border-radius: 6px;
    background-color: #fff;
    position: relative;
    left: 50%;
    -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
  }
  .tm_invoice_btn {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    border: none;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    position: relative;
    border-radius: 5px;
    padding: 6px 15px;
  }
  .tm_invoice_btn svg {
    width: 24px;
  }
  .tm_invoice_btn .tm_btn_icon {
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin-right: 8px;
  }
  .tm_invoice_btn:not(:last-child) {
    margin-right: 3px;
  }
  .tm_invoice_btn.tm_color1 {
    background-color: rgba(0, 122, 255, 0.1);
    color: #007aff;
  }
  .tm_invoice_btn.tm_color1:hover {
    background-color: rgba(0, 122, 255, 0.2);
  }
  .tm_invoice_btn.tm_color2 {
    background-color: rgba(52, 199, 89, 0.1);
    color: #34c759;
  }
  .tm_invoice_btn.tm_color2:hover {
    background-color: rgba(52, 199, 89, 0.2);
  }
}
@media (max-width: 767px) {
  .tm_col_4 {
    grid-template-columns: repeat(1, 1fr);
  }
  .tm_col_2_md {
    grid-template-columns: repeat(2, 1fr);
  }
  .tm_m0_md {
    margin: 0;
  }
  .tm_mb10_md {
    margin-bottom: 10px;
  }
  .tm_mb15_md {
    margin-bottom: 15px;
  }
  .tm_mb20_md {
    margin-bottom: 20px;
  }
  .tm_mobile_hide {
    display: none;
  }
  .tm_invoice {
    padding: 30px 20px;
  }
  .tm_invoice .tm_right_footer {
    width: 100%;
  }
  .tm_invoice_footer {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
        -ms-flex-direction: column-reverse;
            flex-direction: column-reverse;
  }
  .tm_invoice_footer .tm_left_footer {
    width: 100%;
    border-top: 1px solid #dbdfea;
    margin-top: -1px;
    padding: 15px 0;
  }
  .tm_invoice.tm_style2 .tm_card_note {
    margin-top: 0;
  }
  .tm_note.tm_text_center {
    text-align: left;
  }
  .tm_note.tm_text_center p br {
    display: none;
  }
  .tm_invoice_footer.tm_type1 {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  .tm_invoice.tm_style2 .tm_invoice_head {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  .tm_invoice.tm_style2 .tm_invoice_head > * {
    width: 100%;
  }
  .tm_invoice.tm_style2 .tm_invoice_head .tm_invoice_left {
    margin-bottom: 15px;
  }
  .tm_invoice.tm_style2 .tm_invoice_head .tm_text_right {
    text-align: left;
  }
  .tm_invoice.tm_style2 .tm_invoice_info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  .tm_invoice.tm_style2 .tm_invoice_info > * {
    width: 100%;
  }
  .tm_invoice.tm_style1.tm_type1 {
    padding: 30px 20px;
  }
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_head {
    height: initial;
  }
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
    padding-left: 15px;
    padding-right: 15px;
  }
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
    width: 100%;
    -webkit-transform: initial;
            transform: initial;
    right: 0;
    top: 0;
  }
  .tm_invoice.tm_style1.tm_type1 .tm_logo img {
    max-height: 60px;
  }
  .tm_invoice.tm_style2.tm_type1 {
    border-width: 20px 0 0;
  }
  .tm_invoice.tm_style2.tm_type1 .tm_shape_bg {
    width: 250px;
    height: 80px;
  }
  .tm_invoice.tm_style2.tm_type1 .tm_invoice_head .tm_text_center {
    text-align: left;
  }
  .tm_invoice.tm_style2.tm_type1 .tm_logo {
    top: -8px;
    margin-bottom: 15px;
  }
  .tm_invoice.tm_style2 .tm_invoice_info_in {
    padding: 12px 15px;
  }
  .tm_border_none_md {
    border: none !important;
  }
  .tm_border_left_none_md {
    border-left-width: 0;
  }
  .tm_border_right_none_md {
    border-right-width: 0;
  }
  .tm_padd_left_15_md {
    padding-left: 15px !important;
  }
  .tm_invoice.tm_style2 .tm_logo img {
    max-height: 50px;
  }
  .tm_curve_35 {
    -webkit-transform: skewX(0deg);
            transform: skewX(0deg);
    margin-left: 0;
    margin-right: 0;
  }
  .tm_curve_35 > * {
    -webkit-transform: inherit;
            transform: inherit;
  }
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator,
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator img {
    -webkit-transform: initial;
            transform: initial;
  }
  .tm_section_heading .tm_curve_35 {
    margin-left: 0;
  }
  .tm_shape_2.tm_type1 {
    display: none;
  }
  .tm_invoice.tm_style3 .tm_invoice_info {
    padding: 0px 20px 40px;
  }
  .tm_invoice.tm_style3 .tm_invoice_details {
    padding: 0px 20px 50px;
  }
  .tm_invoice.tm_style3 .tm_invoice_head {
    padding: 60px 20px;
  }
  .tm_invoice.tm_style3 .tm_watermark_title {
    letter-spacing: 5px;
    font-size: 20vw;
    padding: 27px 20px;
    top: 50%;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
    line-height: 1em;
  }
}
@media (max-width: 500px) {
  .tm_border_none_sm {
    border: none !important;
  }
  .tm_flex_column_sm {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  .tm_align_start_sm {
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
  }
  .tm_m0_sm {
    margin-bottom: 0;
  }
  .tm_invoice.tm_style1 .tm_logo {
    margin-bottom: 10px;
  }
  .tm_invoice.tm_style1 .tm_invoice_head {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  .tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_left,
  .tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_right {
    width: 100%;
  }
  .tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_right {
    text-align: left;
  }
  .tm_list.tm_style2 li {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  .tm_list.tm_style2 li > * {
    padding: 5px 20px;
  }
  .tm_col_2,
  .tm_col_3 {
    grid-template-columns: repeat(1, 1fr);
  }
  .tm_col_2_sm {
    grid-template-columns: repeat(2, 1fr);
  }
  .tm_table.tm_style1.tm_type1 {
    padding: 0px 20px;
  }
  .tm_box2_wrap {
    grid-template-columns: repeat(1, 1fr);
  }
  .tm_box.tm_style1.tm_type1 {
    max-width: 100%;
    width: 100%;
  }
  .tm_invoice.tm_style1 .tm_invoice_left {
    max-width: 100%;
  }
  .tm_f50 {
    font-size: 30px;
  }
  .tm_invoice.tm_style1 .tm_invoice_info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
        -ms-flex-direction: column-reverse;
            flex-direction: column-reverse;
  }
  .tm_invoice.tm_style1 .tm_invoice_seperator {
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    width: 100%;
    margin-right: 0;
    min-height: 5px;
  }
  .tm_invoice.tm_style1 .tm_invoice_info_list {
    width: 100%;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
  }
  .tm_invoice.tm_style1 .tm_invoice_seperator + .tm_invoice_info_list {
    margin-bottom: 5px;
  }
  .tm_f30 {
    font-size: 22px;
  }
  .tm_invoice.tm_style1 .tm_box_3 {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  .tm_invoice.tm_style1 .tm_box_3 span br {
    display: none;
  }
  .tm_invoice.tm_style1 .tm_box_3 > *:not(:last-child) {
    margin-bottom: 15px;
  }
  .tm_invoice.tm_style1 .tm_box_3 ul li {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  .tm_invoice.tm_style1 .tm_box_3 ul li:not(:last-child) {
    margin-bottom: 5px;
  }
  .tm_invoice.tm_style3 .tm_watermark_title {
    font-size: 18.4vw;
    padding: 10px 15px;
    top: 0;
    -webkit-transform: initial;
            transform: initial;
    line-height: 1em;
  }
  .tm_invoice.tm_style3 .tm_invoice_head,
  .tm_invoice.tm_style3 .tm_invoice_info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
  }
  .tm_invoice.tm_style3 .tm_invoice_right {
    margin-top: 30px;
  }
  .tm_invoice.tm_style3 .tm_text_right {
    text-align: left;
  }
  .tm_invoice.tm_style3 .tm_invoice_info_right {
    margin-top: 20px;
  }
  .tm_invoice.tm_style3 .tm_table.tm_style1 {
    margin-bottom: 10px;
  }
}

@media print {
  .tm_gray_bg {
    background-color: #f5f6fa !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_ternary_bg {
    background-color: #b5b5b5 !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_primary_bg {
    background-color: #111 !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_secondary_bg {
    background-color: #666 !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_accent_bg {
    background-color: #007aff;
    -webkit-print-color-adjust: exact;
  }
  .tm_accent_bg_10 {
    background-color: rgba(0, 122, 255, 0.1) !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_accent_bg_20 {
    background-color: rgba(0, 122, 255, 0.15) !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_white_color {
    color: #fff !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_accent_color {
    color: #007aff !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_ternary_color {
    color: #b5b5b5 !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_hide_print {
    display: none !important;
  }
  .tm_dark_invoice .tm_gray_bg {
    background-color: #111 !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_dark_invoice {
    background: #111 !important;
    color: rgba(255, 255, 255, 0.65) !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_dark_invoice .tm_gray_bg {
    background: rgba(255, 255, 255, 0.05) !important;
    -webkit-print-color-adjust: exact;
  }
  hr {
    background: #dbdfea !important;
    -webkit-print-color-adjust: exact;
  }
  .tm_col_4,
  .tm_col_4.tm_col_2_md {
    grid-template-columns: repeat(4, 1fr);
  }
  .tm_col_2_md {
    grid-template-columns: repeat(2, 1fr);
  }
  .tm_mb1 {
    margin-bottom: 1px;
  }
  .tm_mb2 {
    margin-bottom: 2px;
  }
  .tm_mb3 {
    margin-bottom: 3px;
  }
  .tm_mb4 {
    margin-bottom: 4px;
  }
  .tm_mb5 {
    margin-bottom: 5px;
  }
  .tm_mb6 {
    margin-bottom: 6px;
  }
  .tm_mb7 {
    margin-bottom: 7px;
  }
  .tm_mb8 {
    margin-bottom: 8px;
  }
  .tm_mb9 {
    margin-bottom: 9px;
  }
  .tm_mb10 {
    margin-bottom: 10px;
  }
  .tm_mb11 {
    margin-bottom: 11px;
  }
  .tm_mb12 {
    margin-bottom: 12px;
  }
  .tm_mb13 {
    margin-bottom: 13px;
  }
  .tm_mb14 {
    margin-bottom: 14px;
  }
  .tm_mb15 {
    margin-bottom: 15px;
  }
  .tm_mb16 {
    margin-bottom: 16px;
  }
  .tm_mb17 {
    margin-bottom: 17px;
  }
  .tm_mb18 {
    margin-bottom: 18px;
  }
  .tm_mb19 {
    margin-bottom: 19px;
  }
  .tm_mb20 {
    margin-bottom: 20px;
  }
  .tm_mb21 {
    margin-bottom: 21px;
  }
  .tm_mb22 {
    margin-bottom: 22px;
  }
  .tm_mb23 {
    margin-bottom: 23px;
  }
  .tm_mb24 {
    margin-bottom: 24px;
  }
  .tm_mb25 {
    margin-bottom: 25px;
  }
  .tm_mb26 {
    margin-bottom: 26px;
  }
  .tm_mb27 {
    margin-bottom: 27px;
  }
  .tm_mb28 {
    margin-bottom: 28px;
  }
  .tm_mb29 {
    margin-bottom: 29px;
  }
  .tm_mb30 {
    margin-bottom: 30px;
  }
  .tm_mb40 {
    margin-bottom: 40px;
  }
  .tm_mobile_hide {
    display: block;
  }
  .tm_invoice {
    padding: 10px;
  }
  .tm_invoice .tm_right_footer {
    width: 42%;
  }
  .tm_invoice_footer {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
        -ms-flex-direction: initial;
            flex-direction: initial;
  }
  .tm_invoice_footer .tm_left_footer {
    width: 58%;
    padding: 10px 15px;
    -webkit-box-flex: 0;
        -ms-flex: none;
            flex: none;
    border-top: none;
    margin-top: 0px;
  }
  .tm_invoice.tm_style2 .tm_card_note {
    margin-top: 5px;
  }
  .tm_note.tm_text_center {
    text-align: center;
  }
  .tm_note.tm_text_center p br {
    display: initial;
  }
  .tm_invoice_footer.tm_type1 {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
        -ms-flex-direction: initial;
            flex-direction: initial;
  }
  .tm_invoice.tm_style2 .tm_invoice_head {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
        -ms-flex-direction: initial;
            flex-direction: initial;
  }
  .tm_invoice.tm_style2 .tm_invoice_head > .tm_invoice_left {
    width: 30%;
  }
  .tm_invoice.tm_style2 .tm_invoice_head > .tm_invoice_right {
    width: 70%;
  }
  .tm_invoice.tm_style2 .tm_invoice_head .tm_invoice_left {
    margin-bottom: initial;
  }
  .tm_invoice.tm_style2 .tm_invoice_head .tm_text_right {
    text-align: right;
  }
  .tm_invoice.tm_style2 .tm_invoice_info {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
        -ms-flex-direction: initial;
            flex-direction: initial;
  }
  .tm_invoice.tm_style2 .tm_invoice_info > .tm_invoice_info_left {
    width: 30%;
  }
  .tm_invoice.tm_style2 .tm_invoice_info > .tm_invoice_info_right {
    width: 70%;
  }
  .tm_invoice.tm_style1.tm_type1 {
    padding: 0px 20px 30px;
  }
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_head {
    height: 110px;
  }
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_info {
    padding: 4px 0;
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
        -ms-flex-direction: initial;
            flex-direction: initial;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
    top: initial;
    margin-right: 0;
    border-radius: 0;
    -webkit-transform: skewX(35deg);
            transform: skewX(35deg);
    position: absolute;
    height: 100%;
    width: 57.5%;
    right: -60px;
    overflow: hidden;
    border: none;
  }
  .tm_invoice.tm_style1.tm_type1 .tm_logo img {
    max-height: 70px;
  }
  .tm_invoice.tm_style2.tm_type1 {
    border-width: 20px 0 0;
  }
  .tm_invoice.tm_style2.tm_type1 .tm_shape_bg {
    height: 100%;
    width: 42%;
  }
  .tm_invoice.tm_style2.tm_type1 .tm_invoice_head .tm_text_center {
    text-align: center;
  }
  .tm_invoice.tm_style2.tm_type1 .tm_logo {
    top: initial;
    margin-bottom: initial;
  }
  .tm_invoice.tm_style2 .tm_invoice_info_in {
    padding: 12px 20px;
  }
  .tm_invoice.tm_style2 .tm_logo img {
    max-height: 60px;
  }
  .tm_curve_35 {
    -webkit-transform: skewX(-35deg);
            transform: skewX(-35deg);
    margin-left: 22px;
    margin-right: 22px;
  }
  .tm_curve_35 > * {
    -webkit-transform: skewX(35deg);
            transform: skewX(35deg);
  }
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
    -webkit-transform: skewX(35deg);
            transform: skewX(35deg);
  }
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator img {
    -webkit-transform: skewX(-35deg) translateX(-45px);
            transform: skewX(-35deg) translateX(-45px);
  }
  .tm_section_heading .tm_curve_35 {
    margin-left: 12px;
  }
  .tm_round_border {
    border-top-width: 2px;
  }
  .tm_border_left_none_md {
    border-left-width: 1px;
  }
  .tm_border_right_none_md {
    border-right-width: 1px;
  }
  .tm_note {
    margin-top: 30px;
  }
  .tm_pagebreak {
    page-break-before: always;
  }
  .tm_invoice.tm_style3 {
    padding: 0;
  }
  .tm_invoice.tm_style3 .tm_invoice_info {
    padding: 0px 15px 40px;
  }
  .tm_invoice.tm_style3 .tm_invoice_details {
    padding: 0px 15px 50px;
  }
  .tm_invoice.tm_style3 .tm_invoice_head {
    padding: 60px 15px;
  }
  .tm_invoice.tm_style3 .tm_watermark_title {
    letter-spacing: 5px;
    font-size: 150px;
    padding: 27px 15px 27px 15px;
  }
}
    </style>
  </head>

  <body>
    <div class="tm_container">
      <div class="tm_invoice_wrap">
        <div
          class="tm_invoice tm_style2 tm_type1 tm_accent_border"
          id="tm_download_section"
        >
          <div class="tm_invoice_in">
            <div class="tm_invoice_head tm_top_head tm_mb20 tm_mb10_md">
              <div class="tm_invoice_left">
                <div class="tm_logo">
                  <img
                    style="background-color: white; width: 150px; height: 450px"
                    src="https://www.kovaimannvaasanai.com/src/assets/brahmmis%20logo%20recreate.png"
                    alt="Logo"
                  />
                </div>
              </div>
              <div class="tm_invoice_right">
                <div class="tm_grid_row">
                  <table>
                    <thead style="width: fit-content">
                      <th>
                        <div class="">
                          <p class="tm_accent_color tm_mb0" >
                            <svg
                            style="margin-left: 50% !important ;"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 512 512"
                              fill="currentColor"
                            >
                              <path
                             
                                d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z"
                              ></path>
                            </svg>
                          </p>
                          <a
                            href="/cdn-cgi/l/email-protection"
                            class="__cf_email__"
                            data-cfemail="d8abada8a8b7aaac98bfb5b9b1b4f6bbb7b5"
                            >admin@gmail.com</a
                          >
                          <br />
                        </div>
                      </th>
                      <th > 
                        <div class="">
                          <p class="tm_accent_color tm_mb0">
                            
                              <svg
                              style="margin-left: 50% !important ;"
                               xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor"><path d="M391 480c-19.52 0-46.94-7.06-88-30-49.93-28-88.55-53.85-138.21-103.38C116.91 298.77 93.61 267.79 61 208.45c-36.84-67-30.56-102.12-23.54-117.13C45.82 73.38 58.16 62.65 74.11 52a176.3 176.3 0 0128.64-15.2c1-.43 1.93-.84 2.76-1.21 4.95-2.23 12.45-5.6 21.95-2 6.34 2.38 12 7.25 20.86 16 18.17 17.92 43 57.83 52.16 77.43 6.15 13.21 10.22 21.93 10.23 31.71 0 11.45-5.76 20.28-12.75 29.81-1.31 1.79-2.61 3.5-3.87 5.16-7.61 10-9.28 12.89-8.18 18.05 2.23 10.37 18.86 41.24 46.19 68.51s57.31 42.85 67.72 45.07c5.38 1.15 8.33-.59 18.65-8.47 1.48-1.13 3-2.3 4.59-3.47 10.66-7.93 19.08-13.54 30.26-13.54h.06c9.73 0 18.06 4.22 31.86 11.18 18 9.08 59.11 33.59 77.14 51.78 8.77 8.84 13.66 14.48 16.05 20.81 3.6 9.53.21 17-2 22-.37.83-.78 1.74-1.21 2.75a176.49 176.49 0 01-15.29 28.58c-10.63 15.9-21.4 28.21-39.38 36.58A67.42 67.42 0 01391 480z"></path></svg>
                           
                          </p>
                          <a
                          style="text-align: center;"
                            href="/cdn-cgi/l/email-protection"
                            class="__cf_email__"
                            data-cfemail="d8abada8a8b7aaac98bfb5b9b1b4f6bbb7b5"
                            >+ 99(0) 131 124 567
                            Monday to Friday</a
                          >
                          <br />
                        </div>
                      </th>
                      <th>
                        <div class="">
                          <p class="tm_accent_color tm_mb0" >
                            <svg
                            style="margin-left: 50% !important ;"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor"><circle cx="256" cy="192" r="32"></circle><path d="M256 32c-88.22 0-160 68.65-160 153 0 40.17 18.31 93.59 54.42 158.78 29 52.34 62.55 99.67 80 123.22a31.75 31.75 0 0051.22 0c17.42-23.55 51-70.88 80-123.22C397.69 278.61 416 225.19 416 185c0-84.35-71.78-153-160-153zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z"></path></svg>
                            </svg>
                          </p>
                          <a
                            href="/cdn-cgi/l/email-protection"
                            class="__cf_email__"
                            data-cfemail="d8abada8a8b7aaac98bfb5b9b1b4f6bbb7b5"
                            >${address}</a
                          >
                          <br />
                        </div>
                      </th>
                    
                      
                    </thead>
                  </table>
                </div>
              </div>
              <div class="tm_shape_bg tm_accent_bg"></div>
            </div>
            <div class="tm_invoice_info tm_mb10">
              <div class="tm_invoice_info_left">
                <p class="tm_mb2"><b>Invoice To:</b></p>
                <p>
                  <b class="tm_f16 tm_primary_color">${name}</b>
                  <br />
                  ${address}
                  <a
                    href="/cdn-cgi/l/email-protection"
                    class="__cf_email__"
                    data-cfemail="610d0e16040d0d21060c00080d4f020e0c"
                    >${email}</a
                  >
                  <br />
                 ${phone}
                </p>
              </div>
              <div class="tm_invoice_info_right">
                <div
                style="font-weight: 900; font-size: 44px; text-align: center;"
                >
                  Invoice
                </div>
                <div
                style="display: flex !important;   "
                  class=" tm_invoice_info_in tm_round_border tm_gray_bg"
                >
                <table>
                  <thead>
                    <th>
                      <div style="">
                        <span >Invoice No:</span> <br />
                        <b class="tm_f18 tm_accent_color">#${id}</b>
                      </div>
                    </th>
                    <th>
                      <div style="">
                        <span>Invoice Date:</span> <br />
                        <b class="tm_f18 tm_accent_color">${moment(date).format(
                          "ll"
                        )}</b>
                      </div>
                    </th>
                    <th>
                      <div >
                        <span>Grand Total:</span> <br />
                        <b class="tm_f18 tm_accent_color">${total}</b>
                      </div>
                    </th>
                  </thead>
                </table>
                  
                  
                 
                </div>
              </div>
            </div>
            <div class="tm_table tm_style1">
              <div class="tm_round_border">
                <div class="tm_table_responsive">
                  <table>
                    <thead>
                      <tr>
                        <th class="tm_width_7 tm_semi_bold tm_primary_color">
                          Item
                        </th>
                        <th class="tm_width_1 tm_semi_bold tm_primary_color">
                          Qty
                        </th>
                        <th class="tm_width_2 tm_semi_bold tm_primary_color">
                          Price
                        </th>
                        <th class="tm_width_2 tm_semi_bold tm_primary_color">
                          Disc(%)
                        </th>
                       
                        <th
                          class="tm_width_2 tm_semi_bold tm_primary_color tm_text_right"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    
                 ${items
  .map(
    (item) => `
  <tr class="tm_gray_bg">
    <td class="tm_width_7">
      <p class="tm_m0 tm_f16 tm_primary_color">${item.itemName}</p>
    </td>
    <td class="tm_width_1">${item.quantity}</td>
    <td class="tm_width_2">${item.unitPrice}</td>
    <td>${item.discount}</td>
    <td class="tm_width_2 tm_text_right">
      ${item.quantity * item.unitPrice - (item.quantity * item.unitPrice * (item.discount || 0)) / 100}
    </td>
  </tr>`
  )
  .join('')}

                     
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tm_invoice_footer tm_mb15 tm_m0_md">
                <div class="tm_left_footer">
                  <div class="tm_mb10 tm_m0_md"></div>
                   
                  <p class="tm_mb0">
                    <b class="tm_primary_color">Notes:</b> <br />
                    ${notes}
                  </p>
                </div>
                <div class="tm_right_footer">
                  <table class="tm_mb15">
                    <tbody>
                      <tr>
                        <td
                          class="tm_width_3 tm_primary_color tm_border_none tm_bold"
                        >
                        Sub Total 
                        </td>
                        <td
                          class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold"
                        >
                          $${subTotal}
                        </td>
                      </tr>
                      
                      <tr>
                        <td
                          class="tm_width_3 tm_danger_color tm_border_none tm_pt0"
                        >
                        Tax 5%
                        </td>
                        <td
                          class="tm_width_3 tm_danger_color tm_text_right tm_border_none tm_pt0"
                        >
                          +$${vat}
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="tm_width_3 tm_primary_color tm_border_none tm_pt0"
                        >
                          Total
                        </td>
                        <td
                          class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0"
                        >
                          +$${total}
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="tm_width_3 tm_primary_color tm_border_none tm_pt0"
                        >
                        Paid
                        </td>
                        <td
                          class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0"
                        >
                          +$${totalAmountReceived}
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="tm_width_3 tm_primary_color tm_border_none tm_pt0"
                        >
                       Balance Due
                        </td>
                        <td
                          class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0"
                        >
                          +$${balanceDue}
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="tm_width_3 tm_border_top_0 tm_bold tm_f18 tm_white_color tm_accent_bg tm_radius_6_0_0_6"
                        >
                          Grand Total
                        </td>
                        <td
                          class="tm_width_3 tm_border_top_0 tm_bold tm_f18 tm_primary_color tm_text_right tm_white_color tm_accent_bg tm_radius_0_6_6_0"
                        >
                          $1732
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tm_invoice_footer tm_type1">
                <div class="tm_left_footer"></div>
                <div class="tm_right_footer">
                  <div class="tm_sign tm_text_center">
                    <img
                      src="https://www.kovaimannvaasanai.com/src/assets/brahmmis%20logo%20recreate.png"
                      alt="Sign"
                    />
                    <p class="tm_m0 tm_ternary_color">Jhon Donate</p>
                    <p class="tm_m0 tm_f16 tm_primary_color">
                      Accounts Manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="tm_bottom_invoice">
              <div class="tm_bottom_invoice_left">
                <p class="tm_m0 tm_f18 tm_accent_color tm_mb5">
                  Thank you for your business.
                </p>
                <p class="tm_primary_color tm_f12 tm_m0 tm_bold">
                  Terms & Condition
                </p>
                <p class="tm_m0 tm_f12">
                  IInvoice was created on a computer and is valid without the
                  signature and seal.
                </p>
              </div>
              <div class="tm_bottom_invoice_right tm_mobile_hide">
                <div class="tm_logo">
                   <p class=" tm_accent_color "><a href="https://rightupnextinnovations.com/"> Developed and Maintained  By</a></p>
                  <a href="https://rightupnextinnovations.com/">
                  <img
                  style=" opacity: 0.3 !important; width: 100px !important; margin-left: 46px;"
                    src="data:image/png;base64,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"
                    alt="Logo"
                  />
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </body>
</html>
`;
}
