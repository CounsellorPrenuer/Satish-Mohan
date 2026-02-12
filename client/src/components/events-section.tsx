import { useQuery } from "@tanstack/react-query";
import type { Event } from "@/lib/types";
import { getEvents } from "@/lib/sanity";
import { CalendarDays, MapPin, ExternalLink, Clock } from "lucide-react";

export default function EventsSection() {
    const { data: events = [], isLoading } = useQuery<Event[]>({
        queryKey: ["sanity-events"],
        queryFn: getEvents
    });

    if (isLoading) {
        return (
            <section id="events" className="py-16 sm:py-24 lg:py-20 bg-muted/30 border-t border-border/40">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">Upcoming Events</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-card rounded-2xl shadow-lg overflow-hidden">
                                <div className="w-full h-48 skeleton"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-6 skeleton w-3/4"></div>
                                    <div className="h-4 skeleton w-full"></div>
                                    <div className="h-4 skeleton w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (events.length === 0) {
        return (
            <section id="events" className="py-16 sm:py-24 lg:py-20 bg-muted/30 border-t border-border/40">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6">Upcoming Events</h2>
                        <p className="text-lg text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
                    </div>
                </div>
            </section>
        );
    }

    const formatDate = (date: Date | string) => {
        const d = typeof date === "string" ? new Date(date) : date;
        return d.toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const formatTime = (date: Date | string) => {
        const d = typeof date === "string" ? new Date(date) : date;
        return d.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    const isUpcoming = (date: Date | string) => {
        const d = typeof date === "string" ? new Date(date) : date;
        return d > new Date();
    };

    return (
        <section id="events" className="py-16 sm:py-24 lg:py-20 bg-muted/30 border-t border-border/40">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 sm:mb-8" data-testid="events-title">
                        Upcoming Events
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4" data-testid="events-description">
                        Join our workshops, retreats, and seminars to transform your career and personal growth
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="group bg-card border border-border/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                            data-testid={`event-card-${event.id}`}
                        >
                            {/* Event Image */}
                            {event.image && (
                                <div className="relative overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                        data-testid={`event-image-${event.id}`}
                                    />
                                    {isUpcoming(event.date) && (
                                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                            Upcoming
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Event Details */}
                            <div className="p-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300" data-testid={`event-title-${event.id}`}>
                                    {event.title}
                                </h3>

                                {event.description && (
                                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base line-clamp-3" data-testid={`event-desc-${event.id}`}>
                                        {event.description}
                                    </p>
                                )}

                                {/* Meta Info */}
                                <div className="space-y-2 mb-5">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <CalendarDays className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                                        <span>{formatDate(event.date)}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                                        <span>{formatTime(event.date)}</span>
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                </div>

                                {/* CTA */}
                                {event.registrationLink && (
                                    <a
                                        href={event.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center w-full justify-center bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                                        data-testid={`event-register-${event.id}`}
                                    >
                                        Register Now
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
