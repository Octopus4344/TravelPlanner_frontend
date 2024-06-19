    import React, { useState, useEffect } from "react";
    import { useParams } from "react-router-dom";
    import mapboxgl from "mapbox-gl";
    import './styles/TripDetails_style.css'
    import 'mapbox-gl/dist/mapbox-gl.css'
    import polyline from "@mapbox/polyline";
    import { useNavigate } from 'react-router-dom';
    import axiosInstance from "./axiosInstance";


    mapboxgl.accessToken = 'pk.eyJ1Ijoib2N0b3B1czEiLCJhIjoiY2x4Zjhyanc3MG0wNzJsc2hiNXd4aWtlZyJ9.Fqr1-VG0YG-1bWY70bAy_Q'

    const TripDetails = () => {
        const navigate = useNavigate()
        const { tripId } = useParams();
        const [visits, setVisits] = useState([])
        const [selectedDay, setSelectedDay] = useState(null)
        const [trip, setTrip] = useState({})

        useEffect(() => {
            const accessToken = localStorage.getItem("access-token");
            if (!accessToken) {
                navigate('/');
            }
            else{
                (async () => {
                    try {
                        const {data} = await axiosInstance.get(`https://travel-planner-backend.sharkserver.kowalinski.dev/api/itineraries/${tripId}/`, {
                            headers:{
                                'accept': 'application/json',
                                'Authorization': `Bearer ${accessToken}`
                            }})
                        setTrip(data)
                        console.log('trip',data)
                    } catch (e){
                        console.log('error fetching trip data')
                    }
                })()

            }
        }, []);

            useEffect(() => {
            const accessToken = localStorage.getItem("access-token");
            if (!accessToken) {
                navigate('/');
            }
            else{
                (async () => {
                    try {
                        const {data} = await axiosInstance.get(`https://travel-planner-backend.sharkserver.kowalinski.dev/api/itinerary/${tripId}/visits/`, {
                            headers:{
                                'accept': 'application/json',
                                'Authorization': `Bearer ${accessToken}`
                            }})
                        setVisits(data.visits)
                        console.log('data visits', data.visits)
                    } catch (e){
                        console.log('error fetching visits data')
                    }
                })()

            }
        }, []);



        useEffect(()=> {
            const fetchDailyRoutes = async (day) => {
                const accessToken = localStorage.getItem("access-token");
                if (!accessToken) {
                    navigate('/');
                    return;
                }

                try{
                    const response = await axiosInstance.get(`https://travel-planner-backend.sharkserver.kowalinski.dev/api/itinerary/${tripId}/daily-routes/${day}`, {
                        day
                    },{
                        headers: {
                            'accept': 'application/json',
                            'Authorization': `Bearer ${accessToken}`

                        }

                    });
                    return response.data;
                }catch (error){
                    console.error(error)
                }

            };

            const initializeMap = async () => {

                if (selectedDay && visits.length > 0) {
                    const dayVisits = visits.filter(visit => visit.day === selectedDay)
                    if (dayVisits.length > 0) {
                        const map = new mapboxgl.Map({
                            container: 'map',
                            style: 'mapbox://styles/mapbox/streets-v11',
                            center: [dayVisits[0].longitude, dayVisits[0].latitude],
                            zoom: 13
                        });
                        if(trip.start_place_latitude && trip.start_place_longitude) {
                            new mapboxgl.Marker({color: 'red'})
                                .setLngLat([ trip.start_place_longitude,trip.start_place_latitude])
                                .setPopup(new mapboxgl.Popup().setText("Starting place"))
                                .addTo(map);
                        }

                        dayVisits.forEach(visit => {
                            new mapboxgl.Marker()
                                .setLngLat([visit.longitude, visit.latitude])
                                .setPopup(new mapboxgl.Popup().setText(visit.place_name))
                                .addTo(map)
                        });

                        const routesData = await fetchDailyRoutes(selectedDay);
                        console.log(routesData);
                        if (routesData && routesData.geometry) {
                            const decodedPolyline = polyline.decode(routesData.geometry);
                            console.log('decoded polyline', decodedPolyline)

                            const geojson = {
                                type: "Feature",
                                properties: {},
                                geometry: {
                                    type: 'LineString',
                                    coordinates: decodedPolyline.map(coord => [coord[1], coord[0]])
                                }
                            };
                            console.log('Geojson', geojson);

                            map.on('load', () => {
                                map.addSource('route', {
                                    type: 'geojson',
                                    data: geojson
                                })

                                map.addLayer({
                                    id: 'route',
                                    type: 'line',
                                    source: 'route',
                                    layout: {
                                        'line-join': 'round',
                                        'line-cap': 'round'
                                    },
                                    paint: {
                                        "line-color": '#888',
                                        'line-width': 8
                                    }
                                });
                            });
                        }
                    }
                }
            };

            initializeMap();
        }, [selectedDay, visits, tripId, navigate]);

        const days = [...new Set(visits.map(visit => visit.day))]
        console.log('visits: ', visits)
        //
        //
        // useEffect(() => {
        //     const accessToken = localStorage.getItem("access-token");
        //     if (!accessToken) {
        //         navigate('/');
        //     }
        //     else{
        //         (async () => {
        //             const getRoutes = async (day) => {
        //                 console.log('day:',day)
        //             try{
        //                 console.log('day:',day)
        //                 const response = await axiosInstance.post(`http://localhost:8000/api/itinerary/${tripId}/daily-routes/${day}`, {
        //                     ...day
        //                 }, {
        //                     headers: {
        //                         'Content-type': 'application/json',
        //                         'Authorization': `Bearer ${accessToken}`
        //                 }
        //                 });
        //                 return response.data;
        //             }catch (e){
        //                 console.error('error',e)
        //             }
        //         }
        //
        //         const routePromises = days.map(getRoutes);
        //         const routeResponses = await Promise.all(routePromises)
        //
        //         console.log('routes v: ', routeResponses)
        //
        //         const placesData = routeResponses.map(routeResponse => ({
        //             day: routeResponse.day,
        //             route: routeResponse.geometry
        //
        //         }));
        //
        //         setRoutes(placesData);
        //
        //
        //         })()
        //
        //     }
        // }, []);
        //
        // console.log('routes', routes)



        return(
            <div className={'trip-details-page'}>
                <div className={'day-list-container'}>
                    <div className={'headline-container'}>
                    <button className={'back'} onClick={() => navigate('/user')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="44" viewBox="0 0 50 44" fill="none">
                        <path d="M15.3556 18H45.5003C47.9855 18 50.0003 20.0147 50.0003 22.5C50.0003 24.9853 47.9855 27 45.5003 27H16.3645L24.81 35.4454C26.5673 37.2028 26.5673 40.052 24.81 41.8094C23.0526 43.5667 20.2034 43.5667 18.446 41.8094L2.34647 25.7099L2.31156 25.6751L2.29032 25.6538L2.18253 25.5459C1.2106 24.574 0.776278 23.2682 0.879427 21.9977C0.775057 20.726 1.20926 19.4184 2.18228 18.4454L18.4457 2.18197C20.203 0.424614 23.0523 0.424614 24.8097 2.18197C26.567 3.93932 26.567 6.78857 24.8097 8.54592L15.3556 18Z" fill="white"/>
                        </svg></button>
                    <h1>{trip.title}</h1>
                    </div>
                    <div className={'day-list'}>
                        {days.map((day) => (
                            <div key={day} className={'day-item'} onClick={() => setSelectedDay(day)}>
                                <h2>Day {day}</h2>
                                {selectedDay === day && (
                                    <div className={"visit-list-container"}>
                                        {visits.filter(visit => visit.day === day).map((visit, index) => (
                                            // <div key={visit.id} className={'visit-item'}>
                                            //     {visit.start_time} - {visit.name}
                                            // </div>
                                            <div key={index} className={'visit-item'}>
                                                <h3>{visit.start_time} - {visit.place_name}</h3>
                                            </div>

                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div id={'map'} className={'map-container'}></div>

            </div>
        )


    }

    export default TripDetails;