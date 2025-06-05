import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/charts/AttendanceChart";
import CountCharts from "@/components/charts/CountChart";
import FinanceChart from "@/components/charts/FinanceChart";
import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";

const SubAdminPage = () => {

    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* LEFT */}
            <div className="w-full lg:w-2/3 flex flex-col gap-5">
                {/* User Card */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="teacher" />
                    <UserCard type="student" />
                    <UserCard type="parent" />
                    <UserCard type="staff" />
                </div>
                {/* Middle Charts */}
                <div className="flex flex-col gap-4 lg:flex-row">
                    {/* Left */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountCharts />
                    </div>
                    {/* Right */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendanceChart />
                    </div>
                </div>
                {/* Bottom Charts */}
                <div className="w-full h-[500px]">
                    <FinanceChart />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full lg:w-1/3">
                <EventCalendar />
                <Announcements />
            </div>
        </div>
    )
}

export default SubAdminPage;