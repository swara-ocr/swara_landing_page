// Documentation content, taken from the SWAARA project details document.
// Rules followed here: no competitor product names, no unconfirmed statistics,
// and anything not built yet is labelled as planned or in development.

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'note'; text: string }
  | { t: 'table'; head: string[]; rows: string[][] };

export type Doc = {
  slug: string;
  title: string;
  summary: string;
  icon: 'book' | 'flow' | 'device' | 'layers' | 'shield' | 'check' | 'help' | 'list';
  blocks: Block[];
};

export const DOCS: Doc[] = [
  {
    slug: 'start-here',
    title: 'Start here',
    summary: 'What SWAARA is, who it is for and what it can and cannot do yet.',
    icon: 'book',
    blocks: [
      { t: 'h3', text: 'What SWAARA is' },
      {
        t: 'p',
        text: 'SWAARA is a reading assistant for blind and low-vision people. It reads printed pages aloud in Sinhala and English. It comes in three forms that share one reading core and one voice assistant: a tabletop station, a laptop reader and a phone app.',
      },
      { t: 'h3', text: 'Why it exists' },
      {
        t: 'p',
        text: 'The hard part of reading a page without sight is not the reading. It is taking a usable photo. A person cannot easily line up a page so that a camera sees all of it. SWAARA solves this with a fixed plate and camera, so the page is always in frame, and with a voice assistant, so nobody has to touch a screen.',
      },
      { t: 'h3', text: 'Who it is for' },
      {
        t: 'ul',
        items: [
          'Students who need to read textbook chapters on their own.',
          'Adults with low vision who need to read bills, letters and medicine labels at home.',
          'Teachers at schools for the blind who need a tool they can use with students and trust for accuracy.',
        ],
      },
      { t: 'h3', text: 'Where the project stands' },
      {
        t: 'note',
        text: 'SWAARA is in development. This site describes what we are building and marks what is still planned. Nothing here is a finished product.',
      },
      {
        t: 'table',
        head: ['Part', 'Status'],
        rows: [
          ['Reading core on a laptop and webcam', 'In development'],
          ['Sinhala and English reading and voice', 'In development, being benchmarked on real pages'],
          ['Press-to-talk voice assistant', 'In development'],
          ['Phone app: Read, Ask and Find', 'In development'],
          ['Tabletop station on a Raspberry Pi', 'Planned, after the software is proven'],
          ['Hands-free wake word', 'Planned, later'],
          ['Handwriting', 'Not planned for this project'],
        ],
      },
      { t: 'h3', text: 'Design principles' },
      {
        t: 'ol',
        items: [
          'Audio first: nothing should need sight.',
          'Fixed placement: a corner stop on the plate means the page is always in frame.',
          'Honest answers: answer only from pages that were read, say when unsure, give no medical advice.',
          'The original text is always available. Translation is optional and announced.',
          'A comfortable voice: the user picks the voice, the speed and the pauses.',
          'The wake word is detected on the device itself, and a mute switch turns the microphone off.',
          'Consent before cloud processing, and no public sharing of audio.',
        ],
      },
    ],
  },
  {
    slug: 'how-it-works',
    title: 'How SWAARA reads a page',
    summary: 'Capture, page check, recognition, translation and voice, step by step.',
    icon: 'flow',
    blocks: [
      { t: 'h3', text: 'Reading a page' },
      {
        t: 'ol',
        items: [
          'Place the page. On the station and laptop reader, you slide the page into the corner stop on the plate. On the phone app, spoken hints guide you to frame the page.',
          'The camera checks the shot. SWAARA looks for the page edges, blur, glare and low light, and tells you in words if something needs fixing.',
          'The photo is taken. On the phone, it happens automatically when the page is steady and fully in frame.',
          'Text recognition turns the printed text into digital text. The original text is always kept.',
          'Translation happens only if you ask for it, and SWAARA announces it aloud.',
          'The voice reads the page. You choose the voice, the speed and the pauses.',
        ],
      },
      { t: 'h3', text: 'Page turns and whole chapters' },
      {
        t: 'p',
        text: 'On the station and laptop reader, SWAARA is designed to notice when you turn a page and carry on reading, so a whole chapter can be read hands-free. It can also summarise a page or a chapter when you ask.',
      },
      { t: 'h3', text: 'Asking questions' },
      {
        t: 'p',
        text: 'You can ask about what has been read, for example "When is it due?". Your voice is turned into text, the answer is written from the pages already read, and it is spoken back to you, translated first if you asked for that.',
      },
      {
        t: 'ul',
        items: [
          'It answers only from pages it has read.',
          'It says so when it is unsure.',
          'It gives no medical advice, and reads medicine labels exactly as printed.',
        ],
      },
      { t: 'h3', text: 'Sinhala and English' },
      {
        t: 'p',
        text: 'Reading, speech recognition and spoken output are designed to work in both languages. A flat, robotic voice causes headaches and tiredness, so voice comfort is a design requirement and not an extra. Sinhala on real photographed pages is the hardest part, and we are testing which services work best before we choose.',
      },
      { t: 'h3', text: 'Finding objects (phone app)' },
      {
        t: 'p',
        text: 'Say "find my bottle", then sweep the room slowly with the phone in your hand. A small detector running on the phone spots objects such as a bottle, laptop, clothes, chair, door or cup. The app guides you with beeps that speed up as you get closer, plus spoken directions such as "a little left, 2 metres", and confirms when you have found it. This runs on the phone, so it does not need the internet. Distance from one camera is only an estimate, and testing its accuracy is part of the plan.',
      },
      { t: 'h3', text: 'Describing a scene' },
      {
        t: 'p',
        text: 'A button or voice command that describes what is around you is planned for the phone app if time allows.',
      },
    ],
  },
  {
    slug: 'user-guides',
    title: 'User guides',
    summary: 'Using the station, the laptop reader and the phone app.',
    icon: 'device',
    blocks: [
      {
        t: 'note',
        text: 'These guides describe the planned behaviour. They will be updated as each part is built and tested with users.',
      },
      { t: 'h3', text: 'Tabletop station' },
      {
        t: 'p',
        text: 'A box that sits on a table and needs no laptop or phone. It starts straight into the reader when switched on.',
      },
      {
        t: 'ul',
        items: [
          'A plate with a corner stop, so the page always sits in the same place.',
          'An overhead camera on a bendable arm, looking straight down. The target is a 12 MP autofocus camera.',
          'An LED light, so the lighting is the same every time.',
          'One large button to start reading, and a separate small button to shut down.',
          'A speaker and a microphone.',
          'A Raspberry Pi in the base. We will decide between the Pi Zero 2 W and the Pi 4 after a speed and memory benchmark.',
        ],
      },
      {
        t: 'ol',
        items: [
          'Switch the station on and wait for it to say it is ready.',
          'Slide the page or book into the corner stop.',
          'Press the large button.',
          'Listen. When you turn the page, reading continues.',
          'Press the small button to shut down.',
        ],
      },
      { t: 'h3', text: 'Laptop reader' },
      {
        t: 'p',
        text: 'The same plate and camera arm, plugged into a laptop. It uses the same reading core as the station.',
      },
      {
        t: 'ul',
        items: [
          'Large, high-contrast text follows the sentence being spoken, for low-vision users.',
          'Reads whole chapters, with page-turn detection and chapter summaries.',
          'Works by keyboard or by voice.',
          'Saved text or audio can only be exported to a school or an authorised organisation (see Privacy and ethics).',
        ],
      },
      { t: 'h3', text: 'Phone app' },
      {
        t: 'p',
        text: 'Built for Android first, using Flutter. It has three main screens.',
      },
      {
        t: 'ul',
        items: [
          'Read: guides you to frame a page, speaks hints such as "too dark", and takes the photo by itself when the page is steady.',
          'Ask: ask questions about what you have read and hear the answers.',
          'Find: say what you are looking for and follow the beeps and spoken directions.',
          'In a shop: reads packaging, prices and expiry dates in Sinhala or English.',
        ],
      },
      { t: 'h3', text: 'Voice commands' },
      {
        t: 'p',
        text: 'Everything is designed to work by voice, on all three products. Press-to-talk comes first. A hands-free wake word, detected on the device itself, comes later. A physical mute switch turns the microphone off.',
      },
      {
        t: 'ul',
        items: ['"Read this page"', '"Summarise the chapter"', '"Find my bottle"', '"What is around me?"', '"Slower, in English"'],
      },
      { t: 'h3', text: 'When something goes wrong' },
      {
        t: 'table',
        head: ['Problem', 'What SWAARA is designed to do'],
        rows: [
          ['The page is not fully in frame', 'Tell you, and ask you to slide the page into the corner stop (or guide you on the phone).'],
          ['There is glare on the page', 'Tell you, and ask you to move the page or change the light.'],
          ['The page is too dark', 'Say "too dark" and ask for more light.'],
          ['The text is blurry or unclear', 'Tell you and ask you to try again.'],
        ],
      },
    ],
  },
  {
    slug: 'architecture',
    title: 'Architecture',
    summary: 'The shared reading core, the backend and the cloud services behind it.',
    icon: 'layers',
    blocks: [
      {
        t: 'p',
        text: 'The station, the laptop reader and the phone app share one reading core and one backend. The same code serves all three.',
      },
      { t: 'h3', text: 'Parts' },
      {
        t: 'ul',
        items: [
          'A Python reading core: an OpenCV page check, stillness and page-turn detection, and button handling on the station.',
          'One FastAPI backend that holds the cloud keys and caches results, so keys never sit on a device.',
          'Five cloud services: text recognition, translation, speech to text, text to speech, and a language model for summaries and answers.',
          'An Android app built with Flutter.',
          'On-phone object finding with a small pretrained detector, so it works without the internet.',
          'Git for version control, and a shared task board for two-week sprints.',
        ],
      },
      { t: 'h3', text: 'Services under evaluation' },
      {
        t: 'note',
        text: 'No choice is final. We are testing options on real pages and voices, using free tiers, and will publish the results.',
      },
      {
        t: 'table',
        head: ['Task', 'Options being tested'],
        rows: [
          ['Text recognition', 'Tesseract (free), Surya OCR, cloud OCR services, and large vision-language models'],
          ['Translation', 'Google Cloud Translation (Sinhala code si)'],
          ['Speech to text', 'Google Speech-to-Text (si-LK)'],
          ['Text to speech', 'Azure neural Sinhala voices (si-LK), with speed and pause control; other Sinhala voices in preview'],
          ['Object finding', 'Small pretrained detectors such as YOLO nano or MediaPipe'],
        ],
      },
      { t: 'h3', text: 'Camera sharpness' },
      {
        t: 'p',
        text: 'How sharp small print looks depends on the pixels the camera puts on the page. On an A4 page, a 1080p webcam gives about 92 pixels per inch, which is too soft for small print. A 4K camera gives about 185 and a 12 MP camera about 260. We are aiming for a 4K or 12 MP autofocus camera.',
      },
      {
        t: 'table',
        head: ['Camera', 'Approximate pixels per inch on A4'],
        rows: [
          ['1080p webcam', '92'],
          ['4K camera', '185'],
          ['12 MP camera', '260'],
        ],
      },
      { t: 'h3', text: 'Hardware approach' },
      {
        t: 'p',
        text: 'We build and test everything in software first, on a laptop and webcam, before ordering hardware. The same code can then move to a Raspberry Pi. A Pi Zero 2 W may be enough because the heavy work happens in the cloud; we will measure memory use and page-check time and move to a Pi 4 only if it falls short.',
      },
    ],
  },
  {
    slug: 'privacy-and-ethics',
    title: 'Privacy and ethics',
    summary: 'Consent, data handling, sharing limits and how testing is approved.',
    icon: 'shield',
    blocks: [
      { t: 'h3', text: 'Consent first' },
      {
        t: 'p',
        text: 'SWAARA asks before it sends a page to a cloud service for recognition, translation or speech.',
      },
      { t: 'h3', text: 'No public sharing of audio' },
      {
        t: 'p',
        text: 'Sri Lanka acceded to the Marrakesh Treaty in 2016. The treaty allows accessible copies only for people with print disabilities, so SWAARA does not share audio publicly. Saved text or audio can be exported only to a school or an authorised organisation. We are still confirming the status of the local law that puts the treaty into effect.',
      },
      { t: 'h3', text: 'Personal documents' },
      {
        t: 'p',
        text: 'People will read bills, letters and medicine labels, which are personal documents. We are reviewing what Sri Lanka\'s Personal Data Protection Act (PDPA) requires for images and text of such documents, and we will publish exactly what is stored, where, and for how long before any testing with users begins.',
      },
      { t: 'h3', text: 'Keys and microphones' },
      {
        t: 'ul',
        items: [
          'Cloud keys are held on our backend and never on a device.',
          'The wake word is detected on the device itself.',
          'A physical mute switch turns the microphone off.',
        ],
      },
      { t: 'h3', text: 'Testing with people' },
      {
        t: 'p',
        text: 'Testing with blind and low-vision users starts only after ethics approval. Until then, we test inside the team. Blindfolded testing is only a rough stand-in and does not replace testing with real users.',
      },
      { t: 'h3', text: 'Limits we set' },
      {
        t: 'ul',
        items: [
          'No medical advice. Medicine labels are read exactly as printed.',
          'Answers come only from pages that were read, and SWAARA says when it is unsure.',
          'Handwriting is out of scope. SWAARA reads printed text.',
        ],
      },
      { t: 'h3', text: 'This website' },
      {
        t: 'p',
        text: 'See the privacy page for what this website collects when you join the waitlist or send us a message.',
      },
    ],
  },
  {
    slug: 'how-we-test',
    title: 'How we test',
    summary: 'The measures we use to check accuracy, speed and ease of use.',
    icon: 'check',
    blocks: [
      {
        t: 'p',
        text: 'Targets are set after the first benchmarks. Results will be published here as they come in.',
      },
      {
        t: 'table',
        head: ['What we measure', 'How'],
        rows: [
          ['Text accuracy', 'Character error rate and word error rate on at least 30 photographed pages per language: textbook, bill, letter and medicine label. We compare services and pick the best one per language.'],
          ['First-try capture', 'The share of pages accepted without a voice correction.'],
          ['Object finding', 'How often the object is found at different distances and lighting, with misses and false detections noted.'],
          ['Speed', 'Seconds from photo to speech starting.'],
          ['Usability', 'Two rounds with at least 5 real users, after ethics approval.'],
        ],
      },
    ],
  },
  {
    slug: 'faq',
    title: 'Questions and answers',
    summary: 'Short answers to common questions.',
    icon: 'help',
    blocks: [
      { t: 'h3', text: 'Can I use SWAARA now?' },
      {
        t: 'p',
        text: 'Not yet. SWAARA is in development as a university group project. Join the waitlist and we will contact you about progress and testing.',
      },
      { t: 'h3', text: 'How much will it cost?' },
      {
        t: 'p',
        text: 'We are designing it to be low-cost, but there is no price yet.',
      },
      { t: 'h3', text: 'Which languages does it support?' },
      {
        t: 'p',
        text: 'Sinhala and English. We are testing how well each part works on real pages in each language before we make claims about accuracy.',
      },
      { t: 'h3', text: 'Can it read handwriting?' },
      { t: 'p', text: 'No. SWAARA reads printed text. Handwriting is out of scope for this project.' },
      { t: 'h3', text: 'Does it need the internet?' },
      {
        t: 'p',
        text: 'Text recognition, translation and speech currently rely on cloud services. Finding objects with the phone app runs on the phone and does not need the internet.',
      },
      { t: 'h3', text: 'Can it give medical advice about my medicine?' },
      {
        t: 'p',
        text: 'No. It reads medicine labels exactly as printed and gives no medical advice.',
      },
      { t: 'h3', text: 'Can I help test it?' },
      {
        t: 'p',
        text: 'Yes, please get in touch. Testing with blind and low-vision users starts only after ethics approval, so we may not be able to start straight away.',
      },
    ],
  },
  {
    slug: 'glossary',
    title: 'Glossary',
    summary: 'Plain meanings for the terms used in these docs.',
    icon: 'list',
    blocks: [
      {
        t: 'table',
        head: ['Term', 'Meaning'],
        rows: [
          ['OCR', 'Optical character recognition: turning a picture of text into text.'],
          ['CER and WER', 'Character error rate and word error rate: how many characters or words are wrong. Lower is better.'],
          ['TTS and STT', 'Text to speech, and speech to text.'],
          ['LLM', 'Large language model, used for summaries and answers.'],
          ['Wake word', 'A spoken phrase that starts the voice assistant without pressing a button.'],
          ['Corner stop', 'The raised edge on the plate that a page is slid against, so it is always in the same place.'],
          ['ppi', 'Pixels per inch: a measure of how sharp text looks to the camera.'],
          ['PDPA', 'Sri Lanka\'s Personal Data Protection Act.'],
        ],
      },
    ],
  },
];

export function getDoc(slug: string): Doc | undefined {
  return DOCS.find((d) => d.slug === slug);
}
