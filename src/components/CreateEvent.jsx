import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";

const CreateEvent = () => {
    const { user } = useUser();
    const userId = user?.id;

    const initialUserState = {
        eventName: "", eventDate: "", venueCity: "", venueState: "", venueCountry: "", organizerName: "", organizerPhone: "", description: "", eventImage: null,
    };
    const [eventData, setEventData] = useState(initialUserState);
    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.type === 'file' ? e.target.files[0] : e.target.value;

        setEventData({ ...eventData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('event', JSON.stringify(eventData));
            formData.append('eventImage', eventData.eventImage);
            formData.append('userId', userId);
            console.log('FormData:', formData);
            const response = await fetch('http://localhost:8080/api/events', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.ok) {
                console.log('Event created successfully');
                // Optionally, you can clear the form after submission
                setEventData(initialUserState);
            } else {
                console.error('Failed to create event');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className='formcontainer'>
            <span>Create Event</span>
            <form onSubmit={handleSubmit}>
                <div className='formbody'>
                    <input type='text' id="eventname" name="eventname" placeholder='Event name' value={user.eventname} onChange={handleInputs} />
                    <input type='date' id="eventdate" name="eventdate" placeholder='Event date' value={user.eventdate} onChange={handleInputs} />
                    <input type='text' id="eventcity" name="eventcity" placeholder='Event city' value={user.eventcity} onChange={handleInputs} />
                    {/* <input type='text' id="eventstate" placeholder='Event state' /> */}
                    <select name='state' value={user.state} onChange={handleInputs}>
                        <option>- Select State -</option>
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
                    <input type='text' id="eventcountry" placeholder='Event country' name='country' value={user.country} onChange={handleInputs} />
                    <input type='text' id="organizername" placeholder='Organizer name' name='orgernisername' value={user.orgernisername} onChange={handleInputs} />
                    <input type='tel' id="organizerphone" placeholder='Organizer phone' name='organiserphone' value={user.organiserphone} onChange={handleInputs} />
                    <input type='text' id="description" placeholder='Description' name='description' value={user.description} onChange={handleInputs} />
                    <input type="file" id="img" name="image" accept="image/*" value={user.image} onChange={handleInputs} />
                    <label htmlFor="img"><i className="fa-solid fa-upload"></i>Upload image</label>
                </div>
                <div className='formsubmit'>
                    <button className='btn1' type='submit'>Submit</button>
                    <Link to="/allevents"><button>Go to events page</button></Link>
                </div>
            </form>
        </div>
    )
}

export default CreateEvent
