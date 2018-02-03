var countries = new Object();
countries = [
{value: "AF.svg", label: "Afghanistan"},
{value: "AX.svg", label: "\u00c5land Islands"},
{value: "AL.svg", label: "Albania"},
{value: "DZ.svg", label: "Algeria"},
{value: "AS.svg", label: "American Samoa"},
{value: "AD.svg", label: "Andorra"},
{value: "AO.svg", label: "Angola"},
{value: "AI.svg", label: "Anguilla"},
{value: "AQ.svg", label: "Antarctica"},
{value: "AG.svg", label: "Antigua and Barbuda"},
{value: "AR.svg", label: "Argentina"},
{value: "AM.svg", label: "Armenia"},
{value: "AW.svg", label: "Aruba"},
{value: "AU.svg", label: "Australia"},
{value: "AT.svg", label: "Austria"},
{value: "AZ.svg", label: "Azerbaijan"},
{value: "BS.svg", label: "Bahamas"},
{value: "BH.svg", label: "Bahrain"},
{value: "BD.svg", label: "Bangladesh"},
{value: "BB.svg", label: "Barbados"},
{value: "BY.svg", label: "Belarus"},
{value: "BE.svg", label: "Belgium"},
{value: "BZ.svg", label: "Belize"},
{value: "BJ.svg", label: "Benin"},
{value: "BM.svg", label: "Bermuda"},
{value: "BT.svg", label: "Bhutan"},
{value: "BO.svg", label: "Bolivia, Plurinational State of"},
{value: "BQ.svg", label: "Bonaire, Sint Eustatius and Saba"},
{value: "BA.svg", label: "Bosnia and Herzegovina"},
{value: "BW.svg", label: "Botswana"},
{value: "BV.svg", label: "Bouvet Island"},
{value: "BR.svg", label: "Brazil"},
{value: "IO.svg", label: "British Indian Ocean Territory"},
{value: "BN.svg", label: "Brunei Darussalam"},
{value: "BG.svg", label: "Bulgaria"},
{value: "BF.svg", label: "Burkina Faso"},
{value: "BI.svg", label: "Burundi"},
{value: "KH.svg", label: "Cambodia"},
{value: "CM.svg", label: "Cameroon"},
{value: "CA.svg", label: "Canada"},
{value: "CV.svg", label: "Cape Verde"},
{value: "KY.svg", label: "Cayman Islands"},
{value: "CF.svg", label: "Central African Republic"},
{value: "TD.svg", label: "Chad"},
{value: "CL.svg", label: "Chile"},
{value: "CN.svg", label: "China"},
{value: "CX.svg", label: "Christmas Island"},
{value: "CC.svg", label: "Cocos (Keeling) Islands"},
{value: "CO.svg", label: "Colombia"},
{value: "KM.svg", label: "Comoros"},
{value: "CG.svg", label: "Congo"},
{value: "CD.svg", label: "Congo, the Democratic Republic of the"},
{value: "CK.svg", label: "Cook Islands"},
{value: "CR.svg", label: "Costa Rica"},
{value: "CI.svg", label: "C\u00f4te d'Ivoire"},
{value: "HR.svg", label: "Croatia"},
{value: "CU.svg", label: "Cuba"},
{value: "CW.svg", label: "Cura\u00e7ao"},
{value: "CY.svg", label: "Cyprus"},
{value: "CZ.svg", label: "Czech Republic"},
{value: "DK.svg", label: "Denmark"},
{value: "DJ.svg", label: "Djibouti"},
{value: "DM.svg", label: "Dominica"},
{value: "DO.svg", label: "Dominican Republic"},
{value: "EC.svg", label: "Ecuador"},
{value: "EG.svg", label: "Egypt"},
{value: "SV.svg", label: "El Salvador"},
{value: "GQ.svg", label: "Equatorial Guinea"},
{value: "ER.svg", label: "Eritrea"},
{value: "EE.svg", label: "Estonia"},
{value: "ET.svg", label: "Ethiopia"},
{value: "FK.svg", label: "Falkland Islands (Malvinas)"},
{value: "FO.svg", label: "Faroe Islands"},
{value: "FJ.svg", label: "Fiji"},
{value: "FI.svg", label: "Finland"},
{value: "FR.svg", label: "France"},
{value: "GF.svg", label: "French Guiana"},
{value: "PF.svg", label: "French Polynesia"},
{value: "TF.svg", label: "French Southern Territories"},
{value: "GA.svg", label: "Gabon"},
{value: "GM.svg", label: "Gambia"},
{value: "GE.svg", label: "Georgia"},
{value: "DE.svg", label: "Germany"},
{value: "GH.svg", label: "Ghana"},
{value: "GI.svg", label: "Gibraltar"},
{value: "GR.svg", label: "Greece"},
{value: "GL.svg", label: "Greenland"},
{value: "GD.svg", label: "Grenada"},
{value: "GP.svg", label: "Guadeloupe"},
{value: "GU.svg", label: "Guam"},
{value: "GT.svg", label: "Guatemala"},
{value: "GG.svg", label: "Guernsey"},
{value: "GN.svg", label: "Guinea"},
{value: "GW.svg", label: "Guinea-Bissau"},
{value: "GY.svg", label: "Guyana"},
{value: "HT.svg", label: "Haiti"},
{value: "HM.svg", label: "Heard Island and McDonald Islands"},
{value: "VA.svg", label: "Holy See (Vatican City State)"},
{value: "HN.svg", label: "Honduras"},
{value: "HK.svg", label: "Hong Kong"},
{value: "HU.svg", label: "Hungary"},
{value: "IS.svg", label: "Iceland"},
{value: "IN.svg", label: "India"},
{value: "ID.svg", label: "Indonesia"},
{value: "IR.svg", label: "Iran, Islamic Republic of"},
{value: "IQ.svg", label: "Iraq"},
{value: "IE.svg", label: "Ireland"},
{value: "IM.svg", label: "Isle of Man"},
{value: "IL.svg", label: "Israel"},
{value: "IT.svg", label: "Italy"},
{value: "JM.svg", label: "Jamaica"},
{value: "JP.svg", label: "Japan"},
{value: "JE.svg", label: "Jersey"},
{value: "JO.svg", label: "Jordan"},
{value: "KZ.svg", label: "Kazakhstan"},
{value: "KE.svg", label: "Kenya"},
{value: "KI.svg", label: "Kiribati"},
{value: "KP.svg", label: "Korea, Democratic People's Republic of"},
{value: "KR.svg", label: "Korea, Republic of"},
{value: "KW.svg", label: "Kuwait"},
{value: "KG.svg", label: "Kyrgyzstan"},
{value: "LA.svg", label: "Lao People's Democratic Republic"},
{value: "LV.svg", label: "Latvia"},
{value: "LB.svg", label: "Lebanon"},
{value: "LS.svg", label: "Lesotho"},
{value: "LR.svg", label: "Liberia"},
{value: "LY.svg", label: "Libya"},
{value: "LI.svg", label: "Liechtenstein"},
{value: "LT.svg", label: "Lithuania"},
{value: "LU.svg", label: "Luxembourg"},
{value: "MO.svg", label: "Macao"},
{value: "MK.svg", label: "Macedonia, the Former Yugoslav Republic of"},
{value: "MG.svg", label: "Madagascar"},{value: "MW", label: "Malawi"},
{value: "MY.svg", label: "Malaysia"},{value: "MV", label: "Maldives"},
{value: "ML.svg", label: "Mali"},{value: "MT", label: "Malta"},
{value: "MH.svg", label: "Marshall Islands"},
{value: "MQ.svg", label: "Martinique"},
{value: "MR.svg", label: "Mauritania"},
{value: "MU.svg", label: "Mauritius"},
{value: "YT.svg", label: "Mayotte"},
{value: "MX.svg", label: "Mexico"},
{value: "FM.svg", label: "Micronesia, Federated States of"},
{value: "MD.svg", label: "Moldova, Republic of"},
{value: "MC.svg", label: "Monaco"},
{value: "MN.svg", label: "Mongolia"},
{value: "ME.svg", label: "Montenegro"},
{value: "MS.svg", label: "Montserrat"},
{value: "MA.svg", label: "Morocco"},
{value: "MZ.svg", label: "Mozambique"},
{value: "MM.svg", label: "Myanmar"},
{value: "NA.svg", label: "Namibia"},
{value: "NR.svg", label: "Nauru"},
{value: "NP.svg", label: "Nepal"},
{value: "NL.svg", label: "Netherlands"},
{value: "NC.svg", label: "New Caledonia"},
{value: "NZ.svg", label: "New Zealand"},
{value: "NI.svg", label: "Nicaragua"},
{value: "NE.svg", label: "Niger"},
{value: "NG.svg", label: "Nigeria"},
{value: "NU.svg", label: "Niue"},
{value: "NF.svg", label: "Norfolk Island"},
{value: "MP.svg", label: "Northern Mariana Islands"},
{value: "NO.svg", label: "Norway"},
{value: "OM.svg", label: "Oman"},
{value: "PK.svg", label: "Pakistan"},
{value: "PW.svg", label: "Palau"},
{value: "PS.svg", label: "Palestine, State of"},
{value: "PA.svg", label: "Panama"},
{value: "PG.svg", label: "Papua New Guinea"},
{value: "PY.svg", label: "Paraguay"},
{value: "PE.svg", label: "Peru"},
{value: "PH.svg", label: "Philippines"},
{value: "PN.svg", label: "Pitcairn"},
{value: "PL.svg", label: "Poland"},
{value: "PT.svg", label: "Portugal"},
{value: "PR.svg", label: "Puerto Rico"},
{value: "QA.svg", label: "Qatar"},
{value: "RE.svg", label: "R\u00e9union"},
{value: "RO.svg", label: "Romania"},
{value: "RU.svg", label: "Russian Federation"},
{value: "RW.svg", label: "Rwanda"},
{value: "BL.svg", label: "Saint Barth\u00e9lemy"},
{value: "SH.svg", label: "Saint Helena, Ascension and Tristan da Cunha"},
{value: "KN.svg", label: "Saint Kitts and Nevis"},
{value: "LC.svg", label: "Saint Lucia"},
{value: "MF.svg", label: "Saint Martin (French part)"},{value: "PM", label: "Saint Pierre and Miquelon"},
{value: "VC.svg", label: "Saint Vincent and the Grenadines"},
{value: "WS.svg", label: "Samoa"},
{value: "SM.svg", label: "San Marino"},
{value: "ST.svg", label: "Sao Tome and Principe"},
{value: "SA.svg", label: "Saudi Arabia"},
{value: "SN.svg", label: "Senegal"},
{value: "RS.svg", label: "Serbia"},
{value: "SC.svg", label: "Seychelles"},
{value: "SL.svg", label: "Sierra Leone"},
{value: "SG.svg", label: "Singapore"},
{value: "SX.svg", label: "Sint Maarten (Dutch part)"},
{value: "SK.svg", label: "Slovakia"},
{value: "SI.svg", label: "Slovenia"},
{value: "SB.svg", label: "Solomon Islands"},
{value: "SO.svg", label: "Somalia"},
{value: "ZA.svg", label: "South Africa"},
{value: "GS.svg", label: "South Georgia and the South Sandwich Islands"},
{value: "SS.svg", label: "South Sudan"},
{value: "ES.svg", label: "Spain"},
{value: "LK.svg", label: "Sri Lanka"},
{value: "SD.svg", label: "Sudan"},
{value: "SR.svg", label: "Suriname"},
{value: "SJ.svg", label: "Svalbard and Jan Mayen"},
{value: "SZ.svg", label: "Swaziland"},
{value: "SE.svg", label: "Sweden"},
{value: "CH.svg", label: "Switzerland"},
{value: "SY.svg", label: "Syrian Arab Republic"},
{value: "TW.svg", label: "Taiwan, Province of China"},
{value: "TJ.svg", label: "Tajikistan"},
{value: "TZ.svg", label: "Tanzania, United Republic of"},
{value: "TH.svg", label: "Thailand"},
{value: "TL.svg", label: "Timor-Leste"},
{value: "TG.svg", label: "Togo"},
{value: "TK.svg", label: "Tokelau"},
{value: "TO.svg", label: "Tonga"},
{value: "TT.svg", label: "Trinidad and Tobago"},
{value: "TN.svg", label: "Tunisia"},
{value: "TR.svg", label: "Turkey"},
{value: "TM.svg", label: "Turkmenistan"},
{value: "TC.svg", label: "Turks and Caicos Islands"},
{value: "TV.svg", label: "Tuvalu"},
{value: "UG.svg", label: "Uganda"},
{value: "UA.svg", label: "Ukraine"},
{value: "AE.svg", label: "United Arab Emirates"},
{value: "GB.svg", label: "United Kingdom"},
{value: "US.svg", label: "United States"},
{value: "UM.svg", label: "United States Minor Outlying Islands"},
{value: "UY.svg", label: "Uruguay"},
{value: "UZ.svg", label: "Uzbekistan"},
{value: "VU.svg", label: "Vanuatu"},
{value: "VE.svg", label: "Venezuela, Bolivarian Republic of"},
{value: "VN.svg", label: "Viet Nam"},
{value: "VG.svg", label: "Virgin Islands, British"},
{value: "VI.svg", label: "Virgin Islands, U.S."},
{value: "WF.svg", label: "Wallis and Futuna"},
{value: "EH.svg", label: "Western Sahara"},
{value: "YE.svg", label: "Yemen"},
{value: "ZM.svg", label: "Zambia"},
{value: "ZW.svg", label: "Zimbabwe"}];
