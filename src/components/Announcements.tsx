"use client";

const Announcements = () => {
 

  const announcements = [
    {
      id: 1,
      title: "School Annual Function",
      time: "10:00 AM - 12:00 PM",
      description: "Join us for the annual school function with performances and awards.",
    },
    {
      id: 2,
      title: "Exam Schedule Released",
      time: "2:00 PM - 3:00 PM",
      description: "Check the official portal for the latest exam schedule and syllabus updates.",
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      time: "4:00 PM - 5:30 PM",
      description: "Discuss your child's progress with teachers in this quarterly PTM session.",
    },
  ];

  return (
    <div className="p-4 rounded-xl shadow-md w-full mx-auto bg-p200 text-p600">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl mb-4">📢 Announcements</h1>
        <span className="text-xs text-p500 cursor-pointer hover:underline">View all</span>
      </div>

      <div className="flex flex-col gap-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="p-5 rounded-md border-2 border-t-4 odd:bg-p100 even:bg-p300 odd:border-t-p400 even:border-t-p500 "
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-p900">{announcement.title}</h2>
              <span className="text-p700 text-xs">{announcement.time}</span>
            </div>
            <p className="mt-2 text-sm">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
