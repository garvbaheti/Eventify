import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const CreateEvent = () => {
    const { eventId } = useParams();
    const isEditing = eventId ? true : false;
    const { userId } = useAuth();

    const initialUserState = {
        eventName: "",
        eventDate: "",
        venueName: "",
        venueCity: "",
        venueState: "",
        venueCountry: "",
        organizerName: "",
        organizerPhone: "",
        description: "",
        eventImage: "",
        createdByUserId: userId || ""
    };
    const [userData, setUserData] = useState(initialUserState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditing) {
            fetchEventData();
        }
    }, [isEditing]);

    const fetchEventData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/events/${eventId}`);
            if (response.ok) {
                const eventData = await response.json();
                setUserData(eventData);
            } else {
                console.error('Failed to fetch event data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!userData.eventName.trim()) {
            errors.eventName = "Event Name is required";
            valid = false;
        }

        if (!userData.eventDate) {
            errors.eventDate = "Event Date is required";
            valid = false;
        }

        if (!userData.venueName.trim()) {
            errors.venueName = "Venue Name is required";
            valid = false;
        }

        if (!userData.venueCity.trim()) {
            errors.venueCity = "Venue City is required";
            valid = false;
        }

        if (!userData.venueState.trim() || userData.venueState === "- Select State -") {
            errors.venueState = "Venue State is required";
            valid = false;
        }

        if (!userData.venueCountry.trim()) {
            errors.venueCountry = "Venue Country is required";
            valid = false;
        }

        if (!userData.organizerName.trim()) {
            errors.organizerName = "Organizer Name is required";
            valid = false;
        }

        if (!userData.organizerPhone.trim()) {
            errors.organizerPhone = "Organizer Phone is required";
            valid = false;
        } else if (!/^\d{10}$/.test(userData.organizerPhone)) {
            errors.organizerPhone = "Organizer Phone must be a 10-digit number";
            valid = false;
        }

        if (!userData.description.trim()) {
            errors.description = "Description is required";
            valid = false;
        }

        if (!userData.eventImage.trim()) {
            errors.eventImage = "Event Banner URL is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const url = isEditing ? `http://localhost:8080/api/events/${eventId}` : 'http://localhost:8080/api/events';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const eventData = {
                ...userData,
                createdByUserId: userId || ""
            };

            setIsSubmitting(true);

            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(eventData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log(isEditing ? 'Event updated successfully' : 'Event created successfully');
                setUserData(initialUserState);
            } else {
                console.error(isEditing ? 'Failed to update event' : 'Failed to create event');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className='formcontainer'>
            <span>Create Event</span>
            <form onSubmit={handleSubmit}>
                <div className='formbody'>
                    <input type='text' id="eventName" name="eventName" placeholder='Event name' value={userData.eventName} onChange={handleInputs} />
                    {errors.eventName && <span className="error">{errors.eventName}</span>}

                    <input type='date' id="eventDate" name="eventDate" placeholder='Event date' value={userData.eventDate} onChange={handleInputs} />
                    {errors.eventDate && <span className="error">{errors.eventDate}</span>}

                    <input type='text' id="venueName" name="venueName" placeholder='Event Venue' value={userData.venueName} onChange={handleInputs} />
                    {errors.venueName && <span className="error">{errors.venueName}</span>}

                    <input type='text' id="venueCity" name="venueCity" placeholder='Event city' value={userData.venueCity} onChange={handleInputs} />
                    {errors.venueCity && <span className="error">{errors.venueCity}</span>}

                    <select name='venueState' value={userData.venueState} onChange={handleInputs}>
                        <option value="">- Select State -</option>
                        <option value="AP">Andhra Pradesh</option>
                        <option value="AR">Arunachal Pradesh</option>
                        <option value="AS">Assam</option>
                        <option value="BR">Bihar</option>
                        <option value="CT">Chhattisgarh</option>
                        <option value="GA">Gujarat</option>
                        <option value="HR">Haryana</option>
                        <option value="HP">Himachal Pradesh</option>
                        <option value="JK">Jammu and Kashmir</option>
                        <option value="GA">Goa</option>
                        <option value="JH">Jharkhand</option>
                        <option value="KA">Karnataka</option>
                        <option value="KL">Kerala</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="MH">Maharashtra</option>
                        <option value="MN">Manipur</option>
                        <option value="ML">Meghalaya</option>
                        <option value="MZ">Mizoram</option>
                        <option value="NL">Nagaland</option>
                        <option value="OR">Odisha</option>
                        <option value="PB">Punjab</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="SK">Sikkim</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="TG">Telangana</option>
                        <option value="TR">Tripura</option>
                        <option value="UT">Uttarakhand</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="WB">West Bengal</option>
                        <option value="AN">Andaman and Nicobar Islands</option>
                        <option value="CH">Chandigarh</option>
                        <option value="DN">Dadra and Nagar Haveli</option>
                        <option value="DD">Daman and Diu</option>
                        <option value="DL">Delhi</option>
                        <option value="LD">Lakshadweep</option>
                        <option value="PY">Puducherry</option>
                    </select>
                    {errors.venueState && <span className="error">{errors.venueState}</span>}

                    <input type='text' id="venueCountry" placeholder='Event country' name='venueCountry' value={userData.venueCountry} onChange={handleInputs} />
                    {errors.venueCountry && <span className="error">{errors.venueCountry}</span>}

                    <input type='text' id="organizerName" placeholder='Organizer name' name='organizerName' value={userData.organizerName} onChange={handleInputs} />
                    {errors.organizerName && <span className="error">{errors.organizerName}</span>}

                    <input type='tel' id="organizerPhone" placeholder='Organizer phone' name='organizerPhone' value={userData.organizerPhone} onChange={handleInputs} />
                    {errors.organizerPhone && <span className="error">{errors.organizerPhone}</span>}

                    <input type='text' id="description" placeholder='Description' name='description' value={userData.description} onChange={handleInputs} />
                    {errors.description && <span className="error">{errors.description}</span>}

                    <input type='text' id="eventImage" placeholder='Event Banner Url' name='eventImage' value={userData.eventImage} onChange={handleInputs} />
                    {errors.eventImage && <span className="error">{errors.eventImage}</span>}
                </div>
                <div className='formsubmit'>
                    <button className='btn1' type='submit' disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    <Link to="/allevents"><button>Go to events page</button></Link>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;