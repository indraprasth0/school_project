import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";


const ParentPage = () => {
    return (
        <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white rounded-md flex flex-col">
                    <h1 className="text-xl font-semibold mx-auto text-p400 items-center pt-4"> Schedule (4A)</h1>
                    <BigCalendar />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">                
                <Announcements />
            </div>
        </div>
    )
}

export default ParentPage;


