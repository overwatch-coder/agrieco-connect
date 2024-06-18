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
    name: "Messages",
    path: "/user/messages",
    icon: TbMessage2,
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
  {
    name: "Chatbot",
    path: "/user/chatbot",
    icon: TbMessageChatbot,
  },
  {
    name: "Help & Support",
    path: "/user/help-support",
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
