import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@clerk/clerk-react';

const SingleEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const { userId } = useAuth();
    const [isRSVPed, setIsRSVPed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventResponse = await fetch(`http://localhost:8080/api/events/${eventId}`);
                if (eventResponse.ok) {
                    const eventData = await eventResponse.json();
                    setEvent(eventData);

                    if (userId === eventData.createdByUserId) {
                        setIsOwner(true);
                    }
                } else {
                    console.error('Failed to fetch event');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchRSVPStatus = async () => {
            try {
                const rsvpResponse = await fetch(`http://localhost:8080/api/events/${eventId}/rsvp?userId=${userId}`);
                if (rsvpResponse.ok) {
                    const data = await rsvpResponse.json();
                    setIsRSVPed(data.isRSVPed);
                } else {
                    setIsRSVPed(false);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEvent();
        if (userId) {
            fetchRSVPStatus();
        }
    }, [eventId, userId]);

    const handleDeleteEvent = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/events/${eventId}`,
                {
                    method: "DELETE",
                }
            );
            if (response.ok) {
                // Event deleted successfully, redirect to home or another appropriate page
                window.location.href = '/';
            } else {
                console.error("Failed to delete event");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleRSVPEvent = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/events/${eventId}/rsvp?userId=${userId}`, {
                method: isRSVPed ? "DELETE" : "POST",
            });
            if (response.ok) {
                if (isRSVPed) {
                    console.log("Deregistered from event");
                } else {
                    console.log("Registered for event");
                }
                setIsRSVPed(!isRSVPed); // Toggle the RSVP status
            } else {
                console.error("Failed to update RSVP status");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="singlevent">
            {event && (
                <div className="event">
                    <img src={event.eventImage} alt="Event" />
                    <div className="eventdetails">
                        <h1>EVENT NAME : {event.eventName}</h1>
                        <br />
                        <div className="eventsidebar">
                            <div className="eventsummary">
                                <span><FontAwesomeIcon icon={faCalendarDays} />&nbsp;&nbsp;{event.eventDate}</span>
                                <span><FontAwesomeIcon icon={faLocationDot} />&nbsp;&nbsp;{event.venueCity}, {event.venueState}, {event.venueCountry}</span>
                            </div>
                            <div className="btn">
                                {isOwner && (
                                    <>
                                        <Link to={`/edit/${event.eventId}`}><button className="editbtn hover:bg-[#009933]">Edit Event</button><br /></Link>
                                        <button className="deletebtn hover:bg-[#b91313]" onClick={handleDeleteEvent}>Delete Event</button>
                                    </>
                                )}
                            </div>
                        </div>
                        <br />
                    </div>
                    <hr />
                    <br />
                    <div className='eventsleftside'>
                        <div className="eventsbuy">
                            <span>Organzier Name : {event.organizerName}</span>
                            <span>Organzier Phone : {event.organizerPhone}</span>
                        </div>
                    </div>
                    <button className="registerbtn hover:bg-[#5656f8]" onClick={handleRSVPEvent}>
                        {isRSVPed ? "De-register for event" : "Register for event"}
                    </button>
                    <br></br>
                </div>
            )}
            {event && (
                <div className="eventdescription">
                    <span>Event Description:</span>
                    <p>{event.description}</p>
                </div>
            )}
        </div>
    );
};

export default SingleEvent;
