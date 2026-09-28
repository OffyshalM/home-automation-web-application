// IMAGE IMPORTS
import amazonAllEchoShowProducts from "../assets/product-images/amazon-all-echo-show-products.jpg";
import homeAuto from "../assets/images/home-auto.mp4";

import hikSolarCamera1 from "../assets/product-images/hik-solar-camera1.jpg";
import hikSolarCamera2 from "../assets/product-images/hik-solar-camera2.jpg";


import smartSwitch3 from "../assets/product-images/smart-switch3.jpg";
import smartSwitch5 from "../assets/product-images/smart-switch5.jpg";


import sonosSpeaker2 from "../assets/product-images/sonos-speaker2.png";


import starlinkGen3_2 from "../assets/product-images/starlink-gen3-2.jpg";
import starlinkGen3_3 from "../assets/product-images/starlink-gen3-3.png";

import videoDoorbells from "../assets/product-images/video-doorbells.jpg";

import wirelessLan4 from "../assets/product-images/wirelessLan4.jpeg";

// NEW IMAGE IMPORTS
import arylicA50Amplifier from "../assets/product-images/Arylic-A50+-Amplifier.jpeg";
import boseAmplifier from "../assets/product-images/Bose-amplifier.jpeg";
import boseInceilingPassiveSpeakers from "../assets/product-images/Bose-inceiling-passive-speakers.jpeg";
import hikvisionSmartHybridHdDomeCamera from "../assets/product-images/Hikvision-smart-hybrid-HD-dome-camera.jpeg";
import hikvisionSmartHybridIpDomeCamera from "../assets/product-images/Hikvision-smart-hybrid-ip-dome-camera.jpeg";
import huaweiOutdoorAccessPoint from "../assets/product-images/Huawei-outdoor-access-point.jpeg";
import moorgenSmartLockSeries from "../assets/product-images/Moorgen-smart-lock-series.jpeg";
import orviboMixpadSeries from "../assets/product-images/Orvibo-mixpad-series.jpeg";
import sonosAmplifier from "../assets/product-images/Sonos_amplifier.jpeg";
import sonosInceilingPassiveSpeaker from "../assets/product-images/Sonos-inceiling-passive-speaker.jpeg";
import sonosStandaloneSpeakerSeries from "../assets/product-images/Sonos-standalone-speaker-series.jpeg";
import starlinkGen3Kit from "../assets/product-images/Starlink-gen3-kit.jpeg";
import tpLinkIndoorAccessPoint from "../assets/product-images/Tp-link-indoor-access-point.jpeg";
import tpLinkOutdoorAccessPoint from "../assets/product-images/Tp-link-outdoor-access-point.jpeg";
import tuyaSmartControlPanelSeries from "../assets/product-images/Tuya-Smart-Control-Panel-Series.jpeg";
import hikvisionVideoDoorbell from "../assets/product-images/Hikvision-video-doorbell.jpeg";

import orviboMixSwitches from "../assets/product-images/Orvibo-mix-switches.jpeg";


// CATEGORIES CONFIGURATION
export const CATEGORIES = [
  {
    id: "all",
    label: "All Products",
    description: "Browse our complete catalog of smart automation, security, audio, and networking hardware.",
  },
  {
    id: "smart-switches",
    label: "Smart Switches",
    description: "Upgrade your lighting with intelligent, touch-sensitive, wireless smart light switches and control panels.",
  },
  {
    id: "amazon-echo-show",
    label: "Amazon Echo Show",
    description: "Smart HD displays with Alexa for central home control, security monitoring, video calling, and entertainment.",
  },
  
  {
    id: "hikvision-systems",
    label: "Hikvision Cameras & Intercoms",
    description: "Professional Hikvision IP cameras, solar surveillance units, and multi-tenant video door stations.",
  },
  {
    id: "access-control",
    label: "Access Control & Smart Locks",
    description: "Keyless entry solutions featuring biometric sensors, digital keypads, smart locks, and doorbells.",
  },
  {
    id: "sonos-audio",
    label: "Sonos & Multiroom Audio",
    description: "Premium high-fidelity wireless speakers, deep subwoofers, and multiroom distribution amplifiers.",
  },
  {
    id: "networking-starlink",
    label: "Starlink & Networking",
    description: "High-speed satellite internet hardware, wireless access points, and gigabit LAN infrastructure.",
  },
  {
    id: "smart-home-automation",
    label: "Smart Home Automation",
    description: "Complete home automation platforms, motorized window treatments, and smart voice remotes.",
  },

];

// PRODUCTS LISTING
const products = [
  // --- SMART SWITCHES ---
 
  {
    id: "smart-switch-3",
    category: "smart-switches",
    name: "Tuya Mechanical Smart Switches",
    image: smartSwitch3,
    description: "Tempered glass smart light panel compatible with Alexa and Google Assistant.",
  },
 
  {
    id: "smart-switch-5",
    category: "smart-switches",
    name: "Tuya Touch glass Smart Switches",
    image: smartSwitch5,
    description: "High-load smart relay switch for heavy appliances and custom lighting circuits.",
  },

{
    id: "orvibo-mix-switches",
    category: "smart-switches",
    name: "Orvibo Mix Switches",
    image: orviboMixSwitches,
    description: "Premium smart light switches with multi-protocol support for seamless lighting and scene automation.",
  },

  // --- AMAZON ECHO SHOW ---
  {
    id: "amazon-all-echo-show-products",
    category: "amazon-echo-show",
    name: "Amazon Echo Show Series",
    image: amazonAllEchoShowProducts,
    description: "Full suite of Amazon Echo Show displays ranging from compact screens to wall-mounted panels.",
  },

  // --- HIKVISION CAMERAS & INTERCOMS ---  

    {
    id: "hik-solar-camera1",
    category: "hikvision-systems",
    name: "Hikvision Smart Hybrid IP bullet Camera",
    image: hikSolarCamera1,
    description: "Solar pan-tilt-zoom camera providing wide outdoor monitoring without external wiring.",
  },


    {
    id: "hik-solar-camera2",
    category: "hikvision-systems",
    name: "Hikvision Smart Hybrid HD bullet camera",
    image: hikSolarCamera2,
    description: "Complete off-grid surveillance kit powered by solar energy for remote locations.",
  },

  {
    id: "hikvision-video-doorbell",
    category: "hikvision-systems",
    name: "Hikvision Video Doorbell",
    image: hikvisionVideoDoorbell,
    description: "High-definition video doorbell featuring two-way audio, smart motion detection, and remote access.",
  },

  {
    id: "hikvision-smart-hybrid-hd-dome-camera",
    category: "hikvision-systems",
    name: "Hikvision Smart Hybrid HD Dome Camera",
    image: hikvisionSmartHybridHdDomeCamera,
    description: "Hybrid HD dome camera combining sharp daytime clarity with strong low-light performance.",
  },


  
  {
    id: "hikvision-smart-hybrid-ip-dome-camera",
    category: "hikvision-systems",
    name: "Hikvision Smart Hybrid IP Dome Camera",
    image: hikvisionSmartHybridIpDomeCamera,
    description: "Network dome camera with hybrid smart detection for reliable indoor and outdoor coverage.",
  },



  // --- ACCESS CONTROL & SMART LOCKS ---
  
  {
    id: "video-doorbells",
    category: "access-control",
    name: "Amazon Ring Doorbell",
    image: videoDoorbells,
    description: "Full front-door protection station with two-way audio intercom and video recording.",
  },
  {
    id: "moorgen-smart-lock-series",
    category: "access-control",
    name: "Moorgen Smart Lock Series",
    image: moorgenSmartLockSeries,
    description: "Full lineup of Moorgen biometric smart locks for residential and commercial doors.",
  },

  // --- SONOS & MULTIROOM AUDIO ---
 
  {
    id: "sonos-speaker2",
    category: "sonos-audio",
    name: "RS-Audio inceiling Passive Speaker",
    image: sonosSpeaker2,
    description: "Durable, battery-powered smart speaker for indoor and outdoor high-fidelity listening.",
  },

  {
    id: "arylic-a50-amplifier",
    category: "sonos-audio",
    name: "Arylic A50+ Amplifier",
    image: arylicA50Amplifier,
    description: "Compact stereo streaming amplifier with multiroom support for whole-home audio.",
  },
  {
    id: "bose-amplifier",
    category: "sonos-audio",
    name: "Bose Amplifier",
    image: boseAmplifier,
    description: "High-fidelity power amplifier built to drive Bose in-ceiling and architectural speakers.",
  },
  {
    id: "bose-inceiling-passive-speakers",
    category: "sonos-audio",
    name: "Bose Inceiling Passive Speakers",
    image: boseInceilingPassiveSpeakers,
    description: "Discreet in-ceiling passive speakers delivering clear, room-filling Bose sound quality.",
  },
  {
    id: "sonos-amplifier",
    category: "sonos-audio",
    name: "Sonos Amplifier",
    image: sonosAmplifier,
    description: "Powerful streaming amplifier that brings Sonos multiroom audio to passive speakers.",
  },
  {
    id: "sonos-inceiling-passive-speaker",
    category: "sonos-audio",
    name: "Sonos Inceiling Passive Speaker",
    image: sonosInceilingPassiveSpeaker,
    description: "In-ceiling passive speaker designed to pair seamlessly with the Sonos Amp.",
  },
  {
    id: "sonos-standalone-speaker-series",
    category: "sonos-audio",
    name: "Sonos Standalone Speaker Series",
    image: sonosStandaloneSpeakerSeries,
    description: "Full range of standalone Sonos speakers for flexible placement in any room.",
  },

  // --- STARLINK & NETWORKING ---


   {
    id: "starlink-gen3-kit",
    category: "networking-starlink",
    name: "Starlink Gen3 Kit",
    image: starlinkGen3Kit,
    description: "Complete third-generation Starlink kit for fast, reliable satellite internet setup.",
  },
    {
    id: "starlink-gen3-3",
    category: "networking-starlink",
    name: "Starlink Gen-2 Kit",
    image: starlinkGen3_3,
    description: "Enterprise-grade satellite terminal for demanding network and high bandwidth environments.",
  },
  {
    id: "starlink-gen3-2",
    category: "networking-starlink",
    name: "Starlink Accessories",
    image: starlinkGen3_2,
    description: "Tri-band Wi-Fi 6 router designed to extend Starlink coverage throughout your home.",
  },

  {
    id: "wireless-lan1",
    category: "networking-starlink",
    name: "Huawei Indoor Access Point",
    image: wirelessLan4,
    description: "Dual-band ceiling mount wireless access point for reliable indoor Wi-Fi coverage.",
  },

  {
    id: "huawei-outdoor-access-point",
    category: "networking-starlink",
    name: "Huawei Outdoor Access Point",
    image: huaweiOutdoorAccessPoint,
    description: "Rugged outdoor wireless access point built for extended range coverage in open areas.",
  },
 
  {
    id: "tp-link-indoor-access-point",
    category: "networking-starlink",
    name: "TP-Link Indoor Access Point",
    image: tpLinkIndoorAccessPoint,
    description: "Reliable indoor wireless access point for extending stable Wi-Fi across a property.",
  },
  {
    id: "tp-link-outdoor-access-point",
    category: "networking-starlink",
    name: "TP-Link Outdoor Access Point",
    image: tpLinkOutdoorAccessPoint,
    description: "Weather-resistant outdoor access point for extending network coverage beyond indoor walls.",
  },

  // --- SMART HOME AUTOMATION ---


   {
  id: "smart-curtain-control",
  category: "smart-home-automation",
  name: "Smart Curtain Control",
  image: homeAuto,
  description: "Central module for automated motorized curtains, enabling schedule-based opening, sun tracking, and remote control via smartphone.",
},

  {
    id: "orvibo-mixpad-series",
    category: "smart-home-automation",
    name: "Orvibo Mixpad Series",
    image: orviboMixpadSeries,
    description: "Smart control panel series combining lighting, scene, and climate control in one wall unit.",
  },
  
  {
    id: "tuya-smart-control-panel-series",
    category: "smart-home-automation",
    name: "Tuya Smart Control Panel Series",
    image: tuyaSmartControlPanelSeries,
    description: "Full lineup of Tuya touchscreen control panels for managing scenes, lighting, and climate.",
  },
];

export default products;