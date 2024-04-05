import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faLocationDot, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/events');
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                } else {
                    console.error('Failed to fetch events');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="eventcontainer">
            {events.map((event) => (
                <div className="card1" key={event.eventId}>
                    <div className="front">
                        <img src={event.eventImage} alt="Event" />
                        <ul>
                            <li>{event.eventName}</li>
                            <li><span><FontAwesomeIcon icon={faCalendarDays} />&nbsp;&nbsp;{event.eventDate}</span></li>
                            <li><span><FontAwesomeIcon icon={faLocationDot} />&nbsp;&nbsp;{event.venueCity}, {event.venueState}, {event.venueCountry}</span></li>
 
                        </ul>
                        <Link to={`/event/${event.eventId}`}>
                            <button>Know More</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventList;
