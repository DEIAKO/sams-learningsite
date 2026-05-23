import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Mock Data for Fallback
const mockRoadmaps = [
  {
    _id: '1',
    title: 'Master Full Stack Web Development',
    description: 'The ultimate path from computer basics to building high-performance full-stack applications.',
    topic: 'Full Stack',
    icon: '🏆',
    color: '#6366f1',
    estimatedTime: '8-12 months',
    featured: true,
    steps: [
      { order: 1, title: 'Computer & Coding Fundamental', description: 'Binary, OS basics, terminal, memory management, and how the internet works.' },
      { order: 2, title: 'HTML & CSS', description: 'Semantic markup, styling fundamentals, Flexbox, Grid, and responsive layouts.' },
      { order: 3, title: 'Tailwind CSS & Bootstrap', description: 'Modern utility-first CSS and classic component frameworks for rapid UI building.' },
      { order: 4, title: 'JavaScript Beginner', description: 'Variables, data types, functions, loops, and basic DOM manipulation.' },
      { order: 5, title: 'JavaScript Advanced', description: 'Closures, Promises, Async/Await, ES6+, prototypes, and architectural patterns.' },
      { order: 6, title: 'React Js', description: 'Components, hooks, state, React Router, and the modern React ecosystem.' },
      { order: 7, title: 'Next Js', description: 'Server-side rendering, static site generation, API routes, and App Router.' },
      { order: 8, title: 'Node js', description: 'Server-side JS runtime, event loop, file system, and npm package management.' },
      { order: 9, title: 'Express Js', description: 'Building RESTful APIs, middleware, routing, and server-side logic.' },
      { order: 10, title: 'MySQL and SQL', description: 'Relational database design, SQL queries, joins, and database normalization.' },
      { order: 11, title: 'MongoDB', description: 'NoSQL document databases, Mongoose, aggregation, and horizontal scaling.' },
    ],
  },
];

const mockVideos = [
  { _id: 'v1', title: 'JavaScript Full Course', duration: '3:26', topic: 'JavaScript', featured: true, youtubeId: 'W6NZfCO5SIk' },
  { _id: 'v2', title: 'React JS Masterclass', duration: '9:00', topic: 'React', featured: true, youtubeId: 'f55qeKGgB_M' },
];

const mockBooks = [
  { _id: 'b1', title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', featured: true, free: true, topic: 'JavaScript' },
];

const mockBlogs = [
  { _id: 'bl1', title: 'JS Tips 2024', slug: 'js-tips', excerpt: 'Modern JS tips...', featured: true, author: 'Sam' },
  {
    _id: 'bl2',
    title: 'AWS ကို နားလည်ခြင်း- ပြည့်စုံသော လမ်းညွှန်နှင့် သင်ယူမှု လမ်းပြမြေပုံ',
    slug: 'understanding-aws-burmese',
    excerpt: 'ဤသည်မှာ "Understanding AWS: A Comprehensive Guide and Learning Path" ဆောင်းပါး၏ မြန်မာဘာသာပြန် ဖြစ်ပါသည်။ Amazon Web Services (AWS) ဆိုတာ ဘာလဲ? အဓိက ဝန်ဆောင်မှုများနှင့် စနစ်တကျ လေ့လာရန် လမ်းပြမြေပုံကို မြန်မာလို အသေးစိတ် ရှင်းလင်းပေးထားပါသည်။',
    content: `
ဤသည်မှာ "Understanding AWS: A Comprehensive Guide and Learning Path" ဆောင်းပါး၏ မြန်မာဘာသာပြန် ဖြစ်ပါသည်။

---

# AWS ကို နားလည်ခြင်း- ပြည့်စုံသော လမ်းညွှန်နှင့် သင်ယူမှု လမ်းပြမြေပုံ

### Amazon Web Services (AWS) ဆိုတာ ဘာလဲ?

Amazon Web Services (AWS) သည် ကမ္ဘာတစ်ဝှမ်းရှိ ဒေတာစင်တာများမှတစ်ဆင့် ဝန်ဆောင်မှုပေါင်း ၂၀၀ ကျော်ကို ပံ့ပိုးပေးနေသည့် ကမ္ဘာ့အပြည့်စုံဆုံးနှင့် အသုံးအများဆုံး Cloud Platform တစ်ခု ဖြစ်သည်။ ၎င်းသည် အင်တာနက်မှတစ်ဆင့် ဒေတာသိုလှောင်မှု (Storage)၊ ဒေတာဘေ့စ်များ (Databases) မှသည် Machine Learning နှင့် ကွန်ရက်ချိတ်ဆက်ခြင်း (Networking) အထိ လိုအပ်သလို အသုံးပြုနိုင်သည့် ကွန်ပျူတာဝန်ဆောင်မှုများကို ပေးဆောင်သည်။ ရုပ်ပိုင်းဆိုင်ရာ ဟာ့ဒ်ဝဲများကို ကိုယ်တိုင်ဝယ်ယူ ထိန်းသိမ်းမည့်အစား တစ်ဦးတစ်ယောက်ချင်းဖြစ်စေ၊ အဖွဲ့အစည်းများဖြစ်စေ ဤအရင်းအမြစ်များကို AWS ထံမှ ငှားရမ်းအသုံးပြုနိုင်ပြီး အမှန်တကယ် အသုံးပြုသလောက်သာ ငွေပေးချေရန် လိုအပ်သည်။

AWS ကို ၂၀၀၆ ခုနှစ်တွင် စတင်ခဲ့ပြီး ၂၀၂၆ ခုနှစ်တွင် ကမ္ဘာ့ Cloud ဈေးကွက်၏ ၃၀-၃၂% ခန့်ကို ရရှိထားကာ ကမ္ဘာ့ဦးဆောင် Cloud Platform ဖြစ်လာခဲ့သည်။ ၎င်း၏ ကျယ်ပြန့်သော ဝန်ဆောင်မှုများနှင့် ကမ္ဘာလုံးဆိုင်ရာ အခြေခံအဆောက်အအုံများကြောင့် သုံးစွဲသူများသည် မိမိတို့ စိတ်ကူးသမျှကို တည်ဆောက်နိုင်ပြီး လုပ်ငန်းများ ပိုမိုသွက်လက်လာစေခြင်း၊ ဆန်းသစ်တီထွင်နိုင်ခြင်းနှင့် ကုန်ကျစရိတ် လျှော့ချနိုင်ခြင်းတို့ကို ရရှိစေသည်။

---

### အဓိက AWS ဝန်ဆောင်မှုများ (Core AWS Services)

AWS တွင် ဝန်ဆောင်မှုများစွာ ရှိသော်လည်း Cloud ကို စတင်လေ့လာသူများအတွက် အောက်ပါ ဝန်ဆောင်မှုများသည် အခြေခံအကျဆုံး ဖြစ်သည် -

| ဝန်ဆောင်မှု | အဓိက အသုံးပြုပုံ | ဖော်ပြချက် |
| --- | --- | --- |
| **Amazon EC2** | Application များအတွက် Virtual Server များ | Cloud ပေါ်တွင် App များ၊ API များနှင့် အလုပ်များကို လုပ်ဆောင်ရန် လိုအပ်သလို အတိုးအလျှော့လုပ်နိုင်သော Compute စွမ်းရည်ကို ပေးသည်။ |
| **Amazon S3** | ခိုင်ခံ့ပြီး ချဲ့ထွင်နိုင်သော Object Storage | အလွန်ခိုင်ခံ့သော ဒေတာသိုလှောင်မှုဖြစ်ပြီး Backups များ၊ Data Lakes များနှင့် Static Website များ လွှင့်တင်ရန် သင့်တော်သည်။ |
| **Amazon RDS** | စီမံခန့်ခွဲပြီးသား Relational Database များ | MySQL, PostgreSQL နှင့် SQL Server ကဲ့သို့ ဒေတာဘေ့စ်များကို တည်ဆောက်ခြင်းနှင့် စီမံခြင်းကို လွယ်ကူစေသည်။ |
| **Amazon VPC** | သီးသန့် ကွန်ရက် ချိတ်ဆက်ခြင်း | AWS Cloud ပေါ်တွင် မိမိကိုယ်ပိုင် သီးခြားကွန်ရက်တစ်ခု ဖန်တီးပြီး AWS အရင်းအမြစ်များကို စိတ်ကြိုက် လွှင့်တင်နိုင်သည်။ |
| **AWS IAM** | Identity နှင့် ခွင့်ပြုချက်များ စီမံခန့်ခွဲခြင်း | အသုံးပြုသူများအတွက် AWS ဝန်ဆောင်မှုများကို အသုံးပြုခွင့်ကို လုံခြုံစွာ ထိန်းချုပ်ပေးသည်။ |
| **AWS Lambda** | Serverless Computing | Server များ စီမံနေစရာမလိုဘဲ သတ်မှတ်ထားသော အခြေအနေများ (Events) ပေါ်မူတည်၍ Code များကို အလိုအလျောက် ပတ်ပေးသည်။ |
| **Amazon CloudWatch** | စောင့်ကြည့်ခြင်းနှင့် လေ့လာခြင်း | AWS ဝန်ဆောင်မှုများ၏ လုပ်ဆောင်ချက်များကို Logs နှင့် Metrics များဖြင့် တစ်နေရာတည်းတွင် စောင့်ကြည့်နိုင်သည်။ |

---

### AWS ကို လေ့လာနည်း- စနစ်တကျ လမ်းပြမြေပုံ

AWS ကို ထိရောက်စွာ သင်ယူရန်အတွက် အခြေခံသဘောတရားများမှသည် ကျွမ်းကျင်အဆင့်အထိ စနစ်တကျ သွားရန် လိုအပ်သည် -

#### ၁။ AWS Free Tier အကောင့်ဖွင့်ခြင်းနှင့် လုံခြုံရေး ပြင်ဆင်ခြင်း

အစပိုင်းတွင် အခမဲ့ သို့မဟုတ် ကုန်ကျစရိတ် အနည်းဆုံးဖြင့် စမ်းသပ်နိုင်သော Free Tier အကောင့်ကို ဖွင့်ပါ။ ပထမ ၁၂ လအတွင်း အဓိက ဝန်ဆောင်မှုအချို့ကို အခမဲ့ စမ်းသပ်ခွင့် ရမည်ဖြစ်သည်။ အကောင့်ကို လုံခြုံအောင် ပြင်ဆင်ရန်မှာ အလွန်အရေးကြီးသည် -

- **Budget Alerts များ သတ်မှတ်ပါ:** ကုန်ကျစရိတ် မထင်မှတ်ဘဲ မတက်လာစေရန် (ဥပမာ $1 ကျော်လျှင် အသိပေးရန်) သတ်မှတ်ထားပါ။
- **MFA ကို ဖွင့်ပါ:** Multi-Factor Authentication ကို အသုံးပြု၍ အကောင့်လုံခြုံရေး မြှင့်တင်ပါ။
- **IAM Users များ ဖန်တီးပါ:** Root အကောင့်ကို နေ့စဉ်အလုပ်များအတွက် မသုံးဘဲ လိုအပ်သော ခွင့်ပြုချက်သာ ပေးထားသည့် သီးခြား IAM အကောင့်များ သုံးပါ။

#### ၂။ အခြေခံဝန်ဆောင်မှုများကို လေ့လာပါ

၂ ပတ်မှ ၆ ပတ်ခန့် အချိန်ပေး၍ Compute (EC2)၊ Storage (S3)၊ Security (IAM) နှင့် Networking (VPC) တို့ကို ကျွမ်းကျင်အောင် လေ့လာပါ။

#### ၃။ Automation နှင့် Infrastructure as Code (IaC) ကို လေ့လာပါ

Cloud အရင်းအမြစ်များကို လက်ဖြင့် တည်ဆောက်မည့်အစား Code များ၊ Templates များဖြင့် တည်ဆောက်ခြင်း (IaC) ကို လေ့လာပါ။ အဓိက ကိရိယာများမှာ **AWS CloudFormation**, **AWS CDK** နှင့် **Terraform** တို့ ဖြစ်ကြသည်။

#### ၄။ Containers နှင့် Serverless နည်းပညာများ

ခေတ်မီ Application များ တည်ဆောက်ရန်အတွက် Serverless (AWS Lambda) နှင့် Containers (Amazon ECS/EKS) တို့ကို နားလည်အောင် ကြိုးစားပါ။

#### ၅။ Data Analytics နှင့် AI ကို လေ့လာပါ

AWS ပေါ်တွင် ဒေတာများကို ခွဲခြမ်းစိတ်ဖြာခြင်း (Kinesis, Glue, Redshift) နှင့် Machine Learning (Amazon SageMaker) အသုံးပြုပုံများကို လေ့လာပါ။

#### ၆။ လုံခြုံရေးနှင့် ကုန်ကျစရိတ် စီမံခန့်ခွဲခြင်း

Cloud အသုံးပြုမှု ရေရှည်တည်တံ့စေရန် CloudWatch ဖြင့် စောင့်ကြည့်ခြင်း၊ အနည်းဆုံး ခွင့်ပြုချက်ပေးသည့် (Least-Privilege) စနစ်ကို ကျင့်သုံးခြင်းနှင့် ကုန်ကျစရိတ်များကို အမြဲစစ်ဆေးခြင်းတို့ကို လုပ်ဆောင်ပါ။

#### ၇။ လက်တွေ့ Project များ လုပ်ဆောင်ပါ

စာတွေ့ကို လက်တွေ့အဖြစ် ပြောင်းလဲရန် EC2 တွင် Website လွှင့်တင်ခြင်း၊ Serverless Pipeline တည်ဆောက်ခြင်း စသည့် Project များကို ကိုယ်တိုင် လုပ်ဆောင်ပြီး မှတ်တမ်းတင်ထားပါ။

#### ၈။ AWS Certifications များ ဖြေဆိုပါ

မိမိ၏ ကျွမ်းကျင်မှုကို သက်သေပြရန် Cloud Practitioner (အခြေခံ)၊ Solutions Architect (တွဲဖက်ကျွမ်းကျင်) စသည့် လက်မှတ်များကို ဖြေဆိုပါ။

---

### လေ့လာရန် အရင်းအမြစ်များ

- **AWS Training and Certification:** အခမဲ့ သင်တန်းပေါင်း ၆၀၀ ကျော် ရှိသည်။
- **Coursera/YouTube:** AWS နှင့် ပတ်သက်သော လမ်းညွှန်ချက်များနှင့် လက်တွေ့သင်ခန်းစာများစွာ ရှိသည်။
- **WBS CODING SCHOOL:** လက်တွေ့အသုံးချ သင်တန်းများကို ပေးဆောင်သည်။

> **မှတ်ချက်:** AWS သည် အမြဲတစေ ပြောင်းလဲတိုးတက်နေသဖြင့် နောက်ဆုံးပေါ် သတင်းအချက်အလက်များနှင့် နည်းပညာသစ်များကို အမြဲမျက်ခြေမပြတ် လေ့လာရန် လိုအပ်ပါသည်။
`,
    author: 'Sam',
    topic: 'Cloud computing',
    tags: ['AWS', 'Cloud Computing', 'Burmese', 'Tutorial', 'Learning Path'],
    readTime: '7 min read',
    featured: true,
    published: true,
  },
];

// Helper to wrap API calls with mock fallback
const withFallback = async (apiCall, fallbackData) => {
  try {
    const response = await apiCall();
    return response;
  } catch (err) {
    console.warn('API Error, using mock data:', err.message);
    return { data: fallbackData };
  }
};

// Videos
export const getVideos = (params) => withFallback(() => API.get('videos', { params }), mockVideos);
export const getFeaturedVideos = () => withFallback(() => API.get('videos/featured'), mockVideos);
export const getVideo = (id) => withFallback(() => API.get(`videos/${id}`), mockVideos[0]);

// Books
export const getBooks = (params) => withFallback(() => API.get('books', { params }), mockBooks);
export const getFeaturedBooks = () => withFallback(() => API.get('books/featured'), mockBooks);
export const getBook = (id) => withFallback(() => API.get(`books/${id}`), mockBooks[0]);

// Roadmaps
export const getRoadmaps = (params) => withFallback(() => API.get('roadmaps', { params }), mockRoadmaps);
export const getRoadmap = (id) => withFallback(() => API.get(`roadmaps/${id}`), mockRoadmaps[0]);

// Blogs
export const getBlogs = (params) => withFallback(() => API.get('blogs', { params }), mockBlogs);
export const getFeaturedBlogs = () => withFallback(() => API.get('blogs/featured'), mockBlogs);
export const getBlog = (slug) => withFallback(() => API.get(`blogs/${slug}`), mockBlogs[0]);

export default API;
