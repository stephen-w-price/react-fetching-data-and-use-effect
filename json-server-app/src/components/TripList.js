import { useState } from "react"
import { useFetch } from '../hooks/useFetch'
import './TripList.css'

export default function TripList() {
    
    const [url, setUrl] = useState('http://localhost:3000/trips')
    const { data: trips, isPending, error } = useFetch(url)
    console.log(url)
    return (
        <div className="trip-list">
            <h2>Triplist</h2>
            {isPending && <div>Is loading....</div>}
            {error && <div>{error}</div>}
                <ul>
                {trips && trips.map(trip => (
                    <li key={trip.id}>
                        <h3>{trip.title}</h3>
                        <h3>{trip.price}</h3>
                    </li>
                ))}
                </ul>
            <div className="filters">
                <button onClick={() => setUrl('http://localhost:3000/trips?loc=america')}>American</button>
                <button onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}>European</button>
                <button onClick={() => setUrl('http://localhost:3000/trips')}>All Trips </button>
            </div>
        </div>
    )
}
