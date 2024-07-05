import { MdOutlineDashboard, MdOutlineTopic } from "react-icons/md";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LiaCalendarCheck } from "react-icons/lia";
import { TbMessage2, TbMessageChatbot } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { CalendarRange, CircleHelp, TrendingUp } from "lucide-react";
import { RiCalendarTodoFill } from "react-icons/ri";

// Admin dashboard links
export const adminDashboardLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: MdOutlineDashboard,
  },
  {
    name: "User Management",
    path: "/admin/user-management",
    icon: MdOutlineTopic,
  },
  {
    name: "Subcommunity Management",
    path: "/admin/subcommunity-management",
    icon: HiOutlineSpeakerphone,
  },
  {
    name: "Content Moderation",
    path: "/admin/content-moderation",
    icon: LiaCalendarCheck,
  },
  {
    name: "Marketplace Management",
    path: "/admin/marketplace-management",
    icon: TbMessage2,
  },
  {
    name: "Event Management",
    path: "/admin/event-management",
    icon: CalendarRange,
  },
  {
    name: "Advertising & Promotions",
    path: "/admin/advertising-promotions",
    icon: CircleHelp,
  },
  {
    name: "Analytics & Reports",
    path: "/admin/analytics-reports",
    icon: TbMessageChatbot,
  },
  {
    name: "System Logs",
    path: "/admin/system-logs",
    icon: CircleHelp,
  },
  {
    name: "Feedback & Support",
    path: "/admin/feedback-support",
    icon: CircleHelp,
  },
];

// User dashboard links
export const userDashboardLinks = [
  {
    name: "Feed",
    path: "/user/feed",
    icon: MdOutlineDashboard,
  },
  {
    name: "Topics",
    path: "/user/topics",
    icon: MdOutlineTopic,
  },
  {
    name: "Marketplace",
    path: "/user/marketplace",
    icon: HiOutlineSpeakerphone,
  },
  {
    name: "Events",
    path: "/user/events",
    icon: LiaCalendarCheck,
  },
  {
    name: "Appointments",
    path: "/user/appointments",
    icon: RiCalendarTodoFill,
  },
  {
    name: "Subcommunities",
    path: "/user/subcommunities",
    icon: IoIosPeople,
  },
  {
    name: "Agriculture Trends",
    path: "/user/agriculture-trends",
    icon: TrendingUp,
  },
];

// recent activities
export const recentActivities = [
  {
    title: "New Patient Registered",
    description: "John Doe has registered as a new patient.",
    timeAgo: "9 min ago",
  },
  {
    title: "Appointment Scheduled",
    description: "Jane Smith scheduled an appointment with Dr. Johnson.",
    timeAgo: "20 min ago",
  },
  {
    title: "Medication Restocked",
    description: "Paracetamol has been restocked in the pharmacy.",
    timeAgo: "45 min ago",
  },
  {
    title: "Lab Results Available",
    description: "Lab results for patient Alice Brown are now available.",
    timeAgo: "1 hour ago",
  },
  {
    title: "New Staff Member",
    description: "Dr. Emily White has joined the cardiology department.",
    timeAgo: "2 hours ago",
  },
  {
    title: "System Maintenance Completed",
    description:
      "The scheduled system maintenance has been completed successfully.",
    timeAgo: "3 hours ago",
  },
  {
    title: "Health Seminar",
    description: "A health seminar on diabetes management was conducted.",
    timeAgo: "5 hours ago",
  },
  {
    title: "Emergency Surgery",
    description: "Emergency surgery was performed on patient Bob Green.",
    timeAgo: "7 hours ago",
  },
  {
    title: "Vaccination Drive",
    description: "A vaccination drive was held in the community center.",
    timeAgo: "9 hours ago",
  },
  {
    title: "Medical Records Updated",
    description: "Medical records for patient Carol Davis have been updated.",
    timeAgo: "10 hours ago",
  },
];

// reports
export const reports = [
  {
    title: "Monthly Patient Visits",
    description: "A summary of patient visits in the last month.",
  },
  {
    title: "Medication Inventory",
    description: "Current stock levels of all medications.",
  },
  {
    title: "Financial Summary",
    description:
      "Overview of financial performance including revenue and expenses.",
  },
  {
    title: "Patient Satisfaction Survey",
    description: "Results from the latest patient satisfaction survey.",
  },
  {
    title: "Staff Performance",
    description: "Assessment of staff performance for the past quarter.",
  },
  {
    title: "Annual Health Outcomes",
    description: "Yearly report on patient health outcomes and improvements.",
  },
  {
    title: "Emergency Room Statistics",
    description: "Detailed statistics on ER visits and outcomes.",
  },
  {
    title: "Outpatient Services Utilization",
    description: "Analysis of outpatient services and their usage.",
  },
  {
    title: "Research and Development",
    description: "Summary of ongoing research projects and developments.",
  },
  {
    title: "Community Outreach",
    description: "Report on community outreach programs and their impact.",
  },
];

// notifications
export const notifications = [
  {
    name: "Adebombo Bombo",
    description: "The maize yield in Kano has increased by 20% this season.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    time: "10:00am",
    moment: "2 hours ago",
    topic: "Sustaining Farming",
  },
  {
    name: "Zainab Alake",
    description: "A new irrigation system has been introduced in Benue State.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    time: "12:30pm",
    moment: "yesterday",
    topic: "Agricultural Innovation",
  },
  {
    name: "Chinedu Okeke",
    description:
      "Fertilizer subsidies are now available for small-scale farmers in Ogun State.",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    time: "3:45pm",
    moment: "5 days ago",
    topic: "Government Policy",
  },
  {
    name: "Fatima Musa",
    description: "Rice production in Ebonyi has hit a record high this year.",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    time: "1:20pm",
    moment: "3 days ago",
    topic: "Harvest Report",
  },
  {
    name: "Emeka Nwosu",
    description:
      "The government has launched a new initiative to support cassava farmers in Ekiti.",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    time: "9:00am",
    moment: "1 hour ago",
    topic: "Farming Initiative",
  },
  {
    name: "Ngozi Chukwu",
    description:
      "Soybean farmers in Kaduna are adopting new pest control methods.",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    time: "4:15pm",
    moment: "last week",
    topic: "Pest Control",
  },
  {
    name: "Tunde Olatunji",
    description:
      "The cocoa production in Cross River State has significantly improved.",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    time: "11:50am",
    moment: "2 days ago",
    topic: "Crop Production",
  },
  {
    name: "Aisha Bello",
    description:
      "New farming equipment grants are available for women farmers in Plateau State.",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    time: "6:30pm",
    moment: "last month",
    topic: "Farming Grants",
  },
  {
    name: "Bola Johnson",
    description:
      "Livestock farmers in Bauchi are benefiting from a new veterinary service program.",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    time: "8:00am",
    moment: "3 hours ago",
    topic: "Livestock Management",
  },
  {
    name: "Yemi Adeyemi",
    description:
      "The fish farming industry in Lagos is seeing a rise in production due to new techniques.",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    time: "2:10pm",
    moment: "yesterday",
    topic: "Aquaculture",
  },
];

// user feed
export const userFeeds = [
  {
    id: 1,
    authorImage: "https://randomuser.me/api/portraits/men/1.jpg",
    authorName: "Adebola Ogunleye",
    datePosted: "10th June, 2024; 10:00am",
    description:
      "Discover the latest sustainable farming practices to boost your crop yield and protect the environment.",
    images: [
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
    ],
    numberOfComments: 24,
    numberOfLikes: 150,
    numberOfShares: 30,
  },
  {
    id: 2,
    authorImage: "https://randomuser.me/api/portraits/women/2.jpg",
    authorName: "Chinelo Okeke",
    datePosted: "9th June, 2024; 11:30am",
    description:
      "Using organic fertilizers can significantly improve soil health and crop productivity.",
    images: [
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
    ],
    numberOfComments: 15,
    numberOfLikes: 120,
    numberOfShares: 22,
  },
  {
    id: 3,
    authorImage: "https://randomuser.me/api/portraits/men/3.jpg",
    authorName: "Bamidele Alabi",
    datePosted: "8th June, 2024; 09:45am",
    description:
      "Innovative irrigation techniques are crucial for improving water use efficiency in Nigerian agriculture.",
    images: [
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
    ],
    numberOfComments: 32,
    numberOfLikes: 180,
    numberOfShares: 40,
  },
  {
    id: 4,
    authorImage: "https://randomuser.me/api/portraits/women/4.jpg",
    authorName: "Aisha Suleiman",
    datePosted: "7th June, 2024; 08:20am",
    description:
      "Crop rotation and cover cropping are effective methods to enhance soil fertility and prevent erosion.",
    images: [
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
    ],
    numberOfComments: 18,
    numberOfLikes: 140,
    numberOfShares: 25,
  },
  {
    id: 5,
    authorImage: "https://randomuser.me/api/portraits/men/5.jpg",
    authorName: "Kunle Adebayo",
    datePosted: "6th June, 2024; 12:50pm",
    description:
      "Precision agriculture and the use of drones can revolutionize farming practices in Nigeria.",
    images: [
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
    ],
    numberOfComments: 28,
    numberOfLikes: 160,
    numberOfShares: 35,
  },
  {
    id: 6,
    authorImage: "https://randomuser.me/api/portraits/women/6.jpg",
    authorName: "Ngozi Nwosu",
    datePosted: "5th June, 2024; 02:15pm",
    description:
      "Implementing integrated pest management can reduce pesticide use and increase crop resilience.",
    images: [
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
    ],
    numberOfComments: 21,
    numberOfLikes: 135,
    numberOfShares: 28,
  },
  {
    id: 7,
    authorImage: "https://randomuser.me/api/portraits/men/7.jpg",
    authorName: "Olawale Akinyemi",
    datePosted: "4th June, 2024; 03:40pm",
    description:
      "Exploring new crop varieties can help farmers adapt to changing climate conditions.",
    images: [
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
    ],
    numberOfComments: 17,
    numberOfLikes: 145,
    numberOfShares: 26,
  },
  {
    id: 8,
    authorImage: "https://randomuser.me/api/portraits/women/8.jpg",
    authorName: "Funke Adeyemi",
    datePosted: "3rd June, 2024; 01:55pm",
    description:
      "Urban farming is gaining popularity in Nigeria, providing fresh produce to city dwellers.",
    images: [
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
    ],
    numberOfComments: 19,
    numberOfLikes: 125,
    numberOfShares: 20,
  },
  {
    id: 9,
    authorImage: "https://randomuser.me/api/portraits/men/9.jpg",
    authorName: "Ibrahim Danjuma",
    datePosted: "2nd June, 2024; 04:10pm",
    description:
      "Agroforestry practices can enhance biodiversity and provide additional income streams for farmers.",
    images: [
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
    ],
    numberOfComments: 23,
    numberOfLikes: 155,
    numberOfShares: 32,
  },
  {
    id: 10,
    authorImage: "https://randomuser.me/api/portraits/women/10.jpg",
    authorName: "Amara Eze",
    datePosted: "1st June, 2024; 05:25pm",
    description:
      "Small-scale farmers can benefit from cooperative farming and shared resources.",
    images: [
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
      `/images/feed${Math.floor(Math.random() * 8) + 1}.jpg`,
    ],
    numberOfComments: 20,
    numberOfLikes: 130,
    numberOfShares: 24,
  },
];

// marketplace products
export const marketplaceProducts = [
  {
    id: 1,
    price: "₦3,000 per pack",
    name: "Organic Pepper Seeds",
    description:
      "High-yield organic pepper seeds suitable for various climates. Certified organic and non-GMO. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra orci a elit faucibus suscipit vel vulputate libero.",
    location: "Lagos, Nigeria",
    image: "/icons/plant.svg",
    seller: "Agro Nigeria",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "agronigeria@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: false,
  },
  {
    id: 2,
    price: "₦4,500 per pack",
    name: "Premium Yam Tubers",
    description:
      "Fresh and premium quality yam tubers from the fertile lands of Northern Nigeria. Non-GMO and organically grown. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Kaduna, Nigeria",
    image: "/icons/plant.svg",
    seller: "Farm Fresh",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "farmfresh@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: true,
  },
  {
    id: 3,
    price: "₦1,800 per pack",
    name: "Organic Maize Seeds",
    description:
      "Top-quality organic maize seeds. Ideal for all seasons and resistant to pests. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra orci a elit faucibus suscipit vel vulputate libero.",
    location: "Kano, Nigeria",
    image: "/icons/plant.svg",
    seller: "Kano Agro",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "kanoagro@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: true,
  },
  {
    id: 4,
    price: "₦2,200 per pack",
    name: "Cassava Stems",
    description:
      "High-quality cassava stems for planting. Guaranteed to produce a high yield. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra orci a elit faucibus suscipit vel vulputate libero.",
    location: "Ibadan, Nigeria",
    image: "/icons/plant.svg",
    seller: "Cassava Farms",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "cassavafarms@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: false,
  },
  {
    id: 5,
    price: "₦5,000 per pack",
    name: "Organic Rice Grains",
    description:
      "Premium organic rice grains, perfect for all types of meals. Non-GMO and organically grown. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra orci a elit faucibus suscipit vel vulputate libero.",
    location: "Abakaliki, Nigeria",
    image: "/icons/plant.svg",
    seller: "Ebonyi Rice",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "ebonyirice@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: false,
  },
  {
    id: 6,
    price: "₦2,800 per pack",
    name: "High-Quality Cocoa Beans",
    description:
      "Top-grade cocoa beans from the best farms in Nigeria. Perfect for chocolate production. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Ondo, Nigeria",
    image: "/icons/plant.svg",
    seller: "Ondo Cocoa",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "ondococoa@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: false,
  },
  {
    id: 7,
    price: "₦3,200 per pack",
    name: "Organic Pineapple",
    description:
      "Sweet and juicy organic pineapples. Grown without chemicals. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra orci a elit faucibus suscipit vel vulputate libero.",
    location: "Benin City, Nigeria",
    image: "/icons/plant.svg",
    seller: "Edo Fresh Produce",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "edofreshproduce@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: false,
  },
  {
    id: 8,
    price: "₦1,500 per pack",
    name: "Groundnut Seeds",
    description:
      "High-yield groundnut seeds. Certified organic and non-GMO. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Minna, Nigeria",
    image: "/icons/plant.svg",
    seller: "Niger Farms",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "nigerfarms@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: false,
  },
  {
    id: 9,
    price: "₦3,600 per pack",
    name: "Organic Carrot Seeds",
    description:
      "Top-quality organic carrot seeds. Ideal for all climates. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra orci a elit faucibus suscipit vel vulputate libero.",
    location: "Jos, Nigeria",
    image: "/icons/plant.svg",
    seller: "Jos Vegetables",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "josvegetables@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: false,
  },
  {
    id: 10,
    price: "₦2,400 per pack",
    name: "Plantain Suckers",
    description:
      "High-yield plantain suckers. Perfect for planting in all climates. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Abeokuta, Nigeria",
    image: "/icons/plant.svg",
    seller: "Ogun Agro",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "ogunagro@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: true,
  },
  {
    id: 11,
    price: "₦3,700 per pack",
    name: "Organic Watermelon",
    description:
      "Fresh and juicy organic watermelons. Grown without chemicals. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Ilorin, Nigeria",
    image: "/icons/plant.svg",
    seller: "Kwara Produce",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "kwaraproduce@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: false,
  },
  {
    id: 12,
    price: "₦1,200 per pack",
    name: "Okra Seeds",
    description:
      "High-yield organic okra seeds. Suitable for all seasons. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Uyo, Nigeria",
    image: "/icons/plant.svg",
    seller: "Akwa Ibom Agro",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "akwaibomagro@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: true,
  },
  {
    id: 13,
    price: "₦4,000 per pack",
    name: "Organic Sweet Potatoes",
    description:
      "Delicious and nutritious organic sweet potatoes. Grown without chemicals. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Makurdi, Nigeria",
    image: "/icons/plant.svg",
    seller: "Benue Agro",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "benueagro@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: true,
  },
  {
    id: 14,
    price: "₦2,600 per pack",
    name: "Organic Spinach Seeds",
    description:
      "Top-quality organic spinach seeds. Ideal for all climates. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Enugu, Nigeria",
    image: "/icons/plant.svg",
    seller: "Enugu Greens",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "enugugreens@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: false,
  },
  {
    id: 15,
    price: "₦1,900 per pack",
    name: "High-Yield Soybeans",
    description:
      "Premium quality soybeans. Perfect for all types of meals. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Zaria, Nigeria",
    image: "/icons/plant.svg",
    seller: "Zaria Agro",
    contact: ["+2348012345678", "+2348012345679"][
      Math.floor(Math.random() * 2)
    ],
    other: ["https://example.com", "zariaagro@gmail.com"][
      Math.floor(Math.random() * 2)
    ],
    isUser: false,
  },
];

// marketplace events
export const marketplaceEvents = [
  {
    id: 1,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Mastering Organic Farming: A hands-on Workshop",
    date: "Saturday, March 18, 9:30PM",
    eventType: "in-person",
    location: "Lagos",
    isFree: true,
    organizer: "BestSeller Book BootCamp",
    isUser: false,
  },
  {
    id: 2,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Photography Workshop",
    date: "Sunday, April 9, 2:00PM",
    eventType: "in-person",
    location: "Abuja",
    isFree: false,
    organizer: "Aging Photographer Workshop",
    isUser: false,
  },
  {
    id: 3,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Tech Conference 2024",
    date: "Monday, May 15, 10:00AM",
    eventType: "online",
    location: "attend anywhere",
    isFree: true,
    organizer: "West African Tech Conference",
    isUser: false,
  },
  {
    id: 4,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Music Festival",
    date: "Tuesday, June 20, 4:30PM",
    eventType: "in-person",
    location: "Abuja",
    isFree: false,
    organizer: "Afrifata Music Organisation",
    isUser: false,
  },
  {
    id: 5,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Art Exhibition",
    date: "Wednesday, July 12, 1:00PM",
    eventType: "in-person",
    location: "Lagos",
    isFree: true,
    organizer: "Lagos Art Gallery",
    isUser: true,
  },
  {
    id: 6,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Business Seminar",
    date: "Thursday, August 3, 5:00PM",
    eventType: "online",
    location: "attend anywhere",
    isFree: false,
    organizer: "West African Tech Conference",
    isUser: false,
  },
  {
    id: 7,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Health and Wellness Expo",
    date: "Friday, September 22, 7:00PM",
    eventType: "in-person",
    location: "Ibadan",
    isFree: true,
    organizer: "Wolrd Health Organisation (WHO)",
    isUser: true,
  },
  {
    id: 8,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Cooking Masterclass",
    date: "Saturday, October 14, 8:00PM",
    eventType: "in-person",
    location: "Kano",
    isFree: false,
    organizer: "Kano Cooking School",
    isUser: true,
  },
  {
    id: 9,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Film Screening",
    date: "Sunday, November 5, 3:00PM",
    eventType: "in-person",
    location: "Enugu",
    isFree: true,
    organizer: "Film Screening Organisation",
    isUser: true,
  },
  {
    id: 10,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Science Fair",
    date: "Monday, December 18, 6:00PM",
    eventType: "online",
    location: "attend anywhere",
    isFree: false,
    organizer: "West African Tech Conference",
    isUser: false,
  },
  {
    id: 11,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Sports Meet",
    date: "Tuesday, January 23, 11:00AM",
    eventType: "in-person",
    location: "Kaduna",
    isFree: true,
    organizer: "Sports Meet Organisation",
    isUser: true,
  },
  {
    id: 12,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Fashion Show",
    date: "Wednesday, February 14, 12:00PM",
    eventType: "in-person",
    location: "Jos",
    isFree: false,
    organizer: "Fashion Show Organisation",
    isUser: false,
  },
  {
    id: 13,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Literary Festival",
    date: "Thursday, March 28, 9:00PM",
    eventType: "in-person",
    location: "Abeokuta",
    isFree: true,
    organizer: "Literary Festival Organisation",
    isUser: true,
  },
  {
    id: 14,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Dance Workshop",
    date: "Friday, April 19, 6:30PM",
    eventType: "online",
    location: "attend anywhere",
    isFree: false,
    organizer: "Dance Workshop Organisation",
    isUser: false,
  },
  {
    id: 15,
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    title: "Start-up Pitch Event",
    date: "Saturday, May 25, 10:30AM",
    eventType: "in-person",
    location: "Calabar",
    isFree: true,
    organizer: "Start-up Pitch Event Organisation",
    isUser: false,
  },
];

// appointments
export const appointments = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    fullname: "Dr. Adebayo Olu",
    location: "Lagos, Nigeria",
    contactDetails: "+2348012345678",
    specialty: "Poultry Farming",
    bio: "Experienced poultry farmer with over 15 years in sustainable and organic farming. Dedicated to improving farm productivity through innovative practices.",
    experienceLevel: "4.5",
    availabilitySlotDate: "July 5, 2024",
    availabilitySlotTime: "05:00AM - 09:00AM",
    isUser: false,
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    fullname: "Dr. Maryam Musa",
    location: "Abuja, Nigeria",
    contactDetails: "+2348023456789",
    specialty: "Fish Farming",
    bio: "Aquaculture specialist with a focus on sustainable fish farming practices. Passionate about improving fish health and productivity.",
    experienceLevel: "3.8",
    availabilitySlotDate: "July 6, 2024",
    availabilitySlotTime: "08:00AM - 12:00PM",
    isUser: false,
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    fullname: "Dr. Chinedu Okeke",
    location: "Enugu, Nigeria",
    contactDetails: "+2348034567890",
    specialty: "Crop Farming",
    bio: "Expert in crop farming with a specialization in organic and sustainable farming techniques. Over 20 years of experience in the field.",
    experienceLevel: "2.7",
    availabilitySlotDate: "July 7, 2024",
    availabilitySlotTime: "10:00AM - 02:00PM",
    isUser: true,
  },
  {
    id: 4,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    fullname: "Dr. Aisha Yusuf",
    location: "Kano, Nigeria",
    contactDetails: "+2348045678901",
    specialty: "Livestock Farming",
    bio: "Veterinarian with a deep understanding of livestock farming. Committed to enhancing animal health and farm productivity.",
    experienceLevel: "4.9",
    availabilitySlotDate: "July 8, 2024",
    availabilitySlotTime: "09:00AM - 01:00PM",
    isUser: true,
  },
  {
    id: 5,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    fullname: "Dr. Samuel Johnson",
    location: "Ibadan, Nigeria",
    contactDetails: "+2348056789012",
    specialty: "Horticulture",
    bio: "Horticulturist with a passion for sustainable gardening and landscape design. Over 15 years of experience in the field.",
    experienceLevel: "5.0",
    availabilitySlotDate: "July 9, 2024",
    availabilitySlotTime: "07:00AM - 11:00AM",
    isUser: false,
  },
  {
    id: 6,
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    fullname: "Dr. Nkechi Nwosu",
    location: "Port Harcourt, Nigeria",
    contactDetails: "+2348067890123",
    specialty: "Agroforestry",
    bio: "Specialist in agroforestry with a focus on sustainable land management and tree crop integration. Dedicated to environmental conservation.",
    experienceLevel: "1.5",
    availabilitySlotDate: "July 10, 2024",
    availabilitySlotTime: "06:00AM - 10:00AM",
    isUser: false,
  },
  {
    id: 7,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    fullname: "Dr. Ibrahim Bello",
    location: "Kaduna, Nigeria",
    contactDetails: "+2348078901234",
    specialty: "Soil Science",
    bio: "Soil scientist with expertise in soil health and fertility management. Over 18 years of experience in improving crop yields.",
    experienceLevel: "4.8",
    availabilitySlotDate: "July 11, 2024",
    availabilitySlotTime: "05:00AM - 09:00AM",
    isUser: false,
  },
  {
    id: 8,
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    fullname: "Dr. Grace Eze",
    location: "Onitsha, Nigeria",
    contactDetails: "+2348089012345",
    specialty: "Agricultural Economics",
    bio: "Agricultural economist with a focus on farm management and economic sustainability. Committed to helping farmers maximize profits.",
    experienceLevel: "4.5",
    availabilitySlotDate: "July 12, 2024",
    availabilitySlotTime: "08:00AM - 12:00PM",
    isUser: false,
  },
  {
    id: 9,
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    fullname: "Dr. John Okafor",
    location: "Benin City, Nigeria",
    contactDetails: "+2348090123456",
    specialty: "Entomology",
    bio: "Entomologist with a passion for pest management and crop protection. Over 10 years of experience in the field.",
    experienceLevel: "4.6",
    availabilitySlotDate: "July 13, 2024",
    availabilitySlotTime: "09:00AM - 01:00PM",
    isUser: true,
  },
  {
    id: 10,
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    fullname: "Dr. Funmi Adeola",
    location: "Ilorin, Nigeria",
    contactDetails: "+2348101234567",
    specialty: "Animal Nutrition",
    bio: "Expert in animal nutrition with a focus on feed formulation and livestock health. Dedicated to improving animal productivity.",
    experienceLevel: "3.7",
    availabilitySlotDate: "July 14, 2024",
    availabilitySlotTime: "07:00AM - 11:00AM",
    isUser: false,
  },
  {
    id: 11,
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    fullname: "Dr. Bamidele Ajayi",
    location: "Jos, Nigeria",
    contactDetails: "+2348112345678",
    specialty: "Agronomy",
    bio: "Agronomist with a specialization in crop production and soil management. Over 12 years of experience in the agricultural sector.",
    experienceLevel: "3.8",
    availabilitySlotDate: "July 15, 2024",
    availabilitySlotTime: "06:00AM - 10:00AM",
    isUser: false,
  },
  {
    id: 12,
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    fullname: "Dr. Patricia Okoro",
    location: "Abeokuta, Nigeria",
    contactDetails: "+2348123456789",
    specialty: "Agro-technology",
    bio: "Specialist in agro-technology with a focus on modern farming equipment and techniques. Committed to improving farm efficiency.",
    experienceLevel: "2.7",
    availabilitySlotDate: "July 16, 2024",
    availabilitySlotTime: "05:00AM - 09:00AM",
    isUser: true,
  },
  {
    id: 13,
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    fullname: "Dr. Ahmed Suleiman",
    location: "Sokoto, Nigeria",
    contactDetails: "+2348134567890",
    specialty: "Irrigation Engineering",
    bio: "Expert in irrigation systems and water management. Over 15 years of experience in designing and implementing efficient irrigation solutions.",
    experienceLevel: "4.8",
    availabilitySlotDate: "July 17, 2024",
    availabilitySlotTime: "08:00AM - 12:00PM",
    isUser: true,
  },
  {
    id: 14,
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    fullname: "Dr. Clara Nnamdi",
    location: "Uyo, Nigeria",
    contactDetails: "+2348145678901",
    specialty: "Plant Pathology",
    bio: "Plant pathologist with expertise in diagnosing and managing plant diseases. Dedicated to improving plant health and crop yields.",
    experienceLevel: "3.9",
    availabilitySlotDate: "July 18, 2024",
    availabilitySlotTime: "10:00AM - 02:00PM",
    isUser: false,
  },
  {
    id: 15,
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    fullname: "Dr. Emmanuel Akin",
    location: "Yola, Nigeria",
    contactDetails: "+2348156789012",
    specialty: "Agricultural Extension",
    bio: "Agricultural extension officer with a focus on farmer education and community development. Over 20 years of experience in the field.",
    experienceLevel: "4.7",
    availabilitySlotDate: "July 19, 2024",
    availabilitySlotTime: "09:00AM - 01:00PM",
    isUser: false,
  },
];

// subcommunity members
export const subcommunityMembers = [
  {
    id: 1,
    name: "Adebambo Ofunyenmi",
    profession: "Agriculturalist",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Bolanle Ogunleye",
    profession: "Poultry Farmer",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Chukwuma Okonkwo",
    profession: "Fish Farmer",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Adetola Ajayi",
    profession: "Organic Farmer",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Ibrahim Musa",
    profession: "Crop Scientist",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Ngozi Eze",
    profession: "Veterinarian",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7,
    name: "Tunde Akande",
    profession: "Soil Scientist",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8,
    name: "Folasade Adetayo",
    profession: "Environmental Engineer",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9,
    name: "Emeka Nwosu",
    profession: "Bee Farmer",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: 10,
    name: "Amara Chukwu",
    profession: "Forestry Expert",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    id: 11,
    name: "Olumide Babatunde",
    profession: "Agroforestry Specialist",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 12,
    name: "Blessing Adebayo",
    profession: "Hydroponics Technician",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 13,
    name: "Chinedu Obasi",
    profession: "Horticulturist",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    id: 14,
    name: "Yewande Oke",
    profession: "Agricultural Economist",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    id: 15,
    name: "Samuel Adeoye",
    profession: "Livestock Farmer",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
];

// subcommunities
export const subcommunities = [
  {
    id: 1,
    title: "Sustainable Farming",
    description:
      "A community focused on sustainable agricultural practices in Nigeria. This group brings together farmers, agricultural experts, and enthusiasts who are dedicated to promoting sustainable farming techniques. Discussions and resources cover topics such as soil health, water conservation, crop rotation, and organic farming. The community aims to support farmers in increasing their productivity while preserving the environment. Members share their experiences, challenges, and success stories, fostering a supportive network that encourages sustainable practices and innovations in farming.",
    category: "Organic Farming",
    lastActive: "2 hours ago",
    joined: false,
    members: subcommunityMembers.slice(
      0,
      Math.floor(Math.random() * subcommunityMembers.length)
    ),
  },
  {
    id: 2,
    title: "Rice Farmers Network",
    description:
      "A network of rice farmers sharing best practices and resources. This community is designed for rice farmers in Nigeria who are looking to improve their cultivation methods and yields. Members have access to expert advice, research findings, and discussions about pest control, soil management, and modern farming equipment. The goal is to help farmers increase their rice production efficiently and sustainably, ensuring food security and improving their livelihoods. Regular meetups and virtual seminars are also part of this vibrant network.",
    category: "Crop Farming",
    lastActive: "5 hours ago",
    joined: true,
    members: subcommunityMembers.slice(
      0,
      Math.floor(Math.random() * subcommunityMembers.length)
    ),
  },
  {
    id: 3,
    title: "Urban Gardening Lagos",
    description:
      "Promoting urban gardening and small-scale farming in Lagos. This group focuses on helping city dwellers turn small spaces into productive gardens. Whether it's a balcony, rooftop, or backyard, members share tips and techniques on how to grow vegetables, herbs, and fruits in urban environments. Topics include container gardening, soil preparation, composting, and dealing with pests in a city setting. The community also encourages the sharing of gardening experiences, successes, and challenges, fostering a collaborative environment for all urban gardeners.",
    category: "Urban Farming",
    lastActive: "1 day ago",
    joined: true,
    members: subcommunityMembers.slice(
      0,
      Math.floor(Math.random() * subcommunityMembers.length)
    ),
  },
  {
    id: 4,
    title: "Organic Vegetable Growers",
    description:
      "Community of organic vegetable growers in Nigeria. This group is dedicated to promoting organic farming methods for growing vegetables. Members discuss and share knowledge on organic pest control, soil enrichment, crop rotation, and sustainable farming practices. The aim is to produce healthy, chemical-free vegetables while maintaining soil fertility and protecting the environment. The community provides a platform for farmers to exchange ideas, seek advice, and collaborate on projects that enhance their organic farming practices.",
    category: "Organic Farming",
    lastActive: "3 hours ago",
    joined: false,
    members: subcommunityMembers.slice(
      0,
      Math.floor(Math.random() * subcommunityMembers.length)
    ),
  },
  {
    id: 5,
    title: "Cassava Cultivation Group",
    description:
      "Group dedicated to improving cassava cultivation techniques. Cassava is a major staple crop in Nigeria, and this community aims to support farmers in maximizing their cassava production. Members share insights on soil preparation, disease control, and harvesting techniques. The group also provides information on value-added processing methods to increase the profitability of cassava farming. By collaborating and sharing knowledge, members strive to enhance their farming practices and improve their livelihoods.",
    category: "Root Crops",
    lastActive: "4 days ago",
    joined: false,
    members: subcommunityMembers.slice(
      0,
      Math.floor(Math.random() * subcommunityMembers.length)
    ),
  },
  {
    id: 6,
    title: "Poultry Farming Professionals",
    description:
      "A group for professionals in the poultry farming industry. This community brings together poultry farmers, veterinarians, and industry experts to discuss best practices in poultry farming. Topics include disease management, feed optimization, breeding techniques, and market trends. Members share their experiences and challenges, providing support and advice to each other. The goal is to enhance the productivity and profitability of poultry farming in Nigeria, while ensuring the health and welfare of the birds.",
    category: "Poultry Farming",
    lastActive: "6 hours ago",
    joined: true,
    members: subcommunityMembers.slice(
      0,
      Math.floor(Math.random() * subcommunityMembers.length)
    ),
  },
  {
    id: 7,
    title: "Aquaculture Enthusiasts",
    description:
      "Community for sharing knowledge and techniques in aquaculture. This group is for fish farmers and aquaculture enthusiasts in Nigeria who are interested in improving their fish farming practices. Discussions cover topics such as pond construction, water quality management, fish nutrition, and disease control. Members share their experiences, successes, and challenges, providing a supportive network for all levels of fish farmers. The community also offers opportunities for collaboration and learning from industry experts.",
    category: "Aquaculture",
    lastActive: "2 days ago",
    joined: false,
    members: subcommunityMembers.slice(
      0,
      Math.floor(Math.random() * subcommunityMembers.length)
    ),
  },
  {
    id: 8,
    title: "Sustainable Agroforestry",
    description:
      "Promoting sustainable agroforestry practices in Nigeria. This community focuses on integrating trees and shrubs into agricultural landscapes to improve biodiversity and sustainability. Members discuss techniques for selecting and managing tree species, soil conservation, and water management. The goal is to create productive and sustainable farming systems that benefit both farmers and the environment. The community provides a platform for sharing knowledge, experiences, and innovations in agroforestry.",
    category: "Agroforestry",
    lastActive: "8 hours ago",
    joined: false,
    members: subcommunityMembers.slice(
      0,
      Math.floor(Math.random() * subcommunityMembers.length)
    ),
  },
  {
    id: 9,
    title: "Maize Farmers Cooperative",
    description:
      "Cooperative for maize farmers to share resources and knowledge. This group is dedicated to supporting maize farmers in Nigeria through collective efforts and resource sharing. Members discuss best practices in maize cultivation, pest control, soil management, and harvesting techniques. The cooperative aims to increase productivity and profitability for its members by providing access to research, expert advice, and market information. Regular meetings and workshops are organized to facilitate learning and collaboration.",
    category: "Crop Farming",
    lastActive: "12 hours ago",
    joined: false,
    members: subcommunityMembers.slice(
      0,
      Math.floor(Math.random() * subcommunityMembers.length)
    ),
  },
  {
    id: 10,
    title: "Beekeeping Network",
    description:
      "A network for beekeepers to share techniques and improve practices. This community is for beekeepers in Nigeria who are interested in enhancing their beekeeping skills and knowledge. Topics of discussion include hive management, honey production, disease control, and marketing of bee products. Members share their experiences, challenges, and success stories, providing a supportive environment for all beekeepers. The network also offers opportunities for collaboration and learning from industry experts.",
    category: "Beekeeping",
    lastActive: "3 days ago",
    joined: true,
    members: subcommunityMembers.slice(
      0,
      Math.floor(Math.random() * subcommunityMembers.length)
    ),
  },
];

// agricultural trends
export const agriculturalTrends = [
  {
    id: 1,
    title: "Advancements in Hydroponic Systems",
    description:
      "Hydroponic farming is gaining popularity due to its efficient use of water and space. This trend focuses on the latest advancements in hydroponic systems, including new nutrient solutions, improved lighting systems, and cost-effective setups that make hydroponics more accessible to small-scale farmers.",
    datePosted: "July 1, 2024",
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    category: "Hydroponics",
    postedBy: "Agro Nigeria",
    hashtags: ["Hydroponics", "NutrientSolutions", "LightingSystems"],
  },
  {
    id: 2,
    title: "Organic Farming Techniques",
    description:
      "Organic farming continues to be a significant trend as consumers demand healthier, chemical-free produce. This trend covers various organic farming techniques such as crop rotation, natural pest control, and the use of organic fertilizers to improve soil health and productivity.",
    datePosted: "June 25, 2024",
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    category: "Organic Farming",
    postedBy: "Dr. Johnson Adeoye",
    hashtags: ["OrganicFarming", "CropRotation", "NaturalPestControl"],
  },
  {
    id: 3,
    title: "Sustainable Livestock Farming",
    description:
      "Sustainable livestock farming practices are becoming essential to reduce environmental impact and improve animal welfare. This trend highlights innovative approaches in feed, waste management, and breeding techniques that contribute to sustainable livestock farming.",
    datePosted: "June 20, 2024",
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    category: "Livestock Farming",
    postedBy: "Dr. Emmanuel Akin",
    hashtags: ["SustainableLivestockFarming", "Feed", "WasteManagement"],
  },
  {
    id: 4,
    title: "Climate-Resilient Crops",
    description:
      "With the increasing impacts of climate change, developing climate-resilient crops is a top priority. This trend focuses on the latest research and developments in breeding crops that can withstand extreme weather conditions, pests, and diseases.",
    datePosted: "June 15, 2024",
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    category: "Crop Farming",
    postedBy: "Dr. Ibrahim Bello",
    hashtags: ["ClimateResilientCrops", "BreedingCrops", "ExtremeWeather"],
  },
  {
    id: 5,
    title: "Smart Farming Technologies",
    description:
      "Smart farming technologies, including IoT devices, drones, and AI-driven analytics, are revolutionizing agriculture. This trend explores how these technologies are being used to monitor crop health, optimize irrigation, and enhance overall farm management.",
    datePosted: "June 10, 2024",
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    category: "Crop Farming",
    postedBy: "Dr. Samuel Johnson",
    hashtags: ["SmartFarming", "IoT", "AI", "Drones"],
  },
  {
    id: 6,
    title: "Regenerative Agriculture",
    description:
      "Regenerative agriculture aims to restore soil health and biodiversity. This trend covers practices such as cover cropping, no-till farming, and holistic grazing that help rebuild soil organic matter, sequester carbon, and promote a diverse ecosystem.",
    datePosted: "June 5, 2024",
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    category: "Crop Farming",
    postedBy: "Dr. Emmanuel Akin",
    hashtags: ["RegenerativeAgriculture", "Biodiversity"],
  },
  {
    id: 7,
    title: "Agroforestry Integration",
    description:
      "Agroforestry combines agriculture and forestry to create more sustainable and productive landscapes. This trend highlights the benefits of integrating trees and shrubs into farming systems, including improved soil health, increased biodiversity, and additional income sources.",
    datePosted: "May 30, 2024",
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    category: "Agroforestry",
    postedBy: "Dr Eben Oke",
    hashtags: ["Agroforestry", "Forestry"],
  },
  {
    id: 8,
    title: "Precision Agriculture",
    description:
      "Precision agriculture involves using advanced technologies to optimize field-level management regarding crop farming. This trend delves into the use of GPS, remote sensing, and data analytics to increase efficiency and productivity while minimizing environmental impact.",
    datePosted: "May 25, 2024",
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    category: "Crop Farming",
    postedBy: "Dr. Samuel Johnson",
    hashtags: ["PrecisionAgriculture", "DataAnalytics"],
  },
  {
    id: 9,
    title: "Aquaponics and Aquaculture",
    description:
      "Aquaponics and aquaculture are gaining traction as sustainable food production systems. This trend examines the benefits and challenges of combining fish farming with hydroponics to create a closed-loop system that maximizes resource use and productivity.",
    datePosted: "May 20, 2024",
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    category: "Aquaculture",
    postedBy: "Dr. Ibrahim Bello",
    hashtags: ["Aquaponics", "Aquaculture"],
  },
  {
    id: 10,
    title: "Urban Agriculture Innovations",
    description:
      "Urban agriculture is becoming essential to ensure food security in cities. This trend focuses on innovative approaches to urban farming, including vertical farming, rooftop gardens, and community-supported agriculture, which help bring fresh produce closer to urban dwellers.",
    datePosted: "May 15, 2024",
    image: `/images/feed${Math.floor(Math.random() * 9) + 1}.jpg`,
    category: "Urban Farming",
    postedBy: "Dr. Emmanuel Akin",
    hashtags: ["UrbanFarming", "CommunityFarming"],
  },
];
