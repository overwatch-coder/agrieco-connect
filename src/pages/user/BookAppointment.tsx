import {
  ArrowLeft,
  ArrowRight,
  CircleHelp,
  MessageSquareText,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookAppointmentCalendar from "@/components/BookAppointmentCalendar";
import { useFetch } from "@/hooks/useFetch";
import RenderContentLoading from "@/components/shared/RenderContentLoading";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams() as {
    appointmentId: string;
  };

  const { data: appointmentData, isLoading } = useFetch<IAppointment>({
    queryKey: "appointments",
    url: `/appointments/${appointmentId}/bookings`,
    enabled: true,
  });

  const [appointment, setAppointment] = useState<IAppointment>();

  useEffect(() => {
    if (appointmentData) {
      setAppointment(appointmentData);
    }
  }, [appointmentData]);

  if (isLoading) {
    return <RenderContentLoading />;
  }

  // check if appointment exists
  if (!appointment) {
    navigate("/user/appointments");
    return null;
  }

  return (
    <div className="w-full">
      {/* Title */}
      <Helmet>
        <title> Book An Appointment | Appointments - Agrieco-Connect </title>
        <meta name="description" content="Book An Appointment" />
      </Helmet>

      <div className="md:gap-6 flex flex-col w-full gap-10 p-5">
        <Link
          to="/user/appointments"
          className="text-primary-brown flex items-center gap-2"
        >
          <ArrowLeft size={20} className="text-primary-brown" />
          <span>Go Back</span>
        </Link>

        <section className="flex items-center justify-between w-full gap-5">
          <h2 className="text-lg md:text-2xl font-bold font-[poppins] text-primary-brown">
            Book Appointment with {appointment.company_name}
          </h2>
        </section>

        {/* Appointment Calender */}
        <section className="md:flex-row md:items-start md:gap-5 flex flex-col items-center gap-3">
          {/* Doctor Information */}
          <div className="flex flex-col items-center w-full md:max-w-[200px] gap-3">
            <div className="border-primary-brown flex items-center justify-center w-32 h-32 p-2 bg-white border-2 rounded-full">
              <img
                src={faker.image.avatar()}
                alt={appointment.user.fullname}
                className="object-cover w-full h-full rounded-full"
              />
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-base font-semibold text-black">
                {appointment.company_name}
              </p>
              <Link
                to={`mailto:${appointment.company_name.toLowerCase()}@agrieco.com`}
                target="_blank"
                className="text-secondary-gray text-xs font-semibold lowercase"
              >
                {`${appointment.company_name.toLowerCase()}@agrieco.com`}
              </Link>

              <Link
                to={"#"}
                className="flex items-center justify-between w-full gap-4"
              >
                <span className="flex items-center gap-2">
                  <MessageSquareText
                    size={16}
                    className="text-secondary-gray"
                  />
                  <span className="text-secondary-gray text-sm">
                    Send Feedback
                  </span>
                </span>
                <ArrowRight size={16} className="text-secondary-gray" />
              </Link>

              <Link
                to={"#"}
                className="flex items-center justify-between w-full gap-4"
              >
                <span className="flex items-center gap-2">
                  <CircleHelp size={16} className="text-secondary-gray" />
                  <span className="text-secondary-gray text-sm">
                    Expert Help
                  </span>
                </span>
                <ArrowRight size={16} className="text-secondary-gray" />
              </Link>
            </div>
          </div>

          {/* Booking Calendar */}
          <div className="scrollbar-hide flex flex-col flex-grow w-full gap-3 p-4 bg-white rounded-lg shadow-md">
            <p className="flex flex-col items-center gap-2 text-sm text-center">
              <span>
                NB: Click on an available slot to book an appointment.
              </span>
            </p>

            <BookAppointmentCalendar appointment={appointment} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookAppointment;
