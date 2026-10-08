// Parishisht Construction - Master Datasets
const PROJECTS_DATA = [
    {
        "id": "proj-1",
        "title": "Muzaffarpur Rural Piped Water Supply Grid",
        "title_hi": "मुजफ्फरपुर ग्रामीण पाइप जलापूर्ति ग्रिड",
        "category": "phe",
        "categoryLabel": "Public Health Engineering",
        "categoryLabel_hi": "लोक स्वास्थ्य अभियंत्रण (PHE)",
        "client": "PHED Bihar (Jal Jeevan Mission)",
        "client_hi": "पीएचईडी बिहार (जल जीवन मिशन)",
        "location": "Muzaffarpur Rural Divisions",
        "location_hi": "मुजफ्फरपुर ग्रामीण प्रमंडल",
        "district": "Muzaffarpur",
        "region": "North Bihar",
        "region_hi": "उत्तर बिहार",
        "value": "₹38.4 Cr.",
        "valueNum": 38.4,
        "progress": 92,
        "status": "Active Execution",
        "status_hi": "सक्रिय निष्पादन",
        "statusType": "active",
        "handoverDate": "Nov 2026",
        "handoverDate_hi": "नवंबर 2026",
        "desc": "Turnkey rural piped water supply covering 22,000+ households. Includes 4 Over Head Service Reservoirs (OHSR), deep intake tube wells, automated chlorination plants, and 85 km DI & HDPE distribution network.",
        "desc_hi": "22,000+ परिवारों को कवर करने वाली टर्नकी ग्रामीण पाइप जलापूर्ति। इसमें 4 उच्चस्तरीय सेवा जलाशय (OHSR), गहरे इनटेक नलकूप, स्वचालित क्लोरीनीकरण संयंत्र और 85 किमी डीआई एवं एचडीपीई नेटवर्क शामिल हैं।",
        "specs": [
            "4 Over Head Service Reservoirs (OHSR) - 4.5 Lakh Liters each",
            "85 km Ductile Iron (K7/K9) and PE-100 HDPE network lines",
            "Automated chlorine dosage & SCADA telemetry flow monitoring",
            "Zero leak tolerance certified by Third-Party Inspection Agency (TPIA)"
        ],
        "specs_hi": [
            "4 उच्चस्तरीय सेवा जलाशय (OHSR) - प्रत्येक 4.5 लाख लीटर क्षमता",
            "85 किमी डक्टाइल आयरन (K7/K9) एवं PE-100 HDPE वितरण पाइपलाइन",
            "स्वचालित क्लोरीन खुराक एवं स्काडा टेलीमेट्री प्रवाह निगरानी",
            "तृतीय-पक्ष निरीक्षण एजेंसी (TPIA) द्वारा प्रमाणित शून्य रिसाव परीक्षण"
        ],
        "fleetDeployed": "01 Batching Plant (30 m³/hr), 03 Transit Mixers, 02 Excavators, 02 HDPE Fusion Rigs",
        "fleetDeployed_hi": "01 बैचिंग प्लांट (30 घन मी/घंटा), 03 ट्रांजिट मिक्सर, 02 एक्सकेवेटर, 02 बट फ्यूजन रिग",
        "milestones": [
            {
                "phase": "Phase 1: Deep Tube Wells & Intake Hydro-Testing",
                "status": "Completed (100%)",
                "date": "Jan 2026"
            },
            {
                "phase": "Phase 2: OHSR RCC Staging & Tank Shell Casting",
                "status": "Completed (100%)",
                "date": "Jun 2026"
            },
            {
                "phase": "Phase 3: 85 km DI/HDPE Distribution Network Laying",
                "status": "Active (95%)",
                "date": "Sep 2026"
            },
            {
                "phase": "Phase 4: Telemetry Integration & Household Tap Connections",
                "status": "In Progress (75%)",
                "date": "Nov 2026"
            }
        ]
    },
    {
        "id": "proj-2",
        "title": "Bhagalpur 2-Lane Arterial Highway & Major Culverts",
        "title_hi": "भागलपुर 2-लेन मुख्य राजमार्ग एवं वृहद पुलिया",
        "category": "roads",
        "categoryLabel": "Civil Infrastructure",
        "categoryLabel_hi": "सिविल एवं सड़क अवसंरचना",
        "client": "Road Construction Department (RCD Bihar)",
        "client_hi": "पथ निर्माण विभाग (RCD बिहार)",
        "location": "Bhagalpur – Kahalgaon Corridor",
        "location_hi": "भागलपुर – कहलगांव कॉरिडोर",
        "district": "Bhagalpur",
        "region": "South Bihar",
        "region_hi": "दक्षिण बिहार",
        "value": "₹52.1 Cr.",
        "valueNum": 52.1,
        "progress": 100,
        "status": "Commissioned & Handed Over",
        "status_hi": "कमीशन एवं हस्तांतरित",
        "statusType": "completed",
        "handoverDate": "Aug 2026",
        "handoverDate_hi": "अगस्त 2026",
        "desc": "Widening and strengthening of 24 km 2-lane flexible pavement highway with 6 major RCC box culverts, erosion-proof river embankments, and high-specification retro-reflective signage.",
        "desc_hi": "24 किमी 2-लेन लचीले डामर राजमार्ग का चौड़ीकरण और सुदृढ़ीकरण, 6 प्रमुख आरसीसी बॉक्स पुलिया, नदी तटबंध सुरक्षा और उच्च-मानक परावर्तक साइनेज।",
        "specs": [
            "24 km flexible asphalt pavement to strict IRC:37 standards",
            "6 RCC multi-cell box culverts designed for 100-year flood levels",
            "Reinforced riverbank revetment with geotextile mattress protection",
            "Delivered 45 days ahead of contractual handover date"
        ],
        "specs_hi": [
            "IRC:37 मानकों के अनुरूप 24 किमी डामर सड़क निर्माण",
            "100-वर्षीय बाढ़ स्तर के अनुसार डिजाइन किए गए 6 आरसीसी बॉक्स कल्वर्ट",
            "जियोटेक्सटाइल गद्दे सुरक्षा के साथ नदी तटबंध सुदृढ़ीकरण",
            "अनुबंधित हस्तांतरण तिथि से 45 दिन पूर्व पूर्ण"
        ],
        "fleetDeployed": "01 Sensor Paver, 02 Batching Plants, 04 Transit Mixers, 03 Heavy Rollers",
        "fleetDeployed_hi": "01 सेंसर पेवर, 02 बैचिंग प्लांट, 04 ट्रांजिट मिक्सर, 03 हैवी रोलर",
        "milestones": [
            {
                "phase": "Phase 1: Subgrade Stabilization & Fly-Ash Embankment",
                "status": "Completed (100%)",
                "date": "Oct 2025"
            },
            {
                "phase": "Phase 2: 6 Multi-Cell RCC Box Culverts Construction",
                "status": "Completed (100%)",
                "date": "Feb 2026"
            },
            {
                "phase": "Phase 3: DBM & BC Bituminous Wearing Course Paving",
                "status": "Completed (100%)",
                "date": "May 2026"
            },
            {
                "phase": "Phase 4: Safety Signage, Road Markings & Handover",
                "status": "Completed (100%)",
                "date": "Aug 2026"
            }
        ]
    },
    {
        "id": "proj-3",
        "title": "Patna Municipal Stormwater Conduit & Pumping Station",
        "title_hi": "पटना नगर निगम वर्षा जल ड्रेन एवं पंपिंग स्टेशन",
        "category": "urban",
        "categoryLabel": "Urban Drainage (BUIDCO)",
        "categoryLabel_hi": "शहरी जल निकासी (BUIDCO)",
        "client": "BUIDCO Bihar",
        "client_hi": "बुडको बिहार (BUIDCO)",
        "location": "Patna West Urban Drainage Basin",
        "location_hi": "पटना पश्चिम शहरी ड्रेनेज बेसिन",
        "district": "Patna",
        "region": "Gangetic Central",
        "region_hi": "मध्य गंगा क्षेत्र",
        "value": "₹46.7 Cr.",
        "valueNum": 46.7,
        "progress": 78,
        "status": "Active Execution",
        "status_hi": "सक्रिय निर्माण",
        "statusType": "active",
        "handoverDate": "Jan 2027",
        "handoverDate_hi": "जनवरी 2027",
        "desc": "Deep underground reinforced concrete box drain construction with automated high-discharge pumping station, designed to mitigate monsoon waterlogging during river Ganges flood cresting.",
        "desc_hi": "गंगा नदी के जलस्तर में वृद्धि के दौरान मानसूनी जलभराव को कम करने के लिए स्वचालित उच्च-निर्वहन पंपिंग स्टेशन के साथ भूमिगत आरसीसी बॉक्स ड्रेन का निर्माण।",
        "specs": [
            "4.2 km precast reinforced concrete box drain (2.5m x 2.0m internal)",
            "High-discharge automated pumping station (12,000 LPM capacity)",
            "Submersible non-clog sewage pumps with backup diesel generating sets",
            "Centralized electrical control room and telemetry SCADA monitoring"
        ],
        "specs_hi": [
            "4.2 किमी प्रीकास्ट प्रबलित कंक्रीट बॉक्स ड्रेन (2.5मी x 2.0मी आंतरिक)",
            "उच्च-निर्वहन स्वचालित पंपिंग स्टेशन (12,000 एलपीएम क्षमता)",
            "बैकअप डीजल जनरेटर सेट के साथ सबमर्सिबल नॉन-क्लॉग सीवेज पंप",
            "केंद्रीकृत विद्युत नियंत्रण कक्ष और टेलीमेट्री स्काडा निगरानी"
        ],
        "fleetDeployed": "02 Hydraulic Excavators, 01 Precast Gantry Crane, 02 Transit Mixers",
        "fleetDeployed_hi": "02 हाइड्रोलिक एक्सकेवेटर, 01 प्रीकास्ट गैन्ट्री क्रेन, 02 ट्रांजिट मिक्सर",
        "milestones": [
            {
                "phase": "Phase 1: Deep Excavation & Alluvial Dewatering Sump",
                "status": "Completed (100%)",
                "date": "Mar 2026"
            },
            {
                "phase": "Phase 2: 4.2 km Precast Concrete Box Conduit Erection",
                "status": "Active (85%)",
                "date": "Aug 2026"
            },
            {
                "phase": "Phase 3: High-Discharge Pumping Station Civil Structure",
                "status": "Active (70%)",
                "date": "Nov 2026"
            },
            {
                "phase": "Phase 4: SCADA Telemetry & Commissioning",
                "status": "Scheduled",
                "date": "Jan 2027"
            }
        ]
    },
    {
        "id": "proj-4",
        "title": "Darbhanga Rural Connectivity Paved Road Network",
        "title_hi": "दरभंगा ग्रामीण संपर्क पक्की सड़क नेटवर्क",
        "category": "roads",
        "categoryLabel": "Civil Infrastructure",
        "categoryLabel_hi": "ग्रामीण कार्य अवसंरचना (RWD)",
        "client": "Rural Works Department (RWD Bihar)",
        "client_hi": "ग्रामीण कार्य विभाग (RWD बिहार)",
        "location": "Darbhanga Floodplain Divisions",
        "location_hi": "दरभंगा बाढ़ प्रभावित क्षेत्र",
        "district": "Darbhanga",
        "region": "North Bihar",
        "region_hi": "उत्तर बिहार",
        "value": "₹29.8 Cr.",
        "valueNum": 29.8,
        "progress": 100,
        "status": "Commissioned & Handed Over",
        "status_hi": "पूर्ण एवं हस्तांतरित",
        "statusType": "completed",
        "handoverDate": "Jun 2026",
        "handoverDate_hi": "जून 2026",
        "desc": "All-weather rigid cement concrete road connectivity across 14 remote habitations, ensuring uninterrupted mobility during high monsoon inundation periods.",
        "desc_hi": "14 दूरस्थ बस्तियों में बारहमासी कठोर सीमेंट कंक्रीट सड़क संपर्क, जो उच्च मानसूनी बाढ़ के दौरान भी निर्बाध आवागमन सुनिश्चित करता है।",
        "specs": [
            "32 km Rigid PQC concrete pavement (IRC:SP:62 specifications)",
            "18 minor cross-drainage culverts with stone pitching",
            "Soil-stabilized subgrade utilizing fly-ash and local lime admixture",
            "5-year comprehensive maintenance warranty committed to RWD"
        ],
        "specs_hi": [
            "32 किमी रिजिड PQC कंक्रीट फुटपाथ (IRC:SP:62 विनिर्देश)",
            "पत्थर पिचिंग के साथ 18 क्रॉस-ड्रेनेज पुलिया",
            "फ्लाई-ऐश और स्थानीय चूना मिश्रण का उपयोग करके मृदा स्थिरीकरण",
            "आरडब्ल्यूडी को 5-वर्षीय रखरखाव वारंटी की गारंटी"
        ],
        "fleetDeployed": "01 Concrete Paving Train, 01 Batching Plant, 04 Transit Mixers",
        "fleetDeployed_hi": "01 कंक्रीट पेविंग ट्रेन, 01 बैचिंग प्लांट, 04 ट्रांजिट मिक्सर",
        "milestones": [
            {
                "phase": "Phase 1: Soil Stabilization & Fly-Ash Blending",
                "status": "Completed (100%)",
                "date": "Nov 2025"
            },
            {
                "phase": "Phase 2: 18 Cross-Drainage Culvert Structures",
                "status": "Completed (100%)",
                "date": "Feb 2026"
            },
            {
                "phase": "Phase 3: 32 km Rigid PQC Concrete Slipform Paving",
                "status": "Completed (100%)",
                "date": "Apr 2026"
            },
            {
                "phase": "Phase 4: Joint Cutting, Sealant & Final Acceptance MB",
                "status": "Completed (100%)",
                "date": "Jun 2026"
            }
        ]
    },
    {
        "id": "proj-5",
        "title": "Gaya Multi-Village Water Treatment Plant (WTP)",
        "title_hi": "गया बहु-ग्रामीण जल शोधन संयंत्र (WTP)",
        "category": "phe",
        "categoryLabel": "Public Health Engineering",
        "categoryLabel_hi": "लोक स्वास्थ्य अभियंत्रण (PHE)",
        "client": "PHED Bihar (Jal Jeevan Mission)",
        "client_hi": "पीएचईडी बिहार (जल जीवन मिशन)",
        "location": "Gaya Falgu River Basin",
        "location_hi": "गया फल्गु नदी बेसिन",
        "district": "Gaya",
        "region": "South Bihar",
        "region_hi": "दक्षिण बिहार",
        "value": "₹64.5 Cr.",
        "valueNum": 64.5,
        "progress": 85,
        "status": "Active Execution",
        "status_hi": "सक्रिय निष्पादन",
        "statusType": "active",
        "handoverDate": "Dec 2026",
        "handoverDate_hi": "दिसंबर 2026",
        "desc": "45 MLD surface water treatment plant with rapid gravity filtration, intake well on Falgu river basin, and feeder mains connecting 42 villages.",
        "desc_hi": "फल्गु नदी बेसिन पर इनटेक वेल, तीव्र गुरुत्व निस्पंदन और 42 गांवों को जोड़ने वाली मुख्य फीडर लाइनों के साथ 45 एमएलडी सतही जल शोधन संयंत्र।",
        "specs": [
            "45 MLD Water Treatment Plant with flash mixer and clariflocculators",
            "RCC Intake well (12m internal diameter, 18m depth in alluvial sand)",
            "112 km transmission mains using centrifugally cast DI pipes (IS:8329)",
            "Solar power captive installation for daytime pumping efficiency"
        ],
        "specs_hi": [
            "फ्लैश मिक्सर और क्लैरिफ्लोकुलेटर के साथ 45 MLD जल शोधन संयंत्र",
            "आरसीसी इनटेक वेल (12 मीटर आंतरिक व्यास, 18 मीटर गहराई)",
            "अपकेंद्री रूप से ढली डीआई पाइपों (IS:8329) का 112 किमी ट्रांसमिशन नेटवर्क",
            "दिन के समय पंपिंग दक्षता के लिए सौर ऊर्जा कैप्टिव संयंत्र"
        ],
        "fleetDeployed": "01 High-Output Batching Plant, 04 Transit Mixers, 03 Heavy Excavators",
        "fleetDeployed_hi": "01 हाई-आउटपुट बैचिंग प्लांट, 04 ट्रांजिट मिक्सर, 03 भारी एक्सकेवेटर",
        "milestones": [
            {
                "phase": "Phase 1: 18m Deep RCC River Intake Well Sinking",
                "status": "Completed (100%)",
                "date": "Jan 2026"
            },
            {
                "phase": "Phase 2: 45 MLD Rapid Gravity Filtration Structure",
                "status": "Active (90%)",
                "date": "Jul 2026"
            },
            {
                "phase": "Phase 3: 112 km DI Transmission Feeder Pipeline",
                "status": "Active (80%)",
                "date": "Oct 2026"
            },
            {
                "phase": "Phase 4: Solar Plant Integration & Hydro-Testing",
                "status": "In Progress (60%)",
                "date": "Dec 2026"
            }
        ]
    },
    {
        "id": "proj-6",
        "title": "Nalanda Smart City Utility Conduits & Precast Sewerage",
        "title_hi": "नालंदा स्मार्ट सिटी यूटिलिटी डक्ट एवं प्रीकास्ट सीवरेज",
        "category": "urban",
        "categoryLabel": "Urban Infrastructure",
        "categoryLabel_hi": "शहरी अवसंरचना (BUIDCO)",
        "client": "BUIDCO / Smart City Mission",
        "client_hi": "बुडको / स्मार्ट सिटी मिशन",
        "location": "Bihar Sharif / Nalanda",
        "location_hi": "बिहार शरीफ / नालंदा",
        "district": "Nalanda",
        "region": "Gangetic Central",
        "region_hi": "मध्य गंगा क्षेत्र",
        "value": "₹34.2 Cr.",
        "valueNum": 34.2,
        "progress": 100,
        "status": "Commissioned & Handed Over",
        "status_hi": "पूर्ण एवं हस्तांतरित",
        "statusType": "completed",
        "handoverDate": "Jul 2026",
        "handoverDate_hi": "जुलाई 2026",
        "desc": "Integrated underground utility corridors housing high-voltage electrical cables, water distribution, and separate precast concrete sewer lines.",
        "desc_hi": "उच्च वोल्टेज विद्युत केबल, जल वितरण और पृथक प्रीकास्ट कंक्रीट सीवर लाइनों के लिए एकीकृत भूमिगत यूटिलिटी कॉरिडोर।",
        "specs": [
            "18 km multi-utility underground precast trenching",
            "High-density polyethylene chamber covers rated for Class-D 40-tonne loading",
            "Eliminated open street cutting across central heritage commercial areas",
            "100% compliant with smart municipal infrastructure guidelines"
        ],
        "specs_hi": [
            "18 किमी बहु-उपयोगिता भूमिगत प्रीकास्ट ट्रेंचिंग",
            "क्लास-डी 40-टन लोडिंग हेतु प्रमाणित उच्च-घनत्व पॉलीइथाइलीन चेंबर कवर",
            "केंद्रीय विरासत वाणिज्यिक क्षेत्रों में खुली सड़क कटाई समाप्त",
            "स्मार्ट नगरपालिका अवसंरचना दिशानिर्देशों का 100% अनुपालन"
        ],
        "fleetDeployed": "01 Batching Plant, 02 Excavators, 01 Precast Crane Rig",
        "fleetDeployed_hi": "01 बैचिंग प्लांट, 02 एक्सकेवेटर, 01 प्रीकास्ट क्रेन रिग",
        "milestones": [
            {
                "phase": "Phase 1: Heritage Corridor Geotechnical Survey",
                "status": "Completed (100%)",
                "date": "Aug 2025"
            },
            {
                "phase": "Phase 2: 18 km Precast Concrete Conduit Casting & Placing",
                "status": "Completed (100%)",
                "date": "Jan 2026"
            },
            {
                "phase": "Phase 3: Utility Integration (Pipes, Power, Telecom)",
                "status": "Completed (100%)",
                "date": "May 2026"
            },
            {
                "phase": "Phase 4: Street Surface Reinstatement & Final MB Handover",
                "status": "Completed (100%)",
                "date": "Jul 2026"
            }
        ]
    }
];
    const DISTRICTS_RADAR = [
    {
        "id": "dist-patna",
        "name": "Patna",
        "name_hi": "पटना",
        "role": "Corporate HQ & Urban Command",
        "role_hi": "कॉर्पोरेट मुख्यालय एवं शहरी कमान",
        "coords": "25.61° N, 85.14° E",
        "batchingCap": "60 m³/hr Automated",
        "batchingCap_hi": "60 घन मी/घंटा स्वचालित",
        "fleet": "04 Excavators, 06 Transit Mixers, 01 Gantry Crane",
        "fleet_hi": "04 एक्सकेवेटर, 06 ट्रांजिट मिक्सर, 01 गैन्ट्री क्रेन",
        "package": "BUIDCO Stormwater Conduit (₹46.7 Cr.)",
        "package_hi": "बुडको स्टॉर्मवाटर नाला (₹46.7 करोड़)",
        "qaLab": "NABL Central Material Verification Lab",
        "qaLab_hi": "NABL केंद्रीय सामग्री सत्यापन लैब",
        "head": "Er. R. K. Verma, Chief Project Director",
        "head_hi": "ई. आर. के. वर्मा, मुख्य प्रोजेक्ट निदेशक"
    },
    {
        "id": "dist-muzaffarpur",
        "name": "Muzaffarpur",
        "name_hi": "मुजफ्फरपुर",
        "role": "North Bihar PHE Water Hub",
        "role_hi": "उत्तर बिहार पीएचई जलापूर्ति हब",
        "coords": "26.12° N, 85.39° E",
        "batchingCap": "45 m³/hr Stetter",
        "batchingCap_hi": "45 घन मी/घंटा स्टेटर",
        "fleet": "03 Batching Plants, 04 Transit Mixers, 03 Fusion Rigs",
        "fleet_hi": "03 बैचिंग प्लांट, 04 ट्रांजिट मिक्सर, 03 फ्यूजन रिग",
        "package": "Jal Jeevan Mission Rural Grid (₹38.4 Cr.)",
        "package_hi": "जल जीवन मिशन ग्रामीण ग्रिड (₹38.4 करोड़)",
        "qaLab": "District Field Testing Unit Live",
        "qaLab_hi": "जिला फील्ड परीक्षण इकाई सक्रिय",
        "head": "Er. Alok Sharma, Resident Director",
        "head_hi": "ई. आलोक शर्मा, रेजिडेंट निदेशक"
    },
    {
        "id": "dist-bhagalpur",
        "name": "Bhagalpur",
        "name_hi": "भागलपुर",
        "role": "East Highways & Arterial Corridor",
        "role_hi": "पूर्वी राजमार्ग एवं कॉरिडोर हब",
        "coords": "25.24° N, 86.98° E",
        "batchingCap": "60 m³/hr Concrete & Sensor Paver",
        "batchingCap_hi": "60 घन मी/घंटा कंक्रीट एवं सेंसर पेवर",
        "fleet": "01 Sensor Paver, 02 Excavators, 04 Transit Mixers",
        "fleet_hi": "01 सेंसर पेवर, 02 एक्सकेवेटर, 04 ट्रांजिट मिक्सर",
        "package": "RCD 2-Lane Highway (₹52.1 Cr.)",
        "package_hi": "आरसीडी 2-लेन राजमार्ग (₹52.1 करोड़)",
        "qaLab": "Bitumen & Aggregate NABL Mobile Van",
        "qaLab_hi": "डामर एवं एग्रीगेट NABL मोबाइल वैन",
        "head": "Er. S. N. Singh, Project Director",
        "head_hi": "ई. एस. एन. सिंह, प्रोजेक्ट निदेशक"
    },
    {
        "id": "dist-gaya",
        "name": "Gaya",
        "name_hi": "गया",
        "role": "South Bihar WTP & Transmission Hub",
        "role_hi": "दक्षिण बिहार WTP एवं ट्रांसमिशन हब",
        "coords": "24.79° N, 85.00° E",
        "batchingCap": "60 m³/hr Heavy Batching",
        "batchingCap_hi": "60 घन मी/घंटा भारी बैचिंग",
        "fleet": "01 WTP Batching Plant, 04 Transit Mixers, 03 DI Cranes",
        "fleet_hi": "01 WTP बैचिंग प्लांट, 04 ट्रांजिट मिक्सर, 03 डीआई क्रेन",
        "package": "45 MLD Multi-Village WTP (₹64.5 Cr.)",
        "package_hi": "45 MLD बहु-ग्रामीण WTP (₹64.5 करोड़)",
        "qaLab": "On-Site Water Quality & Cube Lab",
        "qaLab_hi": "साइट जल गुणवत्ता एवं क्यूब लैब",
        "head": "Er. Manish Patel, Lead Engineer",
        "head_hi": "ई. मनीष पटेल, मुख्य अभियंता"
    },
    {
        "id": "dist-darbhanga",
        "name": "Darbhanga",
        "name_hi": "दरभंगा",
        "role": "Floodplain PQC Concrete Operations",
        "role_hi": "बाढ़ क्षेत्र PQC कंक्रीट परिचालन",
        "coords": "26.15° N, 85.89° E",
        "batchingCap": "30 m³/hr Mobile Batching",
        "batchingCap_hi": "30 घन मी/घंटा मोबाइल बैचिंग",
        "fleet": "01 Slipform Concrete Paver, 02 Transit Mixers",
        "fleet_hi": "01 स्लिपफॉर्म कंक्रीट पेवर, 02 ट्रांजिट मिक्सर",
        "package": "RWD Rural Connectivity (₹29.8 Cr.)",
        "package_hi": "आरडब्ल्यूडी ग्रामीण संपर्क (₹29.8 करोड़)",
        "qaLab": "Soil Compaction & Core Cutting Unit",
        "qaLab_hi": "मिट्टी संघनन एवं कोर कटिंग इकाई",
        "head": "Er. K. P. Yadav, Division Manager",
        "head_hi": "ई. के. पी. यादव, प्रमंडल प्रबंधक"
    },
    {
        "id": "dist-nalanda",
        "name": "Nalanda",
        "name_hi": "नालंदा",
        "role": "Smart City Underground Conduits",
        "role_hi": "स्मार्ट सिटी भूमिगत यूटिलिटी हब",
        "coords": "25.20° N, 85.52° E",
        "batchingCap": "30 m³/hr Precast Dedicated",
        "batchingCap_hi": "30 घन मी/घंटा प्रीकास्ट प्लांट",
        "fleet": "01 Precast Gantry, 02 Excavators, 02 Transit Mixers",
        "fleet_hi": "01 प्रीकास्ट गैन्ट्री, 02 एक्सकेवेटर, 02 ट्रांजिट मिक्सर",
        "package": "BUIDCO Smart Sewerage & Ducting (₹34.2 Cr.)",
        "package_hi": "बुडको स्मार्ट सीवरेज एवं डक्टिंग (₹34.2 करोड़)",
        "qaLab": "Precast Load Testing Press Unit",
        "qaLab_hi": "प्रीकास्ट लोड परीक्षण प्रेस इकाई",
        "head": "Er. A. K. Choudhary, Technical Head",
        "head_hi": "ई. ए. के. चौधरी, तकनीकी प्रमुख"
    }
];
    const MACHINERY_DATA = [
    {
        "id": "mach-1",
        "name": "Computerized Automated Batching Plants",
        "name_hi": "कम्प्यूटरीकृत स्वचालित बैचिंग प्लांट",
        "category": "concrete",
        "categoryLabel": "Concrete Batching",
        "categoryLabel_hi": "कंक्रीट बैचिंग प्लांट",
        "count": 4,
        "capacity": "30 - 60 m³/hr",
        "icon": "factory",
        "status": "Operational",
        "status_hi": "परिचालित",
        "engineHours": "3,420 hrs",
        "assignedDistrict": "Muzaffarpur, Gaya, Patna",
        "assignedDistrict_hi": "मुजफ्फरपुर, गया, पटना",
        "desc": "High-precision electronic batching plants equipped with moisture sensors and pneumatic aggregate bin gates, ensuring exact M25–M40 concrete designs.",
        "desc_hi": "सटीक इलेक्ट्रॉनिक बैचिंग प्लांट जो नमी सेंसर और न्यूमेटिक एग्रीगेट गेट्स से लैस हैं, जो सटीक M25-M40 कंक्रीट डिजाइन सुनिश्चित करते हैं।"
    },
    {
        "id": "mach-2",
        "name": "Heavy-Duty Transit Mixers (TM)",
        "name_hi": "हैवी-ड्यूटी ट्रांजिट मिक्सर (TM)",
        "category": "transport",
        "categoryLabel": "Transit Mixers",
        "categoryLabel_hi": "ट्रांजिट मिक्सर बेड़ा",
        "count": 12,
        "capacity": "6.0 m³ & 7.0 m³ Drum",
        "icon": "truck",
        "status": "Operational",
        "status_hi": "परिचालित",
        "engineHours": "4,180 hrs",
        "assignedDistrict": "Statewide Deployment",
        "assignedDistrict_hi": "राज्यव्यापी तैनाती",
        "desc": "Mounted on Ashok Leyland & Tata heavy chassis with hydrostatic drum drives, guaranteeing slump retention across 35 km transit radii.",
        "desc_hi": "अशोक लीलैंड एवं टाटा हेवी चेसिस पर स्थापित, जो 35 किमी परिवहन परिधि में स्लंप गुणवत्ता बनाए रखने की गारंटी देते हैं।"
    },
    {
        "id": "mach-3",
        "name": "Hydraulic Heavy Excavators & Rock Breakers",
        "name_hi": "हाइड्रोलिक भारी उत्खननकर्ता एवं रॉक ब्रेकर",
        "category": "earth",
        "categoryLabel": "Excavation & Trenching",
        "categoryLabel_hi": "उत्खनन एवं ट्रेंचिंग",
        "count": 8,
        "capacity": "0.9 - 1.2 m³ Bucket",
        "icon": "cog",
        "status": "Operational",
        "status_hi": "परिचालित",
        "engineHours": "5,120 hrs",
        "assignedDistrict": "Patna, Gaya, Bhagalpur",
        "assignedDistrict_hi": "पटना, गया, भागलपुर",
        "desc": "Tata Hitachi & JCB excavators with hydraulic rock breakers and laser trench grading systems for deep pipe trenching in dense Bihar soils.",
        "desc_hi": "टाटा हिताची एवं जेसीबी एक्सकेवेटर जो हाइड्रोलिक रॉक ब्रेकर और लेजर ट्रेंच ग्रेडिंग से लैस हैं।"
    },
    {
        "id": "mach-4",
        "name": "Electronic Sensor Asphalt & Concrete Pavers",
        "name_hi": "इलेक्ट्रॉनिक सेंसर डामर एवं कंक्रीट पेवर",
        "category": "pavers",
        "categoryLabel": "Asphalt & PQC Pavers",
        "categoryLabel_hi": "डामर एवं PQC पेवर",
        "count": 3,
        "capacity": "9.0 m Single-Pass Width",
        "icon": "layers",
        "status": "Operational",
        "status_hi": "परिचालित",
        "engineHours": "2,840 hrs",
        "assignedDistrict": "Bhagalpur, Darbhanga",
        "assignedDistrict_hi": "भागलपुर, दरभंगा",
        "desc": "Electronic sonic sensor pavers capable of laying bituminous surface courses and PQC concrete to rigorous MoRTH smoothness indexes.",
        "desc_hi": "इलेक्ट्रॉनिक सोनिक सेंसर पेवर जो सख्त MoRTH मानकों के अनुसार एकल पास में 9.0 मीटर चौड़ाई तक पेविंग में सक्षम हैं।"
    },
    {
        "id": "mach-5",
        "name": "Automated HDPE Butt Fusion Welding Rigs",
        "name_hi": "स्वचालित एचडीपीई बट फ्यूजन वेल्डिंग रिग",
        "category": "fusion",
        "categoryLabel": "HDPE Jointing Rigs",
        "categoryLabel_hi": "एचडीपीई बट फ्यूजन रिग",
        "count": 6,
        "capacity": "63 mm to 400 mm DIA",
        "icon": "wrench",
        "status": "Operational",
        "status_hi": "परिचालित",
        "engineHours": "1,960 hrs",
        "assignedDistrict": "Muzaffarpur, Gaya",
        "assignedDistrict_hi": "मुजफ्फरपुर, गया",
        "desc": "Microprocessor-controlled hydraulic butt fusion jointing rigs with automated temperature and joint data logging for Jal Jeevan Mission lines.",
        "desc_hi": "माइक्रोप्रोसेसर-नियंत्रित हाइड्रोलिक बट फ्यूजन रिग जो स्वचालित तापमान और जोड़ डेटा लॉगिंग से लैस हैं।"
    },
    {
        "id": "mach-6",
        "name": "NABL Mobile Field Quality Assurance Testing Labs",
        "name_hi": "NABL मोबाइल फील्ड गुणवत्ता परीक्षण लैब",
        "category": "lab",
        "categoryLabel": "NABL Quality Testing",
        "categoryLabel_hi": "NABL गुणवत्ता परीक्षण लैब",
        "count": 2,
        "capacity": "2000 kN Compression Testing",
        "icon": "test-tube",
        "status": "Operational",
        "status_hi": "परिचालित",
        "engineHours": "Full Compliance",
        "assignedDistrict": "Central & Field Labs",
        "assignedDistrict_hi": "केंद्रीय एवं फील्ड लैब",
        "desc": "Air-conditioned specialized field testing vans outfitted with digital concrete cube compression machines, core drillers, aggregate sieves, and nuclear density gauges.",
        "desc_hi": "डिजिटल कंक्रीट क्यूब संपीडन मशीन, कोर ड्रिलर और एग्रीगेट छलनी से सुसज्जित वातानुकूलित मोबाइल फील्ड परीक्षण वैन।"
    },
    {
        "id": "mach-7",
        "name": "Heavy Hydraulic Vibratory Soil & Tandem Compactor Rollers",
        "name_hi": "भारी हाइड्रोलिक वाइब्रेटरी मृदा एवं टेंडेम रोलर्स",
        "category": "earth",
        "categoryLabel": "Soil & Pavement Compaction",
        "categoryLabel_hi": "मृदा एवं फुटपाथ संघनन",
        "count": 6,
        "capacity": "12 - 15 Ton Operating Weight",
        "icon": "circle-dot",
        "status": "Operational",
        "status_hi": "परिचालित",
        "engineHours": "3,890 hrs",
        "assignedDistrict": "Patna, Muzaffarpur, Gaya",
        "assignedDistrict_hi": "पटना, मुजफ्फरपुर, गया",
        "desc": "Dynapac & HAMM high-amplitude vibratory compactors equipped with compaction meters ensuring 98% modified proctor density on subgrades.",
        "desc_hi": "डायनापैक एवं हैम उच्च-आयाम वाइब्रेटरी कम्पेक्टर जो सबग्रेड पर 98% संशोधित प्रॉक्टर घनत्व सुनिश्चित करते हैं।"
    },
    {
        "id": "mach-8",
        "name": "High-Discharge Submersible & Well-Point Dewatering Pumps",
        "name_hi": "उच्च-निर्वहन सबमर्सिबल एवं वेल-पॉइंट डीवाटरिंग पंप",
        "category": "concrete",
        "categoryLabel": "Trench Dewatering Systems",
        "categoryLabel_hi": "ट्रेंच डीवाटरिंग सिस्टम",
        "count": 14,
        "capacity": "5,000 - 15,000 LPM Discharge",
        "icon": "droplet",
        "status": "Operational",
        "status_hi": "परिचालित",
        "engineHours": "4,750 hrs",
        "assignedDistrict": "Ganges & Sone Basin Sites",
        "assignedDistrict_hi": "गंगा एवं सोन बेसिन कार्यस्थल",
        "desc": "Kirloskar & KSB high-head mud and slurry dewatering sets maintaining dry trenches during monsoon water supply pipe laying.",
        "desc_hi": "किर्लोस्कर एवं केएसबी उच्च-हेड कीचड़ और स्लरी डीवाटरिंग सेट जो मानसून में शुष्क ट्रेंच बनाए रखते हैं।"
    }
];
