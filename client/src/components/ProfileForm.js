import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms";



function ProfileForm({user, isEditingProfile, setIsEditingProfile}) {
    const [name, setName] = useState(user.user_name);
    const [email, setEmail] = useState(user.user_email);
    const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
    const [address, setAddress] = useState(user.user_address);
    const [city, setCity] = useState(user.user_city);
    const [state, setState] = useState(user.user_state);
    const [zipCode, setZipCode] = useState(user.user_zip_code);
    const [user2, setUser2] = useRecoilState(userState)
    const navigate = useNavigate();


console.log(user)

const handleSubmit = () => {
    const userData = {
    user_name: name,
    user_email: email,
    user_phone_number: phoneNumber,
    user_address: address,
    user_city: city,
    user_state: state,
    user_zip_code: zipCode
    };

    fetch(`/users/${user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
            if (response.ok) {
                console.log('User updated successfully');
                return response.json(); // Parse the response as JSON
            } else {
                console.log('Failed to update user');
                throw new Error('Failed to update user');
            }
            })
            .then((updatedUser) => {
            setUser2(updatedUser); // Update the user state with the updated user data
            setIsEditingProfile(!isEditingProfile);
            })
            .catch((error) => {
            console.log('Error updating user:', error);
            });
        }



    return (
        <div class="ui form">
            <div class="fields" style={{ display: "flex", flexDirection: "column" }}>
                <div class="field" style={{ marginBottom: "10px" }}>
                <label>Name</label>
                <input type="text" placeholder={user.user_name} value={name}
                onChange={(e) => setName(e.target.value)} style={{ width: "100%" }}/>
                </div>
                <div class="field" style={{ marginBottom: "10px" }}>
                <label>Email</label>
                <input type="text" placeholder={user.user_email} value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div class="field" style={{ marginBottom: "10px" }}>
                <label>Phone Number</label>
                <input type="text" placeholder={user.user_phone_number} value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
                <div class="field" style={{ marginBottom: "10px" }}>
                <label>Address</label>
                <input type="text" placeholder={user.user_address} value={address}
                onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div class="field" style={{ marginBottom: "10px" }}>
                <label>City</label>
                <input type="text" placeholder={user.user_city} value={city}
                onChange={(e) => setCity(e.target.value)}/>
                </div>
                <div class="field" style={{ marginBottom: "10px" }}>
                <label>State</label>
                <input type="text" placeholder={user.user_state} value={state}
                onChange={(e) => setState(e.target.value)}/>
                </div>
                <div class="field">
                <label>Zip Code</label>
                <input type="text" placeholder={user.user_zip_code} value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}/>
                </div>
            </div>
                <button className="ui button" style={{ marginBottom: "10px", marginTop: "10px"}} onClick={handleSubmit}>
                    Submit
                </button>
            </div>
    )
}

export default ProfileForm;