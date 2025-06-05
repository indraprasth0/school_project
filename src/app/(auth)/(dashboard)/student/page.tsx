import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";

const StudentPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3 shadow-md">
                <div className="h-full bg-white rounded-md flex flex-col">
                    <h1 className="text-xl font-semibold mx-auto text-p400 items-center pt-4"> Schedule (4A)</h1>
                    <BigCalendar />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
                <EventCalendar />
                <Announcements />
            </div>
        </div>
    )
}

export default StudentPage;