import "add-to-calendar-button";
import { getEndTime } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const getTime = (time: string) => {
  return time.split(" ")[0];
};

const AddToCalendarButton = ({ event }: { event: IEvent }) => {
  const [auth] = useAuth();

  const name = `[Reminder] Add ${event.title} to Calendar`;
  const startDate = `${event.date}`;
  const startTime = new Date(event.date).toLocaleTimeString();
  const endTime = getEndTime(startTime);
  const attendee = `${auth?.user.fullname}|${auth?.user.email}`;
  const organizer = `${event.user.fullname}|${event.user.email}`;

  return (
    <>
      <add-to-calendar-button
        name={name}
        startDate={startDate}
        options="['Apple','Google','iCal','Microsoft365','Outlook.com','Yahoo']"
        buttonStyle="3d"
        listStyle="modal"
        hideIconButton
        startTime={getTime(startTime)}
        endTime={getTime(endTime)}
        organizer={organizer}
        attendee={attendee}
        iCalFileName="add-program-to-calendar"
        inline
        trigger="click"
        label="Add To Calendar"
        hideCheckmark
        size="2"
      />
    </>
  );
};

export default AddToCalendarButton;
