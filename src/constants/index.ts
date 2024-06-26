import { MdOutlineDashboard, MdOutlineTopic } from "react-icons/md";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LiaCalendarCheck } from "react-icons/lia";
import { TbMessage2, TbMessageChatbot } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { CircleHelp } from "lucide-react";
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
    icon: IoIosPeople,
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
    icon: CircleHelp,
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
  },
];
