"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(
/* Mounting options */
{
  "name": "windy-plugin-resources",
  "version": "0.1.9",
  "author": "Darryl Vink",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/antimeat/windy-plugin-resources.git"
  },
  "description": "Windy plugin to overlay some locations",
  "displayName": "resource locations",
  "hook": "menu"
},
/* HTML */
'',
/* CSS */
'',
/* Constructor */
function () {
  var bcast = W.require('broadcast');

  var store = W.require('store');

  var _ = W.require('utils');

  var map = W.require('map');

  var locations = [['Van-Gogh', -21.4, 114.1, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/S.aspx', target='wiki'>Wiki</a>", "Auswave: use Enfield", "<a href='http://wa-aifs-local/images/flamingo/flamingo21.40__S%20114.10__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Van_Gogh&client=fcst#', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Varanus-Is', -20.6, 115.6, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Santos--Varanus-Is.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Varanus', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo20.60__S%20115.60__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Varanus_Island&client=fcst#', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=NWShelf', target='tc-rating'>TC-rating</a>"], ['Darwin-Harbour', -12.52, 130.87, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Santos-.aspx', target='wiki'>Wiki</a>", '', "<a href='http://wa-aifs-local/images/flamingo/flamingo21.52__S%20130.87__E.png', target='flamingo'>flamingo</a>"], ['Northern-Endeavour', -10.62, 125.987, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Upstream-Solutions.aspx', target='wiki'>Wiki</a>", "Auswave: Use Bayu Undan'", "<a href='http://wa-aifs-local/images/flamingo/flamingo10.62__S%20125.98__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Northern-Endeavour&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northern,Northwestern', target='tc-rating'>TC-rating</a>"], ['Wandoo', -20.14, 116.42, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Vermillion.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Wandoo', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo20.13__S%20116.42__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Wandoo&client=fcst#', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Enfield', -21.5, 114, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Woodside--Enfield.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Enfield', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo21.50__S%20114.00__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Enfield&client=fcst#', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Mermaid-Sound', -20.58, 116.76, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Woodside---Mermaid-Sound.aspx', target='wiki'>Wiki</a>", '', "<a href='http://wa-aifs-local/images/flamingo/flamingo20.60__S%20116.80__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Mermaid_Sound&client=fcst#', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Noblige', -19.4, 114.33, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Woodside--Noblige.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Noblige', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo19.40__S%20114.33__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Jansz&client=fcst#', target='risk-matrix'>risk-matrix (from Jansz)</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=NWShelf', target='tc-rating'>TC-rating</a>"], ['North-Rankin', -19.58, 116.14, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Woodside--North-Rankin.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Rankin', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo19.58__S%20116.13__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=North_Rankin&client=fcst#', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=NWShelf', target='tc-rating'>TC-rating</a>"], ['Pluto-(PLA)', -20, 115.37, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Woodside--Pluto.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=PLA', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo20.00__S%20115.37__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Pluto&client=fcst#', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=NWShelf', target='tc-rating'>TC-rating</a>"], ['Rowley-Shoals', -16.9, 120.1, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Woodside--Rowley-Shoals.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Rowley', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo16.90__S%20120.10__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Rowley_Schoals&client=point', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Scarborough_Infield', -19.87, 113.16, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/woodside--Scarborough.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Scarborough_Infield', target='auswave'>Auswave</a>", "", "<a href='http://wa-cws-op/risk_matrix/?site_id=Scarborough&client=woodside', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=NWShelf', target='tc-rating'>TC-rating</a>"], ['Calliance', -14.61, 121.55, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Woodside--Calliance.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Calliance', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo14.62__S%20121.55__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Calliance&client=woodside', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Dorado', -18.72, 118.72, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Santos--Dorado.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Dorado', target='auswave'>Auswave</a>", "", "<a href='http://wa-cws-op/risk_matrix/?site_id=Dorado-1&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Stag', -20.3, 116.3, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/J.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Stag', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo20.30__S%20116.30__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Stag&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['AngloGold', -29.24, 124.54, "<a href=https://bom365.sharepoint.com/sites/ERG/SitePages/Aglogold.aspx, target=_blank>Wiki</a>", '', "<a href='http://wa-aifs-local/images/flamingo/flamingo29.23__S%20124.53__E.png', target='flamingo'>flamingo</a>"], ['Barrow-Island', -20.8, 115.48, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Che.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Barrow_Island', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo20.80__S%20115.48__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Barrow_Island&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=NWShelf', target='tc-rating'>TC-rating</a>"], ['Gorgon', -20.46, 114.84, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Chevron-.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Gorgon', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo20.47__S%20114.83__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Gorgon&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=NWShelf', target='tc-rating'>TC-rating</a>"], ['Jansz', -19.81, 114.61, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/C.aspxWiki', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Jansz', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo19.85__S%20114.50__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Jansz&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=NWShelf', target='tc-rating'>TC-rating</a>"], ['Kumul-Platform', -8.1, 144.5, "<a href='http://cws-01.bom.gov.au/twiki/bin/view/SSUQLD/KumulHowTo', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=nt&site=Kumul_Platform', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo08.50__S%20144.55__E.png', target='flamingo'>flamingo</a>"], ['Pilbara-Port-Authority (Dampier)', -20.62, 116.76, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Pilbara-Port-Authority.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Dampier_Nearshore_Port', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo20.60__S%20116.80__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Karratha&client=point', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Pilbara-Port-Authority (Port Hedland)', -20.32, 118.58, "No Wiki!", "", "", "<a href='http://wa-cws-op/risk_matrix/?site_id=PortHedland&client=point', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Pyrannees', -21.54, 114.12, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/BHP.aspx',target=_blank>Wiki</a>", 'Auswave: Use Enfield', "<a href='http://wa-aifs-local/images/flamingo/flamingo21.53__S%20114.12__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Pyrannees&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Rio-Tinto-1', -22.54, 119.03, '', '', "<a href='http://wa-aifs-local/images/flamingo/flamingo22.53__S%20119.03__E.png', target='flamingo'>flamingo</a>"], ['Rio-Tinto-2', -21.67, 115.88, '', '', "<a href='http://wa-aifs-local/images/flamingo/flamingo21.67__S%20115.88__E.png', target='flamingo'>flamingo</a>"], ['Bayu-Undan', -11.07, 126.61, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Santos--Bayu-Undan.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Bayu_undan', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo11.07__S%20126.61__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Bayu-Undan&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northern,Northwestern', target='tc-rating'>TC-rating</a>"], ['John-Brookes', -20.45, 115.1, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Santos--John-Brookes.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=John_Brookes', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo20.45__S%20115.10__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=John_Brookes&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Reindeer', -20.02, 116.31, "<a href='https://rfc-wa.bom.gov.au/CWS/QuadrantEnergyReindeer'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Reindeer', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo20.02__S%20116.32__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Reindeer&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Wheatstone-Plant', -21.69, 115, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Chevron--Wheatstone-Plant.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Wheatstone', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo21.67__S%20115.00__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=WheatstoneLNG&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Cape-Preston', -20.67, 116.17, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/CITIC.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Cape_preston', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo20.67__S%20116.17__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Cape_Preston_Area&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Cape-Cuvier', -24.22, 113.397, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Dampier-Salt.aspx', target='wiki'>Wiki</a>", "<a href='https://wa-aifs-local.bom.gov.au/waves/cape_cuvier/index.php', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo24.22__S%20113.38__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Cape_Cuvier&client=point', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Ichthys', -13.92, 123.22, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/INPEX.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Ichthys', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo13.92__S%20123.22__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Ichthys&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Montara', -12.67, 124.55, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Jadestone--Montara.aspx', target='wiki'>Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=wa&site=Montara', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo12.67__S%20124.55__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Montara&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Kalgoorlie-Mixing', -30.6, 121.57, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Kalgoorlie-Mixing.aspx', target='wiki'>Wiki</a>", '', "<a href='http://wa-aifs-local/images/flamingo/flamingo30.6__S%20121.57__E.png', target='flamingo'>flamingo</a>"], ['Kanowna-Belle', -30.61, 121.58, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Kanowna-Belle-Gold-Mines.aspx', target='wiki'>Wiki</a>", '', "<a href='http://wa-aifs-local/images/flamingo/flamingo30.60__S%20121.57__E.png', target='flamingo'>flamingo</a>"], ['Abbot-Point ', -19.86, 148.09, "<a href='http://cws-01.bom.gov.au/twiki/bin/view/SSUQLD/AbbotPointBulkcoalHowTo'><Wiki</a>", "<a href='http://aifs-qld.bom.gov.au/local/qld/rfc/pages/marine/waves/auswave.php?state=nt&site=Abbot_Point', target='auswave'>Auswave</a>", "<a href='http://wa-aifs-local/images/flamingo/flamingo19.87__S%20148.08__E.png', target='flamingo'>flamingo</a>"], ['Ok-Tedi', -5.21, 141.14, "<a href='http://cws-01.bom.gov.au/twiki/bin/view/SSUQLD/OkTediHowTo', target='wiki'>Wiki</a>", '', ""], ['Onslow', -21.66, 115.1, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Shark-Bay-Salt.aspx', target='wiki'>Wiki</a>", '', "<a href='http://wa-aifs-local/images/flamingo/flamingo21.67__S%20115.10__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Onslow&client=point', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"], ['Wheatstone-Platform', -19.93, 115.38, "<a href='https://bom365.sharepoint.com/sites/ERG/SitePages/Chevron--Wheatstone-Plant(1).aspx', target='wiki'>Wiki</a>", 'Auswave: Use Pluto', "<a href='http://wa-aifs-local/images/flamingo/flamingo19.93__S%20115.38__E.png', target='flamingo'>flamingo</a>", "<a href='http://wa-cws-op/risk_matrix/?site_id=Wheatstone_Platform&client=fcst', target='risk-matrix'>risk-matrix</a>", "<a href='http://wa-cws-op/webapps/tc_outlook/webAPI.cgi?get=outlookText&regions=Northwestern', target='tc-rating'>TC-rating</a>"]];
  console.log('I am being mounted');
  var icon = L.icon({
    className: 'resources-icon',
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    opacity: 0.5
  });
  var markers = null;

  var makeMarkers = function makeMarkers() {
    markers.forEach(function (m, i) {
      var _locations$i = _slicedToArray(locations[i], 8),
          name = _locations$i[0],
          lat = _locations$i[1],
          lon = _locations$i[2],
          wiki = _locations$i[3],
          auswave = _locations$i[4],
          flamingo = _locations$i[5],
          risk = _locations$i[6],
          tc = _locations$i[7];
    });
  };

  var createPopup = function createPopup(name, lat, lon, wiki, auswave, flamingo, risk, tc) {
    var marker = L.marker([lat, lon], {
      icon: map.myMarkers.icon,
      zIndexOffset: -300
    }).addTo(map);
    marker.bindTooltip(name);
    marker.bindPopup('<br>' + name + '<br>' + lat + ',' + lon + '<br>' + wiki + '<br>' + auswave + '<br>' + flamingo + '<br>' + risk + '<br>' + tc);
    return marker;
  };

  bcast.on('rqstClose', function () {
    if (!markers) {
      markers = locations.map(function (p) {
        return createPopup(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7]);
      });
      bcast.on('redrawFinished', makeMarkers);
    }
  });

  this.onopen = function () {
    if (!markers) {
      markers = locations.map(function (p) {
        return createPopup(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7]);
      });
      bcast.on('redrawFinished', makeMarkers);
    }
  };

  this.onclose = function () {
    if (markers) {
      markers.forEach(function (m) {
        return map.removeLayer(m);
      });
      bcast.off('redrawFinished', makeMarkers);
      markers = null;
    }
  };
});