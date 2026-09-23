import { motion, useInView } from 'framer-motion';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BellRing,
  Building2,
  Cable,
  Check,
  CheckCircle2,
  CircuitBoard,
  CloudCog,
  Factory,
  Gauge,
  Globe2,
  Hotel,
  House,
  Landmark,
  Lightbulb,
  MapPin,
  Moon,
  Network,
  PlugZap,
  RadioTower,
  School,
  ServerCog,
  ShieldCheck,
  Sun,
  University,
  Wrench,
  Zap,
} from 'lucide-react';
import { FormEvent, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { Link } from 'wouter';
import brochurePdf from '@/assets/Brochure_VjraTechnologies.pdf';
import { ProductSiteFooter, ProductSiteHeader } from '@/components/products';

type Lang = 'en' | 'mr' | 'hi' | 'hinglish';
type Icon = ComponentType<{ className?: string }>;

const copy: Record<Lang, {
  language: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroBridge: string;
  solve: string;
  brochure: string;
  problemEyebrow: string;
  problemTitle: string;
  problemBody: string;
  problemSteps: string[];
  justInstall: string;
  evReady: string;
  justInstallBody: string;
  evReadyBody: string;
  stackEyebrow: string;
  stackTitle: string;
  stackBody: string;
  layers: string[];
  houseQuote: string;
  processEyebrow: string;
  processTitle: string;
  processBody: string;
  process: string[];
  processFoot: string;
  systemEyebrow: string;
  systemTitle: string;
  systemBody: string;
  system: string[];
  mattersEyebrow: string;
  mattersTitle: string;
  places: string[];
  uptimeEyebrow: string;
  uptimeTitle: string;
  uptimeBody: string;
  uptimeLabel: string;
  uptimeFoot: string;
  alerts: string[];
  hardwareEyebrow: string;
  hardwareTitle: string;
  hardwareBody: string;
  hardwareStack: string[];
  hardwareWhy: string;
  hardwareWhyItems: string[];
  privacyEyebrow: string;
  privacyTitle: string;
  privacyBody: string;
  privacyQuote: string;
  compareEyebrow: string;
  compareTitle: string;
  typical: string;
  vjra: string;
  compareRows: [string, string, string][];
  philosophyEyebrow: string;
  philosophyTitle: string;
  philosophyBody: string;
  philosophyWords: string[];
  philosophyResult: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  message: string;
  submit: string;
  whatsapp: string;
  submitted: string;
  back: string;
}> = {
  en: {
    language: 'English',
    eyebrow: 'WHY VIZ?',
    heroTitle: 'EV charging is not just about the charger.',
    heroBody: 'India already has electricity. What is missing is the infrastructure that safely gets that electricity to the right place, at the right capacity, and keeps it running reliably.',
    heroBridge: "That's where we come in.",
    solve: 'See How We Solve It',
    brochure: 'Get the VIZ Brochure',
    problemEyebrow: 'THE REAL BOTTLENECK',
    problemTitle: 'The problem nobody talks about enough.',
    problemBody: 'A charger can be ready to install while the site is not ready to power it. Sanctioned load, transformer capacity, cable runs, protection and monitoring all decide whether a charging point works well after launch.',
    problemSteps: ['Electricity exists', 'Getting it to the right place safely is the challenge', 'Charging infrastructure must be designed around the site'],
    justInstall: 'Just installing a charger',
    evReady: 'Making a site EV-ready',
    justInstallBody: 'One device, one installation visit, and a handover.',
    evReadyBody: 'Load planning, utility coordination, electrical infrastructure, charger, software, monitoring and support.',
    stackEyebrow: 'THE WHOLE SYSTEM',
    stackTitle: 'A charger is only one part of the system.',
    stackBody: 'Think of it like building a house. Buying a great AC is not enough. You still need proper wiring, sanctioned load, distribution, protection and maintenance. EV charging is the same.',
    layers: ['Grid / Utility Power', 'Load Assessment', 'Load Sanction', 'Green Meter', 'Transformer / HT Infrastructure', 'Protection & Distribution', 'Electrical Cabling', 'EV Charging Equipment', 'Software & Firmware', 'Monitoring', 'Alerts', 'Service & Maintenance'],
    houseQuote: 'Installing a charger is easy. Making the site ready for it is the real work.',
    processEyebrow: 'FROM PLAN TO UPTIME',
    processTitle: "We don't just install chargers. We make locations EV-ready.",
    processBody: 'From the first electrical assessment to the moment the first vehicle starts charging — and long after that — we stay involved.',
    process: ['Understand the site', 'Electrical & load assessment', 'MEP planning', 'Load sanction coordination', 'Green meter installation', 'Transformer / HT infrastructure', 'Electrical cabling & protection', 'EV charging installation', 'Firmware + software setup', 'Remote monitoring', 'Testing & commissioning', 'Ongoing support'],
    processFoot: 'Your customer sees a charger. We see the entire electrical system behind it.',
    systemEyebrow: 'ONE ACCOUNTABLE SYSTEM',
    systemTitle: 'End-to-end infrastructure, without the handoff maze.',
    systemBody: 'We bring the electrical, hardware, firmware, software and field layers together. Utility work is coordinated with the electricity utility / MSEDCL / MSEB as applicable — without pretending that coordination is a formal partnership.',
    system: ['MEP Consultants', 'Utility Coordination', 'Electrical Infrastructure', 'Transformer & HT Work', 'Green Meter', 'Cabling', 'Protection Systems', 'EV Chargers', 'Software', 'Firmware', 'Remote Monitoring', 'Field Service'],
    mattersEyebrow: 'DESIGNED AROUND THE SITE',
    mattersTitle: 'Every place can become EV-ready.',
    places: ['Housing Societies', 'Colleges', 'Schools', 'Hospitals', 'Hotels', 'Resorts', 'Corporate Campuses', 'Commercial Buildings', 'Villas', 'Highways', 'Tourist Destinations', 'Hill Stations'],
    uptimeEyebrow: 'THE RELIABILITY MINDSET',
    uptimeTitle: 'Installing it is only half the job.',
    uptimeBody: 'Our goal is simple: keep every charging point available when users need it.',
    uptimeLabel: 'Uptime target / reliability mindset',
    uptimeFoot: 'You should not have to discover that your charger is offline from an angry customer. We want to know before you do.',
    alerts: ['Charger goes offline', 'System detects it', 'Red alert reaches VIZ', 'Team investigates', 'Remote recovery / field intervention', 'Charger comes back online'],
    hardwareEyebrow: 'MADE IN INDIA',
    hardwareTitle: 'Built by people who know what is inside.',
    hardwareBody: 'Our hardware is 100% made in India. We know the hardware we sell, control the firmware running on it, and control the software connected to it. When something needs to be fixed, improved or optimised, we know where to look.',
    hardwareStack: ['Hardware', 'Firmware', 'Software', 'Cloud / Monitoring', 'Support'],
    hardwareWhy: 'Why this matters',
    hardwareWhyItems: ['Less dependency', 'Faster troubleshooting', 'Better control', 'Better long-term support', 'More accountability'],
    privacyEyebrow: 'CONTROL & TRUST',
    privacyTitle: 'Your hardware. Your data. Your trust.',
    privacyBody: 'We design our ecosystem with control over the hardware, firmware and software stack so we can maintain better visibility into how the system works and how information moves through it.',
    privacyQuote: 'We prefer transparency over mystery. You should know what hardware is installed, what software is running it, and who is responsible for maintaining it.',
    compareEyebrow: 'A CLEARER WAY TO WORK',
    compareTitle: 'Why work with VIZ?',
    typical: 'Typical approach',
    vjra: 'VIZ approach',
    compareRows: [
      ['Charger hardware', 'Charger supplied', 'Complete EV-ready site solution'],
      ['Electrical planning', 'Handled separately', 'Planned around the site and charging demand'],
      ['Load sanction / green meter', 'Customer coordinates', 'Coordination support included'],
      ['Transformer, HT & cabling', 'Separate vendors', 'One connected infrastructure plan'],
      ['Installation', 'Installation', 'Installation + commissioning + monitoring'],
      ['Firmware & software', 'Vendor handoff', 'Hardware, firmware and software under one team'],
      ['Offline alerts', 'Support when contacted', 'Proactive alert + service response'],
      ['After-sales support', 'Post-installation ticket', 'Long-term support and accountability'],
    ],
    philosophyEyebrow: 'THE VIZ PHILOSOPHY',
    philosophyTitle: 'We are not in the business of selling boxes.',
    philosophyBody: 'We are in the business of making EV charging dependable. A good charger, electrical system, software and service all matter. But the real product is reliability.',
    philosophyWords: ['Hardware', 'Infrastructure', 'Software', 'Monitoring', 'Support'],
    philosophyResult: 'RELIABLE EV INFRASTRUCTURE',
    ctaEyebrow: 'LET’S MAKE THE SITE READY',
    ctaTitle: 'Need to make your site EV-ready?',
    ctaBody: 'Tell us where you are planning to install EV charging. Our team can help you understand the electrical infrastructure, charging requirements and the right way to build it.',
    name: 'Name',
    company: 'Company / Organisation',
    phone: 'Phone Number',
    email: 'Email',
    location: 'Site / Location',
    message: 'Message',
    submit: 'Talk to the VIZ Team',
    whatsapp: 'Prefer WhatsApp? Talk to us directly.',
    submitted: 'Opening WhatsApp with your project details…',
    back: 'Back to platform',
  },
  mr: {
    language: 'मराठी',
    eyebrow: 'VIZ का?',
    heroTitle: 'EV charging म्हणजे फक्त charger नाही.',
    heroBody: 'भारतात वीज आहे. पण ती योग्य ठिकाणी, योग्य क्षमतेने आणि सुरक्षितपणे पोहोचवणारी infrastructure व्यवस्था तयार करणे हे खरे काम आहे.',
    heroBridge: 'इथेच आम्ही कामी येतो.',
    solve: 'आम्ही कसे सोडवतो ते पाहा',
    brochure: 'VIZ brochure मिळवा',
    problemEyebrow: 'खरी अडचण',
    problemTitle: 'ज्या समस्येबद्दल पुरेसे बोलले जात नाही.',
    problemBody: 'Charger बसवायला तयार असला तरी site त्याला वीज देण्यासाठी तयार असेलच असे नाही. Sanctioned load, transformer, cabling, protection आणि monitoring यावर charging point किती विश्वासार्ह चालेल ते ठरते.',
    problemSteps: ['वीज उपलब्ध आहे', 'ती योग्य ठिकाणी सुरक्षितपणे पोहोचवणे हे आव्हान आहे', 'Charging infrastructure site नुसार आखावी लागते'],
    justInstall: 'फक्त charger बसवणे',
    evReady: 'पूर्ण site EV-ready करणे',
    justInstallBody: 'एक device, एक installation visit आणि handover.',
    evReadyBody: 'Load planning, utility coordination, electrical infrastructure, charger, software, monitoring आणि support.',
    stackEyebrow: 'संपूर्ण व्यवस्था',
    stackTitle: 'Charger हा संपूर्ण system मधला फक्त एक भाग आहे.',
    stackBody: 'घर बांधण्यासारखे समजा. चांगला AC घेतला म्हणून पुरेसे होत नाही; wiring, sanctioned load, distribution, protection आणि maintenanceही लागते. EV chargingही तसेच.',
    layers: ['Grid / Utility Power', 'Load Assessment', 'Load Sanction', 'Green Meter', 'Transformer / HT Infrastructure', 'Protection & Distribution', 'Electrical Cabling', 'EV Charging Equipment', 'Software & Firmware', 'Monitoring', 'Alerts', 'Service & Maintenance'],
    houseQuote: 'Charger बसवणे सोपे आहे. Site त्यासाठी तयार करणे हे खरे काम आहे.',
    processEyebrow: 'योजनेपासून uptime पर्यंत',
    processTitle: 'आम्ही फक्त chargers बसवत नाही. Locations EV-ready करतो.',
    processBody: 'पहिल्या electrical assessment पासून पहिली गाडी charge होईपर्यंत — आणि त्यानंतरही — आम्ही सोबत राहतो.',
    process: ['Site समजून घेणे', 'Electrical & load assessment', 'MEP planning', 'Load sanction coordination', 'Green meter installation', 'Transformer / HT infrastructure', 'Electrical cabling & protection', 'EV charging installation', 'Firmware + software setup', 'Remote monitoring', 'Testing & commissioning', 'Ongoing support'],
    processFoot: 'तुमच्या customer ला charger दिसतो. आम्हाला त्यामागची संपूर्ण electrical system दिसते.',
    systemEyebrow: 'एक जबाबदार system',
    systemTitle: 'End-to-end infrastructure, handoff च्या गोंधळाशिवाय.',
    systemBody: 'Electrical, hardware, firmware, software आणि field service एकत्र आणतो. Utility काम गरजेनुसार electricity utility / MSEDCL / MSEB सोबत coordinate केले जाते.',
    system: ['MEP Consultants', 'Utility Coordination', 'Electrical Infrastructure', 'Transformer & HT Work', 'Green Meter', 'Cabling', 'Protection Systems', 'EV Chargers', 'Software', 'Firmware', 'Remote Monitoring', 'Field Service'],
    mattersEyebrow: 'SITE नुसार design',
    mattersTitle: 'प्रत्येक जागा EV-ready होऊ शकते.',
    places: ['Housing Societies', 'Colleges', 'Schools', 'Hospitals', 'Hotels', 'Resorts', 'Corporate Campuses', 'Commercial Buildings', 'Villas', 'Highways', 'Tourist Destinations', 'Hill Stations'],
    uptimeEyebrow: 'विश्वासार्हतेची वृत्ती',
    uptimeTitle: 'Installation हा फक्त अर्धा भाग आहे.',
    uptimeBody: 'आमचे ध्येय सोपे आहे: customer ला गरज असेल तेव्हा प्रत्येक charging point available ठेवणे.',
    uptimeLabel: 'Uptime target / reliability mindset',
    uptimeFoot: 'तुमचा charger offline आहे हे angry customer कडून कळायला नको. आम्हाला तुमच्याआधी कळायला हवे.',
    alerts: ['Charger offline होतो', 'System ते detect करते', 'VIZ ला red alert येतो', 'Team तपासते', 'Remote recovery / field intervention', 'Charger पुन्हा online होतो'],
    hardwareEyebrow: 'भारतात बनवलेले',
    hardwareTitle: 'आत काय आहे हे माहीत असलेल्या लोकांनी बनवलेले.',
    hardwareBody: 'आमचे hardware 100% भारतात बनते. आम्ही विकत असलेले hardware, त्यावरचे firmware आणि त्याला जोडलेले software समजतो. काही fix किंवा improve करायचे असल्यास कुठे पाहायचे हे आम्हाला माहीत असते.',
    hardwareStack: ['Hardware', 'Firmware', 'Software', 'Cloud / Monitoring', 'Support'],
    hardwareWhy: 'हे महत्त्वाचे का?',
    hardwareWhyItems: ['कमी dependency', 'जलद troubleshooting', 'चांगले control', 'चांगला long-term support', 'जास्त accountability'],
    privacyEyebrow: 'CONTROL आणि TRUST',
    privacyTitle: 'तुमचे hardware. तुमचा data. तुमचा विश्वास.',
    privacyBody: 'Hardware, firmware आणि software stack वर control ठेवून ecosystem तयार करतो, त्यामुळे system कसे काम करते आणि माहिती कशी फिरते याची visibility चांगली राहते.',
    privacyQuote: 'गूढतेपेक्षा transparency. कोणते hardware आहे, कोणते software चालते आणि maintenance ची जबाबदारी कोणाची आहे हे तुम्हाला माहीत असावे.',
    compareEyebrow: 'काम करण्याची स्पष्ट पद्धत',
    compareTitle: 'VIZ सोबत का काम करावे?',
    typical: 'सामान्य पद्धत',
    vjra: 'VIZ ची पद्धत',
    compareRows: [
      ['Charger hardware', 'Charger supplied', 'Complete EV-ready site solution'],
      ['Electrical planning', 'वेगवेगळे handle केले जाते', 'Site आणि charging demand नुसार planning'],
      ['Load sanction / green meter', 'Customer coordinates', 'Coordination support'],
      ['Transformer, HT & cabling', 'Separate vendors', 'एक connected infrastructure plan'],
      ['Installation', 'Installation', 'Installation + commissioning + monitoring'],
      ['Firmware & software', 'Vendor handoff', 'एकाच team कडून hardware, firmware आणि software'],
      ['Offline alerts', 'Customer सांगेल तेव्हा support', 'Proactive alert + service response'],
      ['After-sales support', 'Post-installation ticket', 'Long-term support आणि accountability'],
    ],
    philosophyEyebrow: 'VIZ ची भूमिका',
    philosophyTitle: 'आम्ही boxes विकण्याच्या business मध्ये नाही.',
    philosophyBody: 'आम्ही dependable EV charging तयार करण्याच्या business मध्ये आहोत. Charger, electrical system, software आणि service सगळे महत्त्वाचे; पण खरे product म्हणजे reliability.',
    philosophyWords: ['Hardware', 'Infrastructure', 'Software', 'Monitoring', 'Support'],
    philosophyResult: 'RELIABLE EV INFRASTRUCTURE',
    ctaEyebrow: 'SITE READY करूया',
    ctaTitle: 'तुमची site EV-ready करायची आहे?',
    ctaBody: 'कुठे EV charging बसवायची आहे ते सांगा. Electrical infrastructure, charging requirements आणि योग्य setup समजून घेण्यासाठी आमची team मदत करेल.',
    name: 'नाव',
    company: 'Company / Organisation',
    phone: 'Phone Number',
    email: 'Email',
    location: 'Site / Location',
    message: 'Message',
    submit: 'VIZ team शी बोला',
    whatsapp: 'WhatsApp आवडते? थेट बोला.',
    submitted: 'तुमच्या project details सह WhatsApp उघडत आहे…',
    back: 'Platform वर परत',
  },
  hi: {
    language: 'हिंदी',
    eyebrow: 'VIZ क्यों?',
    heroTitle: 'EV charging सिर्फ charger के बारे में नहीं है।',
    heroBody: 'भारत में electricity है। असली जरूरत है ऐसी infrastructure की, जो उसे सही जगह, सही capacity और सुरक्षित तरीके से पहुंचाए — और भरोसेमंद तरीके से चलाती रहे।',
    heroBridge: 'यहीं हम काम आते हैं।',
    solve: 'हम कैसे solve करते हैं देखें',
    brochure: 'VIZ brochure लें',
    problemEyebrow: 'असल bottleneck',
    problemTitle: 'जिस problem की बात कम होती है।',
    problemBody: 'Charger install करने के लिए तैयार हो सकता है, लेकिन site उसे power देने के लिए तैयार हो यह जरूरी नहीं। Sanctioned load, transformer, cable runs, protection और monitoring reliability तय करते हैं।',
    problemSteps: ['Electricity मौजूद है', 'उसे सही जगह safely पहुंचाना challenge है', 'Charging infrastructure site के हिसाब से design होनी चाहिए'],
    justInstall: 'सिर्फ charger install करना',
    evReady: 'पूरी site को EV-ready बनाना',
    justInstallBody: 'एक device, एक installation visit और handover.',
    evReadyBody: 'Load planning, utility coordination, electrical infrastructure, charger, software, monitoring और support.',
    stackEyebrow: 'पूरा system',
    stackTitle: 'Charger पूरे system का सिर्फ एक हिस्सा है।',
    stackBody: 'इसे घर बनाने जैसा समझिए। अच्छा AC खरीदना काफी नहीं; proper wiring, sanctioned load, distribution, protection और maintenance भी चाहिए। EV charging भी ऐसा ही है।',
    layers: ['Grid / Utility Power', 'Load Assessment', 'Load Sanction', 'Green Meter', 'Transformer / HT Infrastructure', 'Protection & Distribution', 'Electrical Cabling', 'EV Charging Equipment', 'Software & Firmware', 'Monitoring', 'Alerts', 'Service & Maintenance'],
    houseQuote: 'Charger install करना आसान है। Site को उसके लिए ready करना असली काम है।',
    processEyebrow: 'Plan से uptime तक',
    processTitle: 'हम सिर्फ chargers install नहीं करते। Locations को EV-ready बनाते हैं।',
    processBody: 'पहले electrical assessment से पहली vehicle charging तक — और उसके बहुत बाद तक — हम जुड़े रहते हैं।',
    process: ['Site समझना', 'Electrical & load assessment', 'MEP planning', 'Load sanction coordination', 'Green meter installation', 'Transformer / HT infrastructure', 'Electrical cabling & protection', 'EV charging installation', 'Firmware + software setup', 'Remote monitoring', 'Testing & commissioning', 'Ongoing support'],
    processFoot: 'आपके customer को charger दिखता है। हमें उसके पीछे का पूरा electrical system दिखता है।',
    systemEyebrow: 'एक accountable system',
    systemTitle: 'End-to-end infrastructure, handoff के झंझट के बिना।',
    systemBody: 'Electrical, hardware, firmware, software और field layers को एक साथ लाते हैं। Utility work जरूरत के अनुसार electricity utility / MSEDCL / MSEB के साथ coordinate किया जाता है।',
    system: ['MEP Consultants', 'Utility Coordination', 'Electrical Infrastructure', 'Transformer & HT Work', 'Green Meter', 'Cabling', 'Protection Systems', 'EV Chargers', 'Software', 'Firmware', 'Remote Monitoring', 'Field Service'],
    mattersEyebrow: 'SITE के हिसाब से design',
    mattersTitle: 'हर जगह EV-ready बन सकती है।',
    places: ['Housing Societies', 'Colleges', 'Schools', 'Hospitals', 'Hotels', 'Resorts', 'Corporate Campuses', 'Commercial Buildings', 'Villas', 'Highways', 'Tourist Destinations', 'Hill Stations'],
    uptimeEyebrow: 'reliability mindset',
    uptimeTitle: 'Installation सिर्फ आधा काम है।',
    uptimeBody: 'हमारा goal simple है: जब user को जरूरत हो, तब हर charging point available रहे।',
    uptimeLabel: 'Uptime target / reliability mindset',
    uptimeFoot: 'आपको यह नहीं पता चलना चाहिए कि charger offline है किसी नाराज customer से। हम आपसे पहले जानना चाहते हैं।',
    alerts: ['Charger offline होता है', 'System detect करता है', 'VIZ को red alert मिलता है', 'Team जांच करती है', 'Remote recovery / field intervention', 'Charger वापस online होता है'],
    hardwareEyebrow: 'MADE IN INDIA',
    hardwareTitle: 'उन्हीं लोगों ने बनाया है जो अंदर की चीज जानते हैं।',
    hardwareBody: 'हमारा hardware 100% India में बना है। हम अपने hardware, उसके firmware और उससे जुड़े software को जानते हैं। कुछ fix, improve या optimise करना हो तो हमें पता होता है कि कहां देखना है।',
    hardwareStack: ['Hardware', 'Firmware', 'Software', 'Cloud / Monitoring', 'Support'],
    hardwareWhy: 'इससे क्या फर्क पड़ता है?',
    hardwareWhyItems: ['कम dependency', 'तेज troubleshooting', 'बेहतर control', 'बेहतर long-term support', 'ज्यादा accountability'],
    privacyEyebrow: 'CONTROL और TRUST',
    privacyTitle: 'आपका hardware. आपका data. आपका trust.',
    privacyBody: 'Hardware, firmware और software stack पर control के साथ ecosystem बनाते हैं, ताकि system कैसे काम करता है और information कैसे move करती है इसकी visibility बेहतर रहे।',
    privacyQuote: 'Mystery से बेहतर transparency. कौन सा hardware लगा है, कौन सा software चल रहा है और maintenance की जिम्मेदारी किसकी है — आपको पता होना चाहिए।',
    compareEyebrow: 'काम करने का साफ तरीका',
    compareTitle: 'VIZ के साथ क्यों काम करें?',
    typical: 'Typical approach',
    vjra: 'VIZ approach',
    compareRows: [
      ['Charger hardware', 'Charger supplied', 'Complete EV-ready site solution'],
      ['Electrical planning', 'अलग से handle', 'Site और charging demand के हिसाब से plan'],
      ['Load sanction / green meter', 'Customer coordinates', 'Coordination support'],
      ['Transformer, HT & cabling', 'Separate vendors', 'एक connected infrastructure plan'],
      ['Installation', 'Installation', 'Installation + commissioning + monitoring'],
      ['Firmware & software', 'Vendor handoff', 'एक team के under hardware, firmware और software'],
      ['Offline alerts', 'Contact करने पर support', 'Proactive alert + service response'],
      ['After-sales support', 'Post-installation ticket', 'Long-term support और accountability'],
    ],
    philosophyEyebrow: 'VIZ की सोच',
    philosophyTitle: 'हम boxes बेचने के business में नहीं हैं।',
    philosophyBody: 'हम dependable EV charging बनाने के business में हैं। अच्छा charger, electrical system, software और service सभी जरूरी हैं। लेकिन असली product reliability है।',
    philosophyWords: ['Hardware', 'Infrastructure', 'Software', 'Monitoring', 'Support'],
    philosophyResult: 'RELIABLE EV INFRASTRUCTURE',
    ctaEyebrow: 'SITE READY करते हैं',
    ctaTitle: 'अपनी site को EV-ready बनाना है?',
    ctaBody: 'बताइए EV charging कहां install करनी है। हमारी team electrical infrastructure, charging requirements और सही setup समझने में मदद करेगी।',
    name: 'नाम',
    company: 'Company / Organisation',
    phone: 'Phone Number',
    email: 'Email',
    location: 'Site / Location',
    message: 'Message',
    submit: 'VIZ team से बात करें',
    whatsapp: 'WhatsApp पसंद है? सीधे बात करें।',
    submitted: 'आपके project details के साथ WhatsApp खुल रहा है…',
    back: 'Platform पर वापस',
  },
  hinglish: {
    language: 'Hinglish',
    eyebrow: 'WHY VIZ?',
    heroTitle: 'EV charging sirf charger lagane ka naam nahi hai.',
    heroBody: 'India mein electricity hai. Real challenge hai us power ko right location, right capacity aur safely deliver karna — phir system ko reliably running rakhna.',
    heroBridge: 'Yahin VIZ ka kaam start hota hai.',
    solve: 'Dekhiye hum kaise solve karte hain',
    brochure: 'VIZ brochure lo',
    problemEyebrow: 'REAL BOTTLENECK',
    problemTitle: 'Problem charger ki nahi, poori electrical chain ki hai.',
    problemBody: 'Charger ready ho sakta hai, par site usko power dene ke liye ready ho zaroori nahi. Sanctioned load, transformer, cable runs, protection aur monitoring milke reliability decide karte hain.',
    problemSteps: ['Electricity available hai', 'Usko right place tak safely lana challenge hai', 'Charging setup ko site ke around design karna padta hai'],
    justInstall: 'Sirf charger laga dena',
    evReady: 'Location ko EV-ready banana',
    justInstallBody: 'Ek device, ek installation visit aur handover.',
    evReadyBody: 'Load planning, utility coordination, electrical infra, charger, software, monitoring aur support.',
    stackEyebrow: 'POORA SYSTEM',
    stackTitle: 'Charger poore system ka sirf ek part hai.',
    stackBody: 'Isko ghar banane jaisa samjho. Great AC buy karna enough nahi; proper wiring, sanctioned load, distribution, protection aur maintenance bhi chahiye. EV charging bhi same hai.',
    layers: ['Grid / Utility Power', 'Load Assessment', 'Load Sanction', 'Green Meter', 'Transformer / HT Infrastructure', 'Protection & Distribution', 'Electrical Cabling', 'EV Charging Equipment', 'Software & Firmware', 'Monitoring', 'Alerts', 'Service & Maintenance'],
    houseQuote: 'Charger lagana easy hai. Site ko uske liye ready karna real work hai.',
    processEyebrow: 'PLAN SE UPTIME TAK',
    processTitle: 'Hum charger bechke gayab nahi hote. Location ko EV-ready banate hain.',
    processBody: 'First electrical assessment se first charging session tak — aur uske baad bhi — hum involved rehte hain.',
    process: ['Site samajhna', 'Electrical & load assessment', 'MEP planning', 'Load sanction coordination', 'Green meter installation', 'Transformer / HT infrastructure', 'Electrical cabling & protection', 'EV charging installation', 'Firmware + software setup', 'Remote monitoring', 'Testing & commissioning', 'Ongoing support'],
    processFoot: 'Customer ko charger dikhta hai. Humein uske peeche ka entire electrical system dikhta hai.',
    systemEyebrow: 'ONE ACCOUNTABLE SYSTEM',
    systemTitle: 'End-to-end infrastructure, bina handoff maze ke.',
    systemBody: 'Electrical, hardware, firmware, software aur field layers ko together laate hain. Utility work applicable ho to electricity utility / MSEDCL / MSEB ke saath coordinate hota hai.',
    system: ['MEP Consultants', 'Utility Coordination', 'Electrical Infrastructure', 'Transformer & HT Work', 'Green Meter', 'Cabling', 'Protection Systems', 'EV Chargers', 'Software', 'Firmware', 'Remote Monitoring', 'Field Service'],
    mattersEyebrow: 'SITE KE AROUND DESIGN',
    mattersTitle: 'Har place EV-ready ban sakti hai.',
    places: ['Housing Societies', 'Colleges', 'Schools', 'Hospitals', 'Hotels', 'Resorts', 'Corporate Campuses', 'Commercial Buildings', 'Villas', 'Highways', 'Tourist Destinations', 'Hill Stations'],
    uptimeEyebrow: 'RELIABILITY MINDSET',
    uptimeTitle: 'Install karna half job hai.',
    uptimeBody: 'Goal simple hai: jab user ko need ho, har charging point available rahe.',
    uptimeLabel: 'Uptime target / reliability mindset',
    uptimeFoot: 'Aapko charger offline hone ki news angry customer se nahi milni chahiye. Humein aapse pehle pata chalna chahiye.',
    alerts: ['Charger offline hota hai', 'System detect karta hai', 'VIZ ko red alert milta hai', 'Team investigate karti hai', 'Remote recovery / field intervention', 'Charger back online hota hai'],
    hardwareEyebrow: 'MADE IN INDIA',
    hardwareTitle: 'Jo andar hai, usko jaane wale logon ne banaya hai.',
    hardwareBody: 'Hamara hardware 100% India mein bana hai. Hardware, firmware aur connected software hum control karte hain. Kuch fix, improve ya optimise karna ho to humein pata hota hai kahan dekhna hai.',
    hardwareStack: ['Hardware', 'Firmware', 'Software', 'Cloud / Monitoring', 'Support'],
    hardwareWhy: 'Why this matters',
    hardwareWhyItems: ['Less dependency', 'Faster troubleshooting', 'Better control', 'Better long-term support', 'More accountability'],
    privacyEyebrow: 'CONTROL & TRUST',
    privacyTitle: 'Aapka hardware. Aapka data. Aapka trust.',
    privacyBody: 'Hardware, firmware aur software stack par control ke saath ecosystem design karte hain, so system kaise kaam karta hai aur information kaise move hoti hai — visibility clear rahe.',
    privacyQuote: 'Mystery se better transparency. Kaunsa hardware installed hai, kaunsa software run ho raha hai aur maintenance ki responsibility kiski hai — aapko pata hona chahiye.',
    compareEyebrow: 'CLEARER WAY TO WORK',
    compareTitle: 'VIZ ke saath kaam kyun karein?',
    typical: 'Typical approach',
    vjra: 'VIZ approach',
    compareRows: [
      ['Charger hardware', 'Charger supplied', 'Complete EV-ready site solution'],
      ['Electrical planning', 'Alag handle hota hai', 'Site aur charging demand ke around plan'],
      ['Load sanction / green meter', 'Customer coordinates', 'Coordination support'],
      ['Transformer, HT & cabling', 'Separate vendors', 'One connected infrastructure plan'],
      ['Installation', 'Installation', 'Installation + commissioning + monitoring'],
      ['Firmware & software', 'Vendor handoff', 'Hardware, firmware aur software one team ke under'],
      ['Offline alerts', 'Contact karne par support', 'Proactive alert + service response'],
      ['After-sales support', 'Post-installation ticket', 'Long-term support aur accountability'],
    ],
    philosophyEyebrow: 'VIZ PHILOSOPHY',
    philosophyTitle: 'Hum boxes sell karne ke business mein nahi hain.',
    philosophyBody: 'Hum dependable EV charging banane ke business mein hain. Charger, electrical system, software aur service sab important hain. But real product reliability hai.',
    philosophyWords: ['Hardware', 'Infrastructure', 'Software', 'Monitoring', 'Support'],
    philosophyResult: 'RELIABLE EV INFRASTRUCTURE',
    ctaEyebrow: 'LET’S MAKE THE SITE READY',
    ctaTitle: 'Site ko EV-ready banana hai?',
    ctaBody: 'Batayein EV charging kahan plan kar rahe hain. Hamari team electrical infra, charging requirements aur right setup samajhne mein help karegi.',
    name: 'Name',
    company: 'Company / Organisation',
    phone: 'Phone Number',
    email: 'Email',
    location: 'Site / Location',
    message: 'Message',
    submit: 'VIZ team se baat karein',
    whatsapp: 'WhatsApp prefer karte hain? Direct baat karein.',
    submitted: 'Aapke project details ke saath WhatsApp open ho raha hai…',
    back: 'Platform par wapas',
  },
};

const placeIcons: Icon[] = [House, University, School, Landmark, Hotel, Globe2, Building2, Building2, House, RadioTower, MapPin, Factory];
const systemIcons: Icon[] = [Lightbulb, Network, CircuitBoard, Factory, Gauge, Cable, ShieldCheck, PlugZap, ServerCog, CloudCog, Activity, Wrench];
const processIcons: Icon[] = [MapPin, Gauge, CircuitBoard, CheckCircle2, Zap, Factory, ShieldCheck, PlugZap, CloudCog, Activity, CheckCircle2, Wrench];

function SectionIntro({ eyebrow, title, body, align = 'left' }: { eyebrow: string; title: string; body?: string; align?: 'left' | 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <div className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-primary">{eyebrow}</div>
      <h2 className="font-display text-4xl font-bold leading-[0.98] sm:text-5xl md:text-6xl">{title}</h2>
      {body && <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">{body}</p>}
    </div>
  );
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function WhyVIZ() {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = sessionStorage.getItem('vjra-why-language');
    return stored === 'mr' || stored === 'hi' || stored === 'hinglish' ? stored : 'en';
  });
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (
    window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  ));
  const [submitted, setSubmitted] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    sessionStorage.setItem('vjra-why-language', lang);
    document.title = 'Why VIZ | End-to-End EV Charging Infrastructure Solutions';
    const description = 'VIZ - Smart Charging helps businesses and communities become EV-ready with end-to-end electrical infrastructure, EV charging, monitoring, firmware, software and after-sales support.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [lang]);

  const updateLanguage = (next: Lang) => {
    setLang(next);
    window.setTimeout(() => document.querySelector('#why-vjra-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Hello VIZ, I want to make my site EV-ready.',
      `Name: ${data.get('name') || ''}`,
      `Company: ${data.get('company') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Site / Location: ${data.get('location') || ''}`,
      `Message: ${data.get('message') || ''}`,
    ].join('\n');
    setSubmitted(true);
    window.open(`https://wa.me/918855094432?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="why-vjra-top" className="why-vjra-page min-h-screen overflow-hidden bg-background text-foreground" data-theme={theme}>
      <ProductSiteHeader />

      <div className="sticky top-0 z-30 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <a href="#why-vjra-top" className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-primary sm:block">{t.eyebrow}</a>
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <label className="sr-only" htmlFor="why-language">{t.language}</label>
            <select id="why-language" value={lang} onChange={(event) => updateLanguage(event.target.value as Lang)} className="rounded-lg border border-border bg-card px-2 py-1.5 text-xs text-foreground outline-none transition focus:ring-2 focus:ring-ring">
              <option value="en">EN</option>
              <option value="mr">मराठी</option>
              <option value="hi">हिंदी</option>
              <option value="hinglish">Hinglish</option>
            </select>
            <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground transition hover:border-primary hover:text-primary" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>

      <main>
        <section className="relative px-6 pb-24 pt-20 sm:pb-32 sm:pt-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_10%,rgba(0,240,255,0.16),transparent_33%),radial-gradient(circle_at_16%_55%,rgba(168,85,247,0.12),transparent_32%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div className="mb-6 inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">{t.eyebrow}</div>
              <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.92] sm:text-7xl lg:text-8xl">{t.heroTitle}</h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{t.heroBody}</p>
              <p className="mt-5 font-display text-2xl font-semibold text-primary">{t.heroBridge}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#solve" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:shadow-lg hover:shadow-primary/25">{t.solve}<ArrowRight className="h-4 w-4" /></a>
                <a href={brochurePdf} download className="inline-flex items-center justify-center rounded-xl border border-border bg-card/60 px-6 py-3.5 font-semibold transition hover:border-primary hover:text-primary">{t.brochure}</a>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="relative">
              <div className="rounded-[2rem] border border-primary/20 bg-card/60 p-5 shadow-2xl shadow-primary/10 backdrop-blur sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Power flow / site readiness</span>
                  <span className="flex items-center gap-2 font-mono text-[10px] text-primary"><span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> LIVE SYSTEM</span>
                </div>
                <div className="space-y-3">
                  {[
                    ['Power Grid', Lightbulb],
                    ['Electrical Infrastructure', CircuitBoard],
                    ['Charging Infrastructure', PlugZap],
                    ['EV', Zap],
                  ].map(([label, Visual], index) => {
                    const NodeIcon = Visual as Icon;
                    return (
                      <div key={label as string}>
                        <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.15 }} className={`flex items-center gap-4 rounded-2xl border p-4 ${index === 3 ? 'border-primary/50 bg-primary/10' : 'border-border bg-background/45'}`}>
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><NodeIcon className="h-5 w-5" /></span>
                          <span className="font-display text-lg font-semibold">{label as string}</span>
                          {index === 3 && <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />}
                        </motion.div>
                        {index < 3 && <div className="ml-9 flex h-7 items-center border-l border-dashed border-primary/50"><ArrowDown className="ml-[-9px] h-4 w-4 text-primary" /></div>}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-7 grid grid-cols-3 gap-2 border-t border-border pt-5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  <span>Plan</span><span>Build</span><span>Keep live</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="solve" className="scroll-mt-20 border-y border-border/60 bg-card/20 px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro eyebrow={t.problemEyebrow} title={t.problemTitle} body={t.problemBody} />
            <Reveal className="mt-14">
              <div className="grid gap-3 rounded-3xl border border-border bg-background/50 p-3 md:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-2xl border border-border bg-card/50 p-7 sm:p-10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground"><PlugZap className="h-6 w-6" /></div>
                  <h3 className="font-display text-2xl font-bold">{t.justInstall}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.justInstallBody}</p>
                </div>
                <div className="rounded-2xl border border-primary/40 bg-primary/10 p-7 shadow-lg shadow-primary/10 sm:p-10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Network className="h-6 w-6" /></div>
                  <h3 className="font-display text-2xl font-bold">{t.evReady}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t.evReadyBody}</p>
                  <div className="mt-7 flex flex-wrap gap-2 text-xs text-primary">
                    {['Load', 'Utility', 'Protection', 'Software', 'Support'].map((item) => <span key={item} className="rounded-full border border-primary/25 bg-background/30 px-3 py-1.5">{item}</span>)}
                  </div>
                </div>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-3 md:grid-cols-3">
              {t.problemSteps.map((step, index) => (
                <Reveal key={step} delay={index * 0.08}>
                  <div className="flex h-full items-center gap-4 rounded-2xl border border-border bg-card/45 p-5">
                    <span className="font-display text-3xl font-bold text-primary/70">0{index + 1}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{step}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro eyebrow={t.stackEyebrow} title={t.stackTitle} body={t.stackBody} align="center" />
            <Reveal className="mx-auto mt-14 max-w-4xl">
              <div className="overflow-hidden rounded-3xl border border-border bg-card/45">
                {t.layers.map((layer, index) => (
                  <motion.div key={layer} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="group flex items-center gap-4 border-b border-border/60 p-4 last:border-0 sm:p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
                    <span className={`h-px flex-1 ${index === 7 ? 'bg-primary/60' : 'bg-border'}`} />
                    <span className={`w-[64%] font-medium ${index === 7 ? 'text-primary' : 'text-foreground'}`}>{layer}</span>
                    {index < t.layers.length - 1 && <ArrowDown className="hidden h-4 w-4 text-muted-foreground sm:block" />}
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border-l-2 border-primary bg-primary/5 p-6">
                <p className="font-display text-xl font-semibold leading-relaxed sm:text-2xl">“{t.houseQuote}”</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/20 px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro eyebrow={t.processEyebrow} title={t.processTitle} body={t.processBody} />
            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.process.map((step, index) => {
                const StepIcon = processIcons[index];
                return (
                  <Reveal key={step} delay={(index % 4) * 0.06}>
                    <div className="group relative h-full rounded-2xl border border-border bg-card/50 p-5 transition hover:-translate-y-1 hover:border-primary/50">
                      <div className="mb-6 flex items-center justify-between"><span className="font-mono text-xs text-primary">/{String(index + 1).padStart(2, '0')}</span><StepIcon className="h-5 w-5 text-muted-foreground transition group-hover:text-primary" /></div>
                      <p className="font-medium leading-relaxed">{step}</p>
                      {index < t.process.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 text-primary lg:block" />}
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <p className="mt-10 max-w-3xl border-l border-primary pl-5 text-base leading-relaxed text-muted-foreground">{t.processFoot}</p>
          </div>
        </section>

        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro eyebrow={t.systemEyebrow} title={t.systemTitle} body={t.systemBody} align="center" />
            <Reveal className="relative mx-auto mt-16 max-w-5xl">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {t.system.map((item, index) => {
                  const SystemIcon = systemIcons[index];
                  return (
                    <div key={item} className="flex min-h-[108px] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/50 p-4 text-center transition hover:border-primary/50 hover:bg-primary/5">
                      <SystemIcon className="h-5 w-5 text-primary" />
                      <span className="text-xs leading-relaxed text-muted-foreground">{item}</span>
                    </div>
                  );
                })}
              </div>
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-background shadow-xl shadow-primary/10 lg:flex">
                <span className="font-display text-2xl font-bold text-gradient-cyan">VIZ</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/20 px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro eyebrow={t.mattersEyebrow} title={t.mattersTitle} />
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {t.places.map((place, index) => {
                const PlaceIcon = placeIcons[index];
                return <Reveal key={place} delay={(index % 4) * 0.05}><div className="group flex items-center gap-3 rounded-2xl border border-border bg-card/45 p-4 transition hover:-translate-y-1 hover:border-primary/50"><span className="rounded-xl bg-primary/10 p-2.5 text-primary"><PlaceIcon className="h-4 w-4" /></span><span className="text-xs leading-relaxed sm:text-sm">{place}</span></div></Reveal>;
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal>
              <SectionIntro eyebrow={t.uptimeEyebrow} title={t.uptimeTitle} body={t.uptimeBody} />
              <div className="mt-8 flex items-end gap-5"><span className="font-display text-7xl font-bold leading-none text-primary sm:text-8xl">99.99%</span><span className="max-w-[120px] pb-1 font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">{t.uptimeLabel}</span></div>
              <p className="mt-8 max-w-lg text-lg font-medium leading-relaxed">{t.uptimeFoot}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-border bg-card/50 p-5 sm:p-8">
                {t.alerts.map((alert, index) => (
                  <div key={alert} className="flex items-center gap-4">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${index === 2 ? 'bg-destructive/15 text-destructive' : 'bg-primary/10 text-primary'}`}>{index === 2 ? <BellRing className="h-4 w-4" /> : <span className="font-mono text-xs">0{index + 1}</span>}</span>
                    <span className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm">{alert}</span>
                    {index < t.alerts.length - 1 && <ArrowDown className="ml-[-28px] mt-14 h-4 w-4 text-primary" />}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/20 px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal>
              <SectionIntro eyebrow={t.hardwareEyebrow} title={t.hardwareTitle} body={t.hardwareBody} />
              <div className="mt-10 max-w-lg space-y-2">
                {t.hardwareStack.map((item, index) => <div key={item} className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-mono text-primary">{String(index + 1).padStart(2, '0')}</span><span className="font-medium">{item}</span>{index < t.hardwareStack.length - 1 && <ArrowDown className="ml-auto h-4 w-4 text-muted-foreground" />}</div>)}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-primary/30 bg-primary/5 p-7 sm:p-10">
                <div className="mb-7 flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-primary" /><h3 className="font-display text-2xl font-bold">{t.hardwareWhy}</h3></div>
                <ul className="space-y-4">{t.hardwareWhyItems.map((item) => <li key={item} className="flex items-center gap-3 text-muted-foreground"><Check className="h-4 w-4 text-primary" />{item}</li>)}</ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal><SectionIntro eyebrow={t.privacyEyebrow} title={t.privacyTitle} body={t.privacyBody} /></Reveal>
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-7 sm:p-10">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative flex gap-5"><ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-primary" /><p className="font-display text-xl font-semibold leading-relaxed sm:text-2xl">“{t.privacyQuote}”</p></div>
                <div className="relative mt-8 grid grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><span className="rounded-lg border border-border p-3 text-center">Hardware</span><span className="rounded-lg border border-border p-3 text-center">Firmware</span><span className="rounded-lg border border-border p-3 text-center">Software</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/20 px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro eyebrow={t.compareEyebrow} title={t.compareTitle} align="center" />
            <Reveal className="mt-12">
              <div className="hidden overflow-hidden rounded-3xl border border-border md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-card/80 text-xs uppercase tracking-[0.14em] text-muted-foreground"><tr><th className="px-6 py-5">Capability</th><th className="px-6 py-5">{t.typical}</th><th className="bg-primary/5 px-6 py-5 text-primary">{t.vjra}</th></tr></thead>
                  <tbody className="divide-y divide-border/60">{t.compareRows.map(([capability, typical, vjra]) => <tr key={capability}><td className="px-6 py-5 font-medium">{capability}</td><td className="px-6 py-5 text-muted-foreground">{typical}</td><td className="bg-primary/5 px-6 py-5 font-medium text-primary">{vjra}</td></tr>)}</tbody>
                </table>
              </div>
              <div className="grid gap-3 md:hidden">{t.compareRows.map(([capability, typical, vjra]) => <div key={capability} className="rounded-2xl border border-border bg-card/50 p-5"><div className="mb-4 font-semibold">{capability}</div><div className="grid gap-3 text-sm"><div><div className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t.typical}</div><div className="text-muted-foreground">{typical}</div></div><div className="border-t border-border pt-3"><div className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">{t.vjra}</div><div className="font-medium text-primary">{vjra}</div></div></div></div>)}</div>
            </Reveal>
          </div>
        </section>

        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl text-center">
            <SectionIntro eyebrow={t.philosophyEyebrow} title={t.philosophyTitle} body={t.philosophyBody} align="center" />
            <Reveal className="mt-14">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">{t.philosophyWords.map((word, index) => <div key={word} className="flex items-center gap-2 sm:gap-3"><span className="rounded-full border border-border bg-card/60 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground sm:px-5">{word}</span>{index < t.philosophyWords.length - 1 && <ArrowRight className="h-4 w-4 text-primary" />}</div>)}</div>
              <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 px-5 py-5 font-display text-lg font-bold text-primary sm:text-2xl"><ArrowDown className="h-5 w-5" />{t.philosophyResult}</div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/20 px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal><SectionIntro eyebrow={t.ctaEyebrow} title={t.ctaTitle} body={t.ctaBody} /><div className="mt-8"><a href="https://wa.me/918855094432" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-primary transition hover:underline"><MessageIcon />{t.whatsapp}</a></div></Reveal>
            <Reveal delay={0.1}>
              <form onSubmit={submitForm} className="rounded-3xl border border-border bg-card/60 p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t.name} name="name" required />
                  <Field label={t.company} name="company" />
                  <Field label={t.phone} name="phone" required type="tel" />
                  <Field label={t.email} name="email" type="email" />
                  <Field label={t.location} name="location" className="sm:col-span-2" />
                  <label className="grid gap-2 text-sm sm:col-span-2"><span className="text-muted-foreground">{t.message}</span><textarea name="message" rows={4} className="resize-y rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring" placeholder="Tell us about the site, capacity or timeline…" /></label>
                </div>
                <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition hover:shadow-lg hover:shadow-primary/25 sm:w-auto">{t.submit}<ArrowRight className="h-4 w-4" /></button>
                <a href={brochurePdf} download className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-border px-5 py-3.5 text-sm font-semibold transition hover:border-primary hover:text-primary sm:ml-3 sm:mt-0 sm:w-auto">{t.brochure}</a>
                {submitted && <p className="mt-4 text-sm text-primary" role="status">{t.submitted}</p>}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <div className="border-t border-border/60 px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex items-center gap-2 transition hover:text-primary">← {t.back}</Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em]">Made here. Controlled here. Supported here.</span>
        </div>
      </div>
      <ProductSiteFooter />
    </div>
  );
}

function Field({ label, name, required = false, type = 'text', className = '' }: { label: string; name: string; required?: boolean; type?: string; className?: string }) {
  return <label className={`grid gap-2 text-sm ${className}`}><span className="text-muted-foreground">{label}{required && <span className="ml-1 text-primary">*</span>}</span><input name={name} type={type} required={required} className="rounded-xl border border-border bg-background/50 px-4 py-3 outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring" /></label>;
}

function MessageIcon() {
  return <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary text-[10px] font-bold">↗</span>;
}