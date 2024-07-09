import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { aboutUsTestimonials } from "@/constants";

const TestimonialCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <>
      <div className="embla lg:w-auto w-full" ref={emblaRef}>
        <div className="embla__container">
          {aboutUsTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="embla__slide p-6">
              <div className="flex flex-col gap-8 px-4 py-6 bg-black rounded-none shadow-md">
                <p className="text-primary-yellow text-lg leading-relaxed">
                  "{testimonial.testimonial}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover w-16 h-16 rounded-full"
                  />

                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm font-normal text-white">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots flex justify-center mt-4">
        {aboutUsTestimonials.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => emblaApi!.scrollTo(index)}
          />
        ))}
      </div>
    </>
  );
};

export default TestimonialCarousel;

type DotButtonProps = {
  selected: boolean;
  onClick: () => void;
};

const DotButton = ({ selected, onClick }: DotButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`embla__dot ${selected ? "bg-white w-8 h-2" : "bg-white/50 w-2 h-2"} rounded-full mx-1`}
  />
);
